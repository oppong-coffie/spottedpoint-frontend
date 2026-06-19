import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useSmoothScroll, useScrollAnimations } from '../hooks/useGSAP';
import Logo from '../components/ui/Logo';
import { BRAND } from '../utils/constants';
import api from '../api/axios';
import use3DTilt from '../hooks/use3DTilt';
import HeroCarousel from '../components/ui/HeroCarousel';

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_TEAM = [
  { name: 'Akosua Mensah',  role: 'Creative Director',   initials: 'AM', color: BRAND.blue },
  { name: 'Kofi Asante',    role: 'Head of Digital',      initials: 'KA', color: '#1a3a7a' },
  { name: 'Esi Owusu',      role: 'Lead Developer',       initials: 'EO', color: BRAND.blueLight },
  { name: 'Kwame Ofori',    role: 'Brand Strategist',     initials: 'KO', color: '#0f2d6e' },
];

const COLORS = [BRAND.blue, '#1a3a7a', BRAND.blueLight, '#0f2d6e'];

const getInitials = (name) => {
  if (!name) return '';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
};

const VALUES = [
  { icon: '🚀', title: 'Relentless Innovation',  desc: 'We never stop exploring better ways to serve you.' },
  { icon: '🎯', title: 'Strategic Simplicity',   desc: 'We make the complex clear and actionable.' },
  { icon: '📚', title: 'Continuous Learning',    desc: 'We stay ahead so you stay ahead.' },
  { icon: '🌍', title: 'Community Impact',       desc: 'We grow by helping your community grow.' },
  { icon: '✨', title: 'Bold Creativity',        desc: 'We craft work that stops scrolls and starts conversations.' },
  { icon: '🤝', title: 'Proactive Support',      desc: 'We anticipate your needs before you ask.' },
];

