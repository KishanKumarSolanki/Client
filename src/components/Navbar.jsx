import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiBook, FiLogOut, FiGrid } from 'react-icons/fi';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/short-courses', label: 'Short Courses' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];

export function Brand({ size }) {
    return (
        <Link to="/" className="brand" aria-label="LearnPro home">
            <span className="brand-mark" style={size ? { width: size, height: size } : undefined}>
                <FiBook size={20} />
            </span>
            <span className="brand-name">Learn<span>Pro</span></span>
        </Link>
    );
}

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close the mobile menu after navigating
    useEffect(() => { setMenuOpen(false); }, [location.pathname]);

    const handleLogout = () => { logout(); navigate('/'); };
    const dashboardLink = user ? `/${user.role}/dashboard` : '/login';

    return (
        <nav className={`site-nav${scrolled ? ' scrolled' : ''}`}>
            <div className="site-nav-inner">
                <Brand />

                <div className="nav-links">
                    {navLinks.map(link => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end
                            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                <div className="nav-actions">
                    {user ? (
                        <>
                            <Link to={dashboardLink} className="btn-outline hide-mobile" style={{ padding: '0.5rem 1rem' }}>
                                <FiGrid size={16} /> Dashboard
                            </Link>
                            <div
                                title={user.name}
                                className="dash-avatar hide-mobile"
                                style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--secondary))', width: 36, height: 36, fontSize: '0.85rem' }}
                            >
                                {user.avatar}
                            </div>
                            <button onClick={handleLogout} className="btn-ghost hide-mobile" style={{ color: 'var(--danger)' }}>
                                <FiLogOut size={15} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-ghost hide-mobile">Log in</Link>
                            <Link to="/login?tab=register" className="btn-primary hide-mobile" style={{ padding: '0.55rem 1.2rem' }}>Get started</Link>
                        </>
                    )}
                    <button
                        className="icon-btn mobile-menu-btn"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                    </button>
                </div>
            </div>

            <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
                {navLinks.map(link => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end
                        className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                    >
                        {link.label}
                    </NavLink>
                ))}
                <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                    {user ? (
                        <>
                            <Link to={dashboardLink} className="btn-primary" style={{ flex: 1 }}>Dashboard</Link>
                            <button onClick={handleLogout} className="btn-outline" style={{ flex: 1, color: 'var(--danger)' }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn-outline" style={{ flex: 1 }}>Log in</Link>
                            <Link to="/login?tab=register" className="btn-primary" style={{ flex: 1 }}>Get started</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
