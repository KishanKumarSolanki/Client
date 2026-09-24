import { Link } from 'react-router-dom';
import { FiBookOpen, FiTrendingUp, FiCheckCircle, FiTarget, FiArrowRight, FiPlay } from 'react-icons/fi';
import { courses } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useStudent } from '../../context/StudentContext';

export default function StudentDashboard() {
    const { user } = useAuth();
    const { enrolledCourses, getProgress, isEnrolled } = useStudent();

    const withProgress = enrolledCourses.map(c => ({ ...c, pct: getProgress(c.id) }));
    const inProgress = withProgress.filter(c => c.pct < 100).sort((a, b) => b.pct - a.pct);
    const completed = withProgress.filter(c => c.pct === 100);
    const average = withProgress.length
        ? Math.round(withProgress.reduce((sum, c) => sum + c.pct, 0) / withProgress.length)
        : 0;
    const recommended = courses.filter(c => c.isPublished && !isEnrolled(c.id)).slice(0, 4);
    const firstName = user?.name?.split(' ')[0] ?? 'there';

    const stats = [
        { label: 'Enrolled courses', value: withProgress.length, icon: FiBookOpen, color: '#4f46e5', bg: 'rgba(99,102,241,0.12)' },
        { label: 'In progress', value: inProgress.length, icon: FiTrendingUp, color: '#0e7490', bg: 'rgba(6,182,212,0.14)' },
        { label: 'Completed', value: completed.length, icon: FiCheckCircle, color: '#047857', bg: 'rgba(16,185,129,0.14)' },
        { label: 'Average progress', value: `${average}%`, icon: FiTarget, color: '#7c3aed', bg: 'rgba(139,92,246,0.14)' },
    ];

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 className="page-title">Welcome back, {firstName}</h1>
                <p className="page-sub">
                    {inProgress.length > 0
                        ? `You have ${inProgress.length} course${inProgress.length > 1 ? 's' : ''} in progress. Pick up where you left off.`
                        : 'You have no courses in progress. Find something new to learn.'}
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                {stats.map(s => (
                    <div key={s.label} className="stat-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.4rem' }}>{s.label}</p>
                                <p style={{ fontWeight: 800, fontSize: '2rem', fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>{s.value}</p>
                            </div>
                            <div style={{ width: 46, height: 46, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <s.icon size={21} style={{ color: s.color }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid" style={{ alignItems: 'start' }}>
                {/* Continue learning */}
                <section className="panel" style={{ gridColumn: 'span 1' }}>
                    <div className="panel-header">
                        <h3>Continue learning</h3>
                        <Link to="/student/enrolled" className="btn-ghost">View all <FiArrowRight size={14} /></Link>
                    </div>
                    {inProgress.length === 0 ? (
                        <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                            <p style={{ marginBottom: '1rem' }}>Nothing in progress right now.</p>
                            <Link to="/student/browse" className="btn-primary">Browse courses</Link>
                        </div>
                    ) : inProgress.slice(0, 4).map(c => (
                        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
                            <img src={c.thumbnail} alt="" style={{ width: 84, height: 54, objectFit: 'cover', borderRadius: 8, background: 'var(--bg-secondary)', flexShrink: 0 }} onError={e => { e.currentTarget.style.visibility = 'hidden'; }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 600, fontSize: '0.92rem', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <div className="progress-bar" style={{ flex: 1 }}><div className="progress-fill" style={{ width: `${c.pct}%` }} /></div>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600, minWidth: 34, textAlign: 'right' }}>{c.pct}%</span>
                                </div>
                            </div>
                            <Link to={`/student/learn/${c.id}`} className="btn-primary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}>
                                <FiPlay size={13} /> Resume
                            </Link>
                        </div>
                    ))}
                </section>

                {/* Recommended */}
                <section className="panel">
                    <div className="panel-header">
                        <h3>Recommended for you</h3>
                        <Link to="/student/browse" className="btn-ghost">Browse <FiArrowRight size={14} /></Link>
                    </div>
                    {recommended.length === 0 ? (
                        <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>You are enrolled in every available course.</div>
                    ) : recommended.map(c => (
                        <Link key={c.id} to="/student/browse" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem 1.5rem', borderBottom: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
                            <img src={c.thumbnail} alt="" style={{ width: 64, height: 44, objectFit: 'cover', borderRadius: 8, background: 'var(--bg-secondary)', flexShrink: 0 }} onError={e => { e.currentTarget.style.visibility = 'hidden'; }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{c.category} · {c.duration}</div>
                            </div>
                            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>₹{c.price.toLocaleString()}</span>
                        </Link>
                    ))}
                </section>
            </div>
        </div>
    );
}
