import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { BRAND } from '../../utils/constants';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const EMPTY = { name: '', role: '', bio: '', order: 0, social: { linkedin: '', twitter: '', instagram: '' } };

export default function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [form, setForm]       = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [file, setFile]       = useState(null);
  const [preview, setPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving]   = useState(false);

  const load = () => api.get('/team').then(r => setMembers(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleFile = (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.role) return toast.error('Name and role are required');
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('role', form.role);
      fd.append('bio', form.bio);
      fd.append('order', form.order);
      fd.append('social', JSON.stringify(form.social));
      if (file) fd.append('photo', file);
      if (editing) {
        await api.put(`/team/${editing}`, fd);
        toast.success('Member updated!');
      } else {
        await api.post('/team', fd);
        toast.success('Member added!');
      }
      setForm(EMPTY); setFile(null); setPreview(null); setEditing(null); setShowForm(false);
      load();
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const handleEdit = (m) => {
    setForm({ name: m.name, role: m.role, bio: m.bio || '', order: m.order || 0, social: m.social || { linkedin: '', twitter: '', instagram: '' } });
    setPreview(m.photo || null);
    setEditing(m._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this team member?')) return;
    try { await api.delete(`/team/${id}`); toast.success('Removed'); load(); }
    catch { toast.error('Delete failed'); }
  };

  const iS = { width: '100%', padding: '11px 14px', borderRadius: 8, border: `1.5px solid ${BRAND.blue}18`, fontFamily: "'Poppins',sans-serif", fontSize: '.9rem', color: BRAND.blue, background: '#fff', outline: 'none', boxSizing: 'border-box', marginBottom: 14 };

  return (
    <AdminLayout title="Team Manager">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <p style={{ color: BRAND.gray }}>{members.length} team members</p>
        <button onClick={() => { setShowForm(!showForm); setEditing(null); setForm(EMPTY); setPreview(null); }} className="btn btn-primary">
          {showForm ? '✕ Cancel' : '+ Add Member'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 28, border: `1px solid ${BRAND.blue}10` }}>
          <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: BRAND.blue, marginBottom: 22 }}>{editing ? 'Edit Member' : 'Add Team Member'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <input style={iS} placeholder="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input style={iS} placeholder="Role / Position *" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
              <textarea style={{ ...iS, minHeight: 100, resize: 'vertical' }} placeholder="Short bio..." value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
              <input type="number" style={iS} placeholder="Display Order (0, 1, 2...)" value={form.order} onChange={e => setForm({ ...form, order: e.target.value })} />
            </div>
            <div>
              {/* Photo upload */}
              <div style={{ border: `2px dashed ${BRAND.blue}25`, borderRadius: 12, padding: 16, textAlign: 'center', cursor: 'pointer', marginBottom: 14, minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => document.getElementById('team-photo').click()}>
                <input id="team-photo" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
                {preview ? (
                  <img src={preview} alt="Preview" style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <div>
                    <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>👤</div>
                    <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.gray, fontSize: '.82rem' }}>Click to upload photo</p>
                  </div>
                )}
              </div>
              {/* Social links */}
              <h5 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.blue, fontSize: '.8rem', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>Social Links (optional)</h5>
              <input style={iS} placeholder="LinkedIn URL" value={form.social.linkedin} onChange={e => setForm({ ...form, social: { ...form.social, linkedin: e.target.value } })} />
              <input style={iS} placeholder="Twitter URL" value={form.social.twitter} onChange={e => setForm({ ...form, social: { ...form.social, twitter: e.target.value } })} />
              <input style={iS} placeholder="Instagram URL" value={form.social.instagram} onChange={e => setForm({ ...form, social: { ...form.social, instagram: e.target.value } })} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={handleSubmit} disabled={saving} className="btn btn-primary">{saving ? 'Saving...' : editing ? 'Update Member' : 'Add Member'}</button>
            <button onClick={() => { setShowForm(false); setForm(EMPTY); setPreview(null); setEditing(null); }} className="btn btn-outline">Cancel</button>
          </div>
        </div>
      )}

      {/* Team grid */}
      {members.length === 0 && !showForm && (
        <div style={{ background: '#fff', borderRadius: 16, padding: '60px 0', textAlign: 'center', border: `1px dashed ${BRAND.blue}20` }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>👥</div>
          <p style={{ color: BRAND.gray, fontFamily: "'Montserrat',sans-serif", fontWeight: 700 }}>No team members yet</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: 20 }}>
        {members.map(m => (
          <div key={m._id} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: `1px solid ${BRAND.blue}10`, boxShadow: '0 2px 16px rgba(40,59,144,.06)' }}>
            <div style={{ height: 160, background: `linear-gradient(135deg, ${BRAND.blue}, ${BRAND.blueLight})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {m.photo ? (
                <img src={m.photo} alt={m.name} style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,.3)' }} />
              ) : (
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,.2)', border: '3px solid rgba(255,255,255,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: '1.6rem', color: '#fff' }}>
                  {m.name.charAt(0)}
                </div>
              )}
            </div>
            <div style={{ padding: '16px 18px 20px', borderTop: `3px solid ${BRAND.orange}` }}>
              <h4 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: BRAND.blue, marginBottom: 3 }}>{m.name}</h4>
              <p style={{ color: BRAND.orange, fontSize: '.83rem', fontWeight: 600, marginBottom: 14 }}>{m.role}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => handleEdit(m)} style={{ flex: 1, padding: '7px', borderRadius: 8, background: `${BRAND.blue}10`, border: 'none', cursor: 'pointer', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.blue, fontSize: '.78rem' }}>Edit</button>
                <button onClick={() => handleDelete(m._id)} style={{ flex: 1, padding: '7px', borderRadius: 8, background: '#fee2e2', border: 'none', cursor: 'pointer', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: '#dc2626', fontSize: '.78rem' }}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}