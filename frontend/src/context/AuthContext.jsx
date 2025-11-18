// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useMemo } from 'react';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create a Custom Hook for easy access
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Failed to parse stored user:', error);
      return null;
    }
  });

  const login = (userData, token) => {
    if (token) {
      localStorage.setItem('token', token);
    }
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
    setUser(userData ?? null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    isAuthenticated: !!user || !!localStorage.getItem('token'),
  }), [user]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};