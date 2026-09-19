import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { courses } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { FiStar, FiClock, FiAward, FiCheckCircle, FiPlay, FiBookOpen, FiArrowLeft } from 'react-icons/fi';

const levelColors = { Beginner: '#10b981', Intermediate: '#f59e0b', Advanced: '#ef4444' };

export default function CourseDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [enrolled, setEnrolled] = useState(false);
    const course = courses.find(c => c.id === parseInt(id));

    if (!course) return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>😕</div>
                <h2 style={{ marginBottom: '1rem' }}>Course not found</h2>
                <Link to="/courses" className="btn-primary"><FiArrowLeft size={15} /> Back to courses</Link>
            </div>
        </div>
    );

    const handleEnroll = () => {
        if (!user) { navigate('/login'); return; }
        if (user.role !== 'student') return;
        setEnrolled(true);
        setTimeout(() => navigate('/student/enrolled'), 1000);
    };

    const levelColor = levelColors[course.level];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <Navbar />

            <section style={{ padding: '6.5rem 1.5rem 5rem', background: 'linear-gradient(to bottom, rgba(99,102,241,0.07) 0, transparent 420px)' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <Link to="/courses" className="btn-ghost" style={{ marginLeft: '-0.9rem', marginBottom: '1rem' }}>
                        <FiArrowLeft size={15} /> Back to courses
                    </Link>

                    <div className="detail-grid">
                        {/* Main column */}
                        <div>
                            <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>{course.category}</span>
                            <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>
                                {course.title}
                            </h1>
                            <p style={{ color: 'var(--text-2)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: 680 }}>{course.description}</p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.25rem', marginBottom: '3rem', color: 'var(--text-2)', fontSize: '0.92rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, color: 'var(--text)' }}>
                                    <FiStar size={16} style={{ color: '#f59e0b', fill: '#f59e0b' }} /> {course.rating}
                                    <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.85rem' }}>({course.students.toLocaleString()} students)</span>
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><FiClock size={15} /> {course.duration}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><FiAward size={15} /> {course.teacher}</span>
                                <span className="pill" style={{ position: 'static', boxShadow: 'none', border: '1px solid var(--border)' }}>
                                    <span className="dot" style={{ background: levelColor }} /> {course.level}
                                </span>
                            </div>

                            <h2 style={{ fontWeight: 700, fontSize: '1.4rem', marginBottom: '1.1rem' }}>What you'll learn</h2>
                            <div className="panel" style={{ padding: '1.4rem 1.5rem', marginBottom: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem 1.5rem' }}>
                                {course.syllabus.map(item => (
                                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-2)', fontSize: '0.92rem' }}>
                                        <FiCheckCircle size={16} style={{ color: '#059669', marginTop: 3, flexShrink: 0 }} /> {item}
                                    </div>
                                ))}
                            </div>

                            <h2 style={{ fontWeight: 700, fontSize: '1.4rem', marginBottom: '1.1rem' }}>Course syllabus</h2>
                            <div className="panel">
                                {course.syllabus.map((item, i) => (
                                    <div key={item} style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.95rem 1.25rem',
                                        borderBottom: i < course.syllabus.length - 1 ? '1px solid var(--border)' : 'none',
                                    }}>
                                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <FiPlay size={12} style={{ color: 'var(--primary-dark)' }} />
                                        </div>
                                        <span style={{ color: 'var(--text)', fontSize: '0.92rem', fontWeight: 500 }}>Module {i + 1}: {item}</span>
                                        <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>45 min</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Enroll card */}
                        <aside className="detail-aside">
                            <div className="panel" style={{ boxShadow: 'var(--shadow-lg)' }}>
                                <div className="course-thumb" style={{ borderRadius: 0 }}>
                                    <img src={course.thumbnail} alt="" onError={e => { e.currentTarget.style.display = 'none'; }} />
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{ fontSize: '2.1rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: '1.1rem' }}>
                                        {course.price === 0 ? 'Free' : `₹${course.price.toLocaleString()}`}
                                    </div>
                                    {enrolled ? (
                                        <div style={{ padding: '0.85rem', background: 'var(--success-soft)', borderRadius: '0.75rem', color: '#047857', fontWeight: 600, marginBottom: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                            <FiCheckCircle /> Enrolled successfully
                                        </div>
                                    ) : (
                                        <button onClick={handleEnroll} className="btn-primary" style={{ width: '100%', padding: '0.85rem', marginBottom: '1.1rem' }}>
                                            {user?.role === 'student' ? <><FiBookOpen /> Enroll now</> : user ? <>Only students can enroll</> : <><FiPlay /> Log in to enroll</>}
                                        </button>
                                    )}
                                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                        {[
                                            ['Duration', course.duration],
                                            ['Level', course.level],
                                            ['Students', course.students.toLocaleString()],
                                            ['Instructor', course.teacher],
                                            ['Certificate', 'Yes, on completion'],
                                        ].map(([k, v]) => (
                                            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.65rem', fontSize: '0.875rem' }}>
                                                <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                                                <span style={{ fontWeight: 600, textAlign: 'right' }}>{v}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
