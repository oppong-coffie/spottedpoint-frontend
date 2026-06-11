import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { BRAND } from '../../utils/constants';
import Logo from '../../components/ui/Logo';
import api from '../../api/axios';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [form, setForm]     = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login }   = useAuth();
  const navigate    = useNavigate();

  const handleLogin = async () => {
    if (!form.email || !form.password) return toast.error('Fill in all fields');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data);
      toast.success(`Welcome back, ${data.name}!`);
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const iS = {
    width: '100%', padding: '14px 16px', borderRadius: 10,
    border: `1.5px solid ${BRAND.blue}20`, fontFamily: "'Poppins',sans-serif",
    fontSize: '.93rem', color: BRAND.blue, background: '#fff', outline: 'none',
    boxSizing: 'border-box', transition: 'border .25s',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${BRAND.blueDark}, ${BRAND.blue})`, padding: 24 }}>
      <div style={{ position: 'absolute', inset: 0, opacity: .05, backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div style={{ background: '#fff', borderRadius: 24, padding: '44px 40px', width: '100%', maxWidth: 420, position: 'relative', zIndex: 1, boxShadow: '0 30px 80px rgba(0,0,0,.25)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <Logo size={50} textScale={1.1} />
        </div>
        <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, color: BRAND.blue, marginBottom: 6, textAlign: 'center' }}>Admin Portal</h2>
        <p style={{ color: BRAND.gray, textAlign: 'center', fontSize: '.88rem', marginBottom: 32 }}>Sign in to manage your website content</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input style={iS} type="email" placeholder="Email address" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            onFocus={e => e.target.style.borderColor = BRAND.orange}
            onBlur={e => e.target.style.borderColor = `${BRAND.blue}20`} />
          <input style={iS} type="password" placeholder="Password" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            onFocus={e => e.target.style.borderColor = BRAND.orange}
            onBlur={e => e.target.style.borderColor = `${BRAND.blue}20`} />
        </div>

        <button onClick={handleLogin} disabled={loading} className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center', marginTop: 24, padding: '15px', fontSize: '.95rem', opacity: loading ? .7 : 1 }}>
          {loading ? 'Signing in...' : 'Sign In →'}
        </button>
      </div>
    </div>
  );
}