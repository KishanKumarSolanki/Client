import { FiGrid, FiUsers, FiUserPlus, FiBook, FiList } from 'react-icons/fi';
import DashboardLayout from '../../components/DashboardLayout';

const navItems = [
    { to: '/admin/dashboard', icon: FiGrid, label: 'Dashboard' },
    { to: '/admin/courses', icon: FiBook, label: 'Manage Courses' },
    { to: '/admin/users', icon: FiUsers, label: 'Manage Users' },
    { to: '/admin/add-teacher', icon: FiUserPlus, label: 'Add Teacher' },
    { to: '/admin/enrollments', icon: FiList, label: 'Enrollments' },
];

export default function AdminLayout() {
    return (
        <DashboardLayout
            panelName="Admin Panel"
            roleLabel="Administrator"
            gradient="linear-gradient(135deg, #4f46e5, #8b5cf6)"
            navItems={navItems}
        />
    );
}
