const { Employee } = require('../models/Employee');

// Create a new employee
const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [
        { model: Leave },
        { model: Deduction },
        { model: Promotion },
        { model: EmployeePositionHistory },
        { model: Shift },
        { model: Company },
        { model: Salary },
        { model: Department },
        { model: Attendance },
        { model: Bonus },
      ],
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      include: [
        { model: Leave },
        { model: Deduction },
        { model: Promotion },
        { model: EmployeePositionHistory },
        { model: Shift },
        { model: Company },
        { model: Salary },
        { model: Department },
        { model: Attendance },
        { model: Bonus },
      ],
    });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an employee
const updateEmployee = async (req, res) => {
  try {
    const [updated] = await Employee.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    const updatedEmployee = await Employee.findByPk(req.params.id, {
      include: [
        { model: Leave },
        { model: Deduction },
        { model: Promotion },
        { model: EmployeePositionHistory },
        { model: Shift },
        { model: Company },
        { model: Salary },
        { model: Department },
        { model: Attendance },
        { model: Bonus },
      ],
    });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};