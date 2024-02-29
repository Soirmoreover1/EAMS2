const { Shift } = require('../models/Shift');

// Create a new shift
const createShift = async (req, res) => {
  try {
    const shift = await Shift.create(req.body);
    res.status(201).json(shift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all shifts
const getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.findAll();
    res.status(200).json(shifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a shift by ID
const getShiftById = async (req, res) => {
  try {
    const shift = await Shift.findByPk(req.params.id);
    if (!shift) {
      return res.status(404).json({ message: 'Shift not found' });
    }
    res.status(200).json(shift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a shift
const updateShift = async (req, res) => {
  try {
    const [updated] = await Shift.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Shift not found' });
    }
    const updatedShift = await Shift.findByPk(req.params.id);
    res.status(200).json(updatedShift);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a shift
const deleteShift = async (req, res) => {
  try {
    const deleted = await Shift.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Shift not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createShift,
  getAllShifts,
  getShiftById,
  updateShift,
  deleteShift,
};