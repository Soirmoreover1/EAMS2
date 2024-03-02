const express = require('express');
const router = express.Router();
const { Leave } = require('../models/Leave');
const {
    createLeave,
    getAllLeaves,
    getLeaveById,
    updateLeave,
    deleteLeave,
  } = require('../controllers/leaveController');
const {validateAuth , checkRoles } = require('../middlewares/authMiddleware');
const { validateCreateLeave } = require('../middlewares/validationMiddleware');


// Create a new leave
router.post('/create',validateCreateLeave, createLeave);

// Get all leaves
router.get('/showall', getAllLeaves);

// Get a leave by ID
router.get('/show/:id', getLeaveById);

// Update a leave
router.put('/edit/:id', validateCreateLeave,updateLeave);

// Delete a leave
router.delete('/delete/:id', deleteLeave);

module.exports = router;