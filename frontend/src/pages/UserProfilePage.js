import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Box, Typography, List, ListItem, Button, Collapse, IconButton, Paper
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
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
    <Box>
      

      <Paper sx={{ p: 4, maxWidth: "auto", ml: 3, mr: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="left" >
        <Typography variant="h4" gutterBottom>Профиль пользователя</Typography>
        
        <Button color="primary" onClick={() => navigate('/')} variant="outlined">
          На главную
        </Button>
        </Box>
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

    </Box>
  );
};

export default UserProfilePage;
