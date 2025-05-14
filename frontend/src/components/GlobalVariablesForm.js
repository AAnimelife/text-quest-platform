import React, { useState } from 'react';
import { TextField, Box, Typography, List, ListItem, useTheme, Paper, ListItemText, IconButton, MenuItem } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const GlobalVariablesForm = ({ globalVariables, onUpdate }) => {
  const [newVariableName, setNewVariableName] = useState('');
  const [newVariableType, setNewVariableType] = useState('number');
  const [newVariableValue, setNewVariableValue] = useState('');
  const theme = useTheme();

  const handleAddVariable = () => {
    if (newVariableName.trim() && newVariableValue !== '') {
      const updatedVariables = {
        ...globalVariables,
        [newVariableName]: {
          type: newVariableType,
          initialValue: newVariableType === 'number' ? Number(newVariableValue) : newVariableValue === 'true',
        },
      };
      onUpdate(updatedVariables);
      setNewVariableName('');
      setNewVariableValue('');
    }
  };

  const handleDeleteVariable = (name) => {
    const updatedVariables = { ...globalVariables };
    delete updatedVariables[name];
    onUpdate(updatedVariables);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom color="text.primary">
        Глобальные переменные
      </Typography>
      <List>
        {Object.entries(globalVariables).map(([name, variable]) => (
          <Paper
            key={name}
            sx={{
              mb: 1,
              px: 2,
              py: 1,
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <ListItemText
              primary={`${name} (${variable.type})`}
              secondary={`Начальное значение: ${variable.initialValue}`}
            />
            <IconButton onClick={() => handleDeleteVariable(name)} color="error">
              <Delete />
            </IconButton>
          </Paper>
        ))}
      </List>

      <Box display="flex" alignItems="center" sx={{ mt: 2, flexWrap: 'wrap', gap: 2 }}>
        <TextField
          label="Имя переменной"
          value={newVariableName}
          onChange={(e) => setNewVariableName(e.target.value)}
          margin="normal"
          size="small"
        />
        <TextField
          select
          label="Тип переменной"
          value={newVariableType}
          onChange={(e) => setNewVariableType(e.target.value)}
          margin="normal"
          size="small"
        >
          <MenuItem value="number">Число</MenuItem>
          <MenuItem value="boolean">Логическое</MenuItem>
        </TextField>
        <TextField
          label="Начальное значение"
          value={newVariableValue}
          onChange={(e) => setNewVariableValue(e.target.value)}
          type={newVariableType === 'number' ? 'number' : 'text'}
          margin="normal"
          size="small"
        />
        <IconButton onClick={handleAddVariable} color="primary" sx={{ alignSelf: 'center' }}>
          <Add />
        </IconButton>
      </Box>
    </Box>
  );
};

export default GlobalVariablesForm;