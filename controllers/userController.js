const { User } = require('../models/User');

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
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