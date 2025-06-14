const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserProfile, changePassword } = require('../controllers/userController');
const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.use(authMiddleware);
router.get('/profile', authMiddleware, getUserProfile);

router.post(
  '/change-password',
  [
    body('currentPassword').notEmpty(),
    body('newPassword').isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minSymbols: 1,
      minUppercase: 1,
      minNumbers: 1,
    }),
  ],
  validate,
  changePassword
);

module.exports = router;
