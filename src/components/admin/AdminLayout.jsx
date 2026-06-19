import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { BRAND } from '../../utils/constants';
import Logo from '../ui/Logo';

const navItems = [
  { label: 'Dashboard',  path: '/admin',           icon: '📊' },
  { label: 'Projects',   path: '/admin/projects',  icon: '📁' },
  { label: 'Gallery',    path: '/admin/gallery',   icon: '🖼️' },
  { label: 'Blog',       path: '/admin/blog',      icon: '📝' },
  { label: 'Team',       path: '/admin/team',      icon: '👥' },
  { label: 'Admin',      path: '/admin/admin',     icon: '👤' },
  { label: 'Messages',   path: '/admin/messages',  icon: '✉️' },
];

export default function AdminLayout({ children, title }) {
  const { user, logout } = useAuth();
  const location  = useLocation();
  const navigate  = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const isActive = (path) => path === '/admin' ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f6fa', fontFamily: "'Poppins',sans-serif" }}>
      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 68 : 240, flexShrink: 0,
        background: BRAND.blue, transition: 'width .3s ease',
        display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh',
      }}>
        <div style={{ padding: collapsed ? '24px 12px' : '24px 20px', borderBottom: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {!collapsed && <Logo size={36} textScale={.85} dark />}
          <button onClick={() => setCollapsed(!collapsed)}
            style={{ background: 'rgba(255,255,255,.1)', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', color: '#fff', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {collapsed ? '→' : '←'}
          </button>
        </div>

        <nav style={{ flex: 1, padding: '16px 10px' }}>
          {navItems.map(({ label, path, icon }) => (
            <Link key={path} to={path} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10,
              textDecoration: 'none', marginBottom: 4, transition: 'background .2s',
              background: isActive(path) ? 'rgba(255,255,255,.15)' : 'transparent',
              color: isActive(path) ? '#fff' : 'rgba(255,255,255,.7)',
              fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.85rem',
              borderLeft: isActive(path) ? `3px solid ${BRAND.orange}` : '3px solid transparent',
            }}
              onMouseEnter={e => { if (!isActive(path)) e.currentTarget.style.background = 'rgba(255,255,255,.08)'; }}
              onMouseLeave={e => { if (!isActive(path)) e.currentTarget.style.background = 'transparent'; }}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{icon}</span>
              {!collapsed && label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '16px 10px', borderTop: '1px solid rgba(255,255,255,.1)' }}>
          {!collapsed && (
            <div style={{ padding: '10px 14px', marginBottom: 8 }}>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: '#fff', fontSize: '.85rem' }}>{user?.name}</p>
              <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '.75rem' }}>{user?.role}</p>
            </div>
          )}
          <button onClick={handleLogout} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '11px 14px', borderRadius: 10, background: 'rgba(248,149,33,.15)',
            border: 'none', cursor: 'pointer', color: BRAND.orange,
            fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.85rem', transition: 'background .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = `${BRAND.orange}30`}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(248,149,33,.15)'}>
            <span>🚪</span>{!collapsed && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: 'auto' }}>
        {/* Top bar */}
        <div style={{ background: '#fff', padding: '18px 32px', borderBottom: '1px solid #eef0f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
          <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: BRAND.blue, fontSize: '1.2rem' }}>{title}</h1>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link to="/" target="_blank" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.82rem', color: BRAND.blue, textDecoration: 'none', padding: '8px 16px', border: `1px solid ${BRAND.blue}20`, borderRadius: 8 }}>
              View Site ↗
            </Link>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: BRAND.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Montserrat',sans-serif", fontWeight: 900, color: '#fff', fontSize: '.82rem' }}>
              {user?.name?.charAt(0)}
            </div>
          </div>
        </div>

        <div style={{ padding: '32px' }}>
          {children}
        </div>
      </main>
    </div>
  );
}