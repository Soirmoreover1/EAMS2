const { User } = require('../models/User');
const { Employee } = require('../models/Employee');
const { Department } = require('../models/Department');
const { Company } = require('../models/Company'); // Import the Employee model
const { Deduction } = require('../models/Deduction');
const { Bonus } = require('../models/Bonus');
const { Leave } = require('../models/Leave');
const { EmployeePositionHistory } = require('../models/EmployeePositionHistory');
const { Salary } = require('../models/Salary');
const { Attendance } = require('../models/Attendance');
const { Promotion } = require('../models/Promotion');
const db = require('../models/index');


const createUser = async (req, res) => {
  const { username,password,role} = req.body;

  try {
    const user = await db.user.create({
      username,
      password,
      role,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message:error.message,
        });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await user.findByPk(req.user.id, {
      include: [
        
        { model: db.company },
        { model: db.employee },
        { model: db.department },
        { model: db.leave },
        { model: db.deduction },
        { model: db.promotion },
        { model: db.salary },
        { model: db.shift },
        { model: db.employeePositionHistory },
        { model: db.attendance },
        { model: db.bonus },
      ],
    });
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
   
const getAllUser = async (req, res) => {
  try {
    const user = await db.user.findAll(req.user.id, {
      include: [
        
        { model: db.company },
        { model: db.employee },
        { model: db.department },
        { model: db.leave },
        { model: db.deduction },
        { model: db.promotion },
        { model: db.salary },
        { model: db.shift },
        { model: db.employeePositionHistory },
        { model: db.attendance },
        { model: db.bonus },
      ],
    });
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const [updated] = await db.user.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }
    const updatedUser = await db.user.findByPk(req.params.id, {
      include: [
        
        { model: db.company },
        { model: db.employee },
        { model: db.department },
        { model: db.leave },
        { model: db.deduction },
        { model: db.promotion },
        { model: db.salary },
        { model: db.shift },
        { model: db.employeePositionHistory },
        { model: db.attendance },
        { model: db.bonus },
      ],
    });
    res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await db.user.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }
    res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
module.exports = {

    updateUser,
    deleteUser,
    getUserProfile,
    createUser ,
    getAllUser 


};