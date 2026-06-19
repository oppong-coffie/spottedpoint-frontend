import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BRAND } from '../../utils/constants';
import Logo from '../ui/Logo';

const services = ['Brand Strategy', 'Web Design', 'Digital Marketing', 'Video Production', 'Social Media', 'IT Security'];
const company  = ['About Us', 'Our Team', 'Portfolio', 'Blog', 'Gallery', 'Contact'];
const socials  = [
  { name: 'Facebook', url: 'https://facebook.com/spottedpointmedia', brandColor: '#1877F2', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { name: 'WhatsApp', url: 'https://wa.me/233242760809', brandColor: '#25D366', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> },
  { name: 'TikTok', url: 'https://tiktok.com/@spottedpointmedia', brandColor: '#000000', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg> },
  { name: 'Instagram', url: 'https://instagram.com/spottedpointmedia', brandColor: '#E1306C', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { name: 'X (Twitter)', url: 'https://x.com/spottedpointmed', brandColor: '#0f1419', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg> }
];

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer style={{ background: BRAND.darkBg, color: 'rgba(255,255,255,.6)' }}>
      <div className="container" style={{ padding: '70px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 48, marginBottom: 60 }}>

          {/* Brand col */}
          <div>
            <Logo size={50} textScale={1} dark />
            <p style={{ marginTop: 20, lineHeight: 1.9, fontSize: '.88rem', maxWidth: 270 }}>
              We make the invisible visible. Full-stack marketing, technology, and creativity — built for lasting growth.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              {socials.map(({ name, url, brandColor, svg }) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" title={name} className="micro-bounce" style={{
                  width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', textDecoration: 'none', transition: 'background .3s, transform .2s',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = brandColor;
                    e.currentTarget.style.boxShadow = `0 6px 16px ${brandColor}55`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: '#fff', marginBottom: 22, fontSize: '.82rem', letterSpacing: '.12em', textTransform: 'uppercase' }}>Services</h4>
            {services.map(s => (
              <Link key={s} to="/services" style={{ display: 'block', marginBottom: 11, fontSize: '.88rem', color: 'rgba(255,255,255,.6)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = BRAND.orange}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.6)'}>
                {s}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: '#fff', marginBottom: 22, fontSize: '.82rem', letterSpacing: '.12em', textTransform: 'uppercase' }}>Company</h4>
            {company.map(c => (
              <Link key={c} to={`/${c.toLowerCase().replace(' ', '-')}`} style={{ display: 'block', marginBottom: 11, fontSize: '.88rem', color: 'rgba(255,255,255,.6)', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = BRAND.orange}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.6)'}>
                {c}
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: '#fff', marginBottom: 22, fontSize: '.82rem', letterSpacing: '.12em', textTransform: 'uppercase' }}>Newsletter</h4>
            <p style={{ fontSize: '.88rem', lineHeight: 1.8, marginBottom: 20 }}>Get weekly insights on brand growth and digital strategy. Zero spam.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address"
                style={{ flex: 1, padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,.15)', background: 'rgba(255,255,255,.07)', color: '#fff', fontFamily: "'Poppins',sans-serif", fontSize: '.85rem', outline: 'none' }} />
              <button onClick={() => setEmail('')}
                style={{ background: BRAND.orange, color: '#fff', border: 'none', padding: '11px 16px', borderRadius: 8, cursor: 'pointer', fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '.8rem', transition: 'background .2s' }}
                onMouseEnter={e => e.currentTarget.style.background = BRAND.blue}
                onMouseLeave={e => e.currentTarget.style.background = BRAND.orange}>→</button>
            </div>

            <div style={{ marginTop: 28 }}>
              <h5 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: '#fff', fontSize: '.82rem', marginBottom: 12 }}>Contact</h5>
              {[
                { icon: '📍', val: 'Teiman-Abokobi, Accra, Ghana' },
                { icon: '📞', val: '+233 242 760 809' },
                { icon: '✉️', val: 'spottedpointmedia@gmail.com' },
              ].map(({ icon, val }) => (
                <p key={val} style={{ fontSize: '.82rem', marginBottom: 8, display: 'flex', gap: 8 }}>
                  <span>{icon}</span>{val}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: 'rgba(255,255,255,.08) 1px solid' }}>
        <div className="container" style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: '.8rem' }}>© {new Date().getFullYear()} Spotted Point Media Limited. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Use', 'Sitemap'].map(l => (
              <span key={l} style={{ fontSize: '.8rem', cursor: 'pointer', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = BRAND.orange}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.6)'}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}