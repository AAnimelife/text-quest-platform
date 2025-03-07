import React, { useState } from 'react';
import { TextField, Box, Typography, List, ListItem, ListItemText, IconButton, MenuItem } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const GlobalVariablesForm = ({ globalVariables, onUpdate }) => {
  const [newVariableName, setNewVariableName] = useState('');
  const [newVariableType, setNewVariableType] = useState('number');
  const [newVariableValue, setNewVariableValue] = useState('');

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
      <Typography variant="h6" gutterBottom>
        Глобальные переменные
      </Typography>
      <List>
        {Object.entries(globalVariables).map(([name, variable]) => (
          <ListItem key={name}>
            <ListItemText
              primary={`${name} (${variable.type})`}
              secondary={`Начальное значение: ${variable.initialValue}`}
            />
            <IconButton onClick={() => handleDeleteVariable(name)} color="error">
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
        <TextField
          label="Имя переменной"
          value={newVariableName}
          onChange={(e) => setNewVariableName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Тип переменной"
          value={newVariableType}
          onChange={(e) => setNewVariableType(e.target.value)}
          sx={{ ml: 2, minWidth: 120 }}
          margin="normal"
        >
          <MenuItem value="number">Число</MenuItem>
          <MenuItem value="boolean">Логическое</MenuItem>
        </TextField>
        <TextField
          label="Начальное значение"
          value={newVariableValue}
          onChange={(e) => setNewVariableValue(e.target.value)}
          type={newVariableType === 'number' ? 'number' : 'text'}
          sx={{ ml: 2 }}
          margin="normal"
        />
        <IconButton onClick={handleAddVariable} color="primary">
          <Add />
        </IconButton>
      </Box>
    </Box>
  );
};

export default GlobalVariablesForm;