function TeamCard({ member, color }) {
  const tiltRef = use3DTilt();
  const { name, role, bio, photo, social } = member;
  const initials = getInitials(member.initials || name);

  return (
    <div
      ref={tiltRef}
      className="team-card morph-card"
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 4px 20px rgba(40,59,144,.08)',
        transition: 'border-color .3s, transform .3s, box-shadow .3s',
        opacity: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ height: 260, background: `linear-gradient(135deg, ${color}, ${color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {photo ? (
          <img src={photo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
        ) : (
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,.2)', border: '3px solid rgba(255,255,255,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: '1.5rem', color: '#fff' }}>
            {initials}
          </div>
        )}
      </div>
      <div style={{ padding: '18px 20px', borderTop: `3px solid ${BRAND.orange}`, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h4 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: BRAND.blue, marginBottom: 4 }}>{name}</h4>
        <p style={{ color: BRAND.orange, fontSize: '.83rem', fontWeight: 600 }}>{role}</p>
        {bio && (
          <p style={{ color: BRAND.gray, fontSize: '.8rem', lineHeight: 1.5, marginTop: 8, fontStyle: 'italic', flex: 1 }}>
            "{bio}"
          </p>
        )}
        {social && (social.linkedin || social.twitter || social.instagram) && (
          <div style={{ display: 'flex', gap: 12, marginTop: 14, borderTop: '1px solid #f0f2f7', paddingTop: 10 }}>
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: BRAND.blue, fontSize: '.85rem', textDecoration: 'none', transition: 'color .2s' }}
                 onMouseEnter={e => e.currentTarget.style.color = BRAND.orange}
                 onMouseLeave={e => e.currentTarget.style.color = BRAND.blue}>
                LinkedIn
              </a>
            )}
            {social.twitter && (
              <a href={social.twitter} target="_blank" rel="noopener noreferrer" style={{ color: BRAND.blue, fontSize: '.85rem', textDecoration: 'none', transition: 'color .2s' }}
                 onMouseEnter={e => e.currentTarget.style.color = BRAND.orange}
                 onMouseLeave={e => e.currentTarget.style.color = BRAND.blue}>
                Twitter
              </a>
            )}
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" style={{ color: BRAND.blue, fontSize: '.85rem', textDecoration: 'none', transition: 'color .2s' }}
                 onMouseEnter={e => e.currentTarget.style.color = BRAND.orange}
                 onMouseLeave={e => e.currentTarget.style.color = BRAND.blue}>
                Instagram
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AboutPage() {
  useSmoothScroll();
  useScrollAnimations();
  const heroRef = useRef(null);

  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-hero-text > *',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: .15, duration: .8, ease: 'power3.out', delay: .2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    api.get('/team')
      .then(res => {
        if (res.data && res.data.length > 0) {
          const sorted = res.data.sort((a, b) => (a.order || 0) - (b.order || 0));
          setTeam(sorted);
        } else {
          setTeam(FALLBACK_TEAM);
        }
      })
      .catch(err => {
        console.error('Error fetching team members:', err);
        setTeam(FALLBACK_TEAM);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && team.length > 0) {
      const timer = setTimeout(() => {
        gsap.fromTo('.team-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.team-grid',
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [team, loading]);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} style={{
        minHeight: '60vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(135deg, ${BRAND.blueDark}, ${BRAND.blue})`,
        position: 'relative', overflow: 'hidden',
      }}>
        <HeroCarousel />
        <div style={{ position: 'absolute', inset: 0, opacity: .01, backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div style={{ position: 'absolute', right: -100, bottom: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(248,149,33,.07)' }} />
        <div className="container" style={{ paddingTop: 130, paddingBottom: 80, position: 'relative', zIndex: 1 }}>
          <div className="about-hero-text">
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '.72rem', letterSpacing: '.22em', color: BRAND.orange, textTransform: 'uppercase', marginBottom: 12 }}>About Us</p>
            <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(2.4rem,5vw,4rem)', color: '#fff', lineHeight: 1.1, maxWidth: 700, marginBottom: 20 }}>
              We Make the <span style={{ color: BRAND.orange }}>Invisible Visible.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.7)', maxWidth: 560, lineHeight: 1.9, fontSize: '1rem' }}>
              A full-stack marketing agency born from the belief that technology and creativity should work together — not separately.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 64, alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="gs-left" style={{ flex: '1 1 420px' }}>
              <div style={{ borderRadius: 24, height: 420, background: `linear-gradient(135deg, ${BRAND.blue}, ${BRAND.blueLight})`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: .07 }}>
                  {Array.from({ length: 180 }).map((_, i) => (
                    <div key={i} style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: '#fff', left: (i % 15) * 32 + 8, top: Math.floor(i / 15) * 32 + 8 }} />
                  ))}
                </div>
                <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <Logo size={120} textScale={1.6} dark />
                  <p style={{ color: 'rgba(255,255,255,.7)', marginTop: 24, fontSize: '.9rem', maxWidth: 260, lineHeight: 1.8, margin: '24px auto 0' }}>
                    "Your success is our strategy."
                  </p>
                </div>
              </div>
            </div>
            <div style={{ flex: '1 1 440px' }}>
              <p className="label gs-up">Our Story</p>
              <h2 className="gs-up" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: BRAND.blue, lineHeight: 1.2, marginBottom: 20 }}>
                Born From a <span style={{ color: BRAND.orange }}>Simple Belief.</span>
              </h2>
              <p className="gs-up" style={{ color: BRAND.gray, lineHeight: 1.9, marginBottom: 18 }}>
                Spotted Point Media was born from the frustration of watching businesses struggle with fragmented solutions. You had beautiful websites that crashed, powerful networks no one understood, and ads that never converted.
              </p>
              <p className="gs-up" style={{ color: BRAND.gray, lineHeight: 1.9, marginBottom: 18 }}>
                We built something different — a full-stack agency that speaks both technology and creativity with equal fluency. Because your business needs both to thrive.
              </p>
              <p className="gs-up" style={{ color: BRAND.gray, lineHeight: 1.9, marginBottom: 32 }}>
                Today we serve small businesses, startups, corporates, and organisations across Ghana and beyond — making them visible, irresistible, and unstoppable.
              </p>
              <div style={{ display: 'flex', gap: 32 }}>
                {[{ val: '8+', label: 'Years' }, { val: '500+', label: 'Clients' }, { val: '1K+', label: 'Projects' }].map(({ val, label }) => (
                  <div key={label} className="gs-up">
                    <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: '2.2rem', color: BRAND.orange }}>{val}</div>
                    <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: '.83rem', color: BRAND.gray }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section" style={{ background: BRAND.offWhite }}>
        <div className="container">
          <div className="grid-2">
            {[
              { label: 'Our Vision', icon: '🔭', bg: BRAND.blue, text: 'To be the first partner businesses turn to when they are ready to stop guessing and start growing. A world where every determined business owner moves through the digital space with clarity, confidence, and control.' },
              { label: 'Our Mission', icon: '🎯', bg: BRAND.orange, text: 'We empower businesses to take command of their digital presence by making the complex simple and the invisible visible — weaving together the systems that keep you secure with the creativity that makes you irresistible.' },
            ].map(({ label, icon, bg, text }) => (
              <div key={label} className="gs-up" style={{ background: bg, borderRadius: 24, padding: '44px 36px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: -30, bottom: -30, fontSize: '8rem', opacity: .06 }}>{icon}</div>
                <div style={{ fontSize: '2.2rem', marginBottom: 18 }}>{icon}</div>
                <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, color: '#fff', fontSize: '1.4rem', marginBottom: 16 }}>{label}</h3>
                <p style={{ color: 'rgba(255,255,255,.8)', lineHeight: 1.9, fontSize: '.95rem' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 52px' }}>
            <p className="label gs-up">What Drives Us</p>
            <h2 className="gs-up" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: BRAND.blue }}>
              Our Core <span style={{ color: BRAND.orange }}>Values</span>
            </h2>
          </div>
          <div className="gs-stagger grid-3">
            {VALUES.map(({ icon, title, desc }) => (
              <div key={title} className="card" style={{ padding: '28px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: 14 }}>{icon}</div>
                <h4 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: BRAND.blue, marginBottom: 10 }}>{title}</h4>
                <p style={{ color: BRAND.gray, fontSize: '.88rem', lineHeight: 1.8 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: BRAND.offWhite }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 52px' }}>
            <p className="label gs-up">The People</p>
            <h2 className="gs-up" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: BRAND.blue }}>
              Meet the <span style={{ color: BRAND.orange }}>Team</span>
            </h2>
          </div>
          <div className="team-grid grid-4">
            <style>{`
              @keyframes teamPulse {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
              }
              .pulse {
                animation: teamPulse 1.5s infinite ease-in-out;
              }
            `}</style>

            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ borderRadius: 18, overflow: 'hidden', background: '#fff', boxShadow: '0 4px 20px rgba(40,59,144,.08)', height: 280, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: 180, background: '#f0f2f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#e1e4ec' }} className="pulse" />
                  </div>
                  <div style={{ padding: '18px 20px', borderTop: `3px solid ${BRAND.orange}33`, flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ height: 16, width: '70%', background: '#f0f2f7', borderRadius: 4 }} className="pulse" />
                    <div style={{ height: 12, width: '40%', background: '#f0f2f7', borderRadius: 4 }} className="pulse" />
                  </div>
                </div>
              ))
            ) : (
              team.map((member, index) => {
                const color = COLORS[index % COLORS.length];
                return (
                  <TeamCard key={member._id || member.name} member={member} color={color} />
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: BRAND.blue, padding: '80px 24px', textAlign: 'center' }}>
        <h2 className="gs-up" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#fff', marginBottom: 16 }}>
          Ready to Work With <span style={{ color: BRAND.orange }}>Us?</span>
        </h2>
        <p className="gs-up" style={{ color: 'rgba(255,255,255,.7)', marginBottom: 32, fontSize: '1rem' }}>Let's start a conversation about your growth.</p>
        <Link to="/contact" className="btn btn-primary gs-up">Get in Touch →</Link>
      </section>

      <Footer />
    </>
  );
}