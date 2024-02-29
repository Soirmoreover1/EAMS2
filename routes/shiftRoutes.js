const express = require('express');
const router = express.Router();
const { Shift } = require('../models/Shift');
const shiftController = require('../controllers/shiftController');
const {authMiddleware,checkRoles }= require('../middlewares/authMiddleware');

// Create a new shift
router.post('/', shiftController.createShift);

// Get all shifts
router.get('/', shiftController.getAllShifts);

// Get a shift by ID
router.get('/:id', shiftController.getShiftById);

// Update a shift
router.put('/:id', shiftController.updateShift);

// Delete a shift
router.delete('/:id', shiftController.deleteShift);

module.exports = router;