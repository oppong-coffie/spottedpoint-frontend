import axios from 'axios';

const getBaseURL = () => {
  // 1. If VITE_API_URL environment variable is configured, use it
  if (import.meta.env.VITE_API_URL) {
    let url = import.meta.env.VITE_API_URL;
    // If an IP address was passed with https (e.g. https://34.194.8.232/api), browsers fail with ERR_CERT_COMMON_NAME_INVALID.
    // Fall back to relative '/api' on HTTPS production domains if raw IP HTTPS is detected.
    if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
      if (/^https?:\/\/\d+\.\d+\.\d+\.\d+/.test(url)) {
        return '/api';
      }
    }
    return url;
  }

  // 2. In local dev mode, default to localhost backend
  if (import.meta.env.DEV) {
    return 'http://localhost:5001/api';
  }

  // 3. In production, default to relative '/api' route (same HTTPS domain & valid SSL)
  return '/api';
};

const api = axios.create({ baseURL: getBaseURL() });

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('spm_user') || '{}');
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear local storage on token expiration or invalidity
      localStorage.removeItem('spm_user');
      
      // Redirect to admin login if currently inside the admin dashboard
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;