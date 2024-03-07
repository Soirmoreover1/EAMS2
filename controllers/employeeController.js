const { Employee } = require('../models');

const db = require('../models');
const multer =require('multer')
const path=require("path") 
// Create a new employee
const createEmployee = async (req, res) => {
  const { name, department_id, shift_id, hire_date, image,manager_id, user_id } = req.body;

  try {
    const employee = await db.employee.create({
      name,
      department_id,
      shift_id,
      hire_date,
      manager_id,
      user_id,
      image:req.file.filename,
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
      message:error.message,
    });
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Public/Images')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({
  storage: storage
})

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await db.employee.findAll({
      include: [
        { model: db.leave },
        { model: db.deduction },
        { model: db.promotion },
        { model: db.employeePositionHistory },
        { model: db.shift },
        { model: db.company },
        { model: db.salary },
        { model: db.department },
        { model: db.attendance },
        { model: db.bonus },
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
    const employee = await db.employee.findByPk(req.params.id, {
      include: [
        { model: db.leave },
        { model: db.deduction },
        { model: db.promotion },
        { model: db.employeePositionHistory },
        { model: db.shift },
        { model: db.company },
        { model: db.salary },
        { model: db.department },
        { model: db.attendance },
        { model: db.bonus },
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
    const [updated] = await db.employee.update(req.body,
      {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    const updatedEmployee = await db.employee.findByPk(req.params.id, {
      include: [
        { model: db.leave },
        { model: db.deduction },
        { model: db.promotion },
        { model: db.employeePositionHistory },
        { model: db.shift },
        { model: db.company },
        { model: db.salary },
        { model: db.department },
        { model: db.attendance },
        { model: db.bonus },
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
    const deleted = await db.employee.destroy({
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
  upload,
};