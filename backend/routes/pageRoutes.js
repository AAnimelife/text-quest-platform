const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createPage, getPages, updatePage, deletePage, setStart } = require('../controllers/pageController');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createPage);
router.get('/:questId', getPages);
router.put('/:id', updatePage);
router.delete('/:id', deletePage);
router.patch('/:id/start', setStart);

module.exports = router;