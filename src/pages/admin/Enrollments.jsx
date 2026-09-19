import { enrollments } from '../../data/mockData';
import { FiCalendar } from 'react-icons/fi';

export default function Enrollments() {
    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: '0.375rem' }}>Enrollments</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>All student course enrollments on the platform.</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                {[['Total', enrollments.length, '#6366f1'], ['Completed', enrollments.filter(e => e.progress === 100).length, '#10b981'], ['In Progress', enrollments.filter(e => e.progress > 0 && e.progress < 100).length, '#f59e0b']].map(([l, v, c]) => (
                    <div key={l} style={{ padding: '0.75rem 1.25rem', background: 'var(--card)', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{l}: </span>
                        <span style={{ color: c, fontWeight: 700 }}>{v}</span>
                    </div>
                ))}
            </div>

            <div style={{ background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)', overflow: 'hidden' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Student</th>
                            <th>Course</th>
                            <th>Progress</th>
                            <th>Status</th>
                            <th>Enrolled Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map((e, i) => (
                            <tr key={e.id}>
                                <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>#{e.id}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.75rem' }}>{e.studentName[0]}</div>
                                        <span style={{ color: 'var(--text)', fontSize: '0.875rem' }}>{e.studentName}</span>
                                    </div>
                                </td>
                                <td><span style={{ color: 'var(--text-2)', fontSize: '0.875rem' }}>{e.courseTitle}</span></td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div className="progress-bar" style={{ width: '80px' }}>
                                            <div className="progress-fill" style={{ width: `${e.progress}%` }} />
                                        </div>
                                        <span style={{ color: 'var(--text-2)', fontSize: '0.78rem', minWidth: '30px' }}>{e.progress}%</span>
                                    </div>
                                </td>
                                <td>
                                    <span className={`badge ${e.progress === 100 ? 'badge-success' : e.progress > 0 ? 'badge-primary' : 'badge-warning'}`}>
                                        {e.progress === 100 ? 'Completed' : e.progress > 0 ? 'In Progress' : 'Not Started'}
                                    </span>
                                </td>
                                <td>
                                    <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem' }}>
                                        <FiCalendar size={12} /> {e.enrolledAt}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
