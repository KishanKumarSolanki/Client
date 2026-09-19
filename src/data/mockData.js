export const courses = [
    {
        id: 1, title: 'Complete React Development', category: 'Web Development',
        teacher: 'Dr. Sarah Khan', teacherId: 2, duration: '40 hours', price: 2499,
        rating: 4.8, students: 1240, level: 'Intermediate', isShort: false,
        isPublished: true, thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=225&fit=crop',
        description: 'Master React from basics to advanced patterns including hooks, context, and performance optimization.',
        syllabus: ['Introduction to React', 'JSX & Components', 'State & Props', 'Hooks Deep Dive', 'Context API', 'React Router', 'Performance Optimization', 'Real Projects'],
        createdAt: '2024-01-15',
    },
    {
        id: 2, title: 'Python for Data Science', category: 'Data Science',
        teacher: 'Dr. Sarah Khan', teacherId: 2, duration: '35 hours', price: 3499,
        rating: 4.9, students: 980, level: 'Beginner', isShort: false,
        isPublished: true, thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop',
        description: 'Learn Python programming and apply it to data analysis, visualization, and machine learning.',
        syllabus: ['Python Basics', 'NumPy', 'Pandas', 'Matplotlib', 'Scikit-Learn', 'Machine Learning Intro', 'Projects'],
        createdAt: '2024-02-10',
    },
    {
        id: 3, title: 'UI/UX Design Fundamentals', category: 'Design',
        teacher: 'Dr. Sarah Khan', teacherId: 2, duration: '20 hours', price: 1999,
        rating: 4.7, students: 860, level: 'Beginner', isShort: true,
        isPublished: true, thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
        description: 'Learn the principles of great UI/UX design and build professional interfaces using Figma.',
        syllabus: ['Design Principles', 'Color Theory', 'Typography', 'Figma Basics', 'Wireframing', 'Prototyping', 'User Testing'],
        createdAt: '2024-03-05',
    },
    {
        id: 4, title: 'Node.js & Express Backend', category: 'Backend',
        teacher: 'Dr. Sarah Khan', teacherId: 2, duration: '30 hours', price: 2999,
        rating: 4.6, students: 720, level: 'Intermediate', isShort: false,
        isPublished: true, thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop',
        description: 'Build scalable backend APIs with Node.js, Express, MongoDB and authentication.',
        syllabus: ['Node.js Basics', 'Express Framework', 'REST APIs', 'MongoDB', 'Authentication', 'Deployment'],
        createdAt: '2024-03-20',
    },
    {
        id: 5, title: 'Git & GitHub in 3 Hours', category: 'DevOps',
        teacher: 'Dr. Sarah Khan', teacherId: 2, duration: '3 hours', price: 499,
        rating: 4.9, students: 2100, level: 'Beginner', isShort: true,
        isPublished: true, thumbnail: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=225&fit=crop',
        description: 'Master Git version control and GitHub collaboration in just 3 hours.',
        syllabus: ['Git Basics', 'Branching', 'Merging', 'GitHub', 'Pull Requests', 'CI/CD Intro'],
        createdAt: '2024-04-01',
    },
    {
        id: 6, title: 'CSS Animations Masterclass', category: 'Web Development',
        teacher: 'Dr. Sarah Khan', teacherId: 2, duration: '8 hours', price: 799,
        rating: 4.7, students: 540, level: 'Intermediate', isShort: true,
        isPublished: false, thumbnail: 'https://images.unsplash.com/photo-1545670723-196ed0954986?w=400&h=225&fit=crop',
        description: 'Create stunning animations and transitions using CSS and modern techniques.',
        syllabus: ['CSS Transitions', 'Keyframe Animations', 'Transforms', 'Scroll Animations', 'GSAP Intro'],
        createdAt: '2024-04-15',
    },
    {
        id: 7, title: 'Machine Learning A-Z', category: 'Data Science',
        teacher: 'Dr. Sarah Khan', teacherId: 2, duration: '50 hours', price: 4999,
        rating: 4.8, students: 1500, level: 'Advanced', isShort: false,
        isPublished: true, thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=225&fit=crop',
        description: 'Comprehensive machine learning course covering all major algorithms and real-world projects.',
        syllabus: ['Linear Regression', 'Classification', 'Clustering', 'Neural Networks', 'Deep Learning', 'Projects'],
        createdAt: '2024-05-01',
    },
    {
        id: 8, title: 'Tailwind CSS Quick Start', category: 'Web Development',
        teacher: 'Dr. Sarah Khan', teacherId: 2, duration: '5 hours', price: 599,
        rating: 4.8, students: 890, level: 'Beginner', isShort: true,
        isPublished: true, thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=225&fit=crop',
        description: 'Get productive with Tailwind CSS quickly and build beautiful UIs fast.',
        syllabus: ['Setup', 'Utility Classes', 'Responsive Design', 'Dark Mode', 'Custom Config', 'Components'],
        createdAt: '2024-05-20',
    },
];

