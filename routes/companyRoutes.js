const express = require('express');
const router = express.Router();
const { 
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany  }=require('../controllers/companyController');
const {validateAuth , checkRoles } = require('../middlewares/authMiddleware');
const { validateCreateCompany } = require('../middlewares/validationMiddleware');


// Create a new company
router.post('/create', checkRoles('admin'),validateCreateCompany ,createCompany);

// Get all companies
router.get('/showall', getAllCompanies);

// Get a company by ID
router.get('/show/:id', getCompanyById);

// Update a company
router.put('/edit/:id',validateCreateCompany, updateCompany);

// Delete a company
router.delete('/delete/:id', deleteCompany);

module.exports = router;