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
const {validateAuth , checkRoles } = require('../middlewares/authMiddleware');
const { validateCreateBonus } = require('../middlewares/validationMiddleware');


// Create a new bonus
router.post('/create',validateCreateBonus, createBonus);

// Get all bonuses
router.get('/showall', getAllBonuses);

// Get a bonus by ID
router.get('/show/:id', getBonusById);

// Update a bonus
router.put('/edit/:id',validateCreateBonus,updateBonus);

// Delete a bonus
router.delete('/delete/:id', deleteBonus);

module.exports = router;