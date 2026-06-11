import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { BRAND } from '../../utils/constants';
import { Link } from 'react-router-dom';
import api from '../../api/axios';


export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, gallery: 0, blog: 0, messages: 0, unread: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/projects'), api.get('/gallery'), api.get('/blog'), api.get('/contact'),
    ]).then(([p, g, b, m]) => {
      setStats({ projects: p.data.length, gallery: g.data.length, blog: b.data.length, messages: m.data.length, unread: m.data.filter(x => !x.read).length });
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'Total Projects',  val: stats.projects, icon: '📁', path: '/admin/projects', color: BRAND.blue },
    { label: 'Gallery Items',   val: stats.gallery,  icon: '🖼️', path: '/admin/gallery',  color: '#7c3aed' },
    { label: 'Blog Posts',      val: stats.blog,     icon: '📝', path: '/admin/blog',     color: '#059669' },
    { label: 'Messages',        val: stats.messages, icon: '✉️', path: '/admin/messages', color: BRAND.orange, badge: stats.unread },
  ];

  const quickActions = [
    { label: 'Add Project',     path: '/admin/projects', icon: '➕' },
    { label: 'Upload Media',    path: '/admin/gallery',  icon: '📤' },
    { label: 'Write Blog Post', path: '/admin/blog',     icon: '✍️' },
    { label: 'Add Team Member', path: '/admin/team',     icon: '👤' },
    { label: 'View Messages',   path: '/admin/messages', icon: '📨' },
    { label: 'Manage Team',     path: '/admin/team',     icon: '👥' },
  ];

  return (
    <AdminLayout title="Dashboard">
      <p style={{ color: BRAND.gray, marginBottom: 32, fontFamily: "'Montserrat',sans-serif", fontWeight: 600 }}>
        Welcome back! Here's what's happening with your website.
      </p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, marginBottom: 40 }}>
        {cards.map(({ label, val, icon, path, color, badge }) => (
          <Link key={label} to={path} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: '24px 22px', border: `1px solid ${color}15`, position: 'relative', transition: 'transform .25s, box-shadow .25s', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              {badge > 0 && (
                <span style={{ position: 'absolute', top: 14, right: 14, background: BRAND.orange, color: '#fff', borderRadius: 50, width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '.7rem' }}>{badge}</span>
              )}
              <div style={{ width: 52, height: 52, borderRadius: 12, background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: 16 }}>{icon}</div>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: '2.2rem', color, lineHeight: 1 }}>{val}</div>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '.83rem', color: BRAND.gray, marginTop: 6 }}>{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: BRAND.blue, marginBottom: 18, fontSize: '1rem' }}>Quick Actions</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 14 }}>
        {quickActions.map(({ label, path, icon }) => (
          <Link key={label} to={path} style={{
            textDecoration: 'none', background: '#fff', borderRadius: 12, padding: '18px 16px', textAlign: 'center',
            border: `1px solid ${BRAND.blue}10`, transition: 'all .25s', display: 'block',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = BRAND.blue; e.currentTarget.querySelector('p').style.color = '#fff'; e.currentTarget.querySelector('span').style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.querySelector('p').style.color = BRAND.blue; e.currentTarget.querySelector('span').style.color = 'inherit'; }}>
            <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: 8 }}>{icon}</span>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.83rem', color: BRAND.blue, transition: 'color .25s' }}>{label}</p>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}