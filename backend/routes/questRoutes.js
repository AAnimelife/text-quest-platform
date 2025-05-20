const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createQuest, getQuests, getQuest, updateQuest, deleteQuest, updateQuestVariables } = require('../controllers/questController');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createQuest);
router.get('/', getQuests);
router.get('/:id', getQuest);
router.put('/:id', updateQuest);
router.delete('/:id', deleteQuest);
router.patch('/:id/variables', updateQuestVariables);

module.exports = router;