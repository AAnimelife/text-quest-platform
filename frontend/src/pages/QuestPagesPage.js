import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuestPageList from '../components/QuestPageList';
import QuestPageForm from '../components/QuestPageForm';
import QuestTree from '../components/QuestTree';
import { Container, Typography, Tabs, Tab, Box } from '@mui/material';
import pageService from '../services/pageService';

const QuestPagesPage = () => {
  const { questId } = useParams();
  const [pages, setPages] = useState([]);
  const [editingPage, setEditingPage] = useState(null);
  const [tabValue, setTabValue] = useState(0);

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
      <Typography variant="h4" gutterBottom>
        Страницы квеста
      </Typography>
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