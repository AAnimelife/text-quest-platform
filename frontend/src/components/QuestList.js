import React from 'react';
import { List, ListItem, ListItemText, Button, Typography, Box } from '@mui/material';
import questService from '../services/questService';
import { useNavigate } from 'react-router-dom';

const QuestList = ({ quests, onQuestDeleted, onQuestUpdated }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await questService.deleteQuest(id);
      onQuestDeleted(id);
    } catch (error) {
      console.error('Ошибка при удалении квеста:', error);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Список квестов
      </Typography>
      <List>
        {quests.map((quest) => (
          <ListItem key={quest._id}>
            <ListItemText primary={quest.title} secondary={quest.description} />
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
              onClick={() => onQuestUpdated(quest)}
            >
              Редактировать
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(quest._id)}
            >
              Удалить
            </Button>
            <Button
              variant="contained"
              color="info"
              sx={{ ml: 2 }}
              onClick={() => navigate(`/quests/${quest._id}/pages`)} 
            >
              Страницы
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default QuestList;