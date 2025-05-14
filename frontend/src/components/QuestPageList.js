import React from 'react';
import { List, ListItem, ListItemText, Button, Typography, Box, useTheme } from '@mui/material';
import pageService from '../services/pageService';

const QuestPageList = ({ pages, onPageDeleted, onPageUpdated }) => {
  const theme = useTheme();
  const handleDelete = async (id) => {
    try {
      await pageService.deletePage(id);
      onPageDeleted(id);
    } catch (error) {
      console.error('Ошибка при удалении страницы:', error);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Страницы квеста
      </Typography>
      <List>
        {pages.map((page) => (
          <Box
                key={page._id}
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
          <ListItem
            key={page._id}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <ListItemText
                primary={page.title}
                secondary={page.content}
                secondaryTypographyProps={{ whiteSpace: 'pre-line' }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: '120px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onPageUpdated(page)}
              >
                Редактировать
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(page._id)}
              >
                Удалить
              </Button>
            </Box>
          </ListItem>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default QuestPageList;
