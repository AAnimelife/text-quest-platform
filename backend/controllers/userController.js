const Quest = require('../models/Quest');
const QuestPage = require('../models/QuestPage');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    const quests = await Quest.find({ author: user._id });
    console.log(quests);
    const questIds = quests.map(q => q._id);
    const pageCount = await QuestPage.countDocuments({ questId: { $in: questIds } });
    console.log(pageCount);
    res.json({
      username: user.username,
      email: user.email,
      questCount: quests.length,
      pageCount,
      quests: quests.map(q => ({ id: q._id, title: q.title })),
    });
  } catch (error) {
    console.error('Ошибка получения профиля:', error);
    res.status(500).json({ message: 'Ошибка получения профиля', error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный текущий пароль' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Пароль успешно обновлён' });
  } catch (error) {
    console.error('Ошибка смены пароля:', error);
    res.status(500).json({ message: 'Ошибка смены пароля', error: error.message });
  }
};

module.exports = { getUserProfile, changePassword };
