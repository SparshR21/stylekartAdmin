import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Predefined credentials from environment variables
  const predefinedCredentials = {
    username: import.meta.env.VITE_ADMIN_USERNAME, 
    password: import.meta.env.VITE_ADMIN_PASSWORD 
  };

  const login = (inputUsername, inputPassword) => {
    // Validate credentials
    if (
      inputUsername === predefinedCredentials.username &&
      inputPassword === predefinedCredentials.password
    ) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
