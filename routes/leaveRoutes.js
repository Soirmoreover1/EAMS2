const express = require('express');
const router = express.Router();
const { Leave } = require('../models/Leave');
const leaveController = require('../controllers/leaveController');
const {authMiddleware,checkRoles }= require('../middlewares/authMiddleware');


// Create a new leave
router.post('/create', leaveController.createLeave);

// Get all leaves
router.get('/showall', leaveController.getAllLeaves);

// Get a leave by ID
router.get('/show/:id', leaveController.getLeaveById);

// Update a leave
router.put('/edit/:id', leaveController.updateLeave);

// Delete a leave
router.delete('/delete/:id', leaveController.deleteLeave);

module.exports = router;