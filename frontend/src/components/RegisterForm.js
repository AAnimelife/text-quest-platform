import React, { useState } from 'react';
import { TextField, Button, Box, Typography, useTheme } from '@mui/material';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();


  const { enqueueSnackbar } = useSnackbar();

  const passwordRequirements = {
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSymbol: /[^a-zA-Z0-9]/.test(password),
    minLength: password.length >= 8,
  };
  const allValid = Object.values(passwordRequirements).every(Boolean);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!allValid) {
      enqueueSnackbar('Пароль не соответствует требованиям безопасности', { variant: 'warning' });
      return;
    }

    try {
      const userData = { username, email, password };
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
      />

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
        error={!allValid && password.length > 0}
        helperText={
          !allValid && password.length > 0 && 'Пароль не соответствует требованиям'
        }
      />
      <Box sx={{ fontSize: '0.85rem', color: 'text.secondary', mb: 2, ml: 1 }}>
        Пароль должен:
        <ul style={{ marginTop: 4, marginBottom: 0, paddingLeft: '1.2rem' }}>
          <li style={{ color: passwordRequirements.minLength ? 'green' : 'inherit' }}>
            не менее 8 символов
          </li>
          <li style={{ color: passwordRequirements.hasLowercase ? 'green' : 'inherit' }}>
            содержать строчную букву
          </li>
          <li style={{ color: passwordRequirements.hasUppercase ? 'green' : 'inherit' }}>
            содержать заглавную букву
          </li>
          <li style={{ color: passwordRequirements.hasNumber ? 'green' : 'inherit' }}>
            содержать цифру
          </li>
          <li style={{ color: passwordRequirements.hasSymbol ? 'green' : 'inherit' }}>
            содержать символ (например, !@#$)
          </li>
        </ul>
      </Box>

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
        Зарегистрироваться
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
        onClick={() => navigate('/login')}
      >
        Уже есть аккаунт? Войти
      </Button>
    </Box>
  );
};

export default RegisterForm;
