const express = require('express');
const router = express.Router();
const { Promotion } = require('../models/Promotion');
const {
    createPromotion,
  getAllPromotions,
  getPromotionById,
  updatePromotion,
  deletePromotion,
  } = require('../controllers/promotionController');
const {validateAuth , checkRoles } = require('../middlewares/authMiddleware');
const { validateCreatePromotion } = require('../middlewares/validationMiddleware');

// Create a new promotion
router.post('/create', validateCreatePromotion,createPromotion);

// Get all promotions
router.get('/showall', getAllPromotions);

// Get a promotion by ID
router.get('/show/:id', getPromotionById);

// Update a promotion
router.put('/edit/:id', validateCreatePromotion,updatePromotion);

// Delete a promotion
router.delete('/delete/:id', deletePromotion);

module.exports = router;