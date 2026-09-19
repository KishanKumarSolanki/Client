import { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { FiLogOut, FiMenu, FiX, FiBell, FiBook, FiExternalLink } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

/**
 * Shared shell for the admin, teacher and student areas.
 * navItems: [{ to, icon, label }]
 * extraTitles: [[pathPrefix, title]] for routes that are not in the sidebar
 */
export default function DashboardLayout({ panelName, roleLabel, gradient, navItems, extraTitles = [] }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => { logout(); navigate('/'); };
    const toggleSidebar = () => {
        if (window.innerWidth <= 900) setMobileOpen(o => !o);
        else setCollapsed(c => !c);
    };
    const currentLabel =
        navItems.find(i => location.pathname.startsWith(i.to))?.label ??
        extraTitles.find(([prefix]) => location.pathname.startsWith(prefix))?.[1] ??
        panelName;

    return (
        <div className="dash-shell">
            <div className={`dash-backdrop${mobileOpen ? ' open' : ''}`} onClick={() => setMobileOpen(false)} />

            <aside className={`dash-sidebar${collapsed ? ' collapsed' : ''}${mobileOpen ? ' open' : ''}`}>
                <div className="dash-brand">
                    <span className="brand-mark" style={{ background: gradient }}><FiBook size={20} /></span>
                    {!collapsed && <span className="dash-brand-title">{panelName}</span>}
                </div>

                {!collapsed && (
                    <div className="dash-user">
                        <div className="dash-avatar" style={{ background: gradient }}>{user?.avatar}</div>
                        <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{roleLabel}</div>
                        </div>
                    </div>
                )}

                <nav className="dash-nav" aria-label={`${panelName} navigation`}>
                    {navItems.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            title={collapsed ? label : undefined}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
                            style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
                        >
                            <Icon size={18} />
                            {!collapsed && <span>{label}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className="dash-foot" style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <Link to="/" className="sidebar-link" style={{ justifyContent: collapsed ? 'center' : 'flex-start' }} title={collapsed ? 'Back to website' : undefined}>
                        <FiExternalLink size={18} />
                        {!collapsed && <span>Back to website</span>}
                    </Link>
                    <button onClick={handleLogout} className="sidebar-link danger" style={{ border: 'none', background: 'none', width: '100%', justifyContent: collapsed ? 'center' : 'flex-start' }} title={collapsed ? 'Logout' : undefined}>
                        <FiLogOut size={18} />
                        {!collapsed && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            <div className={`dash-main${collapsed ? ' collapsed' : ''}`}>
                <header className="dash-topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: 0 }}>
                        <button className="icon-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
                            {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
                        </button>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {currentLabel}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <button className="icon-btn" aria-label="Notifications">
                            <FiBell size={18} />
                            <span style={{ position: 'absolute', top: 8, right: 9, width: 8, height: 8, borderRadius: '50%', background: 'var(--danger)', border: '2px solid var(--surface)' }} />
                        </button>
                        <div className="dash-avatar" style={{ background: gradient, width: 36, height: 36, fontSize: '0.85rem' }} title={user?.name}>{user?.avatar}</div>
                    </div>
                </header>

                <main className="dash-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
