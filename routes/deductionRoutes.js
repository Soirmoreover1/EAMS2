const express = require('express');
const router = express.Router();
const { Deduction } = require('../models/Deduction');
const deductionController = require('../controllers/deductionController');
const {authMiddleware,checkRoles }= require('../middlewares/authMiddleware');


// Create a new deduction
router.post('/create', deductionController.createDeduction);

// Get all deductions
router.get('/showall', deductionController.getAllDeductions);

// Get a deduction by ID
router.get('/show/:id', deductionController.getDeductionById);

// Update a deduction
router.put('/edit/:id', deductionController.updateDeduction);

// Delete a deduction
router.delete('/delete/:id', deductionController.deleteDeduction);

module.exports = router;