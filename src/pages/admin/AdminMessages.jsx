import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { BRAND } from '../../utils/constants';
import api from '../../api/axios';
import toast from 'react-hot-toast';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = () => api.get('/contact').then(r => setMessages(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    try { await api.put(`/contact/${id}/read`); load(); }
    catch { toast.error('Failed'); }
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <AdminLayout title="Messages">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <p style={{ color: BRAND.gray }}>{messages.length} total · <span style={{ color: BRAND.orange, fontWeight: 700 }}>{unread} unread</span></p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.5fr' : '1fr', gap: 24, alignItems: 'start' }}>
        {/* List */}
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: `1px solid ${BRAND.blue}10` }}>
          {messages.length === 0 && <p style={{ padding: 40, textAlign: 'center', color: BRAND.gray }}>No messages yet.</p>}
          {messages.map(m => (
            <div key={m._id} onClick={() => { setSelected(m); if (!m.read) markRead(m._id); }}
              style={{ padding: '16px 20px', borderBottom: `1px solid ${BRAND.blue}08`, cursor: 'pointer', transition: 'background .2s', background: selected?._id === m._id ? `${BRAND.blue}06` : (!m.read ? `${BRAND.orange}06` : 'transparent') }}
              onMouseEnter={e => { if (selected?._id !== m._id) e.currentTarget.style.background = `${BRAND.blue}04`; }}
              onMouseLeave={e => { if (selected?._id !== m._id) e.currentTarget.style.background = !m.read ? `${BRAND.orange}06` : 'transparent'; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                    {!m.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: BRAND.orange, display: 'inline-block', flexShrink: 0 }} />}
                    <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.blue, fontSize: '.9rem' }}>{m.name}</p>
                  </div>
                  <p style={{ color: BRAND.gray, fontSize: '.82rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 240 }}>{m.message}</p>
                </div>
                <p style={{ color: BRAND.gray, fontSize: '.75rem', flexShrink: 0, marginLeft: 12 }}>
                  {new Date(m.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Detail */}
        {selected && (
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: `1px solid ${BRAND.blue}10` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: BRAND.blue, marginBottom: 4 }}>{selected.name}</h3>
                <a href={`mailto:${selected.email}`} style={{ color: BRAND.orange, fontSize: '.88rem' }}>{selected.email}</a>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: `${BRAND.blue}10`, border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.blue }}>✕</button>
            </div>
            {selected.service && (
              <div style={{ background: `${BRAND.orange}12`, borderRadius: 8, padding: '8px 14px', marginBottom: 16, display: 'inline-block' }}>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.8rem', color: BRAND.orange }}>Service: {selected.service}</span>
              </div>
            )}
            <div style={{ background: `${BRAND.blue}04`, borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <p style={{ color: BRAND.blue, lineHeight: 1.8, fontSize: '.93rem' }}>{selected.message}</p>
            </div>
            <p style={{ color: BRAND.gray, fontSize: '.8rem' }}>Received: {new Date(selected.createdAt).toLocaleString()}</p>
            <a href={`mailto:${selected.email}?subject=Re: Your enquiry to Spotted Point Media`} className="btn btn-primary" style={{ marginTop: 20, textDecoration: 'none', display: 'inline-flex' }}>
              Reply via Email →
            </a>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}