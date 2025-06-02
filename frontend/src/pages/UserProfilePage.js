import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  Tooltip,
  IconButton,
  CircularProgress,
} from '@mui/material';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService'; // тебе нужно его создать
import { Logout as LogoutIcon, Home as HomeIcon, } from '@mui/icons-material';

const UserProfilePage = () => {
  const { logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Ошибка получения профиля', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!profile) return <Typography>Ошибка загрузки данных</Typography>;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 2 }}>
      <Paper
        elevation={2}
        sx={{
          ml: 1,
          mr: 1,
          p: { xs: 2, sm: 4 },
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: { xs: 1, sm: 1 },
          backgroundColor: theme.palette.background.palette,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography variant="h5" sx={{ mb: { xs: 2, sm: 0, }, mt: 1}}>
            Привет, {profile.username}!
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 1, sm: 2 },
              alignItems: 'center',
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

                <Button
                  startIcon={<LogoutIcon />}
                  color="inherit"
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Tooltip title="На главную">
                  <IconButton onClick={() => navigate('/')}>
                    <HomeIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Выйти">
                  <IconButton onClick={() => {
                    logout();
                    navigate('/login');
                  }}>
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>

              </>
            )}
          </Box>
        </Box>

        <Typography sx={{ mt: 2 }}><strong>Email:</strong> {profile.email}</Typography>
        <Typography sx={{ mt: 1 }}>
          <strong>Квестов:</strong> {profile.questCount}, <strong>Страниц:</strong> {profile.pageCount}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Мои квесты
        </Typography>

        {profile.quests.length === 0 ? (
          <Typography color="text.secondary">Вы ещё не создали ни одного квеста.</Typography>
        ) : (
          profile.quests.map((quest) => (
            <Paper
              key={quest.id}
              sx={{
                backgroundColor: theme.palette.background.paper,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                p: 2,
                mb: 2,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                justifyContent: "space-between",
                alignItems: { sm: 'center' },
              }}
            >
              <Typography fontWeight={600}>{quest.title}</Typography>
              <Button
                size="small"
                onClick={() => navigate(`/quests/${quest.id}/pages`)}
                sx={{
                  p: 1,
                  mt: 1,
                  border: `1px solid ${theme.palette.divider}`,
                }}

              >
                Перейти к квесту
              </Button>
            </Paper>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default UserProfilePage;
