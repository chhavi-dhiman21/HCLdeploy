// src/context/AuthContext.jsx

import React, { createContext, useContext, useState } from 'react';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create a Custom Hook for easy access
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Create the Provider Component
export const AuthProvider = ({ children }) => {
  // Initial state: null username and false/null for loading/auth status
  const [user, setUser] = useState(null);

  // Function to call upon successful login
  const login = (username) => {
    // In a real app, you'd store the token/user data here
    setUser({ username });
  };

  // Function to call upon logout
  const logout = () => {
    // Clear the user state
    setUser(null);
  };

  // The value object passed to components consuming the context
  const contextValue = {
    user,       // The current user object (or null)
    login,      // The login function
    logout,     // The logout function
    isAuthenticated: !!user, // Helper boolean
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};