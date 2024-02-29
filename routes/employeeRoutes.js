const express = require('express');
const router = express.Router();
const { Employee } = require('../models/Employee');
const employeeController = require('../controllers/employeeController');
const {authMiddleware,checkRoles }= require('../middlewares/authMiddleware');


// Create a new employee
router.post('/',authMiddleware ,employeeController.createEmployee);

// Get all employees
router.get('/', authMiddleware,employeeController.getAllEmployees);

// Get an employee by ID
router.get('/:id', authMiddleware,employeeController.getEmployeeById);

// Update an employee
router.put('/:id',authMiddleware, employeeController.updateEmployee);

// Delete an employee
router.delete('/:id', authMiddleware,employeeController.deleteEmployee);

module.exports = router;