const express = require('express');
const router = express.Router();
const { Bonus } = require('../models/Bonus');
const { 
  createBonus,
  getAllBonuses,
  getBonusById,
  updateBonus,
  deleteBonus
                 }=require('../controllers/bonusController');
const {authMiddleware,checkRoles }= require('../middlewares/authMiddleware');


// Create a new bonus
router.post('/', createBonus);

// Get all bonuses
router.get('/', getAllBonuses);

// Get a bonus by ID
router.get('/:id', getBonusById);

// Update a bonus
router.put('/:id',updateBonus);

// Delete a bonus
router.delete('/:id', deleteBonus);

module.exports = router;