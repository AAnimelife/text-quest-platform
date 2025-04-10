import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import questService from '../services/questService';
import GlobalVariablesForm from './GlobalVariablesForm';

const QuestForm = ({ onQuestCreated, editingQuest, onQuestUpdated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const [globalVariables, setGlobalVariables] = useState({});

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
      } else {
        const newQuest = await questService.createQuest(questData);
        onQuestCreated(newQuest);
      }

      setTitle('');
      setDescription('');
      setTags('');
      setGlobalVariables({});
      setError('');
    } catch (error) {
      setError('Ошибка при сохранении квеста');
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 3,
        mx: 'auto',
        maxWidth: 800,
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h6" gutterBottom align="center">
        {editingQuest ? 'Редактировать квест' : 'Создать новый квест'}
      </Typography>
      {error && <Typography color="error" align="center" sx={{ mb: 2 }}>{error}</Typography>}
      <TextField
        label="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Теги (через запятую)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ mb: 2 }}
      />
      <GlobalVariablesForm
        globalVariables={globalVariables}
        onUpdate={setGlobalVariables}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 2,
          py: 1.5,
          borderRadius: 1,
          boxShadow: 2,
          '&:hover': {
            boxShadow: 3,
          },
        }}
      >
        {editingQuest ? 'Сохранить изменения' : 'Создать квест'}
      </Button>
    </Box>
  );
};

export default QuestForm;