import { useState } from 'react';
import { AuthContext } from './AuthContext';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem('spm_user') || 'null')
  );

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('spm_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('spm_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}