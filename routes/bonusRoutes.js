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
router.post('/create', createBonus);

// Get all bonuses
router.get('/showall', getAllBonuses);

// Get a bonus by ID
router.get('/show/:id', getBonusById);

// Update a bonus
router.put('/edit/:id',updateBonus);

// Delete a bonus
router.delete('/delete/:id', deleteBonus);

module.exports = router;