const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
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
const db  = require('./models/index');

const {validateAuth , checkRoles } = require('./middlewares/authMiddleware');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

app.use(morgan('dev'));


app.use('/api/auth', authRoutes);
app.use('/api/shifts', validateAuth, shiftRoutes);
app.use('/api/salaries', validateAuth, salaryRoutes);
app.use('/api/promotions', validateAuth, promotionRoutes);
app.use('/api/leaves', validateAuth, leaveRoutes);
app.use('/api/employees', validateAuth, employeeRoutes);
app.use('/api/employee-position-histories', validateAuth, employeePositionHistoryRoutes);
app.use('/api/departments', validateAuth, departmentRoutes);
app.use('/api/deductions', validateAuth, deductionRoutes);
app.use('/api/companies', validateAuth, companyRoutes);
app.use('/api/bonuses', validateAuth, bonusRoutes);
app.use('/api/attendances', validateAuth, attendanceRoutes);
app.use('/api/users', validateAuth, userRoutes);

app.use(errorHandler);

 db.sequelize.sync({ alter: true })
  .then(() => {
    const PORT = process.env.PORT || 3307;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error('Error syncing Sequelize models:', error));