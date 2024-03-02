const express = require('express');
const router = express.Router();
const { Department } = require('../models/Department');
const {
    createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  }= require('../controllers/departmentController');
const {validateAuth , checkRoles } = require('../middlewares/authMiddleware');
const { validateCreateDepartment } = require('../middlewares/validationMiddleware');


// Create a new department
router.post('/create', validateCreateDepartment,createDepartment);

// Get all departments
router.get('/showall', getAllDepartments);

// Get a department by ID
router.get('/show/:id', getDepartmentById);

// Update a department
router.put('/edit/:id', validateCreateDepartment,updateDepartment);

// Delete a department
router.delete('/delete/:id', deleteDepartment);

module.exports = router;