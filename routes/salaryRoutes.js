const express = require('express');
const router = express.Router();
const { Salary } = require('../models/Salary');
const salaryController = require('../controllers/salaryController');
const {authMiddleware,checkRoles }= require('../middlewares/authMiddleware');


// Create a new salary
router.post('/create', salaryController.createSalary);

// Get all salaries
router.get('/showall', salaryController.getAllSalaries);

// Get a salary by ID
router.get('/show/:id', salaryController.getSalaryById);

// Update a salary
router.put('/edit/:id', salaryController.updateSalary);

// Delete a salary
router.delete('/delete/:id', salaryController.deleteSalary);

module.exports = router;