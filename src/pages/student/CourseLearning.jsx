import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiCheck, FiCheckCircle, FiPlay } from 'react-icons/fi';
import { courses } from '../../data/mockData';
import { useStudent } from '../../context/StudentContext';

export default function CourseLearning() {
    const { id } = useParams();
    const course = courses.find(c => c.id === Number(id));
    const { isEnrolled, getCompleted, getProgress, toggleLesson } = useStudent();
    const [active, setActive] = useState(null);

    if (!course) {
        return (
            <div className="empty-state">
                <h3 style={{ marginBottom: '0.5rem' }}>Course not found</h3>
                <p style={{ marginBottom: '1.5rem' }}>This course does not exist or was removed.</p>
                <Link to="/student/enrolled" className="btn-primary">Back to my courses</Link>
            </div>
        );
    }

    if (!isEnrolled(course.id)) {
        return (
            <div className="empty-state">
                <h3 style={{ marginBottom: '0.5rem' }}>You are not enrolled in {course.title}</h3>
                <p style={{ marginBottom: '1.5rem' }}>Enroll first to unlock the lessons.</p>
                <Link to="/student/browse" className="btn-primary">Browse courses</Link>
            </div>
        );
    }

    const lessons = course.syllabus;
    const done = getCompleted(course.id);
    const pct = getProgress(course.id);

    // Default to the first lesson that is not finished yet
    const firstOpen = lessons.findIndex((_, i) => !done.includes(i));
    const current = active ?? (firstOpen === -1 ? 0 : firstOpen);
    const isDone = done.includes(current);


    return (
        <div>
            <Link to="/student/enrolled" className="btn-ghost" style={{ marginLeft: '-0.9rem', marginBottom: '0.5rem' }}>
                <FiArrowLeft size={15} /> My courses
            </Link>
            <div style={{ marginBottom: '1.5rem' }}>
                <h1 className="page-title">{course.title}</h1>
                <p className="page-sub">by {course.teacher}</p>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                {/* Player */}
                <section style={{ flex: '1 1 520px', minWidth: 0 }}>
                    <div style={{
                        aspectRatio: '16 / 9', borderRadius: '1rem', overflow: 'hidden', position: 'relative',
                        background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 60%, #0891b2 130%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)',
                    }}>
                        <div style={{ textAlign: 'center', color: '#fff', padding: '1.5rem' }}>
                            <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                                <FiPlay size={26} style={{ marginLeft: 3 }} />
                            </div>
                            <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.25rem' }}>Lesson {current + 1} of {lessons.length}</div>
                            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.1rem, 2.4vw, 1.5rem)', color: '#fff' }}>{lessons[current]}</div>
                        </div>
                    </div>

                    <div className="panel" style={{ marginTop: '1.25rem', padding: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{lessons[current]}</h2>
                        <p style={{ color: 'var(--text-2)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                            In this lesson you will work through “{lessons[current]}” from {course.title}. Mark it complete when you are done to update your progress.
                        </p>
                        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
                            <button className="btn-outline" onClick={() => setActive(current - 1)} disabled={current === 0} style={current === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}>
                                <FiArrowLeft size={15} /> Previous
                            </button>
                            <button className={isDone ? 'btn-outline' : 'btn-primary'} onClick={() => toggleLesson(course.id, current)} style={isDone ? { color: '#047857' } : undefined}>
                                <FiCheck size={15} /> {isDone ? 'Completed' : 'Mark as complete'}
                            </button>
                            <button className="btn-outline" onClick={() => setActive(current + 1)} disabled={current === lessons.length - 1} style={current === lessons.length - 1 ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}>
                                Next <FiArrowRight size={15} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Lesson list */}
                <aside className="panel" style={{ flex: '0 1 340px', width: '100%', minWidth: 280 }}>
                    <div style={{ padding: '1.1rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Course content</h3>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{done.length}/{lessons.length} done</span>
                        </div>
                        <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.4rem' }}>{pct}% complete</div>
                    </div>
                    <ul style={{ listStyle: 'none', padding: '0.5rem' }}>
                        {lessons.map((title, i) => {
                            const finished = done.includes(i);
                            const selected = i === current;
                            return (
                                <li key={title}>
                                    <button
                                        onClick={() => setActive(i)}
                                        aria-current={selected ? 'true' : undefined}
                                        style={{
                                            width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left',
                                            padding: '0.7rem 0.75rem', borderRadius: '0.65rem', border: 'none', cursor: 'pointer',
                                            background: selected ? 'var(--primary-soft)' : 'transparent',
                                            color: selected ? 'var(--primary-dark)' : 'var(--text)',
                                            fontWeight: selected ? 600 : 500, fontSize: '0.88rem',
                                        }}
                                    >
                                        {finished
                                            ? <FiCheckCircle size={18} style={{ color: '#059669', flexShrink: 0 }} />
                                            : <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--border-strong)', flexShrink: 0, boxSizing: 'border-box' }} />}
                                        <span style={{ flex: 1 }}>{i + 1}. {title}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </aside>
            </div>
        </div>
    );
}
