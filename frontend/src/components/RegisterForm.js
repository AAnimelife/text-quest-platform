import React, { useState } from 'react';
import { TextField, Button, Box, Typography, useTheme } from '@mui/material';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { username, email, password };
      //const response = await authService.register(userData);
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
        mt: 8,
        mx: 'auto',
        maxWidth: 400,
        border: '1px solid black',
        px: 4,
        py: 5,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h2" align="center" gutterBottom>
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
        required
        margin="normal"
        variant="outlined"
      />

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        margin="normal"
        variant="outlined"
      />

      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        margin="normal"
        variant="outlined"
      />

      <Button
        type="submit"
        variant="outlined"
        fullWidth
        sx={{
          mt: 3,
          py: 1.5,
          borderRadius: 0,
        }}
      >
        Зарегистрироваться
      </Button>

      <Button
        variant="text"
        fullWidth
        sx={{
          mt: 2,
          py: 1,
          textTransform: 'none',
          fontSize: '0.9rem',
        }}
        onClick={() => navigate('/login')}
      >
        Уже есть аккаунт? Войти
      </Button>
    </Box>
  );
};

export default RegisterForm;