import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { BRAND } from '../../utils/constants';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
const EMPTY = { title: '', category: '', description: '', client: '', year: new Date().getFullYear().toString(), tags: '', featured: false, order: 0 };
const CATS  = ['Branding', 'Web Development', 'Digital Marketing', 'Video Production', 'IT Solutions', 'Social Media', 'Photography'];

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm]   = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [file, setFile]   = useState(null);
  const [preview, setPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving]   = useState(false);

  const load = () => api.get('/projects').then(r => setProjects(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleFile = (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.category) return toast.error('Title and category required');
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append('image', file);
      if (editing) {
        await api.put(`/projects/${editing}`, fd);
        toast.success('Project updated!');
      } else {
        await api.post('/projects', fd);
        toast.success('Project created!');
      }
      setForm(EMPTY); setFile(null); setPreview(null); setEditing(null); setShowForm(false);
      load();
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const handleEdit = (p) => {
    setForm({ title: p.title, category: p.category, description: p.description || '', client: p.client || '', year: p.year || '', tags: p.tags?.join(',') || '', featured: p.featured, order: p.order });
    setPreview(p.image || null);
    setEditing(p._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try { await api.delete(`/projects/${id}`); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  const inputS = { width: '100%', padding: '11px 14px', borderRadius: 8, border: `1.5px solid ${BRAND.blue}18`, fontFamily: "'Poppins',sans-serif", fontSize: '.9rem', color: BRAND.blue, background: '#fff', outline: 'none', boxSizing: 'border-box', marginBottom: 14 };

  return (
    <AdminLayout title="Projects Manager">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <p style={{ color: BRAND.gray }}>{projects.length} projects total</p>
        <button onClick={() => { setShowForm(!showForm); setEditing(null); setForm(EMPTY); setPreview(null); }} className="btn btn-primary">
          {showForm ? '✕ Cancel' : '+ Add Project'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 28, border: `1px solid ${BRAND.blue}10` }}>
          <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: BRAND.blue, marginBottom: 22 }}>{editing ? 'Edit Project' : 'New Project'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <input style={inputS} placeholder="Project Title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              <select style={inputS} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                <option value="">Select Category *</option>
                {CATS.map(c => <option key={c}>{c}</option>)}
              </select>
              <input style={inputS} placeholder="Client Name" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} />
              <input style={inputS} placeholder="Year (e.g. 2024)" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} />
              <input style={inputS} placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <input type="number" style={{ ...inputS, width: 100 }} placeholder="Order" value={form.order} onChange={e => setForm({ ...form, order: e.target.value })} />
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.blue, fontSize: '.88rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} /> Featured
                </label>
              </div>
            </div>
            <div>
              <textarea style={{ ...inputS, minHeight: 130, resize: 'vertical' }} placeholder="Project description..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <div style={{ border: `2px dashed ${BRAND.blue}25`, borderRadius: 10, padding: 16, textAlign: 'center', cursor: 'pointer' }} onClick={() => document.getElementById('proj-img').click()}>
                <input id="proj-img" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
                {preview ? <img src={preview} alt="Preview" style={{ width: '100%', borderRadius: 8, maxHeight: 160, objectFit: 'cover' }} /> : <div><div style={{ fontSize: '1.8rem' }}>🖼️</div><p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.gray, fontSize: '.85rem', marginTop: 8 }}>Click to add project image</p></div>}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button onClick={handleSubmit} disabled={saving} className="btn btn-primary">{saving ? 'Saving...' : editing ? 'Update Project' : 'Create Project'}</button>
            <button onClick={() => { setShowForm(false); setForm(EMPTY); setPreview(null); setEditing(null); }} className="btn btn-outline">Cancel</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: `1px solid ${BRAND.blue}10` }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: `${BRAND.blue}06`, borderBottom: `1px solid ${BRAND.blue}10` }}>
              {['Image', 'Title', 'Category', 'Client', 'Year', 'Featured', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.78rem', color: BRAND.blue, letterSpacing: '.08em', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 && (
              <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: BRAND.gray }}>No projects yet. Add your first one!</td></tr>
            )}
            {projects.map(p => (
              <tr key={p._id} style={{ borderBottom: `1px solid ${BRAND.blue}08`, transition: 'background .2s' }}
                onMouseEnter={e => e.currentTarget.style.background = `${BRAND.blue}03`}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '12px 16px' }}>
                  {p.image ? <img src={p.image} alt="" style={{ width: 52, height: 40, objectFit: 'cover', borderRadius: 6 }} /> : <div style={{ width: 52, height: 40, borderRadius: 6, background: `${BRAND.blue}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.8rem' }}>🖼️</div>}
                </td>
                <td style={{ padding: '12px 16px', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.blue, fontSize: '.9rem' }}>{p.title}</td>
                <td style={{ padding: '12px 16px' }}><span style={{ background: `${BRAND.orange}15`, color: BRAND.orange, padding: '4px 10px', borderRadius: 50, fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.75rem' }}>{p.category}</span></td>
                <td style={{ padding: '12px 16px', color: BRAND.gray, fontSize: '.88rem' }}>{p.client || '—'}</td>
                <td style={{ padding: '12px 16px', color: BRAND.gray, fontSize: '.88rem' }}>{p.year || '—'}</td>
                <td style={{ padding: '12px 16px' }}>{p.featured ? '⭐' : '—'}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleEdit(p)} style={{ padding: '6px 12px', borderRadius: 6, background: `${BRAND.blue}10`, border: 'none', cursor: 'pointer', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.blue, fontSize: '.78rem' }}>Edit</button>
                    <button onClick={() => handleDelete(p._id)} style={{ padding: '6px 12px', borderRadius: 6, background: '#fee2e2', border: 'none', cursor: 'pointer', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: '#dc2626', fontSize: '.78rem' }}>Delete</button>
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