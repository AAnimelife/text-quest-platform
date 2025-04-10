import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { username, email, password };
      /*const response = */await authService.register(userData);
      onRegister(userData); 
      setError('');
    } catch (error) {
      setError('Ошибка при регистрации');
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 5,
        mx: 'auto', // Центрируем форму
        width: '100%',
        maxWidth: 400, // Ограничиваем максимальную ширину формы
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h6" gutterBottom align="center">
        Регистрация
      </Typography>
      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <TextField
        label="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        required
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: 1,
          },
        }}
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: 1,
          },
        }}
      />
      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: 1,
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 2,
          py: 1.5,
          borderRadius: 1,
          boxShadow: 2,
          '&:hover': {
            boxShadow: 3,
          },
        }}
      >
        Зарегистрироваться
      </Button>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        sx={{
          mt: 2,
          py: 1.5,
          borderRadius: 1,
          borderColor: 'primary.main',
          boxShadow: 2,
          '&:hover': {
            borderColor: 'primary.dark',
            backgroundColor: 'primary.light',
          },
        }}
        onClick={() => navigate(`/login`)}
      >
        Уже есть аккаунт
      </Button>
    </Box>
  );
};

export default RegisterForm;