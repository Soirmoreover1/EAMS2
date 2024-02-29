const { Attendance } = require('../models/Attendance');

// Create a new attendance
const createAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all attendances
const getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.findAll({
      include: [
        { model: Employee },
      ],
    });
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an attendance by ID
const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id, {
      include: [
        { model: Employee },
      ],
    });
    if (!attendance) {
      return res.status(404).json({ message: 'Attendance not found' });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an attendance
const updateAttendance = async (req, res) => {
  try {
    const [updated] = await Attendance.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Attendance not found' });
    }
    const updatedAttendance = await Attendance.findByPk(req.params.id, {
      include: [
        { model: Employee },
      ],
    });
    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an attendance
const deleteAttendance = async (req, res) => {
  try {
    const deleted = await Attendance.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Attendance not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};