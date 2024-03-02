const express = require('express');
const router = express.Router();
const { EmployeePositionHistory } = require('../models/EmployeePositionHistory');
const {
  createEmployeePositionHistory,
  getAllEmployeePositionHistories,
  getEmployeePositionHistoryById,
  updateEmployeePositionHistory,
  deleteEmployeePositionHistory,
  } = require('../controllers/employeePositionHistoryController');
const {validateAuth , checkRoles } = require('../middlewares/authMiddleware');
const { validateCreateEmployeePositionHistory } = require('../middlewares/validationMiddleware');


// Create a new employee position history
router.post('/create', validateCreateEmployeePositionHistory,createEmployeePositionHistory);

// Get all employee position histories
router.get('/showall', getAllEmployeePositionHistories);

// Get an employee position history by ID
router.get('/show/:id', getEmployeePositionHistoryById);

// Update an employee position history
router.put('/edit/:id', validateCreateEmployeePositionHistory,updateEmployeePositionHistory);

// Delete an employee position history
router.delete('/delete/:id', deleteEmployeePositionHistory);

module.exports = router;