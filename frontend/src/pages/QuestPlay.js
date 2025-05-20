import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        <CircularProgress />
      </Box>
    );
  }

  if (!quest || !currentPage) {
    return (
      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h6">Квест не найден или стартовая страница отсутствует.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        {quest.title}
      </Typography>

      <QuestPageView page={currentPage} onChoiceClick={handleChoiceClick} />
    </Box>
  );
};

export default QuestPlay;