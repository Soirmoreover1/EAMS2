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


const createUser = async (req, res) => {
  const { username,email,password,role} = req.body;

  try {
    const user = await User.create({
      username,
      email,
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
      message: 'Server error',
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        
        { model: Company },
        { model: Employee },
        { model: Department },
        { model: Leave },
        { model: Deduction },
        { model: Promotion },
        { model: Salary },
        { model: Shift },
        { model: EmployeePositionHistory },
        { model: Attendance },
        { model: Bonus },
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
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }
    const updatedUser = await User.findByPk(req.params.id, {
      include: [
        
        { model: Company },
        { model: Employee },
        { model: Department },
        { model: Leave },
        { model: Deduction },
        { model: Promotion },
        { model: Salary },
        { model: Shift },
        { model: EmployeePositionHistory },
        { model: Attendance },
        { model: Bonus },
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
    const deleted = await User.destroy({
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
    createUser 

};