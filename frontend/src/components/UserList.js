import React from 'react';
import {
  List,
  ListItemText,
  Button,
  Typography,
  Box,
  useTheme,
  Paper,
} from '@mui/material';
import { useSnackbar } from 'notistack';

const UserList = ({ users }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email)
      .then(() => enqueueSnackbar('Email скопирован!', { variant: 'info' }))
      .catch(() => enqueueSnackbar('Ошибка при копировании', { variant: 'error' }));
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, color: theme.palette.text.primary, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
      >
        Список пользователей
      </Typography>

      <List>
        {users.map((user) => (
          <Paper
            key={user._id}
            sx={{
              mb: 2,
              p: 2,
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <ListItemText
              primary={`${user.username} (${user.role || 'user'})`}
              secondary={`Email: ${user.email}`}
              sx={{ flex: 1, wordBreak: 'break-word' }}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                variant="outlined"
                onClick={() => handleCopyEmail(user.email)}
              >
                Копировать Email
              </Button>
              {/* Кнопка "Редактировать" может быть реализована позже */}
              <Button
                variant="outlined"
                onClick={() => enqueueSnackbar('Редактирование ещё не реализовано', { variant: 'warning' })}
              >
                Редактировать
              </Button>
            </Box>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default UserList;
