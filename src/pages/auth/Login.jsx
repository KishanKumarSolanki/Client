import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth, DEMO_ACCOUNTS } from '../../context/AuthContext';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiInfo, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { Brand } from '../../components/Navbar';

const perks = [
    'Learn from 200+ industry experts',
    'Track progress across every course',
    'Earn certificates you can share',
];

const labelStyle = { display: 'block', color: 'var(--text-2)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.45rem' };
const iconStyle = { position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' };

export default function Login() {
    const [searchParams] = useSearchParams();
    const [isRegister, setIsRegister] = useState(searchParams.get('tab') === 'register');
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, user } = useAuth();
    const navigate = useNavigate();

    // If already logged in, redirect
    useEffect(() => {
        if (user) navigate(`/${user.role}/dashboard`, { replace: true });
    }, [navigate, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        await new Promise(r => setTimeout(r, 600));
        if (isRegister) {
            // Mock register — just log in as student
            const result = login(DEMO_ACCOUNTS.student.email, DEMO_ACCOUNTS.student.password);
            if (result.success) navigate('/student/dashboard');
            else setError('Registration failed. Try demo login.');
        } else {
            const result = login(form.email, form.password);
            if (result.success) {
                navigate(`/${result.role}/dashboard`);
            } else {
                setError(result.error);
            }
        }
        setLoading(false);
    };

    const quickLogin = (role) => {
        const acc = DEMO_ACCOUNTS[role];
        const result = login(acc.email, acc.password);
        if (result.success) navigate(`/${result.role}/dashboard`);
    };

    return (
        <div className="auth-shell">
            {/* Brand panel */}
            <aside className="auth-aside">
                <div style={{ position: 'relative' }}><Brand /></div>

                <div style={{ position: 'relative', maxWidth: 460 }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.5rem' }}>
                        Learn skills that move your career forward.
                    </h2>
                    <ul style={{ listStyle: 'none', display: 'grid', gap: '0.9rem' }}>
                        {perks.map(p => (
                            <li key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.9)', fontSize: '1rem' }}>
                                <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <FiCheck size={14} />
                                </span>
                                {p}
                            </li>
                        ))}
                    </ul>
                </div>

                <p style={{ position: 'relative', color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>
                    Joined by 50,000+ learners across India.
                </p>
            </aside>

            {/* Form */}
            <main className="auth-main">
                <div style={{ width: '100%', maxWidth: 420 }}>
                    <Link to="/" className="btn-ghost" style={{ marginLeft: '-0.9rem', marginBottom: '1.25rem' }}>
                        <FiArrowLeft size={15} /> Back to home
                    </Link>

                    <div className="segmented" style={{ marginBottom: '1.75rem' }}>
                        {[['Log in', false], ['Register', true]].map(([label, isReg]) => (
                            <button
                                key={label}
                                type="button"
                                className={isRegister === isReg ? 'active' : ''}
                                onClick={() => { setIsRegister(isReg); setError(''); }}
                            >{label}</button>
                        ))}
                    </div>

                    <h1 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                        {isRegister ? 'Create your account' : 'Welcome back'}
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.75rem' }}>
                        {isRegister ? 'Start your learning journey today.' : 'Sign in to continue learning.'}
                    </p>

                    {error && (
                        <div role="alert" style={{
                            background: 'var(--danger-soft)', border: '1px solid #f8cccc',
                            borderRadius: '0.65rem', padding: '0.75rem 1rem', marginBottom: '1.25rem',
                            color: '#b91c1c', fontSize: '0.875rem',
                        }}>{error}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {isRegister && (
                            <div style={{ marginBottom: '1rem' }}>
                                <label htmlFor="name" style={labelStyle}>Full name</label>
                                <div style={{ position: 'relative' }}>
                                    <FiUser size={16} style={iconStyle} />
                                    <input id="name" className="form-input" style={{ paddingLeft: '2.75rem' }} type="text" placeholder="Your full name"
                                        value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required={isRegister} />
                                </div>
                            </div>
                        )}

                        <div style={{ marginBottom: '1rem' }}>
                            <label htmlFor="email" style={labelStyle}>Email address</label>
                            <div style={{ position: 'relative' }}>
                                <FiMail size={16} style={iconStyle} />
                                <input id="email" className="form-input" style={{ paddingLeft: '2.75rem' }} type="email" placeholder="you@example.com"
                                    value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
                            </div>
                        </div>

                        <div style={{ marginBottom: isRegister ? '1rem' : '1.5rem' }}>
                            <label htmlFor="password" style={labelStyle}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <FiLock size={16} style={iconStyle} />
                                <input id="password" className="form-input" style={{ paddingLeft: '2.75rem', paddingRight: '3rem' }}
                                    type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                                    value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required />
                                <button type="button" onClick={() => setShowPassword(p => !p)} aria-label={showPassword ? 'Hide password' : 'Show password'} style={{
                                    position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)',
                                    background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex',
                                }}>
                                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                </button>
                            </div>
                        </div>

                        {isRegister && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label htmlFor="role" style={labelStyle}>Register as</label>
                                <select id="role" className="form-input" value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}>
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </select>
                            </div>
                        )}

                        <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}>
                            {loading ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}
                        </button>
                    </form>

                    {/* Demo Quick Login */}
                    <div style={{ marginTop: '1.75rem', padding: '1rem', background: 'var(--primary-soft)', borderRadius: '0.85rem', border: '1px dashed #c7cbfa' }}>
                        <p style={{ color: 'var(--primary-dark)', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                            <FiInfo size={14} /> Demo quick login
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {[['admin', '🔑 Admin'], ['teacher', '👩‍🏫 Teacher'], ['student', '🎓 Student']].map(([role, label]) => (
                                <button key={role} type="button" onClick={() => quickLogin(role)} className="btn-outline" style={{ flex: 1, minWidth: 92, padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}>
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
