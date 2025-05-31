import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import questService from '../services/questService';
import pageService from '../services/pageService';
import QuestPageView from '../components/QuestPageView';

const QuestPlay = () => {
  const { questId } = useParams();
  const [quest, setQuest] = useState(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const loadData = async () => {
      try {
        const questData = await questService.getQuest(questId);
        const pageData = await pageService.getPages(questId);
        const startPage = pageData.find((p) => p.isStart);
        setQuest(questData);
        setPages(pageData);
        setCurrentPage(startPage);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [questId]);

  const handleChoiceClick = (choice) => {
    if (!choice.nextPage) return;
    const nextPage = pages.find((p) => p._id === choice.nextPage);
    setCurrentPage(nextPage);
  };
if (loading) {
    return (
      <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!quest || !currentPage) {
    return (
      <Box sx={{ p: 4, maxWidth: 700, mx: 'auto' }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight="bold">
              Что-то пошло не так
            </Typography>
            <Button color="primary" onClick={() => navigate('/')} variant="outlined">
              На главную
            </Button>
          </Box>

          {localStorage.getItem("token") ? (
            <Typography variant="body1" color="text.secondary">
              Квест не найден или стартовая страница отсутствует. Пожалуйста, проверьте ссылку или вернитесь на главную.
            </Typography>
          ) : (
            <Box mt={2}>
              <Typography variant="body1" color="text.secondary" mb={2}>
                Вы не авторизованы. Чтобы начать прохождение квеста, пожалуйста, войдите в систему.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/login', { state: { from: location.pathname } })}
              >
                Войти
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    );
  }return (
    <Box sx={{ mt: 4, maxWidth: 800, mx: 'auto' }}>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" gutterBottom textAlign="center">
        {quest.title}
      </Typography>
        <Button color="primary" onClick={() => navigate('/')} variant="outlined">
          На главную
        </Button></Box>
      <QuestPageView page={currentPage} onChoiceClick={handleChoiceClick} />
    </Box>
  );
};

export default QuestPlay;