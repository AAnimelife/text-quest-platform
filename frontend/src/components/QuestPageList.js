import React from 'react';
import {
  List,
  ListItemText,
  Button,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
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

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
      >
        Страницы квеста
      </Typography>

      <List>
        {pages.map((page) => (
          <Box
            key={page._id}
            sx={{
              mb: 2,
              p: 2,
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              alignItems: { sm: 'flex-start' },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: page.isStart ? 'bold' : 'normal',
                      fontStyle: page.isStart ? 'italic' : 'normal',
                      wordBreak: 'break-word',
                    }}
                  >
                    {page.title}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ whiteSpace: 'pre-line', mt: 1 }}
                  >
                    {page.content}
                  </Typography>
                }
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'column' },
                gap: 1,
                minWidth: { sm: '140px' },
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => onPageUpdated(page)}
              >
                Редактировать
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => handleDelete(page._id)}
              >
                Удалить
              </Button>
              {/* <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => handleSetStart(page._id)}
              >
                Сделать началом
              </Button> */}
            </Box>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default QuestPageList;
