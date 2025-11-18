import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const PublicRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  const hasToken = !!localStorage.getItem('token');

  if (isAuthenticated || hasToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
};

export default PublicRoute;

