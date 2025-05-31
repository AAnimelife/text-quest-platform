import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, IconButton, Select, MenuItem, useTheme } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import pageService from '../services/pageService';
import { useSnackbar } from 'notistack';

const QuestPageForm = ({ questId, editingPage, onPageCreated, onPageUpdated, pages }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [choices, setChoices] = useState([]);
  const [newChoiceText, setNewChoiceText] = useState('');
  const [error, setError] = useState('');
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

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
        enqueueSnackbar('Страница изменена!', { variant: 'success' });
      } else {
        const newPage = await pageService.createPage(pageData);
        onPageCreated(newPage);
        enqueueSnackbar('Страница создана!', { variant: 'success' });
      }

      setTitle('');
      setContent('');
      setChoices([]);
      setError('');
      
    } catch (error) {
      enqueueSnackbar('Ошибка при сохранении страницы', { variant: 'error' });
      setError('Ошибка при сохранении страницы');
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
  <Typography variant="h5" sx={{ mb: 1, color: theme.palette.text.primary }}>
    {editingPage ? 'Редактировать страницу' : 'Создать новую страницу'}
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
    label="Содержание"
    value={content}
    onChange={(e) => setContent(e.target.value)}
    fullWidth
    margin="normal"
    multiline
    rows={4}
  />

  <Typography variant="h5" sx={{ mt: 2, color: theme.palette.text.primary }}>
    Варианты выбора
  </Typography>

  <List sx={{ mb: 2 }}>
    {choices.map((choice, index) => (
      
      <ListItem key={index} disablePadding sx={{ mb: 1 }}>
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
        <IconButton onClick={() => handleDeleteChoice(index)} color="error" sx={{ ml: 1 }}>
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
    <IconButton onClick={handleAddChoice} color="primary" sx={{ ml: 1 }}>
      <Add />
    </IconButton>
  </Box>

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
    {editingPage ? 'Сохранить изменения' : 'Создать страницу'}
  </Button>
</Box>

  );
};

export default QuestPageForm;