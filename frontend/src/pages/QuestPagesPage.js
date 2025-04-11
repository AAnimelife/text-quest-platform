import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuestPageList from '../components/QuestPageList';
import QuestPageForm from '../components/QuestPageForm';
import QuestTree from '../components/QuestTree';
import { Container, Typography, Tabs, Tab, Box, Button } from '@mui/material';
import pageService from '../services/pageService';
import { useNavigate } from 'react-router-dom';

const QuestPagesPage = () => {
  const { questId } = useParams();
  const [pages, setPages] = useState([]);
  const [editingPage, setEditingPage] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const data = await pageService.getPages(questId);
        setPages(data);
      } catch (error) {
        console.error('Ошибка при загрузке страниц:', error);
      }
    };
    fetchPages();
  }, [questId]);

  const handlePageCreated = (newPage) => {
    setPages([...pages, newPage]);
  };

  const handlePageUpdated = (updatedPage) => {
    setPages(pages.map((page) => (page._id === updatedPage._id ? updatedPage : page)));
    setEditingPage(null); 
  };

  const handlePageDeleted = (id) => {
    setPages(pages.filter((page) => page._id !== id));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={1}>
        <Typography variant="h4">
          Страницы квеста
        </Typography>
        <Button color="primary" onClick={() => navigate('/')} variant="outlined">
          На главную
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Список страниц" />
        <Tab label="Дерево страниц" />
      </Tabs>
      
      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && (
          <>
            <QuestPageForm
              questId={questId}
              onPageCreated={handlePageCreated}
              editingPage={editingPage}
              onPageUpdated={handlePageUpdated}
              pages={pages}
            />
            <QuestPageList
              pages={pages}
              onPageDeleted={handlePageDeleted}
              onPageUpdated={setEditingPage}
            />
          </>
        )}
        {tabValue === 1 && <QuestTree pages={pages} />}
      </Box>
    </Container>
  );
};

export default QuestPagesPage;