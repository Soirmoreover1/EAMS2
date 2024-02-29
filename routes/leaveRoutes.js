const express = require('express');
const router = express.Router();
const { Leave } = require('../models/Leave');
const leaveController = require('../controllers/leaveController');
const {authMiddleware,checkRoles }= require('../middlewares/authMiddleware');


// Create a new leave
router.post('/', leaveController.createLeave);

// Get all leaves
router.get('/', leaveController.getAllLeaves);

// Get a leave by ID
router.get('/:id', leaveController.getLeaveById);

// Update a leave
router.put('/:id', leaveController.updateLeave);

// Delete a leave
router.delete('/:id', leaveController.deleteLeave);

module.exports = router;