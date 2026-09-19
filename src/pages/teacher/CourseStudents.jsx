import { useParams, Link } from 'react-router-dom';
import { courses, enrollments } from '../../data/mockData';
import { FiArrowLeft, FiUsers, FiTrendingUp } from 'react-icons/fi';

export default function CourseStudents() {
    const { id } = useParams();
    const course = courses.find(c => c.id === parseInt(id));
    const courseEnrollments = enrollments.filter(e => e.courseId === parseInt(id));

    if (!course) return (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <h3 style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>Course not found</h3>
            <Link to="/teacher/my-courses" className="btn-primary" style={{ display: 'inline-flex', marginTop: '1rem', textDecoration: 'none' }}>Back to My Courses</Link>
        </div>
    );

    const avgProgress = courseEnrollments.length ? Math.round(courseEnrollments.reduce((s, e) => s + e.progress, 0) / courseEnrollments.length) : 0;

    return (
        <div>
            <Link to="/teacher/my-courses" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                <FiArrowLeft size={16} /> Back to My Courses
            </Link>

            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.5rem', fontFamily: 'var(--font-display)', marginBottom: '0.375rem' }}>
                    {course.title}
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Enrolled students and progress overview</p>
            </div>

            {/* Summary */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                {[
                    [FiUsers, courseEnrollments.length, 'Enrolled Students', '#8b5cf6'],
                    [FiTrendingUp, `${avgProgress}%`, 'Average Progress', '#10b981'],
                    [FiUsers, courseEnrollments.filter(e => e.progress === 100).length, 'Completed', '#06b6d4'],
                ].map(([Icon, val, label, color], i) => (
                    <div key={i} style={{ padding: '1rem 1.5rem', background: 'var(--card)', borderRadius: '0.75rem', border: '1px solid var(--border)', flex: 1, textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}><Icon size={20} style={{ color }} /></div>
                        <div style={{ color, fontWeight: 700, fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>{val}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{label}</div>
                    </div>
                ))}
            </div>

            {courseEnrollments.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                    <h3 style={{ color: 'var(--text-2)', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>No Students Yet</h3>
                    <p>Students will appear here once they enroll in this course.</p>
                </div>
            ) : (
                <div style={{ background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)', overflow: 'hidden' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Progress</th>
                                <th>Status</th>
                                <th>Enrolled</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseEnrollments.map(e => (
                                <tr key={e.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.8rem' }}>{e.studentName[0]}</div>
                                            <span style={{ color: 'var(--text)', fontWeight: 500 }}>{e.studentName}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div className="progress-bar" style={{ width: '100px' }}>
                                                <div className="progress-fill" style={{ width: `${e.progress}%` }} />
                                            </div>
                                            <span style={{ color: 'var(--text-2)', fontSize: '0.8rem' }}>{e.progress}%</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${e.progress === 100 ? 'badge-success' : 'badge-primary'}`}>
                                            {e.progress === 100 ? 'Completed' : 'In Progress'}
                                        </span>
                                    </td>
                                    <td><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{e.enrolledAt}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
