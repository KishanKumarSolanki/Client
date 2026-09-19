import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { teamMembers } from '../../data/mockData';
import { FiTarget, FiHeart, FiZap, FiUsers, FiBook, FiGlobe, FiAward } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const values = [
    { icon: FiTarget, title: 'Mission-Driven', desc: 'We believe quality education should be accessible to everyone, regardless of background.' },
    { icon: FiHeart, title: 'Student-First', desc: 'Every decision we make is centered around the success and well-being of our learners.' },
    { icon: FiZap, title: 'Innovation', desc: 'We continuously evolve our platform to provide the best learning experience possible.' },
    { icon: FiGlobe, title: 'Global Community', desc: 'Connect with learners and instructors from across India and around the world.' },
];

const milestones = [
    { year: '2020', event: 'LearnPro founded in Mumbai with 10 courses' },
    { year: '2021', event: 'Reached 10,000 students and 50 courses' },
    { year: '2022', event: 'Expanded to 25 cities with corporate partnerships' },
    { year: '2023', event: '50,000 students and 200+ expert instructors' },
    { year: '2024', event: 'Launched mobile app and international expansion' },
];

export default function About() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <Navbar />

            {/* Hero */}
            <section style={{ padding: '8rem 1.5rem 5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(99,102,241,0.1) 0%, transparent 60%)' }} />
                <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
                    <p style={{ color: 'var(--primary-dark)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem' }}>About LearnPro</p>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
                        Empowering <span className="gradient-text">Millions of Learners</span> Across India
                    </h1>
                    <p style={{ color: 'var(--text-2)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                        LearnPro was founded with a single mission: to make world-class education accessible to every person in India. We connect passionate learners with expert instructors to create transformative learning experiences.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section style={{ padding: '0 1.5rem 5rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { icon: FiUsers, val: '50,000+', label: 'Active Students', color: 'var(--primary-dark)' },
                            { icon: FiAward, val: '200+', label: 'Expert Instructors', color: '#7c3aed' },
                            { icon: FiBook, val: '500+', label: 'Total Courses', color: '#0891b2' },
                            { icon: FiGlobe, val: '25+', label: 'Cities Served', color: '#047857' },
                        ].map((s, i) => (
                            <div key={i} className="stat-card" style={{ textAlign: 'center' }}>
                                <div style={{ width: '52px', height: '52px', borderRadius: '12px', margin: '0 auto 1rem', background: `color-mix(in srgb, ${s.color} 14%, transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <s.icon size={24} style={{ color: s.color }} />
                                </div>
                                <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color, fontFamily: 'var(--font-display)' }}>{s.val}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section style={{ padding: '5rem 1.5rem', background: 'var(--surface)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ color: 'var(--primary-dark)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem' }}>Our Values</p>
                    <h2 className="section-title" style={{ color: 'var(--text)', marginBottom: '3rem' }}>What We Stand For</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        {values.map((v, i) => (
                            <div key={i} className="stat-card" style={{ textAlign: 'left' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', marginBottom: '1rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <v.icon size={22} style={{ color: 'var(--primary-dark)' }} />
                                </div>
                                <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>{v.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section style={{ padding: '5rem 1.5rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ color: 'var(--primary-dark)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem' }}>Our People</p>
                    <h2 className="section-title" style={{ color: 'var(--text)', marginBottom: '3rem' }}>Meet the Team</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                        {teamMembers.map((m, i) => (
                            <div key={i} className="stat-card" style={{ textAlign: 'center' }}>
                                <div style={{ width: '72px', height: '72px', borderRadius: '50%', margin: '0 auto 1rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>{m.avatar}</div>
                                <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>{m.name}</h3>
                                <p style={{ color: 'var(--primary-dark)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>{m.role}</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{m.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section style={{ padding: '5rem 1.5rem', background: 'var(--surface)' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p style={{ color: 'var(--primary-dark)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem' }}>Our Journey</p>
                        <h2 className="section-title" style={{ color: 'var(--text)' }}>Company Milestones</h2>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '100px', top: 0, bottom: 0, width: '2px', background: 'rgba(99,102,241,0.2)' }} />
                        {milestones.map((m, i) => (
                            <div key={i} style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', marginBottom: '2rem', paddingLeft: '0' }}>
                                <div style={{ minWidth: '80px', textAlign: 'right' }}>
                                    <span style={{ color: 'var(--primary-dark)', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{m.year}</span>
                                </div>
                                <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                                    <div style={{ position: 'absolute', left: '-25px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: '#6366f1', border: '2px solid var(--bg)', boxShadow: 'var(--shadow-lg)' }} />
                                    <p style={{ color: 'var(--text-2)', fontSize: '0.925rem', lineHeight: 1.6 }}>{m.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', background: 'linear-gradient(135deg, #3730a3 0%, #4f46e5 45%, #7c3aed 100%)', borderRadius: '1.75rem', padding: '4rem 2rem', boxShadow: '0 24px 60px rgba(79,70,229,0.25)' }}>
                    <h2 className="section-title" style={{ color: '#fff', marginBottom: '1rem' }}>Join Our Community</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', lineHeight: 1.7 }}>Be part of India's fastest-growing learning community.</p>
                    <Link to="/login?tab=register" className="btn-outline" style={{ padding: '0.875rem 2.5rem', fontSize: '1rem', background: '#fff', color: '#4338ca', border: 'none' }}>Start learning today</Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
