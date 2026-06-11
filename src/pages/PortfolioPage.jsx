import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useSmoothScroll, useScrollAnimations } from '../hooks/useGSAP';
import { BRAND } from '../utils/constants';
import api from '../api/axios';

const CATS = ['All', 'Branding', 'Web Development', 'Digital Marketing', 'Video Production', 'IT Solutions'];

const FALLBACK = [
  { _id: 1, title: 'TechNova Brand Identity',    category: 'Branding',          client: 'TechNova Ltd',   year: '2024', image: '' },
  { _id: 2, title: 'Horizon E-Commerce Platform', category: 'Web Development',   client: 'Horizon Corp',   year: '2024', image: '' },
  { _id: 3, title: 'Social Growth Campaign',      category: 'Digital Marketing', client: 'BrandCo Ghana',  year: '2023', image: '' },
  { _id: 4, title: 'Corporate Documentary',       category: 'Video Production',  client: 'MediaHub Ltd',   year: '2024', image: '' },
  { _id: 5, title: 'Network Infrastructure',      category: 'IT Solutions',      client: 'DigitalPro',     year: '2023', image: '' },
  { _id: 6, title: 'SEO & Growth Strategy',       category: 'Digital Marketing', client: 'Elevate Co',     year: '2024', image: '' },
];

export default function PortfolioPage() {
  useSmoothScroll();
  useScrollAnimations();

  const [projects, setProjects] = useState([]);
  const [filter, setFilter]     = useState('All');
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    api.get('/projects').then(r => setProjects(r.data)).catch(() => setProjects([])).finally(() => setLoading(false));
  }, []);

  const display  = projects.length > 0 ? projects : FALLBACK;
  const filtered = filter === 'All' ? display : display.filter(p => p.category === filter);

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
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '.72rem', letterSpacing: '.22em', color: BRAND.orange, textTransform: 'uppercase', marginBottom: 10 }}>Our Work</p>
          <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(2.2rem,5vw,3.8rem)', color: '#fff', marginBottom: 16 }}>
            Work That <span style={{ color: BRAND.orange }}>Speaks.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.65)', maxWidth: 520, margin: '0 auto', lineHeight: 1.85 }}>
            A selection of projects we've delivered — each one a story of strategy, creativity, and measurable results.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          {/* Filter */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 48, justifyContent: 'center' }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{
                padding: '9px 20px', borderRadius: 50, cursor: 'pointer',
                fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.82rem',
                background: filter === c ? BRAND.orange : '#fff',
                color: filter === c ? '#fff' : BRAND.blue,
                border: `1px solid ${filter === c ? BRAND.orange : BRAND.blue}25`,
                transition: 'all .22s',
              }}>{c}</button>
            ))}
          </div>

          {loading && <p style={{ textAlign: 'center', color: BRAND.gray, padding: '60px 0' }}>Loading projects...</p>}

          {/* Grid */}
          <div className="gs-stagger grid-3">
            {filtered.map((p) => (
              <div key={p._id} style={{
                borderRadius: 20, overflow: 'hidden', position: 'relative', cursor: 'pointer',
                boxShadow: '0 4px 24px rgba(40,59,144,.1)', transition: 'transform .3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.querySelector('.pov').style.opacity = '1'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.querySelector('.pov').style.opacity = '0'; }}>
                {/* Image or gradient */}
                <div style={{ height: 260, background: p.image ? `url(${p.image}) center/cover` : `linear-gradient(135deg, ${BRAND.blue}, ${BRAND.blueDark})`, position: 'relative' }}>
                  {!p.image && (
                    <div style={{ position: 'absolute', inset: 0, opacity: .1 }}>
                      {Array.from({ length: 24 }).map((_, j) => <div key={j} style={{ position: 'absolute', width: 5, height: 5, borderRadius: '50%', background: '#fff', left: (j % 8) * 50 + 10, top: Math.floor(j / 8) * 55 + 10 }} />)}
                    </div>
                  )}
                  <div className="pov" style={{ position: 'absolute', inset: 0, background: `${BRAND.orange}e0`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity .3s' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '1.3rem', color: '#fff' }}>→</div>
                      <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: '#fff' }}>View Project</p>
                    </div>
                  </div>
                </div>
                {/* Info */}
                <div style={{ background: '#fff', padding: '20px 22px', borderTop: `3px solid ${BRAND.orange}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ background: `${BRAND.orange}15`, color: BRAND.orange, padding: '4px 12px', borderRadius: 50, fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>{p.category}</span>
                    <span style={{ color: BRAND.gray, fontSize: '.8rem' }}>{p.year}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: BRAND.blue, fontSize: '1.05rem', marginBottom: 4 }}>{p.title}</h3>
                  {p.client && <p style={{ color: BRAND.gray, fontSize: '.83rem' }}>Client: {p.client}</p>}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>📁</div>
              <p style={{ color: BRAND.gray, fontFamily: "'Montserrat',sans-serif", fontWeight: 700 }}>No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: BRAND.blue, padding: '80px 24px', textAlign: 'center' }}>
        <h2 className="gs-up" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#fff', marginBottom: 16 }}>
          Want to Be Our Next <span style={{ color: BRAND.orange }}>Success Story?</span>
        </h2>
        <p className="gs-up" style={{ color: 'rgba(255,255,255,.7)', marginBottom: 32 }}>Let's work together and build something remarkable.</p>
        <Link to="/contact" className="btn btn-primary gs-up">Start a Project →</Link>
      </section>

      <Footer />
    </>
  );
}