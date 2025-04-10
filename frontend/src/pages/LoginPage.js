import React from 'react';
import LoginForm from '../components/LoginForm';
import { Container } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (userData) => {
    await login(userData);
    navigate('/');
  };

  return (
    <Container>
      {/* <Typography variant="h4" gutterBottom>
        Вход
      </Typography> */}
      <LoginForm onLogin={handleLogin} />
    </Container>
  );
};

export default LoginPage;