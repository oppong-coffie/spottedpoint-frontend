import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useSmoothScroll, useScrollAnimations } from '../hooks/useGSAP';
import { BRAND } from '../utils/constants';
import api from '../api/axios';
import AOS from 'aos';
import use3DTilt from '../hooks/use3DTilt';
import HeroCarousel from '../components/ui/HeroCarousel';

function GalleryCard({ item, index, layoutMode, onClick }) {
  const tiltRef = use3DTilt();
  const isMasonry = layoutMode === 'masonry';

  return (
    <div
      ref={tiltRef}
      onClick={onClick}
      data-aos="fade-up"
      data-aos-delay={(index % 3) * 80}
      style={{
        breakInside: 'avoid',
        marginBottom: 24,
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'zoom-in',
        position: 'relative',
        display: isMasonry ? 'block' : 'flex',
        flexDirection: isMasonry ? 'initial' : 'column',
        background: '#fff',
        border: `1px solid rgba(40,59,144,0.06)`,
        boxShadow: '0 4px 24px rgba(6,13,31,0.02)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className="gallery-card morph-card"
    >
      {/* Media Container */}
      <div style={{ position: 'relative', height: isMasonry ? 'auto' : 210, overflow: 'hidden', background: '#f5f6fa' }}>
        {item.type === 'video' ? (
          <video className="g-img" src={item.url} style={{ width: '100%', height: isMasonry ? 'auto' : '100%', objectFit: isMasonry ? 'initial' : 'cover', display: 'block', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} muted />
        ) : (
          <img className="g-img" src={item.url} alt={item.title} style={{ width: '100%', height: isMasonry ? 'auto' : '100%', objectFit: isMasonry ? 'initial' : 'cover', display: 'block', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} loading="lazy" />
        )}
        
        {/* Floating Category Pill */}
        <span style={{
          position: 'absolute',
          top: 14,
          left: 14,
          zIndex: 5,
          fontSize: '.62rem',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          color: BRAND.blue,
          padding: '5px 12px',
          borderRadius: 30,
          fontFamily: "'Montserrat',sans-serif",
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '.06em',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
        }}>
          {item.category || 'General'}
        </span>

        {/* Icon Hover Overlay */}
        <div className="g-over" style={{ position: 'absolute', inset: 0, background: 'rgba(6, 13, 31, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.35s ease', zIndex: 2 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.22)',
            border: '1px solid rgba(255,255,255,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '1.25rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s ease'
          }} className="g-icon">
            {item.type === 'video' ? '▶' : '🔍'}
          </div>
        </div>
      </div>

      {/* Info Area */}
      <div style={{ padding: '20px 22px 24px', flex: isMasonry ? 'initial' : 1, display: isMasonry ? 'block' : 'flex', flexDirection: isMasonry ? 'initial' : 'column', justifyContent: isMasonry ? 'initial' : 'space-between' }}>
        <h4 style={{
          fontFamily: "'Montserrat',sans-serif",
          fontWeight: 800,
          fontSize: '.95rem',
          color: BRAND.blue,
          margin: '0 0 6px 0',
          lineHeight: 1.4,
        }}>
          {item.title || 'Creative Production'}
        </h4>
        <span style={{ fontSize: '.75rem', color: BRAND.gray, display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
          {item.type === 'video' ? '🎬 Film & Video' : '📷 Photography Session'}
        </span>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  useSmoothScroll();
  useScrollAnimations();

  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [layoutMode, setLayoutMode] = useState('masonry'); // 'masonry' or 'grid'

  const categories = ['All', ...new Set(items.map(i => i.category || 'General'))];

  useEffect(() => {
    api.get('/gallery')
      .then(r => setItems(r.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [filter, items, layoutMode]);

  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter);

  // Lightbox index tracking & navigation
  const currentIndex = selected ? filtered.findIndex(i => i._id === selected._id) : -1;
  
  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (currentIndex < filtered.length - 1) {
      setSelected(filtered[currentIndex + 1]);
    }
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (currentIndex > 0) {
      setSelected(filtered[currentIndex - 1]);
    }
  };

  return (
    <>
      <Navbar />

      {/* Page hero */}
      <section style={{ paddingTop: 140, paddingBottom: 80, background: `linear-gradient(135deg, ${BRAND.navy}, ${BRAND.blueDark})`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <HeroCarousel images={[
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&q=85',
          'https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=1400&q=85',
          'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1400&q=85'
        ]} />
        {/* Glow Effects */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
          <div style={{ position: 'absolute', top: '-10%', left: '15%', width: '300px', height: '300px', borderRadius: '50%', background: BRAND.orange, filter: 'blur(100px)' }} />
          <div style={{ position: 'absolute', bottom: '-20%', right: '15%', width: '400px', height: '400px', borderRadius: '50%', background: BRAND.blueLight, filter: 'blur(120px)' }} />
        </div>
        
        <div style={{ position: 'absolute', inset: 0, opacity: .01, backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
        
        <div style={{ position: 'relative', zIndex: 1 }} data-aos="fade-down" data-aos-duration="800">
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '.75rem', letterSpacing: '.25em', color: BRAND.orange, textTransform: 'uppercase', marginBottom: 12 }}>Our Portfolio</p>
          <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(2.4rem,6vw,4rem)', color: '#fff', marginBottom: 18, letterSpacing: '-0.02em' }}>
            Media <span style={{ color: BRAND.orange }}>Gallery</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.7)', maxWidth: 550, margin: '0 auto', lineHeight: 1.8, fontSize: '1rem', fontFamily: "'Poppins',sans-serif" }}>
            Explore our curated showcase of videos, photography, and brand identities crafted for brands worldwide.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: '#f8f9ff', padding: '60px 0 100px 0' }}>
        <div className="container">
          {/* Controls: Filter and Layout View */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24, marginBottom: 48 }} data-aos="fade-up" data-aos-duration="600">
            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {categories.map(c => {
                const count = c === 'All' ? items.length : items.filter(i => i.category === c).length;
                if (c !== 'All' && count === 0) return null;
                return (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    style={{
                      padding: '10px 22px',
                      borderRadius: 50,
                      cursor: 'pointer',
                      fontFamily: "'Montserrat',sans-serif",
                      fontWeight: 700,
                      fontSize: '.82rem',
                      background: filter === c ? BRAND.orange : '#fff',
                      color: filter === c ? '#fff' : BRAND.blue,
                      border: `1px solid ${filter === c ? BRAND.orange : 'rgba(40,59,144,0.12)'}`,
                      boxShadow: filter === c ? `0 6px 15px ${BRAND.orange}35` : '0 2px 6px rgba(0,0,0,0.02)',
                      transition: 'all .25s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {c} <span style={{ opacity: 0.6, fontSize: '.72rem', marginLeft: 4 }}>({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Layout Toggle */}
            <div style={{ display: 'flex', background: 'rgba(40,59,144,0.05)', padding: 4, borderRadius: 10, border: `1px solid rgba(40,59,144,0.06)` }}>
              {[
                { id: 'masonry', label: '📐 Masonry' },
                { id: 'grid', label: '⏹️ Square Grid' }
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setLayoutMode(mode.id)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 8,
                    border: 'none',
                    background: layoutMode === mode.id ? '#fff' : 'transparent',
                    color: BRAND.blue,
                    cursor: 'pointer',
                    fontSize: '.8rem',
                    fontWeight: 800,
                    fontFamily: "'Montserrat',sans-serif",
                    transition: 'all .25s ease',
                    boxShadow: layoutMode === mode.id ? '0 4px 10px rgba(40,59,144,0.08)' : 'none'
                  }}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', color: BRAND.blue, padding: '80px 0' }}>
              <div style={{ display: 'inline-block', width: 40, height: 40, border: `3.5px solid ${BRAND.orange}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin-loading 0.8s linear infinite', marginBottom: 16 }} />
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700 }}>Loading media items...</p>
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '100px 0', background: '#fff', borderRadius: 24, border: `1px dashed rgba(40,59,144,0.15)` }} data-aos="fade-up">
              <div style={{ fontSize: '4rem', marginBottom: 20 }}>🖼️</div>
              <h3 style={{ color: BRAND.blue, fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '1.2rem', marginBottom: 6 }}>No gallery items yet</h3>
              <p style={{ color: BRAND.gray, fontSize: '.9rem' }}>Check back soon to see our latest work!</p>
            </div>
          )}

          {/* Masonry or Square Grid items */}
          {!loading && filtered.length > 0 && (
            layoutMode === 'masonry' ? (
              /* MASONRY VIEW */
              <div className="gallery-masonry">
                {filtered.map((item, index) => (
                  <GalleryCard
                    key={item._id}
                    item={item}
                    index={index}
                    layoutMode="masonry"
                    onClick={() => setSelected(item)}
                  />
                ))}
              </div>
            ) : (
              /* SQUARE GRID VIEW */
              <div className="gallery-grid">
                {filtered.map((item, index) => (
                  <GalleryCard
                    key={item._id}
                    item={item}
                    index={index}
                    layoutMode="grid"
                    onClick={() => setSelected(item)}
                  />
                ))}
              </div>
            )
          )}
        </div>
      </section>

      {/* Lightbox with Arrow Navigation */}
      {selected && (
        <div 
          onClick={() => setSelected(null)} 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(6, 13, 31, 0.96)', 
            zIndex: 2000, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: 24, 
            cursor: 'zoom-out',
            backdropFilter: 'blur(15px)'
          }}
        >
          {/* Close button */}
          <button 
            onClick={() => setSelected(null)} 
            style={{ 
              position: 'absolute', 
              top: 24, 
              right: 24, 
              background: BRAND.orange, 
              color: '#fff', 
              border: 'none', 
              width: 44, 
              height: 44, 
              borderRadius: '50%', 
              cursor: 'pointer', 
              fontSize: '1.25rem', 
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            ✕
          </button>

          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <button 
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: 32,
                background: 'rgba(255,255,255,0.08)',
                border: '1.5px solid rgba(255,255,255,0.2)',
                color: '#fff',
                width: 54,
                height: 54,
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.5rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                zIndex: 10
              }}
              onMouseEnter={e => { e.currentTarget.style.background = BRAND.orange; e.currentTarget.style.borderColor = BRAND.orange; e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'none'; }}
            >
              ‹
            </button>
          )}

          {currentIndex < filtered.length - 1 && (
            <button 
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: 32,
                background: 'rgba(255,255,255,0.08)',
                border: '1.5px solid rgba(255,255,255,0.2)',
                color: '#fff',
                width: 54,
                height: 54,
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.5rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                zIndex: 10
              }}
              onMouseEnter={e => { e.currentTarget.style.background = BRAND.orange; e.currentTarget.style.borderColor = BRAND.orange; e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'none'; }}
            >
              ›
            </button>
          )}

          {/* Immersive wrapper */}
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              maxWidth: '80vw', 
              maxHeight: '85vh' 
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.7)', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {selected.type === 'video' ? (
                <video src={selected.url} controls autoPlay style={{ maxWidth: '80vw', maxHeight: '70vh', borderRadius: 24 }} />
              ) : (
                <img src={selected.url} alt={selected.title} style={{ maxWidth: '80vw', maxHeight: '70vh', objectFit: 'contain' }} />
              )}
            </div>

            {/* Info details underneath in Lightbox */}
            <div style={{ marginTop: 20, textAlign: 'center', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
              <h4 style={{ fontWeight: 800, fontSize: '1.25rem', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                {selected.title || 'Creative Showcase'}
              </h4>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '.72rem', background: `${BRAND.orange}33`, color: BRAND.orange, padding: '3px 12px', borderRadius: 20, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                  {selected.category || 'General'}
                </span>
                <span style={{ opacity: 0.5, fontSize: '.8rem' }}>
                  Item {currentIndex + 1} of {filtered.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Page Hover Styles & Spin Loader Animations */}
      <style>{`
        .gallery-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 36px rgba(6, 13, 31, 0.08) !important;
        }
        .gallery-card:hover .g-img {
          transform: scale(1.06);
        }
        .gallery-card:hover .g-over {
          opacity: 1 !important;
        }
        .gallery-card:hover .g-icon {
          transform: scale(1.08);
        }
        @keyframes spin-loading {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <Footer />
    </>
  );
}