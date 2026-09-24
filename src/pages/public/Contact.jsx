import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiClock, FiMessageSquare } from 'react-icons/fi';

const contactInfo = [
    { icon: FiMapPin, label: 'Address', value: '123 Education Street, Andheri West, Mumbai - 400053' },
    { icon: FiPhone, label: 'Phone', value: '+91 98765 43210' },
    { icon: FiMail, label: 'Email', value: 'hello@learnpro.com' },
    { icon: FiClock, label: 'Support Hours', value: 'Mon-Fri, 9AM - 6PM IST' },
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        setSubmitted(true);
        setLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <Navbar />

            {/* Hero */}
            <section style={{ padding: '8rem 1.5rem 4rem', textAlign: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, rgba(99,102,241,0.08) 0%, transparent 60%)' }} />
                <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
                    <p style={{ color: 'var(--primary-dark)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem' }}>Get In Touch</p>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text)', marginBottom: '1rem' }}>
                        We'd Love to <span className="gradient-text">Hear From You</span>
                    </h1>
                    <p style={{ color: 'var(--text-2)', fontSize: '1rem', lineHeight: 1.7 }}>
                        Have a question, feedback, or need support? Our team is ready to help you.
                    </p>
                </div>
            </section>

            {/* Main */}
            <section style={{ padding: '2rem 1.5rem 6rem' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
                    {/* Contact Info */}
                    <div>
                        <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.5rem', fontFamily: 'var(--font-display)', marginBottom: '2rem' }}>Contact Information</h2>
                        {contactInfo.map((c, i) => (
                            <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', padding: '1.25rem', background: 'var(--surface)', borderRadius: '0.75rem', border: '1px solid var(--border)' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <c.icon size={20} style={{ color: 'var(--primary-dark)' }} />
                                </div>
                                <div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>{c.label}</div>
                                    <div style={{ color: 'var(--text)', fontSize: '0.9rem' }}>{c.value}</div>
                                </div>
                            </div>
                        ))}

                        {/* FAQ */}
                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))', borderRadius: '1rem', border: '1px solid rgba(99,102,241,0.2)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                <FiMessageSquare size={18} style={{ color: 'var(--primary-dark)' }} />
                                <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.95rem' }}>Quick FAQ</h3>
                            </div>
                            {[
                                ['How do I enroll in a course?', 'Create an account, browse courses, and click Enroll Now.'],
                                ['Are certificates provided?', 'Yes! You get a certificate upon course completion.'],
                                ['Can I get a refund?', 'We offer a 7-day money-back guarantee on all courses.'],
                            ].map(([q, a], i) => (
                                <div key={i} style={{ marginBottom: '0.875rem', paddingBottom: '0.875rem', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                                    <div style={{ color: 'var(--primary-dark)', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.25rem' }}>{q}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{a}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div style={{ background: 'var(--card)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '2.5rem' }}>
                        {submitted ? (
                            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                    <FiCheckCircle size={36} style={{ color: '#047857' }} />
                                </div>
                                <h3 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.75rem', fontFamily: 'var(--font-display)' }}>Message Sent!</h3>
                                <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="btn-outline">Send Another Message</button>
                            </div>
                        ) : (
                            <>
                                <h2 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.4rem', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>Send a Message</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>We typically respond within 2-4 business hours.</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-grid" style={{ marginBottom: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', color: 'var(--text-2)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>Full Name</label>
                                            <input className="form-input" type="text" placeholder="Your name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', color: 'var(--text-2)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email</label>
                                            <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={{ display: 'block', color: 'var(--text-2)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>Subject</label>
                                        <select className="form-input" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} required>
                                            <option value="">Select a subject</option>
                                            <option>General Inquiry</option>
                                            <option>Course Support</option>
                                            <option>Technical Issue</option>
                                            <option>Billing & Payments</option>
                                            <option>Become an Instructor</option>
                                            <option>Partnership</option>
                                        </select>
                                    </div>
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ display: 'block', color: 'var(--text-2)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>Message</label>
                                        <textarea className="form-input" rows={5} placeholder="Tell us how we can help..." value={form.message}
                                            onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required
                                            style={{ resize: 'vertical' }} />
                                    </div>
                                    <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '0.95rem' }}>
                                        {loading ? 'Sending...' : <><FiSend size={16} /> Send Message</>}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
