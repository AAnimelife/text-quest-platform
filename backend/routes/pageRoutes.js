const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createPage, getPages, updatePage, deletePage, setStart } = require('../controllers/pageController');
const { body, validationResult} = require('express-validator');
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
], validate, createPage);
router.get('/:questId', getPages);
router.put('/:id', updatePage);
router.delete('/:id', deletePage);
router.patch('/:id/start', setStart);

module.exports = router;