import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { BRAND } from '../../utils/constants';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const EMPTY = { title: '', excerpt: '', content: '', tag: '', author: 'Spotted Point Media', readTime: '', published: false };

export default function AdminBlog() {
  const [posts, setPosts]     = useState([]);
  const [form, setForm]       = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [file, setFile]       = useState(null);
  const [preview, setPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving]   = useState(false);

  const load = () => api.get('/blog').then(r => setPosts(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleFile = (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async () => {
    if (!form.title) return toast.error('Title is required');
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append('coverImage', file);
      if (editing) {
        await api.put(`/blog/${editing}`, fd);
        toast.success('Post updated!');
      } else {
        await api.post('/blog', fd);
        toast.success('Post created!');
      }
      setForm(EMPTY); setFile(null); setPreview(null); setEditing(null); setShowForm(false);
      load();
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const handleEdit = (p) => {
    setForm({ title: p.title, excerpt: p.excerpt || '', content: p.content || '', tag: p.tag || '', author: p.author || 'Spotted Point Media', readTime: p.readTime || '', published: p.published });
    setPreview(p.coverImage || null);
    setEditing(p._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try { await api.delete(`/blog/${id}`); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  const toggle = async (p) => {
    try {
      const fd = new FormData();
      fd.append('published', String(!p.published));
      await api.put(`/blog/${p._id}`, fd);
      toast.success(p.published ? 'Post unpublished' : 'Post published!');
      load();
    } catch { toast.error('Toggle failed'); }
  };

  const iS = { width: '100%', padding: '11px 14px', borderRadius: 8, border: `1.5px solid ${BRAND.blue}18`, fontFamily: "'Poppins',sans-serif", fontSize: '.9rem', color: BRAND.blue, background: '#fff', outline: 'none', boxSizing: 'border-box', marginBottom: 14 };

  return (
    <AdminLayout title="Blog Manager">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <p style={{ color: BRAND.gray }}>{posts.length} posts · {posts.filter(p => p.published).length} published</p>
        <button onClick={() => { setShowForm(!showForm); setEditing(null); setForm(EMPTY); setPreview(null); }} className="btn btn-primary">
          {showForm ? '✕ Cancel' : '+ New Post'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 28, border: `1px solid ${BRAND.blue}10` }}>
          <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: BRAND.blue, marginBottom: 22 }}>{editing ? 'Edit Post' : 'New Blog Post'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <input style={iS} placeholder="Post Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              <div style={{ display: 'flex', gap: 12 }}>
                <input style={{ ...iS, flex: 1 }} placeholder="Tag (e.g. Branding)" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} />
                <input style={{ ...iS, flex: 1 }} placeholder="Read time (e.g. 5 min)" value={form.readTime} onChange={e => setForm({ ...form, readTime: e.target.value })} />
              </div>
              <input style={iS} placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
              <textarea style={{ ...iS, minHeight: 90, resize: 'vertical' }} placeholder="Excerpt / Short description..." value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.blue, fontSize: '.88rem', cursor: 'pointer', marginBottom: 14 }}>
                <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} />
                Publish immediately
              </label>
            </div>
            <div>
              <textarea style={{ ...iS, minHeight: 200, resize: 'vertical' }} placeholder="Full article content (HTML supported)..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
              <div style={{ border: `2px dashed ${BRAND.blue}25`, borderRadius: 10, padding: 14, textAlign: 'center', cursor: 'pointer', marginBottom: 14 }} onClick={() => document.getElementById('blog-img').click()}>
                <input id="blog-img" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
                {preview ? <img src={preview} alt="Cover" style={{ width: '100%', borderRadius: 8, maxHeight: 140, objectFit: 'cover' }} /> : <div><div style={{ fontSize: '1.5rem' }}>🖼️</div><p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.gray, fontSize: '.82rem', marginTop: 6 }}>Click to add cover image</p></div>}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={handleSubmit} disabled={saving} className="btn btn-primary">{saving ? 'Saving...' : editing ? 'Update Post' : 'Create Post'}</button>
            <button onClick={() => { setShowForm(false); setForm(EMPTY); setPreview(null); setEditing(null); }} className="btn btn-outline">Cancel</button>
          </div>
        </div>
      )}

      {/* Posts table */}
      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: `1px solid ${BRAND.blue}10` }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: `${BRAND.blue}06`, borderBottom: `1px solid ${BRAND.blue}10` }}>
              {['Cover', 'Title', 'Tag', 'Author', 'Status', 'Date', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.75rem', color: BRAND.blue, letterSpacing: '.08em', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 && (
              <tr><td colSpan={7} style={{ padding: 40, textAlign: 'center', color: BRAND.gray }}>No posts yet. Create your first blog post!</td></tr>
            )}
            {posts.map(p => (
              <tr key={p._id} style={{ borderBottom: `1px solid ${BRAND.blue}08` }}
                onMouseEnter={e => e.currentTarget.style.background = `${BRAND.blue}03`}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '12px 16px' }}>
                  {p.coverImage ? <img src={p.coverImage} alt="" style={{ width: 52, height: 38, objectFit: 'cover', borderRadius: 6 }} /> : <div style={{ width: 52, height: 38, borderRadius: 6, background: `${BRAND.blue}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem' }}>📝</div>}
                </td>
                <td style={{ padding: '12px 16px', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.blue, fontSize: '.88rem', maxWidth: 200 }}>{p.title}</td>
                <td style={{ padding: '12px 16px' }}>{p.tag && <span style={{ background: `${BRAND.orange}15`, color: BRAND.orange, padding: '3px 10px', borderRadius: 50, fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.72rem' }}>{p.tag}</span>}</td>
                <td style={{ padding: '12px 16px', color: BRAND.gray, fontSize: '.85rem' }}>{p.author}</td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => toggle(p)} style={{ padding: '4px 12px', borderRadius: 50, border: 'none', cursor: 'pointer', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.72rem', background: p.published ? '#d1fae5' : '#fee2e2', color: p.published ? '#059669' : '#dc2626', transition: 'all .2s' }}>
                    {p.published ? '✓ Published' : '○ Draft'}
                  </button>
                </td>
                <td style={{ padding: '12px 16px', color: BRAND.gray, fontSize: '.82rem' }}>{new Date(p.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleEdit(p)} style={{ padding: '6px 12px', borderRadius: 6, background: `${BRAND.blue}10`, border: 'none', cursor: 'pointer', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.blue, fontSize: '.75rem' }}>Edit</button>
                    <button onClick={() => handleDelete(p._id)} style={{ padding: '6px 12px', borderRadius: 6, background: '#fee2e2', border: 'none', cursor: 'pointer', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: '#dc2626', fontSize: '.75rem' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}