import { useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestsPage from './pages/QuestsPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './pages/RegisterPage';
import QuestPagesPage from './pages/QuestPagesPage';
import getNewspaperTheme, { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { CssBaseline, IconButton } from '@mui/material';
import UserProfilePage from './pages/UserProfilePage';
import QuestPlay from './pages/QuestPlay';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => getNewspaperTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Обеспечивает глобальные стили, включая фон */}
      <IconButton onClick={toggleMode} sx={{ mt: 2, ml: 2, }}>
          {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      <Router>
        <Routes>
          <Route path="/quests" element={<QuestsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <QuestsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quests/:questId/pages"
            element={
              <ProtectedRoute>
                <QuestPagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/quest/play/:questId" element={<QuestPlay />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;