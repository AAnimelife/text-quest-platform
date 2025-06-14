import React from 'react';
import {
  List,
  ListItemText,
  Button,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import questService from '../services/questService';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const QuestList = ({ quests, onQuestDeleted, onQuestUpdated }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (id) => {
    try {
      await questService.deleteQuest(id);
      onQuestDeleted(id);
      enqueueSnackbar('Квест успешно удален!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Ошибка при удалении квеста!', { variant: 'error' });
      console.error('Ошибка при удалении квеста:', error);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, color: theme.palette.text.primary, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
      >
        Список квестов
      </Typography>

      <List>
        {quests.map((quest) => (
          <Box
            key={quest._id}
            sx={{
              mb: 2,
              p: 2,
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { sm: 'center' },
              gap: 2,
            }}
          >
            <ListItemText
              primary={quest.title}
              secondary={quest.description}
              sx={{
                flex: 1,
                wordBreak: 'break-word',
                whiteSpace: 'normal',
              }}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: 'flex-end',
              }}
            >
              <Button
                variant="outlined"
                onClick={() => onQuestUpdated(quest)}
              >
                Редактировать
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(quest._id)}
              >
                Удалить
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate(`/quests/${quest._id}/pages`)}
              >
                Страницы
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  const questUrl = `${process.env.REACT_APP_ORIGIN_URL}/quest/play/${quest._id}`;
                  navigator.clipboard.writeText(questUrl)
                    .then(() => enqueueSnackbar('Ссылка скопирована!', { variant: 'info' }))
                    .catch((err) => console.error('Ошибка при копировании ссылки:', err));
                }}
              >
                Копировать ссылку
              </Button>
            </Box>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default QuestList;
