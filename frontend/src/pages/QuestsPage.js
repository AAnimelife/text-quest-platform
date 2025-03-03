import React, { useState, useEffect } from 'react';
import QuestList from '../components/QuestList';
import QuestForm from '../components/QuestForm';
import { Typography, Container } from '@mui/material';
import questService from '../services/questService';

const QuestsPage = () => {
  const [quests, setQuests] = useState([]);
  const [editingQuest, setEditingQuest] = useState(null);

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
    <Container>
      <Typography variant="h4" gutterBottom>
        Управление квестами
      </Typography>
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