import { useState } from 'react';
import { courses as initialCourses } from '../../data/mockData';
import { FiSearch, FiEye, FiEyeOff, FiTrash2, FiEdit2 } from 'react-icons/fi';

export default function ManageCourses() {
    const [courseList, setCourseList] = useState(initialCourses);
    const [search, setSearch] = useState('');

    const filtered = courseList.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) || c.teacher.toLowerCase().includes(search.toLowerCase())
    );

    const togglePublish = (id) => {
        setCourseList(prev => prev.map(c => c.id === id ? { ...c, isPublished: !c.isPublished } : c));
    };

    const deleteCourse = (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            setCourseList(prev => prev.filter(c => c.id !== id));
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: '0.375rem' }}>Manage Courses</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Review, publish/unpublish, and manage all platform courses.</p>
            </div>

            {/* Summary */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {[
                    { label: 'Total', val: courseList.length, color: 'var(--primary-dark)' },
                    { label: 'Published', val: courseList.filter(c => c.isPublished).length, color: '#047857' },
                    { label: 'Drafts', val: courseList.filter(c => !c.isPublished).length, color: '#d97706' },
                ].map(s => (
                    <div key={s.label} style={{ padding: '0.75rem 1.25rem', background: 'var(--card)', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{s.label}: </span>
                        <span style={{ color: s.color, fontWeight: 700, fontSize: '1rem' }}>{s.val}</span>
                    </div>
                ))}
                <div style={{ position: 'relative', marginLeft: 'auto' }}>
                    <FiSearch size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input className="form-input" style={{ paddingLeft: '2.25rem', width: '250px' }} placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>

            <div className="table-wrap" style={{ background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)', overflow: 'hidden' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Instructor</th>
                            <th>Category</th>
                            <th>Students</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(c => (
                            <tr key={c.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <img src={c.thumbnail} alt="" style={{ width: '48px', height: '32px', objectFit: 'cover', borderRadius: '0.375rem' }} onError={e => e.target.style.display = 'none'} />
                                        <div>
                                            <div style={{ color: 'var(--text)', fontWeight: 500, fontSize: '0.875rem' }}>{c.title}</div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{c.duration} · {c.level}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span style={{ color: 'var(--text-2)', fontSize: '0.875rem' }}>{c.teacher}</span></td>
                                <td><span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>{c.category}</span></td>
                                <td><span style={{ color: 'var(--text-2)', fontSize: '0.875rem' }}>{c.students.toLocaleString()}</span></td>
                                <td><span style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.875rem' }}>₹{c.price.toLocaleString()}</span></td>
                                <td>
                                    <span className={`badge ${c.isPublished ? 'badge-success' : 'badge-warning'}`}>
                                        {c.isPublished ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => togglePublish(c.id)} title={c.isPublished ? 'Unpublish' : 'Publish'} style={{
                                            width: '32px', height: '32px', borderRadius: '0.4rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            background: c.isPublished ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)',
                                            color: c.isPublished ? '#d97706' : '#047857',
                                        }}>
                                            {c.isPublished ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                                        </button>
                                        <button title="Edit" style={{ width: '32px', height: '32px', borderRadius: '0.4rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(99,102,241,0.15)', color: 'var(--primary-dark)' }}>
                                            <FiEdit2 size={15} />
                                        </button>
                                        <button onClick={() => deleteCourse(c.id)} title="Delete" style={{ width: '32px', height: '32px', borderRadius: '0.4rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239,68,68,0.1)', color: '#dc2626' }}>
                                            <FiTrash2 size={15} />
                                        </button>
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
