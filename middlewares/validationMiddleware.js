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

exports.validateCreateShift = [
  check('shift_name')
    .notEmpty()
    .withMessage('Shift name is required')
    .isLength({ min: 3, max: 255 })
    .withMessage('Shift name must be between 3 and 255 characters'),
  check('start_time')
    .notEmpty()
    .withMessage('Start time is required')
    .isISO8601()
    .withMessage('Start time is not valid'),
  check('end_time')
    .notEmpty()
    .withMessage('End time is required')
    .isISO8601()
    .withMessage('End time is not valid'),
  check('working_days')
    .notEmpty()
    .withMessage('Working days are required')
    .isLength({ min: 3, max: 255 })
    .withMessage('Working days must be between 3 and 255 characters'),
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

exports.validateCreateDeduction = [
  check('employee_id')
    .notEmpty()
    .withMessage('Employee ID is required')
    .isInt()
    .withMessage('Employee ID must be an integer'),
  check('deduction_type')
    .notEmpty()
    .withMessage('Deduction type is required')
    .isLength({ min: 3, max: 255 })
    .withMessage('Deduction type must be between 3 and 255 characters'),
  check('deduction_amount')
    .notEmpty()
    .withMessage('Deduction amount is required')
    .isFloat()
    .withMessage('Deduction amount must be a float number'),
  check('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Date is not valid'),
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

exports.validateCreateDepartment = [
  check('name')
    .notEmpty()
    .withMessage('Department name is required')
    .isLength({ min: 3, max: 255 })
    .withMessage('Department name must be between 3 and 255 characters'),
  check('manager_id')
    .notEmpty()
    .withMessage('Manager ID is required')
    .isInt()
    .withMessage('Manager ID must be an integer'),
  check('company_id')
    .notEmpty()
    .withMessage('Company ID is required')
    .isInt()
    .withMessage('Company ID must be an integer'),
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

exports.validateCreateBonus = [
  check('employee_id')
    .notEmpty()
    .withMessage('Employee ID is required')
    .isInt()
    .withMessage('Employee ID must be an integer'),
  check('bonus_type')
    .notEmpty()
    .withMessage('Bonus type is required')
    .isLength({ min: 3, max: 255 })
    .withMessage('Bonus type must be between 3 and 255 characters'),
  check('bonus_amount')
    .notEmpty()
    .withMessage('Bonus amount is required')
    .isFloat()
    .withMessage('Bonus amount must be a float number'),
  check('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 date'),
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

exports.validateCreateAttendance = [
  check('employee_id')
    .notEmpty()
    .withMessage('Employee ID is required')
    .isInt()
    .withMessage('Employee ID must be an integer'),
  check('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 date'),
  check('time_in')
    .notEmpty()
    .withMessage('Time in is required')
    .isISO8601()
    .withMessage('Time in must be a valid ISO 8601 time'),
  check('time_out')
    .notEmpty()
    .withMessage('Time out is required')
    .isISO8601()
    .withMessage('Time out must be a valid ISO 8601 time'),
  check('total_hours_worked')
    .notEmpty()
    .withMessage('Total hours worked is required')
    .isFloat()
    .withMessage('Total hours worked must be a float number'),
  check('overtime_hours')
    .notEmpty()
    .withMessage('Overtime hours is required')
    .isFloat()
    .withMessage('Overtime hours must be a float number'),
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


exports.validateCreateEmployee = [
  check('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  check('department_id')
    .notEmpty()
    .withMessage('Department ID is required')
    .isInt()
    .withMessage('Department ID must be an integer'),
  check('shift_id')
    .notEmpty()
    .withMessage('Shift ID is required')
    .isInt()
    .withMessage('Shift ID must be an integer'),
  check('hire_date')
    .notEmpty()
    .withMessage('Hire date is required')
    .isISO8601()
    .withMessage('Hire date must be a valid ISO 8601 date'),
  check('manager_id')
    .optional()
    .isInt()
    .withMessage('Manager ID must be an integer if provided'),
  check('user_id')
    .notEmpty()
    .withMessage('User ID is required')
    .isInt()
    .withMessage('User ID must be an integer'),
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


exports.validateCreateLeave = [
  check('employee_id')
    .notEmpty()
    .withMessage('Employee ID is required')
    .isInt()
    .withMessage('Employee ID must be an integer'),
  check('type_of_leave')
    .notEmpty()
    .withMessage('Type of leave is required')
    .isLength({ min: 3, max: 255 })
    .withMessage('Type of leave must be at least 3 characters long and no more than 255 characters long'),
  check('start_date')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  check('end_date')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date'),
  check('duration')
    .notEmpty()
    .withMessage('Duration is required')
    .isInt()
    .withMessage('Duration must be an integer'),
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

exports.validateCreateEmployeePositionHistory = [
  check('employee_id')
    .notEmpty()
    .withMessage('Employee ID is required')
    .isInt()
    .withMessage('Employee ID must be an integer'),
  check('position')
    .notEmpty()
    .withMessage('Position is required')
    .isLength({ min: 3, max: 255 })
    .withMessage('Position must be at least 3 characters long and no more than 255 characters long'),
  check('department_id')
    .notEmpty()
    .withMessage('Department ID is required')
    .isInt()
    .withMessage('Department ID must be an integer'),
  check('salary')
    .notEmpty()
    .withMessage('Salary is required')
    .isFloat()
    .withMessage('Salary must be a float number'),
  check('start_date')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  check('end_date')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date if provided'),
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


exports.validateCreatePromotion = [
  check('employee_id')
    .notEmpty()
    .withMessage('Employee ID is required')
    .isInt()
    .withMessage('Employee ID must be an integer'),
  check('promotion_date')
    .notEmpty()
    .withMessage('Promotion date is required')
    .isISO8601()
    .withMessage('Promotion date must be a valid ISO 8601 date'),
  check('prev_position')
    .notEmpty()
    .withMessage('Previous position is required')
    .isLength({ min: 3, max: 255 })
    .withMessage('Previous position must be at least 3 characters long and no more than 255 characters long'),
  check('new_position')
    .notEmpty()
    .withMessage('New position is required')
    .isLength({ min: 3, max: 255 })
    .withMessage('New position must be at least 3 characters long and no more than 255 characters long'),
  check('salary_increase')
    .notEmpty()
    .withMessage('Salary increase is required')
    .isFloat()
    .withMessage('Salary increase must be a float number'),
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


exports.validateCreateSalary = [
  check('employee_id')
    .notEmpty()
    .withMessage('Employee ID is required')
    .isInt()
    .withMessage('Employee ID must be an integer'),
  check('gross_salary')
    .notEmpty()
    .withMessage('Gross salary is required')
    .isFloat()
    .withMessage('Gross salary must be a float number'),
  check('net_salary')
    .notEmpty()
    .withMessage('Net salary is required')
    .isFloat()
    .withMessage('Net salary must be a float number'),
  check('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 date'),
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