export const students = [
    { id: 1, name: 'Rahul Sharma', email: 'student@lms.com', avatar: 'R', enrolledCourses: [1, 2, 5], joinedAt: '2024-01-20', progress: { 1: 65, 2: 30, 5: 100 } },
    { id: 3, name: 'Priya Patel', email: 'priya@lms.com', avatar: 'P', enrolledCourses: [1, 3, 8], joinedAt: '2024-02-01', progress: { 1: 80, 3: 45, 8: 20 } },
    { id: 4, name: 'Amit Kumar', email: 'amit@lms.com', avatar: 'A', enrolledCourses: [2, 7], joinedAt: '2024-02-15', progress: { 2: 90, 7: 55 } },
    { id: 5, name: 'Sneha Joshi', email: 'sneha@lms.com', avatar: 'S', enrolledCourses: [1, 4, 5], joinedAt: '2024-03-01', progress: { 1: 20, 4: 75, 5: 100 } },
    { id: 6, name: 'Vikram Singh', email: 'vikram@lms.com', avatar: 'V', enrolledCourses: [3, 6, 8], joinedAt: '2024-03-20', progress: { 3: 60, 6: 10, 8: 100 } },
];

export const teachers = [
    { id: 2, name: 'Dr. Sarah Khan', email: 'teacher@lms.com', avatar: 'S', subject: 'Web Development', courses: [1, 2, 3, 4, 5, 6, 7, 8], joinedAt: '2023-12-01', students: 6590 },
    { id: 7, name: 'Prof. Arjun Mehta', email: 'arjun@lms.com', avatar: 'A', subject: 'Data Science', courses: [], joinedAt: '2024-01-10', students: 0 },
];

export const enrollments = [
    { id: 1, studentId: 1, studentName: 'Rahul Sharma', courseId: 1, courseTitle: 'Complete React Development', enrolledAt: '2024-01-25', progress: 65 },
    { id: 2, studentId: 1, studentName: 'Rahul Sharma', courseId: 2, courseTitle: 'Python for Data Science', enrolledAt: '2024-02-01', progress: 30 },
    { id: 3, studentId: 3, studentName: 'Priya Patel', courseId: 1, courseTitle: 'Complete React Development', enrolledAt: '2024-02-05', progress: 80 },
    { id: 4, studentId: 4, studentName: 'Amit Kumar', courseId: 7, courseTitle: 'Machine Learning A-Z', enrolledAt: '2024-02-20', progress: 55 },
    { id: 5, studentId: 5, studentName: 'Sneha Joshi', courseId: 4, courseTitle: 'Node.js & Express Backend', enrolledAt: '2024-03-05', progress: 75 },
];

export const adminStats = {
    totalStudents: 5980,
    totalTeachers: 24,
    totalCourses: 8,
    totalRevenue: 2480000,
    monthlyRevenue: 185000,
    newStudentsThisMonth: 340,
};

export const categories = ['All', 'Web Development', 'Data Science', 'Design', 'Backend', 'DevOps'];

export const testimonials = [
    { id: 1, name: 'Rahul Sharma', role: 'Frontend Developer at TCS', text: 'This LMS transformed my career. The React course was incredibly detailed and practical!', rating: 5, avatar: 'R' },
    { id: 2, name: 'Priya Patel', role: 'Data Analyst at Infosys', text: 'The Python for Data Science course is a gem. Got placed within 2 months of completing it!', rating: 5, avatar: 'P' },
    { id: 3, name: 'Amit Kumar', role: 'ML Engineer at Google', text: 'Best investment I made. The Machine Learning course is very comprehensive and up-to-date.', rating: 5, avatar: 'A' },
];

export const teamMembers = [
    { name: 'Rajesh Gupta', role: 'CEO & Founder', bio: '15+ years in EdTech', avatar: 'R' },
    { name: 'Dr. Meena Iyer', role: 'Head of Curriculum', bio: 'PhD in Education Technology', avatar: 'M' },
    { name: 'Sandeep Rao', role: 'CTO', bio: 'Ex-Google Engineer', avatar: 'S' },
    { name: 'Kavya Nair', role: 'Head of Student Success', bio: 'Passionate about learner outcomes', avatar: 'K' },
];
