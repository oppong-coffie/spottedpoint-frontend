import axios from 'axios';

const getBaseURL = () => {
  let url = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
  // Prevent Mixed Content errors when frontend is served over HTTPS
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    if (url.startsWith('http://') && !url.includes('localhost')) {
      url = url.replace(/^http:\/\//, 'https://');
    }
  }
  return url;
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