import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const initializeAuth = async () => {
      const token = authService.getToken();
      if (token) {
        try {
          const user = await authService.getCurrentUser();
          setUser(user);
        } catch (error) {
          console.error('Ошибка при восстановлении пользователя:', error);
          authService.removeToken();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);
  
  useEffect(() => {
  const handleStorageChange = (event) => {
    if (event.key === 'token' && event.newValue === null) {
      setUser(null); // выходим, если токен удалён
    }
  };

  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}, []);
 
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
    <AuthContext.Provider value={{ user, register, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);