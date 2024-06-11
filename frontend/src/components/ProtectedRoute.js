import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
