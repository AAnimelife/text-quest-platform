const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createQuest, getQuests, getQuest, updateQuest, deleteQuest, updateQuestVariables } = require('../controllers/questController');
const { body, param, validationResult} = require('express-validator');
const { canEditQuest } = require('../middleware/checkPermission');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getQuests);

router.get('/:id', getQuest);

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

router.put('/:id', [
    param('id').isMongoId(),
], validate, canEditQuest, updateQuest);

router.delete('/:id', canEditQuest, deleteQuest);
router.patch('/:id/variables', canEditQuest, updateQuestVariables);

module.exports = router;