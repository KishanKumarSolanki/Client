import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CourseCard from '../../components/CourseCard';
import { courses, testimonials, adminStats } from '../../data/mockData';
import { FiArrowRight, FiPlay, FiStar, FiUsers, FiBook, FiAward, FiCheckCircle, FiTrendingUp, FiMonitor, FiBriefcase } from 'react-icons/fi';

const stats = [
    { label: 'Students Enrolled', value: '50K+', icon: FiUsers, color: 'var(--primary-dark)' },
    { label: 'Expert Instructors', value: '200+', icon: FiAward, color: '#7c3aed' },
    { label: 'Online Courses', value: '500+', icon: FiBook, color: '#0891b2' },
    { label: 'Satisfaction Rate', value: '98%', icon: FiStar, color: '#047857' },
];

const features = [
    { icon: FiMonitor, title: 'Learn at Your Pace', desc: 'Access course content anytime, anywhere. Learn on your schedule.' },
    { icon: FiAward, title: 'Expert Instructors', desc: 'Learn from industry professionals with real-world experience.' },
    { icon: FiTrendingUp, title: 'Track Progress', desc: 'Monitor your learning journey with detailed progress analytics.' },
    { icon: FiBriefcase, title: 'Career Support', desc: 'Get job placement assistance and career guidance after completion.' },
];

const howItWorks = [
    { step: '01', title: 'Create Account', desc: 'Sign up for free and complete your profile in minutes.' },
    { step: '02', title: 'Browse Courses', desc: 'Explore hundreds of courses across various categories.' },
    { step: '03', title: 'Enroll & Learn', desc: 'Enroll in your chosen course and start learning immediately.' },
    { step: '04', title: 'Get Certified', desc: 'Complete the course and earn your certificate of completion.' },
];

