const express = require('express');
const router = express.Router();
const { Salary } = require('../models/Salary');
const {
    createSalary,
    getAllSalaries,
    getSalaryById,
    updateSalary,
    deleteSalary,
  }= require('../controllers/salaryController');
const {validateAuth , checkRoles } = require('../middlewares/authMiddleware');
const {  validateCreateSalary } = require('../middlewares/validationMiddleware');


// Create a new salary
router.post('/create',validateCreateSalary, createSalary);
// Get all salaries
router.get('/showall', getAllSalaries);
// Get a salary by ID
router.get('/show/:id', getSalaryById);
// Update a salary
router.put('/edit/:id',validateCreateSalary, updateSalary);
// Delete a salary
router.delete('/delete/:id', deleteSalary);

module.exports = router;