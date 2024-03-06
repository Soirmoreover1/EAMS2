const { EmployeePositionHistory } = require('../models');

const db = require('../models');

// Create a new employee position history
const createEmployeePositionHistory = async (req, res) => {
  const { employee_id,position,department_id,salary,start_date,end_date } = req.body;

  try {
    const employeePositionHistory = await db.employeePositionHistory.create({
      
      employee_id,
      position,
      department_id,
      salary,
      start_date,
       end_date,
    });

    res.status(201).json({
      status: 'success',
      data: {
        employeePositionHistory,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message:error.message,
        });
  }
};

// Get all employee position histories
const getAllEmployeePositionHistories = async (req, res) => {
  try {
    const employeePositionHistories = await db.employeePositionHistory.findAll({
      include: [
        { model: db.employee },
        { model: db.department },
        { model: db.salary },
      ],
    });
    res.status(200).json(employeePositionHistories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an employee position history by ID
const getEmployeePositionHistoryById = async (req, res) => {
  try {
    const employeePositionHistory = await db.employeePositionHistory.findByPk(req.params.id, {
      include: [
        { model: db.employee },
        { model: db.department },
        { model: db.salary },
      ],
    });
    if (!employeePositionHistory) {
      return res.status(404).json({ message: 'Employee position history not found' });
    }
    res.status(200).json(employeePositionHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an employee position history
const updateEmployeePositionHistory = async (req, res) => {
  try {
    const [updated] = await db.employeePositionHistory.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Employee position history not found' });
    }
    const updatedEmployeePositionHistory = await db.employeePositionHistory.findByPk(req.params.id, {
      include: [
        { model: db.employee },
        { model: db.department },
        { model: db.salary },
      ],
    });
    res.status(200).json(updatedEmployeePositionHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an employee position history
const deleteEmployeePositionHistory = async (req, res) => {
  try {
    const deleted = await db.employeePositionHistory.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Employee position history not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEmployeePositionHistory,
  getAllEmployeePositionHistories,
  getEmployeePositionHistoryById,
  updateEmployeePositionHistory,
  deleteEmployeePositionHistory,
};