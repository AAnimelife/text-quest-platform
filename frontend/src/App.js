import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestsPage from './pages/QuestsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/quests" element={<QuestsPage />} />
      </Routes>
    </Router>
  );
};

export default App;