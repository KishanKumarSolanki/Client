import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import Courses from './pages/public/Courses';
import ShortCourses from './pages/public/ShortCourses';
import CourseDetail from './pages/public/CourseDetail';

// Auth
import Login from './pages/auth/Login';

// Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import AddTeacher from './pages/admin/AddTeacher';
import ManageCourses from './pages/admin/ManageCourses';
import Enrollments from './pages/admin/Enrollments';

// Teacher
import TeacherLayout from './pages/teacher/TeacherLayout';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import MyCourses from './pages/teacher/MyCourses';
import CreateCourse from './pages/teacher/CreateCourse';
import CourseStudents from './pages/teacher/CourseStudents';

// Student
import StudentLayout from './pages/student/StudentLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import EnrolledCourses from './pages/student/EnrolledCourses';
import CourseLearning from './pages/student/CourseLearning';
import BrowseCourses from './pages/student/BrowseCourses';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/short-courses" element={<ShortCourses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="add-teacher" element={<AddTeacher />} />
            <Route path="courses" element={<ManageCourses />} />
            <Route path="enrollments" element={<Enrollments />} />
          </Route>

          {/* Teacher */}
          <Route path="/teacher" element={<ProtectedRoute allowedRole="teacher"><TeacherLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="create-course/:id" element={<CreateCourse />} />
            <Route path="course-students/:id" element={<CourseStudents />} />
          </Route>

          {/* Student */}
          <Route path="/student" element={<ProtectedRoute allowedRole="student"><StudentLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="enrolled" element={<EnrolledCourses />} />
            <Route path="learn/:id" element={<CourseLearning />} />
            <Route path="browse" element={<BrowseCourses />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}