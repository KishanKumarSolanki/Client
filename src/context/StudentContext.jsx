import { createContext, useContext, useState } from 'react';
import { courses, students } from '../data/mockData';
import { useAuth } from './AuthContext';

const StudentContext = createContext(null);

// Turn the stored "percent complete" into a list of completed lesson indexes
function initialCompleted(record) {
    const map = {};
    record.enrolledCourses.forEach(id => {
        const course = courses.find(c => c.id === id);
        const total = course ? course.syllabus.length : 0;
        const done = Math.round(((record.progress[id] ?? 0) / 100) * total);
        map[id] = Array.from({ length: done }, (_, i) => i);
    });
    return map;
}

export function StudentProvider({ children }) {
    const { user } = useAuth();
    const record = students.find(s => s.email === user?.email) ?? students[0];

    const [completed, setCompleted] = useState(() => initialCompleted(record));
    // Courses whose lessons the student has changed; until then we show the stored percentage
    const [touched, setTouched] = useState({});

    const enrolledIds = Object.keys(completed).map(Number);
    const enrolledCourses = courses.filter(c => enrolledIds.includes(c.id));

    const isEnrolled = id => enrolledIds.includes(Number(id));
    const getCompleted = id => completed[id] ?? [];
    const getProgress = id => {
        const key = Number(id);
        if (!touched[key] && record.progress[key] !== undefined) return record.progress[key];
        const course = courses.find(c => c.id === key);
        if (!course || course.syllabus.length === 0) return 0;
        return Math.round((getCompleted(key).length / course.syllabus.length) * 100);
    };

    const enroll = id => setCompleted(prev => (prev[id] ? prev : { ...prev, [id]: [] }));

    const toggleLesson = (id, index) => {
        setTouched(prev => ({ ...prev, [id]: true }));
        setCompleted(prev => {
            const current = prev[id] ?? [];
            const next = current.includes(index) ? current.filter(i => i !== index) : [...current, index];
            return { ...prev, [id]: next };
        });
    };

    const value = { enrolledCourses, isEnrolled, enroll, getProgress, getCompleted, toggleLesson };
    return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export const useStudent = () => useContext(StudentContext);
