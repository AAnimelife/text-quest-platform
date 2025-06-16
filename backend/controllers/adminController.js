const User = require('../models/User');
const Quest = require('../models/Quest');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении пользователей', error: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    const update = { username, email, role };
    if (password) {
      update.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении пользователя', error: error.message });
  }
};


const getAllQuests = async (req, res) => {
  try {
    const quests = await Quest.find().populate('author', 'username email');
    res.json(quests);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении квестов', error: error.message });
  }
};


const updateQuest = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tags, globalVariables, settings, author } = req.body;

    const updatedQuest = await Quest.findByIdAndUpdate(id, {
      title,
      description,
      tags,
      globalVariables,
      settings,
      ...(author && { author }) 
    }, { new: true });

    res.json(updatedQuest);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении квеста', error: error.message });
  }
};

module.exports = { getAllUsers, updateUser, getAllQuests, updateQuest };
