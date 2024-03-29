const { Bonus } = require('../models');
const db = require('../models');


// Create a new bonus
const createBonus = async (req, res) => {
  const { employee_id,date,bonus_type,bonus_amount} = req.body;

  try {
    const bonus = await db.bonus.create({
      employee_id,
      bonus_type,
      bonus_amount,
      date,
    });

    res.status(201).json({
      status: 'success',
      data: {
        bonus,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message:error.message,
    });
  }
};

// Get all bonuses
const getAllBonuses = async (req, res) => {
  try {
    const bonuses = await db.bonus.findAll({
      include: [
        { model: db.employee,
          as: 'bonuses' },
      ],
    });
    res.status(200).json(bonuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a bonus by ID
const getBonusById = async (req, res) => {
  try {
    const bonus = await db.bonus.findByPk(req.params.id, {
      include: [
        { model: db.employee,
          as: 'bonuses' },
      ],
    });
    if (!bonus) {
      return res.status(404).json({ message: 'Bonus not found' });
    }
    res.status(200).json(bonus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a bonus
const updateBonus = async (req, res) => {
  try {
    const [updated] = await db.bonus.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Bonus not found' });
    }
    const updatedBonus = await db.bonus.findByPk(req.params.id, {
      include: [
        { model: db.employee,
          as: 'bonuses' },
      ],
    });
    res.status(200).json(updatedBonus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a bonus
const deleteBonus = async (req, res) => {
  try {
    const deleted = await db.bonus.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Bonus not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBonus,
  getAllBonuses,
  getBonusById,
  updateBonus,
  deleteBonus,
};