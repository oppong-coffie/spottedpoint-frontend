import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  return user?.token ? children : <Navigate to="/admin/login" replace />;
}