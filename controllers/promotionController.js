const { Promotion } = require('../models');
const db = require('../models');

// Create a new promotion
const createPromotion = async (req, res) => {
  const { employee_id, promotion_date,prev_position,new_position,salary_increase } = req.body;

  try {
    const promotion = await db.promotion.create({
      employee_id,
      promotion_date,
      prev_position,
      new_position,
      salary_increase,
    });

    res.status(201).json({
      status: 'success',
      data: {
        promotion,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message:error.message,
        });
  }
};

// Get all promotions
const getAllPromotions = async (req, res) => {
  try {
    const promotions = await db.promotion.findAll({
      include: [
        { model: db.employee },
      ],
    });
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a promotion by ID
const getPromotionById = async (req, res) => {
  try {
    const promotion = await db.promotion.findByPk(req.params.id, {
      include: [
        { model: db.employee },
      ],
    });
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a promotion
const updatePromotion = async (req, res) => {
  try {
    const [updated] = await db.promotion.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    const updatedPromotion = await db.promotion.findByPk(req.params.id, {
      include: [
        { model: db.employee },
      ],
    });
    res.status(200).json(updatedPromotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a promotion
const deletePromotion = async (req, res) => {
  try {
    const deleted = await db.promotion.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPromotion,
  getAllPromotions,
  getPromotionById,
  updatePromotion,
  deletePromotion,
};