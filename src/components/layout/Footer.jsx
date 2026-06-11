import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BRAND } from '../../utils/constants';
import Logo from '../ui/Logo';

const services = ['Brand Strategy', 'Web Design', 'Digital Marketing', 'Video Production', 'Social Media', 'IT Security'];
const company  = ['About Us', 'Our Team', 'Portfolio', 'Blog', 'Gallery', 'Contact'];
const socials  = [{ label: 'FB', url: '#' }, { label: 'IG', url: '#' }, { label: 'LI', url: '#' }, { label: 'TW', url: '#' }];

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
              {socials.map(({ label, url }) => (
                <a key={label} href={url} style={{
                  width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '.72rem',
                  color: '#fff', textDecoration: 'none', transition: 'background .25s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = BRAND.orange}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}>
                  {label}
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