export default function Home() {
    const [count, setCount] = useState({ students: 0, instructors: 0, courses: 0, rate: 0 });
    const featured = courses.filter(c => c.isPublished).slice(0, 3);

    useEffect(() => {
        const targets = { students: 50000, instructors: 200, courses: 500, rate: 98 };
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            setCount({
                students: Math.floor(targets.students * progress),
                instructors: Math.floor(targets.instructors * progress),
                courses: Math.floor(targets.courses * progress),
                rate: Math.floor(targets.rate * progress),
            });
            if (step >= steps) clearInterval(timer);
        }, interval);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <Navbar />

            {/* ─── HERO ─── */}
            <section className="hero">
                <div style={{ position: 'absolute', top: '-8%', left: '-6%', width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 68%)', filter: 'blur(20px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '10%', right: '-8%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 68%)', filter: 'blur(20px)', pointerEvents: 'none' }} />

                <div className="hero-grid">
                    <div>
                        <div className="badge badge-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
                            <FiStar size={13} /> India's #1 online learning platform
                        </div>

                        <h1 style={{ fontSize: 'clamp(2.3rem, 4.6vw, 3.6rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
                            Learn skills that
                            <br />
                            <span className="gradient-text">shape your future</span>
                        </h1>

                        <p style={{ fontSize: '1.15rem', color: 'var(--text-2)', maxWidth: 520, lineHeight: 1.75, marginBottom: '2.25rem' }}>
                            Access world-class courses taught by industry experts. Build real-world skills, earn certificates, and advance your career.
                        </p>

                        <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                            <Link to="/courses" className="btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
                                Explore courses <FiArrowRight />
                            </Link>
                            <Link to="/login" className="btn-outline" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
                                <FiPlay size={16} /> Watch demo
                            </Link>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                            <div style={{ display: 'flex' }}>
                                {['R', 'P', 'A', 'S'].map((l, i) => (
                                    <span key={l} style={{
                                        width: 36, height: 36, borderRadius: '50%', marginLeft: i ? -10 : 0, border: '2px solid var(--bg)',
                                        background: ['#6366f1', '#8b5cf6', '#0891b2', '#059669'][i], color: '#fff', fontWeight: 700, fontSize: '0.8rem',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>{l}</span>
                                ))}
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <strong style={{ color: 'var(--text)' }}>50,000+</strong> learners already on board
                            </p>
                        </div>
                    </div>

                    {/* Product preview */}
                    <div className="hero-visual" aria-hidden="true">
                        <div style={{ position: 'absolute', inset: '6% 4% 4% 10%', borderRadius: '2rem', background: 'linear-gradient(135deg, #c7d2fe 0%, #ddd6fe 55%, #bae6fd 100%)', transform: 'rotate(4deg)' }} />

                        <div style={{ position: 'absolute', top: '11%', left: '6%', right: '10%', background: 'var(--surface)', borderRadius: '1.25rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                                <span className="brand-mark" style={{ width: 44, height: 44, borderRadius: 12 }}><FiBook size={20} /></span>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Complete React Development</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Lesson 6 of 8 · Dr. Sarah Khan</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                <span>Your progress</span><strong style={{ color: 'var(--text)' }}>65%</strong>
                            </div>
                            <div className="progress-bar" style={{ height: 8, marginBottom: '1.25rem' }}><div className="progress-fill" style={{ width: '65%' }} /></div>

                            {[['Hooks deep dive', 'done'], ['Context API', 'done'], ['React Router', 'now'], ['Performance optimization', 'next']].map(([t, st]) => (
                                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.55rem 0.7rem', borderRadius: '0.6rem', marginBottom: '0.3rem', background: st === 'now' ? 'var(--primary-soft)' : 'transparent', fontSize: '0.88rem', fontWeight: st === 'now' ? 600 : 500, color: st === 'next' ? 'var(--text-muted)' : 'var(--text)' }}>
                                    {st === 'done'
                                        ? <FiCheckCircle size={17} style={{ color: '#059669' }} />
                                        : st === 'now'
                                            ? <FiPlay size={17} style={{ color: 'var(--primary-dark)' }} />
                                            : <span style={{ width: 17, height: 17, borderRadius: '50%', border: '2px solid var(--border-strong)', boxSizing: 'border-box' }} />}
                                    {t}
                                </div>
                            ))}
                        </div>

                        <div className="animate-float" style={{ position: 'absolute', top: '1%', right: '0%', background: 'var(--surface)', borderRadius: '9999px', padding: '0.55rem 1rem', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                            <FiStar size={15} style={{ color: '#f59e0b', fill: '#f59e0b' }} /> 4.8 average rating
                        </div>
                        <div className="animate-float" style={{ position: 'absolute', bottom: '3%', left: '0%', animationDelay: '-3s', background: 'var(--surface)', borderRadius: '9999px', padding: '0.55rem 1rem', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                            <FiAward size={15} style={{ color: '#7c3aed' }} /> Certificate on completion
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="stats-strip">
                    {[
                        { val: `${count.students.toLocaleString()}+`, label: 'Students' },
                        { val: `${count.instructors}+`, label: 'Instructors' },
                        { val: `${count.courses}+`, label: 'Courses' },
                        { val: `${count.rate}%`, label: 'Satisfaction' },
                    ].map(st => (
                        <div key={st.label}>
                            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)', lineHeight: 1.2 }}>{st.val}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.2rem' }}>{st.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── FEATURES ─── */}
            <section style={{ padding: '5rem 1.5rem', background: 'var(--surface)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ color: 'var(--primary-dark)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem' }}>Why Choose Us</p>
                    <h2 className="section-title" style={{ color: 'var(--text)', marginBottom: '1rem' }}>Everything You Need to Succeed</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 4rem', lineHeight: 1.7 }}>We provide all the tools and resources you need to achieve your learning goals.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        {features.map((f, i) => (
                            <div key={i} className="stat-card" style={{ textAlign: 'left' }}>
                                <div style={{
                                    width: '52px', height: '52px', borderRadius: '12px', marginBottom: '1.25rem',
                                    background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <f.icon size={24} style={{ color: 'var(--primary-dark)' }} />
                                </div>
                                <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.625rem', fontFamily: 'var(--font-display)' }}>{f.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FEATURED COURSES ─── */}
            <section style={{ padding: '5rem 1.5rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
                        <div>
                            <p style={{ color: 'var(--primary-dark)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Top Picks</p>
                            <h2 className="section-title" style={{ color: 'var(--text)' }}>Featured Courses</h2>
                        </div>
                        <Link to="/courses" className="btn-outline">View All Courses <FiArrowRight /></Link>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {featured.map(c => <CourseCard key={c.id} course={c} />)}
                    </div>
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section style={{ padding: '5rem 1.5rem', background: 'var(--surface)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ color: 'var(--primary-dark)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem' }}>Simple Process</p>
                    <h2 className="section-title" style={{ color: 'var(--text)', marginBottom: '4rem' }}>How It Works</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
                        {howItWorks.map((s, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '72px', height: '72px', borderRadius: '50%', margin: '0 auto 1.25rem',
                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.5rem', fontWeight: 800, color: 'white', fontFamily: 'var(--font-display)',
                                }}>{s.step}</div>
                                <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>{s.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── TESTIMONIALS ─── */}
            <section style={{ padding: '5rem 1.5rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ color: 'var(--primary-dark)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem' }}>Success Stories</p>
                    <h2 className="section-title" style={{ color: 'var(--text)', marginBottom: '3rem' }}>What Our Students Say</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {testimonials.map(t => (
                            <div key={t.id} className="stat-card" style={{ textAlign: 'left' }}>
                                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                                    {Array.from({ length: t.rating }).map((_, i) => <FiStar key={i} size={16} style={{ color: '#d97706', fill: '#f59e0b' }} />)}
                                </div>
                                <p style={{ color: 'var(--text-2)', fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '1.25rem', fontStyle: 'italic' }}>"{t.text}"</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white' }}>{t.avatar}</div>
                                    <div>
                                        <div style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section style={{ padding: '3rem 1.5rem 5rem' }}>
                <div style={{
                    maxWidth: 1100, margin: '0 auto', textAlign: 'center', position: 'relative', overflow: 'hidden',
                    background: 'linear-gradient(135deg, #3730a3 0%, #4f46e5 45%, #7c3aed 100%)',
                    borderRadius: '1.75rem', padding: '4.5rem 2rem', boxShadow: '0 24px 60px rgba(79,70,229,0.28)',
                }}>
                    <div style={{ position: 'absolute', top: -120, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.18), transparent 68%)' }} />
                    <div style={{ position: 'absolute', bottom: -140, left: -80, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.3), transparent 68%)' }} />
                    <div style={{ position: 'relative' }}>
                        <h2 className="section-title" style={{ color: '#fff', marginBottom: '1rem' }}>Ready to start learning?</h2>
                        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', marginBottom: '2.25rem', lineHeight: 1.7 }}>
                            Join 50,000+ students already learning on LearnPro. Start for free today.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/login?tab=register" className="btn-outline" style={{ padding: '0.85rem 2.25rem', fontSize: '1rem', background: '#fff', color: '#4338ca', border: 'none' }}>
                                Get started free <FiArrowRight />
                            </Link>
                            <Link to="/courses" className="btn-outline" style={{ padding: '0.85rem 2.25rem', fontSize: '1rem', background: 'rgba(255,255,255,0.12)', color: '#fff', borderColor: 'rgba(255,255,255,0.4)', boxShadow: 'none' }}>
                                Browse courses
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
