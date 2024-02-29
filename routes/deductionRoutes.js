const express = require('express');
const router = express.Router();
const { Deduction } = require('../models/Deduction');
const deductionController = require('../controllers/deductionController');
const {authMiddleware,checkRoles }= require('../middlewares/authMiddleware');


// Create a new deduction
router.post('/', deductionController.createDeduction);

// Get all deductions
router.get('/', deductionController.getAllDeductions);

// Get a deduction by ID
router.get('/:id', deductionController.getDeductionById);

// Update a deduction
router.put('/:id', deductionController.updateDeduction);

// Delete a deduction
router.delete('/:id', deductionController.deleteDeduction);

module.exports = router;