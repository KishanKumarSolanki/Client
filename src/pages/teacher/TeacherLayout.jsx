import { FiGrid, FiBook, FiPlusCircle } from 'react-icons/fi';
import DashboardLayout from '../../components/DashboardLayout';

const navItems = [
    { to: '/teacher/dashboard', icon: FiGrid, label: 'Dashboard' },
    { to: '/teacher/my-courses', icon: FiBook, label: 'My Courses' },
    { to: '/teacher/create-course', icon: FiPlusCircle, label: 'Create Course' },
];

export default function TeacherLayout() {
    return (
        <DashboardLayout
            panelName="Teacher Panel"
            roleLabel="Instructor"
            gradient="linear-gradient(135deg, #7c3aed, #0891b2)"
            navItems={navItems}
        />
    );
}
