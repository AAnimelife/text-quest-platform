import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// Примерный пропс для авторизации
// const isAuthenticated = true;

const Header = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Управление квестами';
      case '/quests':
        return 'Квесты';
      case '/login':
        return 'Вход';
      default:
        return 'Страницы квеста';
    }
  };

  return (
    <AppBar position="static" color="ok" >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Левая часть — заголовок */}
        <Typography variant="h6" component="div">
          {getPageTitle()}
        </Typography>

        {/* Правая часть — кнопки */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/')}>
            На главную
          </Button>

          {isAuthenticated ? (
            <>
              <Button color="inherit" onClick={() => navigate('/profile')}>
                Профиль
              </Button>
              <Button color="inherit" onClick={onLogout}>
                Выйти
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>
              Войти
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
