import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 4, maxWidth: 800, mx: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom textAlign="center">
          404 Страница не найдена
        </Typography>
        <Button color="primary" onClick={() => navigate('/')} variant="outlined">
          На главную
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;