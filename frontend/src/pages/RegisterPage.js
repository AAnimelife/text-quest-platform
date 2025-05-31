import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Container } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = async (userData) => {
    try {
      await register(userData);
      enqueueSnackbar('Успешная регистрация!', { variant: 'success' });
      navigate(from);
    } catch (error) {
      enqueueSnackbar('Ошибка регистрации', { variant: 'error' });
    }
  };

  return (
    <Container>
      {/* <Typography variant="h4" gutterBottom>
        Регистрация
      </Typography> */}
      <RegisterForm onRegister={handleRegister} />
    </Container>
  );
};

export default RegisterPage;