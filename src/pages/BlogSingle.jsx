import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useSmoothScroll } from '../hooks/useGSAP';
import { BRAND } from '../utils/constants';
import api from '../api/axios';

export default function BlogSingle() {
  useSmoothScroll();
  const { slug }            = useParams();
  const [post, setPost]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/blog/${slug}`).then(r => setPost(r.data)).catch(() => setPost(null)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <>
      <Navbar />
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 100 }}>
        <p style={{ color: BRAND.gray, fontFamily: "'Montserrat',sans-serif" }}>Loading article...</p>
      </div>
      <Footer />
    </>
  );

  if (!post) return (
    <>
      <Navbar />
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 100, gap: 20 }}>
        <div style={{ fontSize: '4rem' }}>📄</div>
        <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.blue, fontSize: '1.2rem' }}>Article not found.</p>
        <Link to="/blog" className="btn btn-primary">← Back to Blog</Link>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section style={{
        paddingTop: 130, paddingBottom: 60,
        background: post.coverImage ? `linear-gradient(to bottom, rgba(40,59,144,.85), rgba(26,39,96,.95)), url(${post.coverImage}) center/cover` : `linear-gradient(135deg, ${BRAND.blueDark}, ${BRAND.blue})`,
      }}>
        <div className="container" style={{ maxWidth: 800 }}>
          {post.tag && (
            <span style={{ display: 'inline-block', background: BRAND.orange, borderRadius: 50, padding: '4px 16px', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.75rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 18 }}>
              {post.tag}
            </span>
          )}
          <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#fff', lineHeight: 1.2, marginBottom: 20 }}>{post.title}</h1>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <span style={{ color: 'rgba(255,255,255,.7)', fontSize: '.85rem' }}>By {post.author || 'Spotted Point Media'}</span>
            <span style={{ color: 'rgba(255,255,255,.5)' }}>·</span>
            <span style={{ color: 'rgba(255,255,255,.7)', fontSize: '.85rem' }}>{new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            {post.readTime && <><span style={{ color: 'rgba(255,255,255,.5)' }}>·</span><span style={{ color: 'rgba(255,255,255,.7)', fontSize: '.85rem' }}>{post.readTime}</span></>}
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '60px 0 100px', background: '#fff' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          {post.excerpt && (
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 600, fontSize: '1.15rem', color: BRAND.blue, lineHeight: 1.8, marginBottom: 32, padding: '24px', background: `${BRAND.blue}05`, borderLeft: `4px solid ${BRAND.orange}`, borderRadius: '0 12px 12px 0' }}>
              {post.excerpt}
            </p>
          )}
          {post.content && (
            <div style={{ color: BRAND.gray, lineHeight: 1.9, fontSize: '.97rem' }}
              dangerouslySetInnerHTML={{ __html: post.content }} />
          )}
          {!post.content && (
            <p style={{ color: BRAND.gray, lineHeight: 1.9 }}>Full article content coming soon.</p>
          )}

          <div style={{ marginTop: 56, paddingTop: 32, borderTop: `1px solid ${BRAND.blue}10`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <Link to="/blog" className="btn btn-outline">← Back to Blog</Link>
            <Link to="/contact" className="btn btn-primary">Work With Us →</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}