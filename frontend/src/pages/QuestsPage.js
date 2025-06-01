import React, { useState, useEffect } from 'react';
import QuestList from '../components/QuestList';
import QuestForm from '../components/QuestForm';
import { Container, Box } from '@mui/material';
import questService from '../services/questService';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const QuestsPage = () => {
  const [quests, setQuests] = useState([]);
  const [editingQuest, setEditingQuest] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const data = await questService.getQuests();
        setQuests(data);
      } catch (error) {
        console.error('Ошибка при загрузке квестов:', error);
      }
    };
    fetchQuests();
  }, []);

  const handleQuestCreated = (newQuest) => {
    setQuests([...quests, newQuest]);
  };

  const handleQuestDeleted = (id) => {
    setQuests(quests.filter((quest) => quest._id !== id));
  };

  const handleQuestUpdated = (updatedQuest) => {
    setQuests(quests.map((quest) => (quest._id === updatedQuest._id ? updatedQuest : quest)));
    setEditingQuest(null); 
  };

  return (
    <Container sx={{ maxWidth: 1200, mt: 3 }}>
      <Header isAuthenticated={localStorage.getItem("token")} onLogout={() => {
        localStorage.removeItem("token");
        navigate('/');
        }}/>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
      </Box>
      <QuestForm
        onQuestCreated={handleQuestCreated}
        editingQuest={editingQuest}
        onQuestUpdated={handleQuestUpdated}
      />
      <QuestList
        quests={quests}
        onQuestDeleted={handleQuestDeleted}
        onQuestUpdated={setEditingQuest}
      />
    </Container>
  );
};

export default QuestsPage;