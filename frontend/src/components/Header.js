import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const { user } = useAuth();
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
    <AppBar
      position="static"
      elevation={2}
      sx={{
        mb: 2,
        p: 1,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem' }, fontWeight: 600 }}
        >
          {getPageTitle()}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: { xs: 1, sm: 2 },
            alignItems: 'center',
            mt: { xs: 1, sm: 0 },
          }}
        >
          {isSmUp ? (
            <>
              <Button
                startIcon={<HomeIcon />}
                color="inherit"
                onClick={() => navigate('/')}
              >
                На главную
              </Button>
              {isAuthenticated ? (
                <>
                  <Button
                    startIcon={<PersonIcon />}
                    color="inherit"
                    onClick={() => navigate('/profile')}
                  >
                    Профиль
                  </Button>
                  {isAuthenticated && user?.role === 'admin' && (
                    <Button
                      startIcon={<SettingsIcon />}
                      color="inherit"
                      onClick={() => navigate('/admin')}
                    >
                      Админка
                    </Button>
                  )}

                  <Button
                    startIcon={<LogoutIcon />}
                    color="inherit"
                    onClick={onLogout}
                  >
                    Выйти
                  </Button>
                </>
              ) : (
                <Button
                  startIcon={<LoginIcon />}
                  color="inherit"
                  onClick={() => navigate('/login')}
                >
                  Войти
                </Button>
              )}
            </>
          ) : (
            <>
              <Tooltip title="На главную">
                <IconButton onClick={() => navigate('/')}>
                  <HomeIcon />
                </IconButton>
              </Tooltip>
              {isAuthenticated ? (
                <>
                  <Tooltip title="Профиль">
                    <IconButton onClick={() => navigate('/profile')}>
                      <PersonIcon />
                    </IconButton>
                  </Tooltip>
                  {isAuthenticated && user?.role === 'admin' && (
                  <Tooltip title="Админка">
                    <IconButton onClick={() => navigate('/admin')}>
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>)}
                  <Tooltip title="Выйти">
                    <IconButton onClick={onLogout}>
                      <LogoutIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Tooltip title="Войти">
                  <IconButton onClick={() => navigate('/login')}>
                    <LoginIcon />
                  </IconButton>
                </Tooltip>
              )}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
