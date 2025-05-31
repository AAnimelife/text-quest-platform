const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post(
  '/register',
  [
    body('username').isLength({ min: 3, max: 20 }).trim().notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('password').isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minSymbols: 0,
      minUppercase: 0,
      minNumbers:1, 
    }),
  ],
  validate,
  register
);

router.get('/me', authMiddleware, getMe);

router.post(
  '/login',
  [
    body('email').isEmail()
    // body('password').isLength({ min: 6 }),
  ],
  validate,
  login
);


module.exports = router;