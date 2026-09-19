import { FiGrid, FiBookOpen, FiSearch } from 'react-icons/fi';
import DashboardLayout from '../../components/DashboardLayout';
import { StudentProvider } from '../../context/StudentContext';

const navItems = [
    { to: '/student/dashboard', icon: FiGrid, label: 'Dashboard' },
    { to: '/student/enrolled', icon: FiBookOpen, label: 'My Courses' },
    { to: '/student/browse', icon: FiSearch, label: 'Browse Courses' },
];

export default function StudentLayout() {
    return (
        <StudentProvider>
            <DashboardLayout
                panelName="Student Panel"
                roleLabel="Student"
                gradient="linear-gradient(135deg, #0891b2, #4f46e5)"
                navItems={navItems}
                extraTitles={[['/student/learn', 'Learning']]}
            />
        </StudentProvider>
    );
}
