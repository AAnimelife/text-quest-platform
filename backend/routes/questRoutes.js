const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createQuest, getQuests, updateQuest, deleteQuest } = require('../controllers/questController');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createQuest);
router.get('/', getQuests);
router.put('/:id', updateQuest);
router.delete('/:id', deleteQuest);

module.exports = router;