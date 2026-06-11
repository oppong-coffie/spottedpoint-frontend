import { useEffect, useState } from 'react';
import { Link }            from 'react-router-dom';
import Navbar              from '../components/layout/Navbar';
import Footer              from '../components/layout/Footer';
import Logo                from '../components/ui/Logo';
import MagneticButton      from '../components/ui/MagneticButton';
import ImageMaskReveal     from '../animations/ImageMaskReveal';
import SplitText           from '../animations/SplitText';
import HeroAnimation       from '../animations/HeroAnimation';
import RevealSystem        from '../animations/RevealSystem';
import SectionScenes       from '../animations/SectionScenes';
import VelocityEffect      from '../animations/VelocityEffect';
import useScrollAnimations from '../animations/useScrollAnimations';
import { useSmoothScroll } from '../hooks/useGSAP';
import { BRAND, DIRECTORS } from '../utils/constants';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';

// ─── ALL MODULE-LEVEL CONSTANTS ───────────────────────────────────────────────
const HERO_WORDS = ['Connects.', 'Inspires.', 'Converts.', 'Commands.'];

// Looping hero images — replace with your own brand photos:
// '/hero/production.jpg', '/hero/billboard.jpg', etc.
const HERO_SLIDES = [
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=90', label: 'Video Production' },
  { src: 'https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=1400&q=90', label: 'Brand Identity'   },
  { src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1400&q=90', label: 'Graphic Design'   },
  { src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1400&q=90', label: 'Digital Marketing' },
];

// Exactly 4 services (matching reference)
const HOME_SERVICES = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    label: 'Brand Strategy',
    desc: 'We craft strong brands that leave a lasting impression.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    label: 'Content Creation',
    desc: 'Engaging content that informs, inspires, and connects.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    label: 'Digital Marketing',
    desc: 'Data-driven strategies that grow your brand online.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
    label: 'Video Production',
    desc: 'High-quality videos that tell your story visually.',
  },
];

