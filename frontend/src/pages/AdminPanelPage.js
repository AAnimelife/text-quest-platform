import React, { useEffect, useState } from 'react';
import { Typography, Box, Tab, Tabs, CircularProgress, Button, Container } from '@mui/material';
import adminService from '../services/adminService';
import UserList from '../components/UserList';
import QuestList from '../components/QuestList';
import { useNavigate } from 'react-router-dom';

const AdminPanelPage = () => {
  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const [userRes, questRes] = await Promise.all([
        adminService.getUsers(),
        adminService.getQuests()
      ]);
      setUsers(userRes);
      setQuests(questRes);
    } catch (err) {
      console.error('Ошибка загрузки данных администратора:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  const handleQuestDeleted = (id) => {
    setQuests(quests.filter((quest) => quest._id !== id));
  };

  return (
    <Box sx={{ maxWidth: 1600, mx: 'auto', mt: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Админ-панель
        </Typography>
        <Button color="primary" onClick={() => navigate('/')} variant="outlined">
          На главную
        </Button>
      </Box>
      <Tabs value={tab} onChange={(e, newTab) => setTab(newTab)} sx={{ mb: 2 }}>
        <Tab label="Пользователи" />
        <Tab label="Квесты" />
      </Tabs>

      {tab === 0 && <UserList users={users} 
        onQuestDeleted={handleQuestDeleted}
        />}
      {tab === 1 && <QuestList quests={quests} />}
    </Box>
  );
};

export default AdminPanelPage;
