import React, { createContext, useState, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (userData) => {
    const response = await authService.register(userData);
    authService.setToken(response.token);
    setUser(response.user);
  };

  const login = async (userData) => {
    const response = await authService.login(userData);
    authService.setToken(response.token);
    setUser(response.user);
  };

  const logout = () => {
    authService.removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);