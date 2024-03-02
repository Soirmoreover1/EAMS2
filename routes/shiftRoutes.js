const express = require('express');
const router = express.Router();
const { Shift } = require('../models/Shift');
const {
  createShift,
  getAllShifts,
  getShiftById,
  updateShift,
  deleteShift,
  } = require('../controllers/shiftController');

const {validateAuth , checkRoles } = require('../middlewares/authMiddleware');
const { validateCreateShift } = require('../middlewares/validationMiddleware');

// Create a new shift
  
  router.post('/create', validateCreateShift, createShift);

// Get all shifts
router.get('/showall',getAllShifts);

// Get a shift by ID
router.get('/show/:id', getShiftById);

// Update a shift
router.put('/edit/:id', validateCreateShift,updateShift);

// Delete a shift
router.delete('/delete/:id', deleteShift);

module.exports = router;