const express = require('express');
const router = express.Router();
const { Employee } = require('../models/Employee');
const {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
  } = require('../controllers/employeeController');
const {validateAuth , checkRoles } = require('../middlewares/authMiddleware');
const { validateCreateEmployee } = require('../middlewares/validationMiddleware');


// Create a new employee
router.post('/create',validateCreateEmployee ,createEmployee);

// Get all employees
router.get('/showall',getAllEmployees);

// Get an employee by ID
router.get('/show/:id',getEmployeeById);

// Update an employee
router.put('/edit/:id',validateCreateEmployee,updateEmployee);

// Delete an employee
router.delete('/delete/:id',deleteEmployee);

module.exports = router;