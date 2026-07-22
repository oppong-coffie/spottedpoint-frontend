import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND } from '../../utils/constants';
import Logo from '../ui/Logo';

const NAV_LINKS = [
  { label: 'Home',      path: '/' },
  { label: 'About Us',  path: '/about' },
  { label: 'Services',  path: '/services' },
  { label: 'Pricing',   path: '/pricing' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Gallery',   path: '/gallery' },
  { label: 'Blog',      path: '/blog' },
  { label: 'Contact',   path: '/contact' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    fn(); // run on mount
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
      background: '#fff',
      boxShadow: scrolled ? '0 2px 24px rgba(40,59,144,.1)' : '0 1px 0 rgba(40,59,144,.06)',
      transition: 'box-shadow .3s ease',
      padding: scrolled ? '12px 0' : '16px 0',
    }}>
      <style>{`
        @keyframes navBtnPulse {
          0%, 100% {
            box-shadow: 0 4px 16px rgba(248, 149, 33, 0.4), 0 0 0 0 rgba(248, 149, 33, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 8px 24px rgba(248, 149, 33, 0.75), 0 0 0 10px rgba(248, 149, 33, 0);
            transform: scale(1.04);
          }
        }
        .nav-lets-talk:hover {
          animation-play-state: paused !important;
        }
      `}</style>
      <div style={{
        maxWidth: 1260, margin: '0 auto', padding: '0 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* ── Logo ── always static, never changes color ── */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Logo size={44} textScale={1} dark={false} />
        </Link>

        {/* ── Desktop nav ── */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="hide-m">
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              style={{
                fontFamily: "'Montserrat',sans-serif",
                fontWeight: 700,
                fontSize: '.83rem',
                letterSpacing: '.04em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                // ── STATIC COLORS — never white ──
                color: isActive(path) ? BRAND.orange : BRAND.blue,
                position: 'relative',
                padding: '4px 0',
                transition: 'color .25s',
              }}
              onMouseEnter={e => { if (!isActive(path)) e.currentTarget.style.color = BRAND.orange; }}
              onMouseLeave={e => { if (!isActive(path)) e.currentTarget.style.color = BRAND.blue; }}>
              {label}
              {/* Active underline */}
              {isActive(path) && (
                <span style={{
                  position: 'absolute', bottom: -2, left: 0, right: 0,
                  height: 2, background: BRAND.orange, borderRadius: 2,
                }} />
              )}
            </Link>
          ))}

          {/* Let's Talk button */}
          <Link to="/contact" className="btn-morph nav-lets-talk" style={{
            background: BRAND.orange, color: '#fff',
            padding: '10px 22px', borderRadius: 50,
            fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
            fontSize: '.8rem', textDecoration: 'none',
            letterSpacing: '.04em',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            transition: 'all .3s ease',
            animation: 'navBtnPulse 2.5s ease-in-out infinite',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = BRAND.blue; e.currentTarget.style.boxShadow = '0 6px 20px rgba(40,59,144,.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = BRAND.orange; e.currentTarget.style.boxShadow = 'none'; }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#fff', display: 'inline-block',
              boxShadow: '0 0 6px #fff',
              animation: 'blink 1.5s ease-in-out infinite'
            }} />
            <span>Let's Talk</span>
          </Link>
        </div>

        {/* ── Hamburger (mobile) ── */}
        <button
          className="mobile-only"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: 5, padding: 8,
          }}
          aria-label="Menu">
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 24, height: 2,
              background: BRAND.blue,           // always blue — never white
              borderRadius: 2, transition: 'all .3s',
              transform: menuOpen
                ? (i === 0 ? 'rotate(45deg) translateY(7px)'
                  : i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'scaleX(0)')
                : 'none',
            }} />
          ))}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div style={{
        background: '#fff',
        maxHeight: menuOpen ? 500 : 0,
        overflow: 'hidden',
        transition: 'max-height .4s ease',
        borderTop: menuOpen ? `3px solid ${BRAND.orange}` : 'none',
      }}>
        <div style={{ padding: '16px 28px 24px' }}>
          {NAV_LINKS.map(({ label, path }) => (
            <Link key={path} to={path} style={{
              display: 'block', padding: '13px 0',
              fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
              color: isActive(path) ? BRAND.orange : BRAND.blue,
              textDecoration: 'none', fontSize: '.95rem',
              borderBottom: `1px solid ${BRAND.blue}08`,
            }}>{label}</Link>
          ))}
          <Link to="/contact" className="btn-morph nav-lets-talk" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 18,
            background: BRAND.orange, color: '#fff',
            padding: '12px 28px', borderRadius: 50,
            fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
            fontSize: '.88rem', textDecoration: 'none',
            animation: 'navBtnPulse 2.5s ease-in-out infinite',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#fff', display: 'inline-block',
              boxShadow: '0 0 6px #fff',
              animation: 'blink 1.5s ease-in-out infinite'
            }} />
            <span>Let's Talk</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}