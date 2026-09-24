import { useState } from 'react';
import { FiUserPlus, FiCheckCircle, FiMail, FiUser, FiBook, FiPhone } from 'react-icons/fi';

export default function AddTeacher() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', bio: '', password: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1000));
        setSubmitted(true);
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: '700px' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: '0.375rem' }}>Add New Teacher</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Onboard a new instructor to the LearnPro platform.</p>
            </div>

            {submitted ? (
                <div style={{ background: 'var(--card)', borderRadius: '1.25rem', border: '1px solid rgba(16,185,129,0.3)', padding: '4rem 2rem', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <FiCheckCircle size={40} style={{ color: '#047857' }} />
                    </div>
                    <h3 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.75rem', fontFamily: 'var(--font-display)' }}>Teacher Added Successfully!</h3>
                    <p style={{ color: 'var(--text-2)', marginBottom: '0.5rem' }}>An invitation email has been sent to:</p>
                    <p style={{ color: '#047857', fontWeight: 600, marginBottom: '2rem' }}>{form.email}</p>
                    <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', bio: '', password: '' }); }}
                        className="btn-primary">Add Another Teacher</button>
                </div>
            ) : (
                <div style={{ background: 'var(--card)', borderRadius: '1.25rem', border: '1px solid var(--border)', padding: '2.5rem' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid" style={{ marginBottom: '1.25rem' }}>
                            <div>
                                <label style={{ display: 'block', color: 'var(--text-2)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                                    <FiUser size={13} style={{ marginRight: '0.25rem' }} />Full Name *
                                </label>
                                <input className="form-input" type="text" placeholder="Dr. John Smith" value={form.name}
                                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: 'var(--text-2)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                                    <FiMail size={13} style={{ marginRight: '0.25rem' }} />Email Address *
                                </label>
                                <input className="form-input" type="email" placeholder="teacher@learnpro.com" value={form.email}
                                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
                            </div>
                        </div>

                        <div className="form-grid" style={{ marginBottom: '1.25rem' }}>
                            <div>
                                <label style={{ display: 'block', color: 'var(--text-2)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                                    <FiPhone size={13} style={{ marginRight: '0.25rem' }} />Phone Number
                                </label>
                                <input className="form-input" type="tel" placeholder="+91 98765 43210" value={form.phone}
                                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: 'var(--text-2)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                                    <FiBook size={13} style={{ marginRight: '0.25rem' }} />Subject / Expertise *
                                </label>
                                <select className="form-input" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} required>
                                    <option value="">Select subject area</option>
                                    <option>Web Development</option>
                                    <option>Data Science</option>
                                    <option>Machine Learning</option>
                                    <option>UI/UX Design</option>
                                    <option>Backend Development</option>
                                    <option>DevOps & Cloud</option>
                                    <option>Mobile Development</option>
                                    <option>Cybersecurity</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', color: 'var(--text-2)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>Bio / Introduction</label>
                            <textarea className="form-input" rows={4} placeholder="Brief professional bio of the instructor..." value={form.bio}
                                onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} style={{ resize: 'vertical' }} />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', color: 'var(--text-2)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>Temporary Password *</label>
                            <input className="form-input" type="password" placeholder="Set a temporary password" value={form.password}
                                onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required />
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.375rem' }}>The teacher will be asked to change this on first login.</p>
                        </div>

                        <div className="form-actions">
                            <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '0.875rem' }}>
                                {loading ? 'Adding Teacher...' : <><FiUserPlus size={16} /> Add Teacher</>}
                            </button>
                            <button type="button" className="btn-outline" onClick={() => setForm({ name: '', email: '', phone: '', subject: '', bio: '', password: '' })}>
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
