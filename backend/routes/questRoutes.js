const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createQuest, getQuests, getQuest, updateQuest, deleteQuest, updateQuestVariables } = require('../controllers/questController');
const { body, param, validationResult} = require('express-validator');

const router = express.Router();

router.use(authMiddleware);

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/',[
    body('title').isString().isLength({ min: 3, max: 100 }).trim().withMessage('Заголовок должен быть от 3 до 100 символов'),
    body('description').optional().isString().isLength({ max: 500 }).withMessage('Тело должно быть до 500 символов'),
    body('tags').optional().isArray(),
    body('settings').optional().isObject(),
], validate, createQuest);

router.get('/', getQuests);
router.get('/:id', getQuest);

router.put('/:id', [
    param('id').isMongoId(),
], validate, updateQuest);

router.delete('/:id', deleteQuest);
router.patch('/:id/variables', updateQuestVariables);

module.exports = router;