import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useSmoothScroll, useScrollAnimations } from '../hooks/useGSAP';
import { BRAND } from '../utils/constants';

const SERVICES = [
  {
    icon: '🎯', title: 'Brand Strategy & Identity',
    desc: 'A powerful brand is more than a logo. We build complete brand systems — from strategy and positioning to visual identity, guidelines, and brand voice that commands attention and earns trust.',
    features: ['Logo Design & Brand Mark', 'Brand Guidelines & Style Guide', 'Visual Identity System', 'Brand Strategy & Positioning', 'Stationery & Collateral Design'],
  },
  {
    icon: '🌐', title: 'Web Design & Development',
    desc: 'Your website is your most powerful sales tool. We design and build high-performance, conversion-focused websites that look stunning and work flawlessly on every device.',
    features: ['Custom Website Design', 'E-Commerce Development', 'CMS & Admin Dashboards', 'Speed & SEO Optimisation', 'Ongoing Maintenance & Support'],
  },
  {
    icon: '📈', title: 'Digital Marketing',
    desc: 'Data-driven marketing campaigns that put your business in front of the right people at the right time. Every strategy is backed by evidence and optimised for measurable growth.',
    features: ['SEO & Content Marketing', 'Google Ads & PPC', 'Social Media Advertising', 'Email Marketing Campaigns', 'Analytics & Performance Reporting'],
  },
  {
    icon: '🎬', title: 'Video Production',
    desc: 'Compelling video content that tells your story with power and clarity. From corporate films and product demos to social media clips and event coverage.',
    features: ['Corporate Video Production', 'Product & Service Demos', 'Social Media Video Content', 'Event Coverage & Highlights', 'Motion Graphics & Animation'],
  },
  {
    icon: '📱', title: 'Social Media Management',
    desc: 'We manage your social presence end-to-end — content creation, scheduling, community management, and paid campaigns — so you can focus on running your business.',
    features: ['Content Strategy & Calendar', 'Graphic Design & Copywriting', 'Community Management', 'Paid Social Campaigns', 'Monthly Analytics Reports'],
  },
  {
    icon: '🔒', title: 'IT & Cybersecurity',
    desc: 'Robust IT infrastructure and cybersecurity solutions that protect your business and keep your systems running around the clock.',
    features: ['Network Design & Installation', 'Cybersecurity Audits', 'Cloud Infrastructure Setup', 'IT Support & Maintenance', 'Data Backup & Recovery'],
  },
];

export default function ServicesPage() {
  useSmoothScroll();
  useScrollAnimations();
  const [active, setActive] = useState(0);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section style={{
        paddingTop: 130, paddingBottom: 80,
        background: `linear-gradient(135deg, ${BRAND.blueDark}, ${BRAND.blue})`,
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: .05, backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '.72rem', letterSpacing: '.22em', color: BRAND.orange, textTransform: 'uppercase', marginBottom: 10 }}>What We Offer</p>
          <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(2.2rem,5vw,3.8rem)', color: '#fff', marginBottom: 16 }}>
            Our <span style={{ color: BRAND.orange }}>Services</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.65)', maxWidth: 520, margin: '0 auto', lineHeight: 1.85 }}>
            Full-stack solutions across marketing, technology, and creativity — everything your business needs to command its space.
          </p>
        </div>
      </section>

      {/* Services tabs */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          {/* Tab nav */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 52, justifyContent: 'center' }}>
            {SERVICES.map(({ icon, title }, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 50, cursor: 'pointer',
                fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.82rem',
                background: active === i ? BRAND.blue : '#fff',
                color: active === i ? '#fff' : BRAND.blue,
                border: `1.5px solid ${active === i ? BRAND.blue : BRAND.blue}25`,
                transition: 'all .25s',
              }}>
                <span>{icon}</span>{title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Active service detail */}
          {SERVICES.map((s, i) => i === active && (
            <div key={i} style={{ display: 'flex', gap: 56, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div className="gs-left" style={{ flex: '1 1 400px' }}>
                <div style={{ width: 72, height: 72, borderRadius: 18, background: `${BRAND.orange}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: 22 }}>
                  {s.icon}
                </div>
                <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: BRAND.blue, marginBottom: 18 }}>
                  {s.title}
                </h2>
                <p style={{ color: BRAND.gray, lineHeight: 1.9, fontSize: '.97rem', marginBottom: 32 }}>{s.desc}</p>
                <Link to="/contact" className="btn btn-primary">Get a Quote →</Link>
              </div>
              <div className="gs-right" style={{ flex: '1 1 340px' }}>
                <div style={{ background: BRAND.offWhite, borderRadius: 20, padding: '32px 28px', border: `1px solid ${BRAND.blue}10` }}>
                  <h4 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: BRAND.blue, marginBottom: 20, fontSize: '1rem' }}>What's Included</h4>
                  {s.features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                      <div style={{ width: 26, height: 26, borderRadius: '50%', background: `${BRAND.orange}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ color: BRAND.orange, fontSize: '.72rem', fontWeight: 900 }}>✓</span>
                      </div>
                      <p style={{ color: BRAND.blue, fontFamily: "'Poppins',sans-serif", fontSize: '.92rem', fontWeight: 500 }}>{f}</p>
                    </div>
                  ))}
                  <Link to="/contact" className="btn btn-outline" style={{ marginTop: 24, width: '100%', justifyContent: 'center' }}>
                    Start a Project
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All services grid */}
      <section className="section" style={{ background: BRAND.offWhite }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p className="label gs-up">Full Overview</p>
            <h2 className="gs-up" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: BRAND.blue }}>
              Everything We <span style={{ color: BRAND.orange }}>Offer</span>
            </h2>
          </div>
          <div className="gs-stagger grid-3">
            {SERVICES.map(({ icon, title, desc }) => (
              <div key={title} className="card" style={{ padding: '30px 26px' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 14 }}>{icon}</div>
                <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: BRAND.blue, marginBottom: 10, fontSize: '1.05rem' }}>{title}</h3>
                <p style={{ color: BRAND.gray, fontSize: '.88rem', lineHeight: 1.8 }}>{desc.substring(0, 120)}...</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: BRAND.orange, padding: '80px 24px', textAlign: 'center' }}>
        <h2 className="gs-up" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#fff', marginBottom: 16 }}>
          Not Sure Where to Start?
        </h2>
        <p className="gs-up" style={{ color: 'rgba(255,255,255,.85)', marginBottom: 32 }}>Let's talk — we'll recommend the right service for your goals.</p>
        <Link to="/contact" className="btn btn-white gs-up">Book a Free Consultation →</Link>
      </section>

      <Footer />
    </>
  );
}