import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, useTheme } from '@mui/material';
import questService from '../services/questService';
import GlobalVariablesForm from './GlobalVariablesForm';
import { useSnackbar } from 'notistack';

const QuestForm = ({ onQuestCreated, editingQuest, onQuestUpdated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [globalVariables, setGlobalVariables] = useState({});
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (editingQuest) {
      setTitle(editingQuest.title);
      setDescription(editingQuest.description);
      setTags(editingQuest.tags.join(', '));
      setGlobalVariables(editingQuest.globalVariables || {});
    }
  }, [editingQuest]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const questData = {
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()),
        globalVariables,
      };

      if (editingQuest) {
        if (editingQuest.isAssistant) {
          enqueueSnackbar('Вы не можете изменять этот квест — вы помощник', { variant: 'warning' });
          return;
        }
        const updatedQuest = await questService.updateQuest(editingQuest._id, questData);
        onQuestUpdated(updatedQuest);
        enqueueSnackbar('Изменения сохранены!', { variant: 'success' });
      } else {
        const newQuest = await questService.createQuest(questData);
        onQuestCreated(newQuest);
        enqueueSnackbar('Квест создан!', { variant: 'success' });
      }

      setTitle('');
      setDescription('');
      setTags('');
      setGlobalVariables({});
      setError('');
    } catch (error) {
      enqueueSnackbar('Ошибка при сохранении квеста', { variant: 'error' });
      setError('Ошибка при сохранении квеста');
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: { xs: 3, sm: 6 },
        mx: 'auto',
        width: '100%',
        px: { xs: 2, sm: 4 },
        py: { xs: 3, sm: 5 },
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: { xs: 1, sm: 2 },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontSize: { xs: '1.3rem', sm: '1.5rem' },
          color: theme.palette.text.primary,
          textAlign: 'center',
        }}
      >
        {editingQuest ? 'Редактировать квест' : 'Создать новый квест'}
      </Typography>

      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <TextField
        label="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <TextField
        label="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />

      <TextField
        label="Теги (через запятую)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
        margin="normal"
      />

      <GlobalVariablesForm
        globalVariables={globalVariables}
        onUpdate={setGlobalVariables}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          py: 1.5,
          fontWeight: 600,
          fontSize: { xs: '0.9rem', sm: '1.1rem' },
        }}
      >
        {editingQuest ? 'Сохранить изменения' : 'Создать квест'}
      </Button>
    </Box>
  );
};

export default QuestForm;
