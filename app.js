const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const session = require('express-session');
const sequelize = require('./sequelize');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const shiftRoutes = require('./routes/shiftRoutes');
const salaryRoutes = require('./routes/salaryRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const employeePositionHistoryRoutes = require('./routes/employeePositionHistoryRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const deductionRoutes = require('./routes/deductionRoutes');
const companyRoutes = require('./routes/companyRoutes');
const bonusRoutes = require('./routes/bonusRoutes');
const userRoutes = require('./routes/userRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const errorHandler = require('./middlewares/errorHandler');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
  });

// Use the session middleware
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));

app.use(limiter);

app.use(morgan('dev'));

// Use the authRoutes module
app.use('/api/auth', authRoutes);
app.use('/api/shifts', shiftRoutes);
app.use('/api/salaries', salaryRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/employee-position-histories', employeePositionHistoryRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/deductions', deductionRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/bonuses', bonusRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/users', userRoutes);


app.use(errorHandler);


sequelize.sync({ force: false }) // Change force to true if you want to drop and recreate tables
  .then(() => {
    const PORT = process.env.PORT || 3306;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error('Error syncing Sequelize models:', error));

