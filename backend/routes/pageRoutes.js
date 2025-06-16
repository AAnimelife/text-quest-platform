const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createPage, getPages, updatePage, deletePage, setStart } = require('../controllers/pageController');
const { body, validationResult} = require('express-validator');
const { checkPagePermission, canEditQuest } = require('../middleware/checkPermission');
const router = express.Router();

router.use(authMiddleware);

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', [
    body('questId'),
    body('title').isLength({ min: 1, max: 100 }),
    body('content'),
    body('options'),
], validate, canEditQuest, createPage);

router.get('/:id', canEditQuest, getPages);

router.put('/:id', checkPagePermission, updatePage);
router.delete('/:id', checkPagePermission, deletePage);
router.patch('/:id/start', checkPagePermission, setStart);

module.exports = router;