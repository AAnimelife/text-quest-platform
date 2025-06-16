const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdminMiddleware');
const {
  getAllUsers,
  updateUser,
  getAllQuests,
  updateQuest,
} = require('../controllers/adminController');

router.use(authMiddleware, isAdmin);

router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.get('/quests', getAllQuests);
router.put('/quests/:id', updateQuest);

module.exports = router;
