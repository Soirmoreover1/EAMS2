require('dotenv').config();
const { Sequelize  } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql',
      logging: false,
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




db.user.hasOne(db.employee, { foreignKey: 'user_id' });
db.employee.belongsTo(db.user, { foreignKey: 'user_id' });


db.company.hasMany(db.employee, { foreignKey: 'companyId' });
db.employee.belongsTo(db.company, { foreignKey: 'companyId' });


db.user.hasOne(db.company, { foreignKey: 'user_id' });
db.company.belongsTo(db.user, { foreignKey: 'user_id' });

db.employee.belongsTo(db.department, { foreignKey: 'department_id' });
db.department.hasMany(db.employee, { foreignKey: 'department_id' });

db.employee.belongsTo(db.shift, { foreignKey: 'shift_id' });
db.shift.hasMany(db.employee, { foreignKey: 'shift_id' });

db.company.hasMany(db.department, { foreignKey: 'company_id' });
db.department.belongsTo(db.company, { foreignKey: 'company_id' });


db.employee.hasOne(db.employeePositionHistory, { foreignKey: 'employee_id' });
db.employeePositionHistory.belongsTo(db.employee, { foreignKey: 'employee_id',onDelete: 'CASCADE' });

db.employee.hasMany(db.leave, { foreignKey: 'employee_id' });
db.leave.belongsTo(db.employee, { foreignKey: 'employee_id' });

db.employee.hasMany(db.deduction, { foreignKey: 'employee_id' });
db.deduction.belongsTo(db.employee, { foreignKey: 'employee_id' });


db.employee.hasMany(db.promotion, { foreignKey: 'employee_id' });
db.promotion.belongsTo(db.employee, { foreignKey: 'employee_id' });

db.employee.hasOne(db.bonus, { foreignKey: 'employee_id' });
db.bonus.belongsTo(db.employee, { foreignKey: 'employee_id' });

db.employee.hasOne(db.salary, { foreignKey: 'employee_id' });
db.salary.belongsTo(db.employee, { foreignKey: 'employee_id' });

db.employee.hasOne(db.attendance, { foreignKey: 'employee_id' });
db.attendance.belongsTo(db.employee, { foreignKey: 'employee_id' });

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = db;