const FALLBACK_WORKS = [
  { _id: 1, title: 'TechNova Brand Identity', category: 'Branding',  image: 'https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=700&q=80' },
  { _id: 2, title: 'Horizon Documentary',     category: 'Video',     image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=700&q=80' },
  { _id: 3, title: 'SignGo Campaign',          category: 'Marketing', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=700&q=80' },
];

const TICKER_ITEMS = [
  'Brand Identity', 'Web Development', 'Motion Design', 'Digital Marketing',
  'Video Production', 'Graphic Design', 'Social Media', 'Mobile Apps', 'IT Solutions', 'Animation',
];

const CLIENT_NAMES = [
  'TechNova', 'Horizon Corp', 'MediaHub', 'BrandCo', 'DigitalPro',
  'NexGen', 'Elevate Co', 'Synergy Ltd', 'OptiBiz', 'CloudBase',
];

// ─── TICKER ───────────────────────────────────────────────────────────────────
function Ticker() {
  return (
    <div style={{ background: BRAND.orange, padding: '11px 0', overflow: 'hidden', position: 'relative', zIndex: 10 }}>
      <div className="ticker-track">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
            fontSize: '.75rem', letterSpacing: '.12em',
            textTransform: 'uppercase', color: '#fff',
            margin: '0 28px', display: 'inline-flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: '.36rem', opacity: .7 }}>◆</span>{item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [slideIdx, setSlideIdx] = useState(0);
  const [wordIdx,  setWordIdx]  = useState(0);

  // Auto-loop slides every 4.5s
  useEffect(() => {
    const t1 = setInterval(() => setSlideIdx(i => (i + 1) % HERO_SLIDES.length), 4500);
    const t2 = setInterval(() => setWordIdx(i  => (i + 1) % HERO_WORDS.length),  3000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  return (
    <section style={{
      minHeight: '100vh', background: '#fff',
      display: 'flex', position: 'relative', overflow: 'hidden',
    }}>

      {/* ── LEFT: Text content ─────────────────────────────────── */}
      <div style={{
        flex: '0 0 50%', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '130px 4% 80px 5%',
        position: 'relative', zIndex: 2,
      }}>

        {/* Agency badge */}
        <div className="hero-badge" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: `${BRAND.blue}0c`, border: `1px solid ${BRAND.blue}1e`,
          borderRadius: 50, padding: '5px 16px',
          marginBottom: 22, alignSelf: 'flex-start',
        }}>
          <span style={{
            width: 6, height: 6, background: BRAND.orange, borderRadius: '50%',
            display: 'inline-block', animation: 'neonPulse 2s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
            fontSize: '.68rem', letterSpacing: '.16em',
            color: BRAND.blue, textTransform: 'uppercase',
          }}>
            Full Stack Creative Agency · Accra, Ghana
          </span>
        </div>

        {/* Headline */}
        <h1 className="hero-title" style={{
          fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
          fontSize: 'clamp(2.6rem,4.5vw,3.8rem)', color: BRAND.blue,
          lineHeight: 1.08, marginBottom: 20,
        }}>
          Creative Media<br />That{' '}
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIdx}
              initial={{ y: 36, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -36, opacity: 0 }}
              transition={{ duration: .42, ease: [.22, 1, .36, 1] }}
              style={{ color: BRAND.orange, display: 'inline-block' }}>
              {HERO_WORDS[wordIdx]}
            </motion.span>
          </AnimatePresence>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub" style={{
          color: '#666', fontSize: '.98rem', lineHeight: 1.88,
          maxWidth: 460, marginBottom: 34,
        }}>
          We help brands tell their stories through powerful strategy,
          stunning design, and impactful digital experiences.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
          <MagneticButton
            className="btn-primary hero-button"
            onClick={() => document.getElementById('services-row')?.scrollIntoView({ behavior: 'smooth' })}>
            Our Services
          </MagneticButton>
          <Link to="/portfolio" className="btn hero-button"
            style={{
              background: 'transparent', color: BRAND.blue,
              border: `1.5px solid ${BRAND.blue}2e`,
              padding: '13px 28px', borderRadius: 50,
              fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
              fontSize: '.88rem', textDecoration: 'none', transition: 'all .3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = BRAND.blue; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = BRAND.blue; }}>
            View Portfolio
          </Link>
        </div>

        {/* Stats */}
        <div className="hero-stats" style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          {[
            { val: '1K+', label: 'Projects' },
            { val: '500+', label: 'Clients' },
            { val: '8+',   label: 'Years' },
          ].map(({ val, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                fontSize: '1.85rem', color: BRAND.blue, lineHeight: 1,
              }}>{val}</div>
              <div style={{
                fontFamily: "'Poppins',sans-serif", fontSize: '.76rem',
                color: '#aaa', marginTop: 4,
              }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Image slideshow — diagonal cut + orange accent ── */}
      {/* clipPath creates the diagonal left edge matching the reference */}
      <div className="hero-image hide-m" style={{
        flex: '0 0 50%', position: 'relative',
        minHeight: '100vh', overflow: 'hidden',
        // Diagonal left edge — matching the reference design
        clipPath: 'polygon(7% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }}>

        {/* Looping slides */}
        {HERO_SLIDES.map((slide, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            opacity: i === slideIdx ? 1 : 0,
            transition: 'opacity 1.4s ease',
          }}>
            <img
              src={slide.src}
              alt={slide.label}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center',
                // Subtle zoom animation on active slide
                transform: i === slideIdx ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 6s ease, opacity 1.4s ease',
              }}
            />
          </div>
        ))}

        {/* Left blend — creates smooth join with white left side */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(90deg, rgba(255,255,255,.45) 0%, transparent 22%)',
        }} />

        {/* Bottom dark gradient */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `linear-gradient(180deg, transparent 45%, rgba(0,0,0,.6) 100%)`,
        }} />

        {/* ── Orange accent bar at bottom (matching reference) ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 5, background: BRAND.orange, zIndex: 3,
        }} />

        {/* Slide label floating tag */}
        <div style={{
          position: 'absolute', bottom: 22, left: 22, zIndex: 4,
          background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(10px)',
          borderRadius: 10, padding: '8px 16px',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{
            width: 7, height: 7, background: BRAND.orange, borderRadius: '50%',
            animation: 'neonPulse 1.5s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
            fontSize: '.76rem', color: BRAND.blue, letterSpacing: '.05em',
          }}>
            {HERO_SLIDES[slideIdx].label}
          </span>
        </div>

        {/* Slide dot indicators */}
        <div style={{
          position: 'absolute', bottom: 26, right: 22, zIndex: 4,
          display: 'flex', gap: 6,
        }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlideIdx(i)} style={{
              width: i === slideIdx ? 22 : 7, height: 7,
              borderRadius: 4, padding: 0, border: 'none',
              background: i === slideIdx ? BRAND.orange : 'rgba(255,255,255,.55)',
              cursor: 'none', transition: 'all .35s ease',
            }} />
          ))}
        </div>

        {/* Brand dot watermark */}
        <div style={{
          position: 'absolute', top: 80, right: 20, zIndex: 2,
          opacity: .14, animation: 'spinSlow 40s linear infinite',
        }}>
          <Logo size={88} textScale={0} dark />
        </div>
      </div>
    </section>
  );
}

