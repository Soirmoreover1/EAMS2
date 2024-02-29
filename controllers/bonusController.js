const { Bonus } = require('../models/Bonus');
const { Employee } = require('../models/Employee'); // Import the Employee model


// Create a new bonus
const createBonus = async (req, res) => {
  try {
    const bonus = await Bonus.create(req.body);
    res.status(201).json(bonus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bonuses
const getAllBonuses = async (req, res) => {
  try {
    const bonuses = await Bonus.findAll({
      include: [
        { model: Employee },
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
    const bonus = await Bonus.findByPk(req.params.id, {
      include: [
        { model: Employee },
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
    const [updated] = await Bonus.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Bonus not found' });
    }
    const updatedBonus = await Bonus.findByPk(req.params.id, {
      include: [
        { model: Employee },
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
    const deleted = await Bonus.destroy({
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