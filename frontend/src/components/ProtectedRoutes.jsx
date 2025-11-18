// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); 

  if (isAuthenticated) {
    return element;
  }
  
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;