// ─── 4-SERVICE ICONS ROW ──────────────────────────────────────────────────────
function ServiceIconsRow() {
  return (
    <section id="services-row" style={{
      background: '#fff', padding: '48px 0',
      borderTop: `1px solid ${BRAND.blue}08`,
      borderBottom: `1px solid ${BRAND.blue}08`,
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
        }}>
          {HOME_SERVICES.map(({ icon, label, desc }) => (
            <div key={label}
              className="service-card"
              style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'flex-start', gap: 12,
                padding: '24px 20px', borderRadius: 14,
                border: `1px solid ${BRAND.blue}09`,
                background: '#fff', transition: 'all .3s', cursor: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 12px 40px rgba(40,59,144,.1)`;
                e.currentTarget.style.borderColor = `${BRAND.orange}38`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = `${BRAND.blue}09`;
                e.currentTarget.style.transform = 'none';
              }}>
              <div style={{
                width: 50, height: 50, borderRadius: 12,
                background: `${BRAND.blue}08`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: BRAND.blue, flexShrink: 0,
              }}>
                {icon}
              </div>
              <div>
                <h3 style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
                  color: BRAND.blue, marginBottom: 6, fontSize: '.92rem',
                }}>{label}</h3>
                <p style={{
                  color: '#888', fontSize: '.82rem', lineHeight: 1.75,
                }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURED WORKS ───────────────────────────────────────────────────────────
function FeaturedWorks() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(r => setProjects(r.data.slice(0, 3))).catch(() => {});
  }, []);

  const display = projects.length > 0 ? projects : FALLBACK_WORKS;

  return (
    <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
      <div className="container">
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', flexWrap: 'wrap',
          gap: 16, marginBottom: 36,
        }}>
          <div>
            <p className="label fade-in">Portfolio</p>
            <h2 className="fade-in" style={{
              fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
              fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: BRAND.blue, marginBottom: 6,
            }}>Featured Works</h2>
            <p style={{ color: '#999', fontSize: '.88rem' }}>
              Explore some of our recent projects.
            </p>
          </div>
          <Link to="/portfolio" style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
            fontSize: '.85rem', color: BRAND.orange, textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'gap .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.gap = '12px'}
            onMouseLeave={e => e.currentTarget.style.gap = '6px'}>
            View All →
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          {display.map((p) => (
            <div key={p._id}
              className="feature-card work-img"
              data-cursor-label="View"
              style={{
                borderRadius: 14, overflow: 'hidden',
                position: 'relative', height: 240, cursor: 'none',
                background: p.image
                  ? `url(${p.image}) center/cover`
                  : `linear-gradient(135deg, #1a2760, ${BRAND.blue})`,
                transition: 'transform .3s, box-shadow .3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = `0 16px 48px rgba(40,59,144,.25)`;
                e.currentTarget.querySelector('.w-ov').style.opacity = '1';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.querySelector('.w-ov').style.opacity = '0';
              }}>
              {/* Dark gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,.8) 0%, rgba(0,0,0,.15) 60%, transparent 100%)',
              }} />
              {/* Text */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '14px 18px', zIndex: 1,
              }}>
                <span style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: '.65rem',
                  fontWeight: 700, color: BRAND.orange,
                  textTransform: 'uppercase', letterSpacing: '.1em',
                }}>{p.category}</span>
                <h3 style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
                  color: '#fff', fontSize: '.95rem', marginTop: 3,
                }}>{p.title}</h3>
              </div>
              {/* Hover overlay */}
              <div className="w-ov" style={{
                position: 'absolute', inset: 0, zIndex: 2,
                background: `${BRAND.orange}e0`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, transition: 'opacity .3s',
              }}>
                <Link to="/portfolio" style={{
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
                  color: '#fff', textDecoration: 'none', fontSize: '.9rem',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  View Project →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT PREVIEW ────────────────────────────────────────────────────────────
function AboutPreview() {
  return (
    <section className="section about" style={{ background: '#f8f9ff', padding: '88px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: 64, alignItems: 'center', flexWrap: 'wrap' }}>

          <div className="about-left" style={{ flex: '1 1 380px' }}>
            <p className="label">About Spotted Point Media</p>
            <SplitText
              text="We Are a Full Service Media Company."
              tag="h2"
              style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: BRAND.blue,
                lineHeight: 1.2, marginBottom: 20,
              }}
            />
            <p className="text-reveal-line" style={{
              color: '#666', lineHeight: 1.9, marginBottom: 14,
              fontSize: '.95rem', overflow: 'hidden',
            }}>
              We are a full-service media company passionate about helping brands
              grow through creativity, innovation, and results-driven solutions.
            </p>
            <p className="text-reveal-line" style={{
              color: '#666', lineHeight: 1.9, marginBottom: 32,
              fontSize: '.95rem', overflow: 'hidden',
            }}>
              From brand identity to digital campaigns and IT infrastructure —
              Spotted Point Media is your one-stop partner for everything that makes
              your business visible and irresistible.
            </p>
            <Link to="/about" className="btn btn-primary press">
              Learn About Us →
            </Link>
          </div>

          <div className="about-right" style={{ flex: '1 1 420px', position: 'relative' }}>
            <ImageMaskReveal
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85"
              style={{ height: 400, borderRadius: 20 }}
              delay={0.2}
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              style={{
                position: 'absolute', bottom: -18, left: -18,
                background: '#fff', borderRadius: 16, padding: '18px 22px',
                boxShadow: '0 12px 40px rgba(40,59,144,.14)',
                border: `1px solid ${BRAND.blue}0e`,
              }}>
              <div style={{
                fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                fontSize: '2rem', color: BRAND.orange, lineHeight: 1,
              }}>8+</div>
              <div style={{
                fontFamily: "'Poppins',sans-serif", fontSize: '.74rem',
                color: '#999', marginTop: 3,
              }}>Years of<br />Excellence</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── DIRECTORS ────────────────────────────────────────────────────────────────
// Increased photo area height, removed instruction banner
function DirectorsStrip() {
  return (
    <section className="section" style={{ background: '#fff', padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="label fade-in">Leadership</p>
          <h2 className="fade-in" style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
            fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: BRAND.blue,
          }}>The Directors</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 28,
        }}>
          {DIRECTORS.map(({ name, role, initials, color, skills, photo }) => (
            <div key={name} className="reveal-card"
              style={{
                borderRadius: 22, overflow: 'hidden',
                background: '#fff',
                border: `1px solid ${BRAND.blue}0e`,
                boxShadow: '0 6px 32px rgba(40,59,144,.09)',
                transition: 'transform .3s, box-shadow .3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 20px 56px rgba(40,59,144,.16)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 6px 32px rgba(40,59,144,.09)';
              }}>

              {/* ── Photo area — taller than before ── */}
              <div style={{
                height: 320,              // increased from 220
                background: `linear-gradient(155deg, ${color}, ${color}88)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Dot grid background */}
                <div style={{ position: 'absolute', inset: 0, opacity: .08 }}>
                  {Array.from({ length: 80 }).map((_, i) => (
                    <div key={i} style={{
                      position: 'absolute', width: 3, height: 3,
                      borderRadius: '50%', background: '#fff',
                      left: (i % 10) * 48 + 8,
                      top: Math.floor(i / 10) * 38 + 8,
                    }} />
                  ))}
                </div>

                {/* Photo or placeholder */}
                {photo ? (
                  <img src={photo} alt={name} style={{
                    width: 150, height: 150, borderRadius: '50%',
                    objectFit: 'cover',
                    border: '4px solid rgba(255,255,255,.35)',
                    position: 'relative', zIndex: 1,
                    boxShadow: '0 8px 32px rgba(0,0,0,.2)',
                  }} />
                ) : (
                  // Placeholder circle — awaiting photo
                  <div style={{
                    width: 150, height: 150, borderRadius: '50%',
                    background: 'rgba(255,255,255,.15)',
                    border: '3px solid rgba(255,255,255,.35)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    position: 'relative', zIndex: 1, gap: 6,
                    backdropFilter: 'blur(4px)',
                  }}>
                    <span style={{
                      fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                      fontSize: '2.4rem', color: 'rgba(255,255,255,.9)',
                      letterSpacing: '.02em',
                    }}>{initials}</span>
                  </div>
                )}

                {/* Scanning line effect */}
                <div style={{
                  position: 'absolute', left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg,transparent,rgba(248,149,33,.6),transparent)',
                  animation: 'scan 4s linear infinite', opacity: .5,
                }} />

                {/* Name overlay at bottom of photo area */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '24px 22px 18px',
                  background: 'linear-gradient(to top, rgba(0,0,0,.5), transparent)',
                  zIndex: 2,
                }}>
                  <h3 style={{
                    fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
                    color: '#fff', fontSize: '1.12rem', marginBottom: 2,
                  }}>{name}</h3>
                  <p style={{
                    color: BRAND.orange, fontSize: '.78rem',
                    fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
                  }}>{role}</p>
                </div>
              </div>

              {/* ── Skills section ── */}
              <div style={{
                padding: '18px 22px 22px',
                borderTop: `3px solid ${BRAND.orange}`,
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {skills.map(s => (
                    <span key={s} style={{
                      fontSize: '.7rem',
                      background: `${BRAND.blue}08`,
                      border: `1px solid ${BRAND.blue}14`,
                      color: '#555', padding: '4px 11px',
                      borderRadius: 50,
                      fontFamily: "'Montserrat',sans-serif", fontWeight: 600,
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NO instruction banner — removed as requested */}
      </div>
    </section>
  );
}

// ─── CLIENTS STRIP ────────────────────────────────────────────────────────────
function ClientsStrip() {
  return (
    <section style={{
      background: `${BRAND.blue}03`, padding: '42px 0', overflow: 'hidden',
      borderTop: `1px solid ${BRAND.blue}08`,
      borderBottom: `1px solid ${BRAND.blue}08`,
    }}>
      <p className="fade-in" style={{
        textAlign: 'center', fontFamily: "'Montserrat',sans-serif",
        fontWeight: 700, fontSize: '.64rem', letterSpacing: '.22em',
        color: '#ccc', textTransform: 'uppercase', marginBottom: 22,
      }}>
        Trusted By Leading Organisations
      </p>
      <div style={{ overflow: 'hidden' }}>
        <div className="ticker-track">
          {[...CLIENT_NAMES, ...CLIENT_NAMES].map((c, i) => (
            <div key={i} style={{
              minWidth: 148, height: 48, margin: '0 11px',
              background: '#fff', borderRadius: 9,
              border: `1px solid ${BRAND.blue}10`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
              fontSize: '.76rem', color: BRAND.blue,
              transition: 'all .22s', cursor: 'none',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = BRAND.blue; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = BRAND.blue; }}>
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION ──────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section style={{
      background: BRAND.blue, padding: '88px 24px',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', right: -80, top: -80,
        width: 360, height: 360, borderRadius: '50%',
        background: 'rgba(248,149,33,.08)',
      }} />
      <div style={{
        position: 'absolute', left: -60, bottom: -80,
        width: 300, height: 300, borderRadius: '50%',
        background: 'rgba(255,255,255,.04)',
      }} />
      <div style={{ maxWidth: 660, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SplitText
          text="Don't Just Produce — Market It."
          tag="h2"
          style={{
            fontFamily: "'Montserrat',sans-serif", fontWeight: 900,
            fontSize: 'clamp(1.9rem,4vw,3rem)', color: '#fff',
            lineHeight: 1.15, marginBottom: 18,
          }}
        />
        <p className="fade-in" style={{
          color: 'rgba(255,255,255,.72)', lineHeight: 1.85,
          marginBottom: 36, fontSize: '.98rem',
        }}>
          Your first strategy consultation is completely free.
          Let's talk about what your brand needs to grow.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" style={{
            background: BRAND.orange, color: '#fff',
            padding: '15px 34px', borderRadius: 50,
            fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
            fontSize: '.92rem', textDecoration: 'none',
            transition: 'all .3s', display: 'inline-flex', alignItems: 'center',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(248,149,33,.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
            Let's Talk →
          </Link>
          <Link to="/portfolio" style={{
            background: 'transparent', color: '#fff',
            padding: '14px 28px', borderRadius: 50,
            fontFamily: "'Montserrat',sans-serif", fontWeight: 700,
            fontSize: '.88rem', textDecoration: 'none',
            border: '1.5px solid rgba(255,255,255,.32)',
            transition: 'all .3s', display: 'inline-flex', alignItems: 'center',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
export default function Home() {
  useSmoothScroll();
  useScrollAnimations();

  return (
    <>
      <HeroAnimation />
      <RevealSystem />
      <SectionScenes />
      <VelocityEffect selector=".velocity-target" />

      <Navbar />
      <Hero />
      <Ticker />
      <ServiceIconsRow />
      <FeaturedWorks />
      <AboutPreview />
      <DirectorsStrip />
      <ClientsStrip />
      <CTASection />
      <Footer />
    </>
  );
}