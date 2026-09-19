import { Link } from 'react-router-dom';
import { FiStar, FiUsers, FiClock, FiBookOpen } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const levelColors = {
    Beginner: '#10b981',
    Intermediate: '#f59e0b',
    Advanced: '#ef4444',
};

export default function CourseCard({ course, onEnroll, enrolled = false }) {
    const { user } = useAuth();
    const levelColor = levelColors[course.level] || '#10b981';

    return (
        <article className="course-card">
            <div className="course-thumb">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    loading="lazy"
                    onError={e => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="pill">
                    <span className="dot" style={{ background: levelColor }} />
                    {course.level}
                </span>
                {!course.isPublished && (
                    <span className="badge badge-warning" style={{ position: 'absolute', top: '0.7rem', right: '0.7rem' }}>Draft</span>
                )}
            </div>

            <div style={{ padding: '1.15rem 1.25rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>
                    {course.category}
                </span>

                <h3 style={{ fontWeight: 700, fontSize: '1.02rem', lineHeight: 1.4, marginBottom: '0.35rem' }}>
                    <Link to={`/courses/${course.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{course.title}</Link>
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', marginBottom: '0.9rem' }}>
                    by {course.teacher}
                </p>

                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-2)', fontSize: '0.8rem', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <FiStar size={14} style={{ color: '#f59e0b', fill: '#f59e0b' }} /> {course.rating}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <FiUsers size={14} /> {course.students.toLocaleString()}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <FiClock size={14} /> {course.duration}
                    </span>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.15rem', fontFamily: 'var(--font-display)' }}>
                        {course.price === 0 ? 'Free' : `₹${course.price.toLocaleString()}`}
                    </span>

                    {enrolled ? (
                        <Link to={`/student/learn/${course.id}`} className="btn-outline" style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem', color: '#047857' }}>
                            <FiBookOpen size={14} /> Continue
                        </Link>
                    ) : user?.role === 'student' ? (
                        <button onClick={() => onEnroll && onEnroll(course.id)} className="btn-primary" style={{ padding: '0.5rem 1.05rem', fontSize: '0.82rem' }}>
                            Enroll now
                        </button>
                    ) : (
                        <Link to={`/courses/${course.id}`} className="btn-outline" style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem' }}>
                            View details
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}
