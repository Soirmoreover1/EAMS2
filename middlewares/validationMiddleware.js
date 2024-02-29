const { User } = require('../models/User');
const { check, validationResult } = require('express-validator');

exports.validateUser = [
  check('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .custom((value) => {
      return User.findOne({ where: { username: value } }).then((user) => {
        if (user) {
          return Promise.reject('Username already in use');
        }
      });
    }),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be between 8 and 20 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'g')
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'fail',
        errors: errors.array(),
      });
    }
    next();
  },
];

exports.validateAuth = [
  check('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .custom((value) => {
      return User.findOne({ where: { username: value } }).then((user) => {
        if (!user) {
          return Promise.reject('Invalid username or password');
        }
      });
    }),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be between 8 and 20 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'g')
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'fail',
        errors: errors.array(),
      });
    }
    next();
  },
];

exports.validateCreateCompany = [
  check('name')
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ max: 255 })
    .withMessage('Company name must be less than or equal to 255 characters'),
  check('manager')
    .notEmpty()
    .withMessage('Manager name is required')
    .isLength({ max: 255 })
    .withMessage('Manager name must be less than or equal to 255 characters'),
  check('tax_number')
    .notEmpty()
    .withMessage('Tax number is required')
    .isLength({ max: 255 })
    .withMessage('Tax number must be less than or equal to 255 characters'),
  check('website')
    .notEmpty()
    .withMessage('Website is required')
    .isLength({ max: 255 })
    .withMessage('Website must be less than or equal to 255 characters'),
  check('location')
    .notEmpty()
    .withMessage('Location is required')
    .isLength({ max: 255 })
    .withMessage('Location must be less than or equal to 255 characters'),
  check('industry')
    .notEmpty()
    .withMessage('Industry is required')
    .isLength({ max: 255 })
    .withMessage('Industry must be less than or equal to 255 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'fail',
        errors: errors.array(),
      });
    }
    next();
  },
];
