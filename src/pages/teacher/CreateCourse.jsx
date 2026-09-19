import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../../data/mockData';
import { FiSave, FiX, FiImage, FiBookOpen, FiTag } from 'react-icons/fi';

export default function CreateCourse() {
    const { id } = useParams();
    const navigate = useNavigate();
    const existing = id ? courses.find(c => c.id === parseInt(id)) : null;

    const [form, setForm] = useState({
        title: existing?.title || '',
        category: existing?.category || '',
        level: existing?.level || 'Beginner',
        duration: existing?.duration || '',
        price: existing?.price || '',
        description: existing?.description || '',
        thumbnail: existing?.thumbnail || '',
        isShort: existing?.isShort || false,
    });
    const [syllabus, setSyllabus] = useState(existing?.syllabus?.join('\n') || '');
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 900));
        setSaved(true);
        setLoading(false);
        setTimeout(() => navigate('/teacher/my-courses'), 1500);
    };

    return (
        <div style={{ maxWidth: '800px' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.75rem', fontFamily: 'var(--font-display)', marginBottom: '0.375rem' }}>
                    {existing ? 'Edit Course' : 'Create New Course'}
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Fill in the details to {existing ? 'update' : 'publish'} your course.</p>
            </div>

            {saved ? (
                <div style={{ background: 'var(--card)', borderRadius: '1.25rem', padding: '4rem 2rem', textAlign: 'center', border: '1px solid rgba(16,185,129,0.3)' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                    <h3 style={{ color: 'var(--text)', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>Course {existing ? 'Updated' : 'Created'} Successfully!</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Redirecting to My Courses...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={{ background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)', padding: '2rem', marginBottom: '1.5rem' }}>
                        <h3 style={{ color: 'var(--text)', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FiBookOpen size={18} style={{ color: '#7c3aed' }} /> Basic Information
                        </h3>
                        <div style={{ display: 'grid', gap: '1.25rem' }}>
                            <div>
                                <label style={{ display: 'block', color: 'var(--text-2)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>Course Title *</label>
                                <input className="form-input" type="text" placeholder="e.g. Complete React Development 2024" value={form.title} onChange={e => update('title', e.target.value)} required />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-2)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>Category *</label>
                                    <select className="form-input" value={form.category} onChange={e => update('category', e.target.value)} required>
                                        <option value="">Select category</option>
                                        {['Web Development', 'Data Science', 'Design', 'Backend', 'DevOps', 'Machine Learning', 'Mobile Development'].map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-2)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>Level *</label>
                                    <select className="form-input" value={form.level} onChange={e => update('level', e.target.value)}>
                                        {['Beginner', 'Intermediate', 'Advanced'].map(l => <option key={l}>{l}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-2)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>Duration</label>
                                    <input className="form-input" type="text" placeholder="e.g. 40 hours" value={form.duration} onChange={e => update('duration', e.target.value)} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-2)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>Price (₹) *</label>
                                    <input className="form-input" type="number" placeholder="e.g. 2499" value={form.price} onChange={e => update('price', e.target.value)} required min="0" />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', color: 'var(--text-2)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>Course Description *</label>
                                <textarea className="form-input" rows={4} placeholder="Describe what students will learn..." value={form.description} onChange={e => update('description', e.target.value)} required style={{ resize: 'vertical' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <input type="checkbox" id="isShort" checked={form.isShort} onChange={e => update('isShort', e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#8b5cf6' }} />
                                <label htmlFor="isShort" style={{ color: 'var(--text-2)', fontSize: '0.875rem' }}>This is a Short Course (under 10 hours)</label>
                            </div>
                        </div>
                    </div>

                    {/* Media */}
                    <div style={{ background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)', padding: '2rem', marginBottom: '1.5rem' }}>
                        <h3 style={{ color: 'var(--text)', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FiImage size={18} style={{ color: '#7c3aed' }} /> Thumbnail
                        </h3>
                        <input className="form-input" type="url" placeholder="https://images.unsplash.com/..." value={form.thumbnail} onChange={e => update('thumbnail', e.target.value)} />
                        {form.thumbnail && (
                            <div style={{ marginTop: '1rem' }}>
                                <img src={form.thumbnail} alt="Preview" style={{ width: '200px', height: '120px', objectFit: 'cover', borderRadius: '0.5rem' }} onError={e => e.target.style.display = 'none'} />
                            </div>
                        )}
                    </div>

                    {/* Syllabus */}
                    <div style={{ background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)', padding: '2rem', marginBottom: '2rem' }}>
                        <h3 style={{ color: 'var(--text)', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FiTag size={18} style={{ color: '#7c3aed' }} /> Course Syllabus
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>Enter each module/topic on a new line</p>
                        <textarea className="form-input" rows={8} placeholder={`Module 1: Introduction\nModule 2: Core Concepts\nModule 3: Advanced Topics\nModule 4: Real-World Projects`}
                            value={syllabus} onChange={e => setSyllabus(e.target.value)} style={{ resize: 'vertical', fontFamily: 'monospace' }} />
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '0.875rem' }}>
                            {loading ? 'Saving...' : <><FiSave size={16} /> {existing ? 'Update Course' : 'Create & Submit for Review'}</>}
                        </button>
                        <button type="button" onClick={() => navigate('/teacher/my-courses')} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            <FiX size={16} /> Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
