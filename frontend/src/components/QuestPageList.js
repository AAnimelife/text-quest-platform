import React from 'react';
import { List, ListItem, ListItemText, Button, Typography, Box, useTheme } from '@mui/material';
import pageService from '../services/pageService';
import { useSnackbar } from 'notistack';

const QuestPageList = ({ pages, onPageDeleted, onSetStart, onPageUpdated }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = async (id) => {
    try {
      await pageService.deletePage(id);
      onPageDeleted(id);
      enqueueSnackbar('Страница удалена!', { variant: 'success' });
    } catch (error) {
      console.error('Ошибка при удалении страницы:', error);
      enqueueSnackbar('Ошибка при удалении страницы!', { variant: 'error' });
    }
  };
  // const handleSetStart = async (id) => {
  //   try {
  //     const new_page = await pageService.setStart(id);
  //     onSetStart(new_page);
  //   }
  //   catch (error) {
  //     console.error('Ошибка при задании стартовой страницы: ', error);
  //   }
  // };

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
              fontStyle: page.isStart ? 'bold' : 'normal',
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <ListItemText
                primary={page.title}
                secondary={page.content}
                secondaryTypographyProps={{ whiteSpace: 'pre-line' }}
                sx={{

                  fontStyle: page.isStart ? 'italic' : 'normal',
                }}
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
              {/* <Button 
                variant="contained"
                color="secondary"
                onClick={() => handleSetStart(page._id)}
              >
                Сделать началом
              </Button> */}
            </Box>
          </ListItem>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default QuestPageList;
