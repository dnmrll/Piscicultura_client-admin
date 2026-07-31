import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const ProtectedRoute = () => {
  const { isAuthenticated, token, role } = useAuthStore();

  if (!isAuthenticated || !token || (role && role.toLowerCase() !== 'admin')) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
