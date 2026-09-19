import { courses, students, enrollments } from '../../data/mockData';
import { FiBook, FiUsers, FiTrendingUp, FiStar, FiEye, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function TeacherDashboard() {
    const myCourses = courses.filter(c => c.teacherId === 2);
    const myStudents = enrollments.filter(e => myCourses.some(c => c.id === e.courseId));
    const totalStudents = myCourses.reduce((sum, c) => sum + c.students, 0);
    const avgRating = (myCourses.reduce((sum, c) => sum + c.rating, 0) / myCourses.length).toFixed(1);

    const stats = [
        { label: 'My Courses', value: myCourses.length, icon: FiBook, color: '#7c3aed', bg: 'rgba(139,92,246,0.15)' },
        { label: 'Total Students', value: totalStudents.toLocaleString(), icon: FiUsers, color: '#0891b2', bg: 'rgba(6,182,212,0.15)' },
        { label: 'Avg Rating', value: avgRating, icon: FiStar, color: '#d97706', bg: 'rgba(245,158,11,0.15)' },
        { label: 'Published', value: myCourses.filter(c => c.isPublished).length, icon: FiTrendingUp, color: '#047857', bg: 'rgba(16,185,129,0.15)' },
    ];

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: '0.375rem' }}>Teacher Dashboard</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage your courses and track student progress.</p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                {stats.map((s, i) => (
                    <div key={i} className="stat-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>{s.label}</p>
                                <p style={{ color: 'var(--text)', fontWeight: 800, fontSize: '2rem', fontFamily: 'var(--font-display)' }}>{s.value}</p>
                            </div>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <s.icon size={22} style={{ color: s.color }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* My Courses */}
            <div style={{ background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)', overflow: 'hidden', marginBottom: '1.5rem' }}>
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1rem', fontFamily: 'var(--font-display)' }}>My Courses</h3>
                    <Link to="/teacher/create-course" className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem', textDecoration: 'none' }}>+ New Course</Link>
                </div>
                <div style={{ padding: '0.5rem 0' }}>
                    {myCourses.slice(0, 5).map(c => (
                        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
                            <img src={c.thumbnail} alt="" style={{ width: '56px', height: '38px', objectFit: 'cover', borderRadius: '0.375rem' }} onError={e => e.target.style.display = 'none'} />
                            <div style={{ flex: 1 }}>
                                <div style={{ color: 'var(--text)', fontSize: '0.875rem', fontWeight: 500 }}>{c.title}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{c.students} students · ₹{c.price.toLocaleString()}</div>
                            </div>
                            <span className={`badge ${c.isPublished ? 'badge-success' : 'badge-warning'}`}>{c.isPublished ? 'Published' : 'Draft'}</span>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Link to={`/teacher/course-students/${c.id}`} style={{ width: '30px', height: '30px', borderRadius: '0.375rem', background: 'rgba(6,182,212,0.15)', color: '#0891b2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FiEye size={14} />
                                </Link>
                                <Link to={`/teacher/create-course/${c.id}`} style={{ width: '30px', height: '30px', borderRadius: '0.375rem', background: 'rgba(139,92,246,0.15)', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FiEdit2 size={14} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Enrollments */}
            <div style={{ background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)', overflow: 'hidden' }}>
                <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
                    <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1rem', fontFamily: 'var(--font-display)' }}>Recent Student Activity</h3>
                </div>
                {myStudents.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No enrollments yet</div>
                ) : myStudents.slice(0, 4).map(e => (
                    <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.8rem' }}>{e.studentName[0]}</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ color: 'var(--text)', fontSize: '0.85rem', fontWeight: 500 }}>{e.studentName}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{e.courseTitle}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div className="progress-bar" style={{ width: '80px', marginBottom: '3px' }}>
                                <div className="progress-fill" style={{ width: `${e.progress}%` }} />
                            </div>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{e.progress}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
