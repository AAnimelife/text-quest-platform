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
      setError('Ошибка при сохранении квеста', error.message);
      console.error(error);
    }
  };

  return (
    <Box
  component="form"
  onSubmit={handleSubmit}
  sx={{
    mt: 8,
    mx: 'auto',
    border: '1px solid black',
    px: 4,
    py: 5,
    backgroundColor: theme.palette.background.paper,
  }}
>
  <Typography variant="h5" sx={{ mb: 2, color: theme.palette.text.primary }}>
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
    margin="normal"
    multiline
    rows={4}
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
    variant="outlined"
    fullWidth
    sx={{
      mt: 3,
      py: 1.5,
      borderRadius: 0,
    }}
  >
    {editingQuest ? 'Сохранить изменения' : 'Создать квест'}
  </Button>
</Box>

  );
};

export default QuestForm;