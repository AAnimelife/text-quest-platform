const QuestPage = require('../models/QuestPage');
const Quest = require('../models/Quest');

const canEditQuest = async (req, res, next) => {
  try {
    const questId = req.params.id || req.body.questId;
    const quest = await Quest.findById(questId);
    if (!quest) {
      return res.status(404).json({ message: 'Квест не найден' });
    }

    const user = req.user;

    if (user.role === 'admin' || quest.author.equals(user._id)) {
      req.quest = quest;
      return next();
    }

    return res.status(403).json({ message: 'Нет прав на редактирование квеста' });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка проверки прав', error: error.message });
  }
};

const checkPagePermission = async (req, res, next) => {
  try {
    const page = await QuestPage.findById(req.params.id);
    if (!page) return res.status(404).json({ message: 'Страница не найдена' });

    const quest = await Quest.findById(page.questId);
    if (!quest) return res.status(404).json({ message: 'Квест не найден' });

    if (req.user.role === 'admin' || quest.author.equals(req.user._id)) {
      return next();
    }

    return res.status(403).json({ message: 'Нет прав на изменение этой страницы' });
  } catch (err) {
    return res.status(500).json({ message: 'Ошибка проверки доступа', error: err.message });
  }
};

module.exports = { canEditQuest, checkPagePermission };
