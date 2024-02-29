const { User } = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized',
      });
    }
    const user = await User.findByPk(userId, {
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
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

const checkRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      status: 'fail',
      message: 'Forbidden',
    });
  }
  next();
};
  
  module.exports = {
    authMiddleware,
    checkRoles,
  };