import { useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestsPage from './pages/QuestsPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './pages/RegisterPage';
import QuestPagesPage from './pages/QuestPagesPage';
import getNewspaperTheme from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { CssBaseline, IconButton } from '@mui/material';
import UserProfilePage from './pages/UserProfilePage';
import QuestPlay from './pages/QuestPlay';
import ChangePasswordPage from './pages/ChandgePasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminPanelPage from './pages/AdminPanelPage';

function App() {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');
  const theme = useMemo(() => getNewspaperTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newMode);
      return newMode;
    });
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePasswordPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/quest/play/:questId"
            element={<QuestPlay />}
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminPanelPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;