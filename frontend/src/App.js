import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestsPage from './pages/QuestsPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './pages/RegisterPage';
import QuestPagesPage from './pages/QuestPagesPage';

const App = () => {
  return (
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
      </Routes>
    </Router>
  );
};

export default App;