const { Deduction } = require('../models/Deduction');

// Create a new deduction
const createDeduction = async (req, res) => {
  try {
    const deduction = await Deduction.create(req.body);
    res.status(201).json(deduction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all deductions
const getAllDeductions = async (req, res) => {
  try {
    const deductions = await Deduction.findAll({
      include: [
        { model: Employee },
      ],
    });
    res.status(200).json(deductions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a deduction by ID
const getDeductionById = async (req, res) => {
  try {
    const deduction = await Deduction.findByPk(req.params.id, {
      include: [
        { model: Employee },
      ],
    });
    if (!deduction) {
      return res.status(404).json({ message: 'Deduction not found' });
    }
    res.status(200).json(deduction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a deduction
const updateDeduction = async (req, res) => {
  try {
    const [updated] = await Deduction.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Deduction not found' });
    }
    const updatedDeduction = await Deduction.findByPk(req.params.id, {
      include: [
        { model: Employee },
      ],
    });
    res.status(200).json(updatedDeduction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a deduction
const deleteDeduction = async (req, res) => {
  try {
    const deleted = await Deduction.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Deduction not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDeduction,
  getAllDeductions,
  getDeductionById,
  updateDeduction,
  deleteDeduction,
};