import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuestPageList from '../components/QuestPageList';
import QuestPageForm from '../components/QuestPageForm';
import QuestTree from '../components/QuestTree';
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Button,
  useTheme,
  useMediaQuery,
  Tooltip,
  IconButton,
  Container,
} from '@mui/material';
import {
  Home as HomeIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import pageService from '../services/pageService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const QuestPagesPage = () => {

  const { logout } = useAuth();
  const { questId } = useParams();
  const [pages, setPages] = useState([]);
  const [editingPage, setEditingPage] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

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

  const handleSetStart = (updatedPage) => {
    setPages(pages.map((page) => (page._id === updatedPage._id ? updatedPage : page)));
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={1}>
        <Typography variant="h4">
          Страницы квеста
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 1, sm: 2 },
            alignItems: 'center',
          }}
        >
          {isSmUp ? (
            <>
              <Button
                startIcon={<HomeIcon />}
                color="inherit"
                onClick={() => navigate('/')}
              >
                На главную
              </Button>

              <Button
                startIcon={<LogoutIcon />}
                color="inherit"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Tooltip title="На главную">
                <IconButton onClick={() => navigate('/')}>
                  <HomeIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Выйти">
                <IconButton onClick={() => {
                  logout();
                  navigate('/login');
                }}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>

            </>
          )}
        </Box>
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
              onSetStart={handleSetStart}
            />
          </>
        )}
        {tabValue === 1 && <QuestTree pages={pages} />}
      </Box>
    </Container>
  );
};

export default QuestPagesPage;