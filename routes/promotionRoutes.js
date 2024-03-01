const express = require('express');
const router = express.Router();
const { Promotion } = require('../models/Promotion');
const promotionController = require('../controllers/promotionController');
const {authMiddleware,checkRoles }= require('../middlewares/authMiddleware');

// Create a new promotion
router.post('/create', promotionController.createPromotion);

// Get all promotions
router.get('/showall', promotionController.getAllPromotions);

// Get a promotion by ID
router.get('/show/:id', promotionController.getPromotionById);

// Update a promotion
router.put('/edit/:id', promotionController.updatePromotion);

// Delete a promotion
router.delete('/delete/:id', promotionController.deletePromotion);

module.exports = router;