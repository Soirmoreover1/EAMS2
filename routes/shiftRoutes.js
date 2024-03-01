const express = require('express');
const router = express.Router();
const { Shift } = require('../models/Shift');
const shiftController = require('../controllers/shiftController');
const {authMiddleware,checkRoles }= require('../middlewares/authMiddleware');

// Create a new shift
router.post('/create', shiftController.createShift);

// Get all shifts
router.get('/showall', shiftController.getAllShifts);

// Get a shift by ID
router.get('/show/:id', shiftController.getShiftById);

// Update a shift
router.put('/edit/:id', shiftController.updateShift);

// Delete a shift
router.delete('/delete/:id', shiftController.deleteShift);

module.exports = router;