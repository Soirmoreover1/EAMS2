const express = require('express');
const router = express.Router();
const { Deduction } = require('../models/Deduction');
const {
    createDeduction,
  getAllDeductions,
  getDeductionById,
  updateDeduction,
  deleteDeduction,
  } = require('../controllers/deductionController');
const {validateAuth , checkRoles } = require('../middlewares/authMiddleware');
const { validateCreateDeduction } = require('../middlewares/validationMiddleware');


// Create a new deduction
router.post('/create',validateCreateDeduction  ,createDeduction);

// Get all deductions
router.get('/showall', getAllDeductions);

// Get a deduction by ID
router.get('/show/:id', getDeductionById);

// Update a deduction
router.put('/edit/:id', validateCreateDeduction ,updateDeduction);

// Delete a deduction
router.delete('/delete/:id', deleteDeduction);

module.exports = router;