const { Leave } = require('../models');
const db = require('../models');

// Create a new leave
const createLeave = async (req, res) => {
  const { employee_id, type_of_leave, start_date, end_date, duration } = req.body;

  try {
    const leave = await db.leave.create({
      employee_id,
      type_of_leave,
      start_date,
      end_date,
      duration,
    });

    res.status(201).json({
      status: 'success',
      data: {
        leave,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message:error.message,
        });
  }
};

// Get all leaves
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await db.leave.findAll({
      include: [
        { model: db.employee },
      ],
    });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a leave by ID
const getLeaveById = async (req, res) => {
  try {
    const leave = await db.leave.findByPk(req.params.id, {
      include: [
        { model: db.employee },
      ],
    });
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a leave
const updateLeave = async (req, res) => {
  try {
    const [updated] = await db.leave.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    const updatedLeave = await db.leave.findByPk(req.params.id, {
      include: [
        { model: db.employee },
      ],
    });
    res.status(200).json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a leave
const deleteLeave = async (req, res) => {
  try {
    const deleted = await db.leave.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLeave,
  getAllLeaves,
  getLeaveById,
  updateLeave,
  deleteLeave,
};