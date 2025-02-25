import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import questService from '../services/questService';

const QuestForm = ({ onQuestCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const questData = {
        title,
        description,
        tags: tags.split(',').map(tag => tag.trim()),
      };

      const newQuest = await questService.createQuest(questData);
      onQuestCreated(newQuest); 
      setTitle('');
      setDescription('');
      setTags('');
      setError('');
    } catch (error) {
      setError('Ошибка при создании квеста');
      console.error(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Создать новый квест
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
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
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Создать квест
      </Button>
    </Box>
  );
};

export default QuestForm;