import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiRefreshCw, FiSearch } from 'react-icons/fi';
import { useStudent } from '../../context/StudentContext';

const tabs = [
    { key: 'all', label: 'All' },
    { key: 'progress', label: 'In progress' },
    { key: 'done', label: 'Completed' },
];

export default function EnrolledCourses() {
    const { enrolledCourses, getProgress, getCompleted } = useStudent();
    const [tab, setTab] = useState('all');

    const items = enrolledCourses.map(c => ({ ...c, pct: getProgress(c.id), done: getCompleted(c.id).length }));
    const counts = {
        all: items.length,
        progress: items.filter(c => c.pct < 100).length,
        done: items.filter(c => c.pct === 100).length,
    };
    const visible = items.filter(c => tab === 'all' || (tab === 'progress' ? c.pct < 100 : c.pct === 100));

    return (
        <div>
            <div style={{ marginBottom: '1.5rem' }}>
                <h1 className="page-title">My Courses</h1>
                <p className="page-sub">Everything you are enrolled in, with your progress.</p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
                {tabs.map(t => (
                    <button key={t.key} onClick={() => setTab(t.key)} className={`chip${tab === t.key ? ' active' : ''}`}>
                        {t.label} <span style={{ opacity: 0.75, marginLeft: 4 }}>{counts[t.key]}</span>
                    </button>
                ))}
            </div>

            {visible.length === 0 ? (
                <div className="empty-state">
                    <h3 style={{ marginBottom: '0.5rem' }}>{items.length === 0 ? 'No courses yet' : 'Nothing here yet'}</h3>
                    <p style={{ marginBottom: '1.5rem' }}>
                        {items.length === 0 ? 'Enroll in a course to start learning.' : 'Courses will show up here as your progress changes.'}
                    </p>
                    <Link to="/student/browse" className="btn-primary"><FiSearch size={15} /> Browse courses</Link>
                </div>
            ) : (
                <div className="course-grid">
                    {visible.map(c => (
                        <article key={c.id} className="course-card">
                            <Link to={`/student/learn/${c.id}`} className="course-thumb" aria-label={`Open ${c.title}`}>
                                <img src={c.thumbnail} alt="" onError={e => { e.currentTarget.style.display = 'none'; }} />
                                {c.pct === 100 && <span className="badge badge-success" style={{ position: 'absolute', top: '0.7rem', left: '0.7rem' }}>Completed</span>}
                            </Link>
                            <div style={{ padding: '1.1rem 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '0.3rem' }}>{c.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', marginBottom: '1rem' }}>by {c.teacher}</p>

                                <div className="progress-bar" style={{ marginBottom: '0.5rem' }}>
                                    <div className="progress-fill" style={{ width: `${c.pct}%` }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.1rem' }}>
                                    <span>{c.done} of {c.syllabus.length} lessons</span>
                                    <span style={{ fontWeight: 600, color: 'var(--text)' }}>{c.pct}%</span>
                                </div>

                                <Link to={`/student/learn/${c.id}`} className={c.pct === 100 ? 'btn-outline' : 'btn-primary'} style={{ marginTop: 'auto' }}>
                                    {c.pct === 100 ? <><FiRefreshCw size={14} /> Review course</> : <><FiPlay size={14} /> {c.pct === 0 ? 'Start learning' : 'Continue'}</>}
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
