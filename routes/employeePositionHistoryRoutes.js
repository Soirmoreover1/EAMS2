const express = require('express');
const router = express.Router();
const { EmployeePositionHistory } = require('../models/EmployeePositionHistory');
const employeePositionHistoryController = require('../controllers/employeePositionHistoryController');
const {authMiddleware,checkRoles }= require('../middlewares/authMiddleware');


// Create a new employee position history
router.post('/', employeePositionHistoryController.createEmployeePositionHistory);

// Get all employee position histories
router.get('/', employeePositionHistoryController.getAllEmployeePositionHistories);

// Get an employee position history by ID
router.get('/:id', employeePositionHistoryController.getEmployeePositionHistoryById);

// Update an employee position history
router.put('/:id', employeePositionHistoryController.updateEmployeePositionHistory);

// Delete an employee position history
router.delete('/:id', employeePositionHistoryController.deleteEmployeePositionHistory);

module.exports = router;