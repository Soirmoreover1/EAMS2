const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./User')(sequelize, DataTypes);
db.employee = require('./Employee')(sequelize, DataTypes);
db.department = require('./Department')(sequelize, DataTypes);
db.shift = require('./Shift')(sequelize, DataTypes);
db.leave = require('./Leave')(sequelize, DataTypes);
db.deduction = require('./Deduction')(sequelize, DataTypes);
db.promotion = require('./Promotion')(sequelize, DataTypes);
db.employeePositionHistory = require('./EmployeePositionHistory')(sequelize, DataTypes);
db.attendance = require('./Attendance')(sequelize, DataTypes);
db.bonus = require('./Bonus')(sequelize, DataTypes);

db.user.hasOne(db.employee, { foreignKey: 'User_ID' });
db.employee.belongsTo(db.user, { foreignKey: 'User_ID' });

db.employee.belongsTo(db.department, { foreignKey: 'Department_ID' });
db.department.hasMany(db.employee, { foreignKey: 'Department_ID' });

db.employee.belongsTo(db.shift, { foreignKey: 'Shift_ID' });
db.shift.hasMany(db.employee, { foreignKey: 'Shift_ID' });

db.employee.hasOne(db.employeePositionHistory, { foreignKey: 'Employee_ID' });
db.employeePositionHistory.belongsTo(db.employee, { foreignKey: 'Employee_ID' });

db.employee.hasMany(db.leave, { foreignKey: 'Employee_ID' });
db.leave.belongsTo(db.employee, { foreignKey: 'Employee_ID' });

db.employee.hasMany(db.deduction, { foreignKey: 'Employee_ID' });
db.deduction.belongsTo(db.employee, { foreignKey: 'Employee_ID' });

db.employee.hasMany(db.promotion, { foreignKey: 'Employee_ID' });
db.promotion.belongsTo(db.employee, { foreignKey: 'Employee_ID' });

db.employee.hasOne(db.bonus, { foreignKey: 'Employee_ID' });
db.bonus.belongsTo(db.employee, { foreignKey: 'Employee_ID' });

db.employee.hasOne(db.attendance, { foreignKey: 'Employee_ID' });
db.attendance.belongsTo(db.employee, { foreignKey: 'Employee_ID' });

module.exports = db;