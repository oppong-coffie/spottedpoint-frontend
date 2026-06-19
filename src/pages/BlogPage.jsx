import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useSmoothScroll, useScrollAnimations } from '../hooks/useGSAP';
import { BRAND } from '../utils/constants';
import api from '../api/axios';
import HeroCarousel from '../components/ui/HeroCarousel';

const FALLBACK = [
  { _id: 1, slug: '#', title: '5 Ways to Make Your Brand Unforgettable', excerpt: 'In a crowded market, visibility is everything. Here are five proven strategies to make your brand the one people remember.', tag: 'Branding', readTime: '5 min read', createdAt: '2025-05-20' },
  { _id: 2, slug: '#', title: 'Why Evidence-Led Marketing Beats Guesswork Every Time', excerpt: 'Pretty designs mean nothing without data. Learn how to build campaigns that are backed by evidence and built for results.', tag: 'Strategy', readTime: '7 min read', createdAt: '2025-05-10' },
  { _id: 3, slug: '#', title: 'The Complete Guide to a Bulletproof Digital Presence', excerpt: 'From your website to your social channels — learn how to build a digital presence that works for you 24 hours a day.', tag: 'Digital Marketing', readTime: '9 min read', createdAt: '2025-04-28' },
];

export default function BlogPage() {
  useSmoothScroll();
  useScrollAnimations();

  const [posts, setPosts]   = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/blog').then(r => setPosts(r.data)).catch(() => setPosts([])).finally(() => setLoading(false));
  }, []);

  const display  = posts.length > 0 ? posts : FALLBACK;
  const tags     = ['All', ...new Set(display.map(p => p.tag).filter(Boolean))];
  const filtered = filter === 'All' ? display : display.filter(p => p.tag === filter);

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
          'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1400&q=85',
          'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1400&q=85',
          'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=85'
        ]} />
        <div style={{ position: 'absolute', inset: 0, opacity: .01, backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '.72rem', letterSpacing: '.22em', color: BRAND.orange, textTransform: 'uppercase', marginBottom: 10 }}>Insights</p>
          <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(2.2rem,5vw,3.8rem)', color: '#fff', marginBottom: 16 }}>
            Latest <span style={{ color: BRAND.orange }}>Articles</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.65)', maxWidth: 520, margin: '0 auto', lineHeight: 1.85 }}>
            Insights on branding, digital marketing, technology, and business growth — from our team to yours.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          {/* Filter */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 48, justifyContent: 'center' }}>
            {tags.map(t => (
              <button key={t} onClick={() => setFilter(t)} style={{
                padding: '9px 20px', borderRadius: 50, cursor: 'pointer',
                fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.82rem',
                background: filter === t ? BRAND.orange : '#fff',
                color: filter === t ? '#fff' : BRAND.blue,
                border: `1px solid ${filter === t ? BRAND.orange : BRAND.blue}25`,
                transition: 'all .22s',
              }}>{t}</button>
            ))}
          </div>

          {loading && <p style={{ textAlign: 'center', color: BRAND.gray, padding: '60px 0' }}>Loading articles...</p>}

          <div className="gs-stagger grid-3">
            {filtered.map((post) => (
              <Link key={post._id} to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div className="card" style={{ overflow: 'hidden', cursor: 'pointer' }}>
                  {/* Cover */}
                  <div style={{ height: 200, background: post.coverImage ? `url(${post.coverImage}) center/cover` : `linear-gradient(135deg, ${BRAND.blue}, ${BRAND.blueDark})`, position: 'relative', overflow: 'hidden' }}>
                    {!post.coverImage && (
                      <div style={{ position: 'absolute', inset: 0, opacity: .1 }}>
                        {Array.from({ length: 18 }).map((_, j) => <div key={j} style={{ position: 'absolute', width: 5, height: 5, borderRadius: '50%', background: '#fff', left: (j % 6) * 60 + 15, top: Math.floor(j / 6) * 60 + 15 }} />)}
                      </div>
                    )}
                    {post.tag && (
                      <div style={{ position: 'absolute', top: 16, left: 16, background: BRAND.orange, borderRadius: 50, padding: '4px 14px', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.72rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '.08em' }}>
                        {post.tag}
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div style={{ padding: '22px 22px 26px' }}>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                      <span style={{ color: BRAND.gray, fontSize: '.8rem' }}>{new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      {post.readTime && <span style={{ color: BRAND.orange, fontSize: '.8rem' }}>· {post.readTime}</span>}
                    </div>
                    <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: BRAND.blue, lineHeight: 1.4, marginBottom: 12, fontSize: '1.05rem' }}>
                      {post.title}
                    </h3>
                    {post.excerpt && <p style={{ color: BRAND.gray, fontSize: '.88rem', lineHeight: 1.8, marginBottom: 16 }}>{post.excerpt.substring(0, 120)}...</p>}
                    <div style={{ color: BRAND.orange, fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.83rem' }}>Read Article →</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}