import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { BRAND } from '../../utils/constants';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

const EMPTY = { name: '', email: '', password: '', confirmPassword: '', role: 'superadmin' };

export default function AdminAdmin() {
  const { user: currentUser } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingAdmin, setEditingAdmin] = useState(null);

  const load = () => {
    setLoading(true);
    api.get('/auth')
      .then(r => setAdmins(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleToggleForm = (admin = null) => {
    if (admin) {
      setEditingAdmin(admin);
      setForm({
        name: admin.name || '',
        email: admin.email || '',
        password: '',
        confirmPassword: '',
        role: admin.role || 'admin'
      });
      setShowForm(true);
    } else {
      setEditingAdmin(null);
      setForm(EMPTY);
      setShowForm(!showForm);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      return toast.error('Name and Email are required');
    }
    if (!editingAdmin && !form.password) {
      return toast.error('Password is required');
    }
    if (form.password) {
      if (form.password.length < 6) {
        return toast.error('Password must be at least 6 characters');
      }
      if (form.password !== form.confirmPassword) {
        return toast.error('Passwords do not match');
      }
    }

    setSaving(true);
    try {
      if (editingAdmin) {
        const updateData = {
          name: form.name,
          email: form.email,
          role: form.role
        };
        if (form.password) {
          updateData.password = form.password;
        }
        await api.put(`/auth/${editingAdmin._id}`, updateData);
        toast.success('Admin updated successfully!');
      } else {
        await api.post('/auth/register', {
          name: form.name,
          email: form.email,
          password: form.password
        });
        toast.success('Admin added successfully!');
      }
      setForm(EMPTY);
      setShowForm(false);
      setEditingAdmin(null);
      load();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to save admin');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (adminId) => {
    if (!window.confirm('Are you sure you want to delete this administrator account? This action cannot be undone.')) {
      return;
    }

    try {
      await api.delete(`/auth/${adminId}`);
      toast.success('Admin deleted successfully');
      load();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to delete admin');
    }
  };

  const iS = {
    width: '100%',
    padding: '11px 14px',
    borderRadius: 8,
    border: `1.5px solid ${BRAND.blue}18`,
    fontFamily: "'Poppins',sans-serif",
    fontSize: '.9rem',
    color: BRAND.blue,
    background: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
    marginBottom: 14
  };

  return (
    <AdminLayout title="Admin Manager">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <p style={{ color: BRAND.gray }}>{admins.length} administrators</p>
        <button 
          onClick={() => handleToggleForm()} 
          className="btn btn-primary"
        >
          {showForm ? '✕ Cancel' : '+ Add Admin'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 28, border: `1px solid ${BRAND.blue}10`, maxWidth: 500 }}>
          <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: BRAND.blue, marginBottom: 22 }}>
            {editingAdmin ? 'Edit Administrator' : 'Add New Administrator'}
          </h3>
          <form onSubmit={handleSubmit}>
            <input 
              style={iS} 
              type="text"
              placeholder="Full Name *" 
              value={form.name} 
              onChange={e => setForm({ ...form, name: e.target.value })} 
              required
            />
            <input 
              style={iS} 
              type="email"
              placeholder="Email Address *" 
              value={form.email} 
              onChange={e => setForm({ ...form, email: e.target.value })} 
              required
            />
            {editingAdmin && (
              <select
                style={{
                  ...iS,
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='${encodeURIComponent(BRAND.blue)}' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '1.2rem',
                  cursor: 'pointer'
                }}
                value={form.role || 'admin'}
                onChange={e => setForm({ ...form, role: e.target.value })}
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            )}
            <input 
              style={iS} 
              type="password"
              placeholder={editingAdmin ? 'New Password (Leave blank to keep current)' : 'Password (Min 6 chars) *'} 
              value={form.password} 
              onChange={e => setForm({ ...form, password: e.target.value })} 
              required={!editingAdmin}
            />
            <input 
              style={iS} 
              type="password"
              placeholder={editingAdmin ? 'Confirm New Password' : 'Confirm Password *'} 
              value={form.confirmPassword} 
              onChange={e => setForm({ ...form, confirmPassword: e.target.value })} 
              required={!editingAdmin}
            />
            <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
              <button type="submit" disabled={saving} className="btn btn-primary">
                {saving ? (editingAdmin ? 'Saving...' : 'Registering...') : (editingAdmin ? 'Save Changes' : 'Add Admin')}
              </button>
              <button 
                type="button" 
                onClick={() => { setShowForm(false); setForm(EMPTY); setEditingAdmin(null); }} 
                className="btn btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Admin List Table */}
      {loading ? (
        <p style={{ color: BRAND.gray, textAlign: 'center', padding: '40px 0' }}>Loading admins...</p>
      ) : admins.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: 16, padding: '60px 0', textAlign: 'center', border: `1px dashed ${BRAND.blue}20` }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>👤</div>
          <p style={{ color: BRAND.gray, fontFamily: "'Montserrat',sans-serif", fontWeight: 700 }}>No administrators found</p>
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: `1px solid ${BRAND.blue}10`, boxShadow: '0 2px 16px rgba(40,59,144,.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: "'Poppins',sans-serif", fontSize: '.9rem' }}>
            <thead>
              <tr style={{ background: `${BRAND.blue}08`, borderBottom: `1px solid ${BRAND.blue}15` }}>
                <th style={{ padding: '16px 20px', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.blue }}>Initial</th>
                <th style={{ padding: '16px 20px', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.blue }}>Name</th>
                <th style={{ padding: '16px 20px', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.blue }}>Email</th>
                <th style={{ padding: '16px 20px', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.blue }}>Role</th>
                <th style={{ padding: '16px 20px', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.blue, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map(admin => (
                <tr key={admin._id} style={{ borderBottom: `1px solid ${BRAND.blue}08`, transition: 'background .2s' }} onMouseEnter={e => e.currentTarget.style.background = `${BRAND.blue}03`} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: BRAND.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Montserrat',sans-serif", fontWeight: 900, color: '#fff', fontSize: '.8rem' }}>
                      {admin.name?.charAt(0)}
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px', fontWeight: 600, color: BRAND.blue }}>{admin.name}</td>
                  <td style={{ padding: '14px 20px', color: BRAND.gray }}>{admin.email}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ display: 'inline-block', background: `${BRAND.orange}15`, color: BRAND.orange, padding: '4px 10px', borderRadius: 20, fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em' }}>
                      {admin.role}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleToggleForm(admin)}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', padding: '4px 8px', borderRadius: 4, transition: 'background .2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,.04)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        title="Edit Admin"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(admin._id)}
                        disabled={currentUser?._id === admin._id}
                        style={{
                          background: 'none', border: 'none', cursor: currentUser?._id === admin._id ? 'not-allowed' : 'pointer', fontSize: '1.1rem', padding: '4px 8px', borderRadius: 4, transition: 'background .2s',
                          opacity: currentUser?._id === admin._id ? 0.3 : 1
                        }}
                        onMouseEnter={e => { if (currentUser?._id !== admin._id) e.currentTarget.style.background = 'rgba(255,0,0,.08)'; }}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        title={currentUser?._id === admin._id ? "You cannot delete yourself" : "Delete Admin"}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
