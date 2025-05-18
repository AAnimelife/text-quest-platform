const Quest = require('../models/Quest');
const QuestPage = require('../models/QuestPage');

const getUserProfile = async (req, res) => {
  try {
    const user = req.user;

    // Найдём все квесты, где пользователь автор
    const quests = await Quest.find({ author: user._id });
    console.log(quests);
    // Получим список всех ID квестов
    const questIds = quests.map(q => q._id);

    // Подсчитаем количество страниц, принадлежащих этим квестам
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

module.exports = { getUserProfile };
