const { Attendance } = require('../models');
const db = require('../models');

// Create a new attendance
const createAttendance = async (req, res) => {
  const { employee_id,date,time_in,time_out,total_hours_worked,overtime_hours } = req.body;

  try {
    const attendance = await db.attendance.create({
      employee_id,
      date,
      time_in,
      time_out,
      total_hours_worked,
      overtime_hours,
    });

    res.status(201).json({
      status: 'success',
      data: {
        attendance,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};


// Get all attendances
const getAllAttendances = async (req, res) => {
  try {
    const attendances = await db.attendance.findAll({
      include: [
        { model: db.employee ,
          as: 'attendances'
        },
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
    const attendance = await db.attendance.findByPk(req.params.id, {
      include: [
        { model: db.employee,
          as: 'attendances' 
        },
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
    const [updated] = await db.attendance.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Attendance not found' });
    }
    const updatedAttendance = await db.attendance.findByPk(req.params.id, {
      include: [
        { model: db.employee,
          as: 'attendances'
        },
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
    const deleted = await db.attendance.destroy({
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