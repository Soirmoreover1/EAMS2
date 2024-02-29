const express = require('express');
const router = express.Router();
const { Department } = require('../models/Department');
const departmentController = require('../controllers/departmentController');
const {authMiddleware,checkRoles }= require('../middlewares/authMiddleware');


// Create a new department
router.post('/', departmentController.createDepartment);

// Get all departments
router.get('/', departmentController.getAllDepartments);

// Get a department by ID
router.get('/:id', departmentController.getDepartmentById);

// Update a department
router.put('/:id', departmentController.updateDepartment);

// Delete a department
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;