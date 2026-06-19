import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useSmoothScroll, useScrollAnimations } from '../hooks/useGSAP';
import { BRAND } from '../utils/constants';
import use3DTilt from '../hooks/use3DTilt';
import HeroCarousel from '../components/ui/HeroCarousel';
import ContactForm from '../components/ui/ContactForm';

const ACADEMY_SOCIALS = [
  { name: 'Facebook Page', url: 'https://facebook.com/spottedpointmedia', brandColor: '#1877F2', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { name: 'WhatsApp Channel', url: 'https://wa.me/233242760809', brandColor: '#25D366', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> },
  { name: 'TikTok', url: 'https://tiktok.com/@spottedpointmedia', brandColor: '#000000', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg> },
  { name: 'Instagram', url: 'https://instagram.com/spottedpointmedia', brandColor: '#E1306C', svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { name: 'X (Twitter)', url: 'https://x.com/spottedpointmed', brandColor: '#0f1419', svg: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg> }
];

export default function ContactPage() {
  useSmoothScroll();
  useScrollAnimations();

  const infoRef = use3DTilt();

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section style={{
        paddingTop: 130, paddingBottom: 80,
        background: `linear-gradient(135deg, ${BRAND.blueDark}, ${BRAND.blue})`,
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <HeroCarousel images={[
          'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=85',
          'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1400&q=85',
          'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1400&q=85'
        ]} />
        <div style={{ position: 'absolute', inset: 0, opacity: .01, backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div style={{ position: 'absolute', right: -100, bottom: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(248,149,33,.07)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '.72rem', letterSpacing: '.22em', color: BRAND.orange, textTransform: 'uppercase', marginBottom: 12 }}>Connect</p>
          <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(2.4rem,5vw,4rem)', color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
            Let's Start a <span style={{ color: BRAND.orange }}>Conversation.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.7)', maxWidth: 560, margin: '0 auto', lineHeight: 1.9, fontSize: '1rem' }}>
            We're here to make your brand visible, irresistible, and unstoppable. Tell us about your goals or enquiry.
          </p>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            
            {/* Left Column: Details & Academy handles */}
            <div className="gs-left" style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: 28 }}>
              
              {/* Contact Info Card */}
              <div 
                ref={infoRef}
                className="morph-card"
                style={{ 
                  background: BRAND.offWhite, 
                  borderRadius: 24, 
                  padding: '40px 36px', 
                  border: `1px solid ${BRAND.blue}10`,
                  boxShadow: '0 8px 30px rgba(40,59,144,0.04)'
                }}
              >
                <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, color: BRAND.blue, fontSize: '1.4rem', marginBottom: 24 }}>Spotted Point Media</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {[
                    { icon: '📍', title: 'Location', val: 'Teiman-Abokobi, Accra, Ghana' },
                    { icon: '📞', title: 'Phone', val: '+233 242 760 809' },
                    { icon: '✉️', title: 'Email', val: 'spottedpointmedia@gmail.com' }
                  ].map(({ icon, title, val }) => (
                    <div key={title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <div style={{ fontSize: '1.6rem', marginTop: 2 }}>{icon}</div>
                      <div>
                        <h5 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '.75rem', color: BRAND.orange, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>{title}</h5>
                        <p style={{ color: BRAND.blue, fontFamily: "'Poppins',sans-serif", fontSize: '.95rem', fontWeight: 500 }}>{val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academy Spotlight Card */}
              <div 
                className="morph-card"
                style={{ 
                  background: `linear-gradient(135deg, ${BRAND.blueDark}, ${BRAND.blue})`, 
                  borderRadius: 24, 
                  padding: '40px 36px', 
                  color: '#fff',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 12px 36px rgba(40,59,144,0.15)'
                }}
              >
                <div style={{ position: 'absolute', right: -20, bottom: -20, fontSize: '7rem', opacity: .06 }}>🎓</div>
                <span style={{ display: 'inline-block', background: BRAND.orange, color: '#fff', padding: '4px 12px', borderRadius: 50, fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '.64rem', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16 }}>Academy Launching Soon</span>
                <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, color: '#fff', fontSize: '1.4rem', marginBottom: 12 }}>Spotted Point Academy</h3>
                <p style={{ color: 'rgba(255,255,255,.8)', fontSize: '.88rem', lineHeight: 1.8, marginBottom: 24 }}>
                  Unlock your potential. Join our upcoming premium courses in software development, design, and marketing. Follow our official handles for updates and free tutorials.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <h5 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '.72rem', color: BRAND.orange, textTransform: 'uppercase', letterSpacing: '.08em' }}>Follow Our Handles</h5>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {ACADEMY_SOCIALS.map(({ name, url, brandColor, svg }) => (
                      <a 
                        key={name} 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        title={name} 
                        className="micro-bounce" 
                        style={{
                          width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,.1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#fff', textDecoration: 'none', transition: 'background .3s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = brandColor}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
                      >
                        {svg}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Glassmorphic form */}
            <div className="gs-right" style={{ flex: '1.2 1 450px' }}>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}