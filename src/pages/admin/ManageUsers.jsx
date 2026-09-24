import { useState } from 'react';
import { students, teachers } from '../../data/mockData';
import { FiSearch, FiUsers, FiUserCheck, FiMail, FiCalendar } from 'react-icons/fi';

export default function ManageUsers() {
    const [tab, setTab] = useState('students');
    const [search, setSearch] = useState('');

    const list = tab === 'students' ? students : teachers;
    const filtered = list.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: '0.375rem' }}>Manage Users</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>View and manage all students and teachers on the platform.</p>
            </div>

            {/* Tabs + Search */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '0.75rem', padding: '4px' }}>
                    {[['students', FiUsers, `Students (${students.length})`], ['teachers', FiUserCheck, `Teachers (${teachers.length})`]].map(([val, Icon, label]) => (
                        <button key={val} onClick={() => setTab(val)} style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.6rem', border: 'none', cursor: 'pointer',
                            background: tab === val ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
                            color: tab === val ? 'white' : 'var(--text-2)', fontWeight: 600, fontSize: '0.875rem',
                        }}>
                            <Icon size={15} /> {label}
                        </button>
                    ))}
                </div>
                <div style={{ position: 'relative' }}>
                    <FiSearch size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input className="form-input" style={{ paddingLeft: '2.25rem', width: '260px' }} placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>

            {/* Table */}
            <div className="table-wrap" style={{ background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)', overflow: 'hidden' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            {tab === 'students' ? <th>Enrolled Courses</th> : <th>Subject</th>}
                            {tab === 'teachers' && <th>Total Students</th>}
                            <th>Joined</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No users found</td></tr>
                        ) : filtered.map(u => (
                            <tr key={u.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.8rem' }}>{u.avatar}</div>
                                        <span style={{ color: 'var(--text)', fontWeight: 500 }}>{u.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <span style={{ color: 'var(--text-2)', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem' }}>
                                        <FiMail size={13} /> {u.email}
                                    </span>
                                </td>
                                {tab === 'students' ? (
                                    <td><span className="badge badge-primary">{u.enrolledCourses.length} courses</span></td>
                                ) : (
                                    <td><span style={{ color: 'var(--text-2)', fontSize: '0.875rem' }}>{u.subject}</span></td>
                                )}
                                {tab === 'teachers' && (
                                    <td><span style={{ color: 'var(--text-2)', fontSize: '0.875rem' }}>{u.students?.toLocaleString()}</span></td>
                                )}
                                <td>
                                    <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem' }}>
                                        <FiCalendar size={12} /> {u.joinedAt}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button style={{ padding: '0.3rem 0.75rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', background: 'rgba(99,102,241,0.15)', color: 'var(--primary-dark)', fontSize: '0.75rem', fontWeight: 600 }}>View</button>
                                        <button style={{ padding: '0.3rem 0.75rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', background: 'rgba(239,68,68,0.1)', color: '#dc2626', fontSize: '0.75rem', fontWeight: 600 }}>Remove</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
