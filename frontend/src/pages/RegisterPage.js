import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Container, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (userData) => {
    await register(userData);
    navigate('/'); 
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Регистрация
      </Typography>
      <RegisterForm onRegister={handleRegister} />
    </Container>
  );
};

export default RegisterPage;