// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors({
  origin: ['https://text-quest-platform-main.onrender.com/'],
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/quests', require('./routes/questRoutes'));
app.use('/api/pages', require('./routes/pageRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

module.exports = app;
