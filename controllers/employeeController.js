const { Employee } = require('../models/Employee');

const db = require('../models/index');

// Create a new employee
const createEmployee = async (req, res) => {
  const { name, department_id, shift_id, hire_date, manager_id, user_id } = req.body;

  try {
    const employee = await Employee.create({
      name,
      department_id,
      shift_id,
      hire_date,
      manager_id,
      user_id,
    });

    res.status(201).json({
      status: 'success',
      data: {
        employee,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Server error',
    });
  }
};


// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [
        { model: db.Leave },
        { model: db.Deduction },
        { model: db.Promotion },
        { model: db.EmployeePositionHistory },
        { model: db.Shift },
        { model: db.Company },
        { model: db.Salary },
        { model: db.Department },
        { model: db.Attendance },
        { model: db.Bonus },
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
        { model: db.Leave },
        { model: db.Deduction },
        { model: db.Promotion },
        { model: db.EmployeePositionHistory },
        { model: db.Shift },
        { model: db.Company },
        { model: db.Salary },
        { model: db.Department },
        { model: db.Attendance },
        { model: db.Bonus },
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
        { model: db.Leave },
        { model: db.Deduction },
        { model: db.Promotion },
        { model: db.EmployeePositionHistory },
        { model: db.Shift },
        { model: db.Company },
        { model: db.Salary },
        { model: db.Department },
        { model: db.Attendance },
        { model: db.Bonus },
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