require('dotenv').config();
const { Sequelize  } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql',
      logging: console.log,
      define: {
        timestamps: false,
        freezeTableName: true,
        underscored: true,
      },
    });

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./User')(sequelize, Sequelize);
db.employee = require('./Employee')(sequelize, Sequelize);
db.department = require('./Department')(sequelize, Sequelize);
db.shift = require('./Shift')(sequelize, Sequelize);
db.salary = require('./Salary')(sequelize, Sequelize);
db.leave = require('./Leave')(sequelize, Sequelize);
db.deduction = require('./Deduction')(sequelize, Sequelize);
db.promotion = require('./Promotion')(sequelize, Sequelize);
db.employeePositionHistory = require('./EmployeePositionHistory')(sequelize, Sequelize);
db.attendance = require('./Attendance')(sequelize, Sequelize);
db.bonus = require('./Bonus')(sequelize, Sequelize);
db.company = require('./Company')(sequelize, Sequelize);



//one
db.user.hasOne(db.employee);
db.employee.belongsTo(db.user);
//many
db.user.hasMany(db.company, { as: 'companies' });
db.company.belongsTo(db.user, { foreignKey: 'userId',as:"user" });
//many
db.company.hasMany(db.employee, { as:"employees" });
db.employee.belongsTo(db.company, { foreignKey: 'companyId' ,as:"company"});
//one
db.employee.hasOne(db.department);
db.department.belongsTo(db.employee);
//one
db.employee.hasOne(db.shift);
db.shift.belongsTo(db.employee);
/*//many
db.company.hasMany(db.department, { as: 'departments' });
db.department.belongsTo(db.company, { foreignKey: 'companyId',as:"company" });
//many
db.company.hasMany(db.shift, { as: 'shifts', foreignKey: 'companyId' });
db.shift.belongsTo(db.company, { foreignKey: 'companyId', as: 'company' });
*///many
db.employee.hasMany(db.employeePositionHistory, { as: 'employeePositionHistorys', foreignKey: 'employeeId', onDelete: 'CASCADE' });
db.employeePositionHistory.belongsTo(db.employee, { foreignKey: 'employeeId', as: 'employee' });
//many
db.employee.hasMany(db.leave, { as: 'leaves', foreignKey: 'employeeId' });
db.leave.belongsTo(db.employee, { foreignKey: 'employeeId', as: 'employee' });
//many
db.employee.hasMany(db.deduction, { as: 'deductions', foreignKey: 'employeeId' });
db.deduction.belongsTo(db.employee, { foreignKey: 'employeeId', as: 'employee' });
//one
db.employee.hasOne(db.promotion);
db.promotion.belongsTo(db.employee);
//many
db.employee.hasMany(db.bonus, { as: 'bonuses', foreignKey: 'employeeId' });
db.bonus.belongsTo(db.employee, { foreignKey: 'employeeId', as: 'employee' });
//one
db.employee.hasOne(db.salary);
db.salary.belongsTo(db.employee);
//many 
db.employee.hasMany(db.attendance, { as: 'attendances', foreignKey: 'employeeId' });
db.attendance.belongsTo(db.employee, { foreignKey: 'employeeId', as: 'employee' });


sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = db;