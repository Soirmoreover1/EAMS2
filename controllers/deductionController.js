const { Deduction } = require('../models/Deduction');
const { Employee } = require('../models/Employee'); // Import the Employee model
const db = require('../models/index');

// Create a new deduction
const createDeduction = async (req, res) => {
  const { employee_id,date,deduction_type,deduction_amount} = req.body;

  try {
    const deduction = await Deduction.create({
      employee_id,
      deduction_type,
      deduction_amount,
      date,
    });

    res.status(201).json({
      status: 'success',
      data: {
        deduction,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Server error',
    });
  }
};

// Get all deductions
const getAllDeductions = async (req, res) => {
  try {
    const deductions = await Deduction.findAll({
      include: [
        { model: db.Employee },
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
        { model: db.Employee },
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
        { model: db.Employee },
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