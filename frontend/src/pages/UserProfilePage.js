import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Box, Typography, List, ListItem, Collapse, IconButton, Paper
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const UserProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/users/profile');
        setProfile(data);
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <Typography>Загрузка...</Typography>;

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Профиль пользователя</Typography>
      <Typography><strong>Имя:</strong> {profile.username}</Typography>
      <Typography><strong>Email:</strong> {profile.email}</Typography>
      <Typography><strong>Квестов:</strong> {profile.questCount}</Typography>
      <Typography><strong>Всего страниц:</strong> {profile.pageCount}</Typography>

      <Box mt={2}>
        <Typography variant="h6">
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          Мои квесты
        </Typography>
        <Collapse in={open}>
          <List>
            {profile.quests.map((quest) => (
              <ListItem key={quest.id}>{quest.title}</ListItem>
            ))}
          </List>
        </Collapse>
      </Box>
    </Paper>
  );
};

export default UserProfilePage;
