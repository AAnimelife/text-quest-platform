import React from 'react';
import { List, ListItem, ListItemText, Button, Typography, Box, Paper, useTheme } from '@mui/material';
import questService from '../services/questService';
import { useNavigate } from 'react-router-dom';

const QuestList = ({ quests, onQuestDeleted, onQuestUpdated }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleDelete = async (id) => {
    try {
      await questService.deleteQuest(id);
      onQuestDeleted(id);
    } catch (error) {
      console.error('Ошибка при удалении квеста:', error);
    }
  };
  
  return (
    <Box sx={{ mt: 3, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 2, color: theme.palette.text.primary }}>
        Список квестов
      </Typography>
      <List>
  {quests.map((quest) => (
    <Box
      key={quest._id}
      sx={{
        mb: 2,
        p: 2,
        border: '1px solid black',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <ListItemText
        primary={quest.title}
        secondary={quest.description}
        sx={{
          maxWidth: '45%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          onClick={() => onQuestUpdated(quest)}
          sx={{ borderRadius: 0 }}
        >
          Редактировать
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDelete(quest._id)}
          sx={{ borderRadius: 0 }}
        >
          Удалить
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate(`/quests/${quest._id}/pages`)}
          sx={{ borderRadius: 0 }}
        >
          Страницы
        </Button>
      </Box>
    </Box>
  ))}
</List>

    </Box>
  );
};

export default QuestList;