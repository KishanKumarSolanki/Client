import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import CourseCard from '../../components/CourseCard';
import { courses, categories } from '../../data/mockData';
import { useStudent } from '../../context/StudentContext';

export default function BrowseCourses() {
    const { isEnrolled, enroll } = useStudent();
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All');

    const filtered = courses.filter(c => {
        if (!c.isPublished) return false;
        const q = query.trim().toLowerCase();
        const matchesQuery = !q || c.title.toLowerCase().includes(q) || c.teacher.toLowerCase().includes(q);
        const matchesCategory = category === 'All' || c.category === category;
        return matchesQuery && matchesCategory;
    });

    return (
        <div>
            <div style={{ marginBottom: '1.5rem' }}>
                <h1 className="page-title">Browse Courses</h1>
                <p className="page-sub">Find your next course and enroll in one click.</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.75rem' }}>
                <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: 420 }}>
                    <FiSearch size={17} style={{ position: 'absolute', left: '0.95rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        className="form-input"
                        style={{ paddingLeft: '2.6rem' }}
                        placeholder="Search by course or instructor"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setCategory(cat)} className={`chip${category === cat ? ' active' : ''}`}>{cat}</button>
                    ))}
                </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                {filtered.length} course{filtered.length !== 1 ? 's' : ''} found
            </p>

            {filtered.length === 0 ? (
                <div className="empty-state">
                    <h3 style={{ marginBottom: '0.5rem' }}>No courses match your search</h3>
                    <p>Try a different keyword or clear the category filter.</p>
                </div>
            ) : (
                <div className="course-grid">
                    {filtered.map(c => (
                        <CourseCard key={c.id} course={c} enrolled={isEnrolled(c.id)} onEnroll={enroll} />
                    ))}
                </div>
            )}
        </div>
    );
}
