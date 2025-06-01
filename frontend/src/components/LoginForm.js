import React, { useState } from 'react';
import { TextField, Button, Box, Typography, useTheme } from '@mui/material';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      await authService.login(userData);
      onLogin(userData);
      setError('');
    } catch (error) {
      setError('Ошибка при входе');
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: { xs: 4, sm: 8 },
        mx: 'auto',
        width: '100%',
        maxWidth: 400,
        px: { xs: 2, sm: 4 },
        py: { xs: 3, sm: 5 },
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: { xs: 1, sm: 2 },
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }}
      >
        Вход
      </Typography>

      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        margin="normal"
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          py: 1.5,
          fontWeight: 600,
          fontSize: { xs: '1rem', sm: '1.1rem' },
        }}
      >
        Войти
      </Button>

      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          py: 1,
          textTransform: 'none',
          fontSize: { xs: '0.85rem', sm: '0.95rem' },
        }}
        onClick={() => navigate('/register')}
      >
        Нет аккаунта? Зарегистрируйтесь
      </Button>
    </Box>
  );
};

export default LoginForm;
