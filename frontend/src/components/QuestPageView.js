import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

const QuestPageView = ({ page, onChoiceClick }) => {
  return (
    <Box elevation={3} sx={{ p: 3, backgroundColor: 'background.paper' }}>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 3 }}>
        {page.content}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {page.choices.map((choice, idx) => (
          <Button
            key={idx}
            variant="contained"
            color="primary"
            disabled={!choice.nextPage}
            onClick={() => onChoiceClick(choice)}
            fullWidth
            sx={{ borderRadius: 0 }}
          >
            {choice.text}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default QuestPageView;
