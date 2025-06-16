// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origin === 'null' || origin.startsWith('file://') || origin === 'https://text-quest-platform-main.onrender.com' || origin === 'http://localhost:3000') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/quests', require('./routes/questRoutes'));
app.use('/api/pages', require('./routes/pageRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

module.exports = app;
