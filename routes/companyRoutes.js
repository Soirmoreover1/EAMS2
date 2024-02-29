const express = require('express');
const router = express.Router();
const { 
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
                 }=require('../controllers/companyController');
const {authMiddleware,checkRoles }= require('../middlewares/authMiddleware');
const { validateCreateCompany } = require('../middlewares/validationMiddleware');


// Create a new company
router.post('/', checkRoles('admin'),validateCreateCompany ,createCompany);

// Get all companies
router.get('/', getAllCompanies);

// Get a company by ID
router.get('/:id', getCompanyById);

// Update a company
router.put('/:id',validateCreateCompany, updateCompany);

// Delete a company
router.delete('/:id', deleteCompany);

module.exports = router;