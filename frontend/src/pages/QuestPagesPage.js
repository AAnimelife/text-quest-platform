import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuestPageList from '../components/QuestPageList';
import QuestPageForm from '../components/QuestPageForm';
import { Container, Typography } from '@mui/material';
import pageService from '../services/pageService';

const QuestPagesPage = () => {
  const { questId } = useParams();
  const [pages, setPages] = useState([]);
  const [editingPage, setEditingPage] = useState(null);

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

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Страницы квеста
      </Typography>
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
    </Container>
  );
};

export default QuestPagesPage;