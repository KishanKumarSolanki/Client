import { useState } from 'react';
import { courses } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { FiEdit2, FiEye, FiTrash2, FiStar, FiUsers, FiClock, FiPlusCircle } from 'react-icons/fi';

export default function MyCourses() {
    const [myCourses, setMyCourses] = useState(courses.filter(c => c.teacherId === 2));

    const deleteCourse = (id) => {
        if (window.confirm('Delete this course?')) setMyCourses(prev => prev.filter(c => c.id !== id));
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: '0.375rem' }}>My Courses</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage and track all your created courses.</p>
                </div>
                <Link to="/teacher/create-course" className="btn-primary">
                    <FiPlusCircle size={16} /> Create New Course
                </Link>
            </div>

            {myCourses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '6rem 2rem', background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
                    <h3 style={{ color: 'var(--text)', marginBottom: '0.75rem', fontFamily: 'var(--font-display)' }}>No Courses Yet</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Create your first course to start teaching!</p>
                    <Link to="/teacher/create-course" className="btn-primary">Create Course</Link>
                </div>
            ) : (
                <div className="course-grid">
                    {myCourses.map(c => (
                        <div key={c.id} style={{ background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)', overflow: 'hidden', transition: 'all 0.3s' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}>
                            <div style={{ position: 'relative' }}>
                                <img src={c.thumbnail} alt={c.title} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} />
                                <span style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}
                                    className={`badge ${c.isPublished ? 'badge-success' : 'badge-warning'}`}>
                                    {c.isPublished ? 'Published' : 'Draft'}
                                </span>
                            </div>
                            <div style={{ padding: '1.25rem' }}>
                                <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>{c.title}</h3>
                                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-2)', fontSize: '0.78rem', marginBottom: '1rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><FiStar size={12} style={{ color: '#d97706' }} /> {c.rating}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><FiUsers size={12} /> {c.students.toLocaleString()}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><FiClock size={12} /> {c.duration}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--text)', fontWeight: 700 }}>₹{c.price.toLocaleString()}</span>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <Link to={`/teacher/course-students/${c.id}`} style={{ width: '32px', height: '32px', borderRadius: '0.375rem', background: 'rgba(6,182,212,0.15)', color: '#0891b2', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                                            <FiEye size={15} />
                                        </Link>
                                        <Link to={`/teacher/create-course/${c.id}`} style={{ width: '32px', height: '32px', borderRadius: '0.375rem', background: 'rgba(139,92,246,0.15)', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                                            <FiEdit2 size={15} />
                                        </Link>
                                        <button onClick={() => deleteCourse(c.id)} style={{ width: '32px', height: '32px', borderRadius: '0.375rem', background: 'rgba(239,68,68,0.1)', color: '#dc2626', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <FiTrash2 size={15} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
