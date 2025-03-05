import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestsPage from './pages/QuestsPage';
import LoginPage from './pages/LoginPages';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/quests" element={<QuestsPage />} />
        <Route path="/" element={<QuestsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;