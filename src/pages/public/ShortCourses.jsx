import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CourseCard from '../../components/CourseCard';
import { courses } from '../../data/mockData';
import { FiZap, FiSearch, FiClock } from 'react-icons/fi';

export default function ShortCourses() {
    const [search, setSearch] = useState('');
    const shortCourses = courses.filter(c => c.isShort && c.isPublished);
    const filtered = shortCourses.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <Navbar />

            {/* Hero */}
            <section style={{ padding: '7rem 1.5rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 60%)' }} />
                <div style={{ maxWidth: '650px', margin: '0 auto', position: 'relative' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '9999px', padding: '0.5rem 1.25rem', marginBottom: '1.5rem', color: '#0e7490', fontSize: '0.85rem', fontWeight: 600 }}>
                        <FiZap size={14} /> Quick & Focused Learning
                    </div>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text)', marginBottom: '1rem' }}>
                        Short Courses — <span style={{ color: '#0891b2' }}>Learn Fast</span>
                    </h1>
                    <p style={{ color: 'var(--text-2)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                        Master in-demand skills in hours, not months. Perfect for busy professionals and focused learners.
                    </p>

                    {/* Benefits */}
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                        {[
                            ['⚡', 'under 10 hours'],
                            ['🎯', 'Highly focused'],
                            ['💡', 'Skill-specific'],
                            ['🏆', 'Certificate'],
                        ].map(([icon, t]) => (
                            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-2)', fontSize: '0.85rem' }}>
                                <span>{icon}</span> {t}
                            </div>
                        ))}
                    </div>

                    <div style={{ position: 'relative', maxWidth: '460px', margin: '0 auto' }}>
                        <FiSearch size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input className="form-input" style={{ paddingLeft: '2.75rem' }} placeholder="Search short courses..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                </div>
            </section>

            {/* Stats Banner */}
            <section style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'rgba(6,182,212,0.04)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem' }}>
                    {[
                        [FiClock, `${shortCourses.length} Short Courses`, 'All under 10 hours'],
                        [FiZap, 'Avg 5 hours', 'To complete a course'],
                        ['🎓', '4,500+ Students', 'Enrolled this month'],
                    ].map(([Icon, main, sub], i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '0.25rem' }}>
                                {typeof Icon === 'string' ? <span style={{ fontSize: '1.1rem' }}>{Icon}</span> : <Icon size={18} style={{ color: '#0891b2' }} />}
                                <span style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1rem' }}>{main}</span>
                            </div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{sub}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Courses Grid */}
            <section style={{ padding: '3rem 1.5rem 6rem' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
                        Showing <strong style={{ color: '#0891b2' }}>{filtered.length}</strong> short course{filtered.length !== 1 ? 's' : ''}
                    </p>
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚡</div>
                            <h3 style={{ color: 'var(--text-2)', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>No short courses found</h3>
                            <p>Try a different search term</p>
                        </div>
                    ) : (
                        <div className="course-grid">
                            {filtered.map(c => <CourseCard key={c.id} course={c} />)}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
