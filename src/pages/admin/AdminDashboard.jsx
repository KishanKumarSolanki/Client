import { courses, enrollments, adminStats } from '../../data/mockData';
import { FiUsers, FiBook, FiTrendingUp, FiDollarSign, FiUserPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Students', value: adminStats.totalStudents.toLocaleString(), icon: FiUsers, color: 'var(--primary-dark)', bg: 'rgba(99,102,241,0.15)', change: '+12%' },
        { label: 'Total Teachers', value: adminStats.totalTeachers, icon: FiUserPlus, color: '#7c3aed', bg: 'rgba(139,92,246,0.15)', change: '+3' },
        { label: 'Total Courses', value: adminStats.totalCourses, icon: FiBook, color: '#0891b2', bg: 'rgba(6,182,212,0.15)', change: '+5' },
        { label: 'Monthly Revenue', value: `₹${(adminStats.monthlyRevenue / 100000).toFixed(1)}L`, icon: FiDollarSign, color: '#047857', bg: 'rgba(16,185,129,0.15)', change: '+18%' },
    ];

    const recentEnrollments = enrollments.slice(0, 5);
    const recentCourses = courses.slice(0, 4);

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: '0.375rem' }}>Admin Dashboard</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Welcome back! Here's what's happening on your platform.</p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                {stats.map((s, i) => (
                    <div key={i} className="stat-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>{s.label}</p>
                                <p style={{ color: 'var(--text)', fontWeight: 800, fontSize: '2rem', fontFamily: 'var(--font-display)' }}>{s.value}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.375rem' }}>
                                    <FiTrendingUp size={13} style={{ color: '#047857' }} />
                                    <span style={{ color: '#047857', fontSize: '0.78rem', fontWeight: 600 }}>{s.change} this month</span>
                                </div>
                            </div>
                            <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <s.icon size={24} style={{ color: s.color }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid">
                {/* Recent Enrollments */}
                <div style={{ background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)', overflow: 'hidden' }}>
                    <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1rem', fontFamily: 'var(--font-display)' }}>Recent Enrollments</h3>
                        <Link to="/admin/enrollments" style={{ color: 'var(--primary-dark)', fontSize: '0.8rem', textDecoration: 'none' }}>View All</Link>
                    </div>
                    <div style={{ padding: '0.5rem 0' }}>
                        {recentEnrollments.map(e => (
                            <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
                                    {e.studentName[0]}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ color: 'var(--text)', fontSize: '0.85rem', fontWeight: 500 }}>{e.studentName}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.courseTitle}</div>
                                </div>
                                <div>
                                    <div className="progress-bar" style={{ width: '60px' }}>
                                        <div className="progress-fill" style={{ width: `${e.progress}%` }} />
                                    </div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', textAlign: 'right', marginTop: '2px' }}>{e.progress}%</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Courses Overview */}
                <div style={{ background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)', overflow: 'hidden' }}>
                    <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1rem', fontFamily: 'var(--font-display)' }}>Course Overview</h3>
                        <Link to="/admin/courses" style={{ color: 'var(--primary-dark)', fontSize: '0.8rem', textDecoration: 'none' }}>Manage</Link>
                    </div>
                    <div style={{ padding: '0.5rem 0' }}>
                        {recentCourses.map(c => (
                            <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
                                <div>
                                    <div style={{ color: 'var(--text)', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.2rem' }}>{c.title}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{c.students} students</div>
                                </div>
                                <span className={`badge ${c.isPublished ? 'badge-success' : 'badge-warning'}`}>
                                    {c.isPublished ? 'Published' : 'Draft'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div style={{ marginTop: '1.5rem', background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)', padding: '1.5rem' }}>
                <h3 style={{ color: 'var(--text)', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '1.25rem' }}>Quick Actions</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {[
                        ['/admin/add-teacher', '👩‍🏫 Add New Teacher'],
                        ['/admin/courses', '📚 Manage Courses'],
                        ['/admin/users', '👥 View All Users'],
                        ['/admin/enrollments', '📋 View Enrollments'],
                    ].map(([to, label]) => (
                        <Link key={to} to={to} style={{
                            padding: '0.625rem 1.25rem', borderRadius: '0.625rem',
                            background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
                            color: 'var(--primary-dark)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
                            transition: 'all 0.2s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; e.currentTarget.style.color = 'var(--text)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; e.currentTarget.style.color = '#a5b4fc'; }}
                        >{label}</Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
