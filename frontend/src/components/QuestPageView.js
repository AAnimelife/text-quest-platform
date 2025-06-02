import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';

const QuestPageView = ({ page, onChoiceClick }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        boxShadow: { xs: 1, sm: 2 },
        maxWidth: 800,
        mx: 'auto',
      }}
    >
      <Typography
        variant="body1"
        sx={{
          whiteSpace: 'pre-line',
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: '1rem', sm: '1.1rem' },
          lineHeight: 1.6,
          textAlign: 'justify',
          color: theme.palette.text.primary,
        }}
      >
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
            sx={{
              borderRadius: 1,
              minHeight: 48,
              fontSize: { xs: '0.95rem', sm: '1.05rem' },
              fontWeight: 500,
            }}
          >
            {choice.text}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default QuestPageView;
