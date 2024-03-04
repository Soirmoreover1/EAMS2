const { EmployeePositionHistory } = require('../models/EmployeePositionHistory');

const db = require('../models/index');

// Create a new employee position history
const createEmployeePositionHistory = async (req, res) => {
  const { employee_id,position,department_id,salary,start_date,end_date } = req.body;

  try {
    const employeePositionHistory = await EmployeePositionHistory.create({
      
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
      message: 'Server error',
    });
  }
};

// Get all employee position histories
const getAllEmployeePositionHistories = async (req, res) => {
  try {
    const employeePositionHistories = await EmployeePositionHistory.findAll({
      include: [
        { model: db.Employee },
        { model: db.Department },
        { model: db.Salary },
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
    const employeePositionHistory = await EmployeePositionHistory.findByPk(req.params.id, {
      include: [
        { model: db.Employee },
        { model: db.Department },
        { model: db.Salary },
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
    const [updated] = await EmployeePositionHistory.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Employee position history not found' });
    }
    const updatedEmployeePositionHistory = await EmployeePositionHistory.findByPk(req.params.id, {
      include: [
        { model: db.Employee },
        { model: db.Department },
        { model: db.Salary },
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
    const deleted = await EmployeePositionHistory.destroy({
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