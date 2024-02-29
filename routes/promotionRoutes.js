const express = require('express');
const router = express.Router();
const { Promotion } = require('../models/Promotion');
const promotionController = require('../controllers/promotionController');
const {authMiddleware,checkRoles }= require('../middlewares/authMiddleware');

// Create a new promotion
router.post('/', promotionController.createPromotion);

// Get all promotions
router.get('/', promotionController.getAllPromotions);

// Get a promotion by ID
router.get('/:id', promotionController.getPromotionById);

// Update a promotion
router.put('/:id', promotionController.updatePromotion);

// Delete a promotion
router.delete('/:id', promotionController.deletePromotion);

module.exports = router;