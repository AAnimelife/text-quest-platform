import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, IconButton, Select, MenuItem } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import pageService from '../services/pageService';

const QuestPageForm = ({ questId, editingPage, onPageCreated, onPageUpdated, pages }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [choices, setChoices] = useState([]);
  const [newChoiceText, setNewChoiceText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingPage) {
      setTitle(editingPage.title);
      setContent(editingPage.content);
      setChoices(editingPage.choices);
    }
  }, [editingPage]);

  const handleAddChoice = () => {
    if (newChoiceText.trim()) {
      setChoices([...choices, { text: newChoiceText, nextPage: null, conditions: [], effects: [] }]);
      setNewChoiceText('');
    }
  };

  const handleDeleteChoice = (index) => {
    const updatedChoices = choices.filter((_, i) => i !== index);
    setChoices(updatedChoices);
  };

  const handleChoiceTextChange = (index, text) => {
    const updatedChoices = choices.map((choice, i) =>
      i === index ? { ...choice, text } : choice
    );
    setChoices(updatedChoices);
  };

  const handleNextPageChange = (index, nextPage) => {
    const updatedChoices = choices.map((choice, i) =>
      i === index ? { ...choice, nextPage } : choice
    );
    setChoices(updatedChoices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const pageData = {
        questId,
        title,
        content,
        choices,
      };

      if (editingPage) {
        const updatedPage = await pageService.updatePage(editingPage._id, pageData);
        onPageUpdated(updatedPage);
      } else {
        const newPage = await pageService.createPage(pageData);
        onPageCreated(newPage);
      }

      setTitle('');
      setContent('');
      setChoices([]);
      setError('');
    } catch (error) {
      setError('Ошибка при сохранении страницы');
      console.error(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        {editingPage ? 'Редактировать страницу' : 'Создать новую страницу'}
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
        label="Содержание"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Варианты выбора
      </Typography>
      <List>
        {choices.map((choice, index) => (
          <ListItem key={index}>
            <TextField
              value={choice.text}
              onChange={(e) => handleChoiceTextChange(index, e.target.value)}
              fullWidth
              margin="normal"
            />
            <Select
              value={choice.nextPage || ''}
              onChange={(e) => handleNextPageChange(index, e.target.value)}
              displayEmpty
              sx={{ ml: 2, minWidth: 150 }}
            >
              <MenuItem value="">Выберите страницу</MenuItem>
              {pages.map((page) => (
                <MenuItem key={page._id} value={page._id}>
                  {page.title}
                </MenuItem>
              ))}
            </Select>
            <IconButton onClick={() => handleDeleteChoice(index)} color="error">
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
        <TextField
          label="Новый вариант выбора"
          value={newChoiceText}
          onChange={(e) => setNewChoiceText(e.target.value)}
          fullWidth
          margin="normal"
        />
        <IconButton onClick={handleAddChoice} color="primary">
          <Add />
        </IconButton>
      </Box>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {editingPage ? 'Сохранить изменения' : 'Создать страницу'}
      </Button>
    </Box>
  );
};

export default QuestPageForm;