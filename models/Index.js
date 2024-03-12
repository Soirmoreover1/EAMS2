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
db.user.hasOne(db.employee,{as: 'employee', foreignKey:{name:'userId',allowNull:false}});
db.employee.belongsTo(db.user,{as: 'employee', foreignKey:{name:'userId',allowNull:false}});
//many
db.user.hasMany(db.company, {foreignKey: {name:'userId',allowNull:false}, as: 'companies' });
db.company.belongsTo(db.user, { foreignKey: {name:'userId',allowNull:false},as:'companies' });
//many
db.company.hasMany(db.employee, {foreignKey: {name:'companyId',allowNull:false}, as:'employees' });
db.employee.belongsTo(db.company, { foreignKey: {name:'companyId',allowNull:false} ,as:'employees'});
//one
db.employee.hasOne(db.department,{as: 'department', foreignKey:{name:'employeeId',allowNull:false}});
db.department.belongsTo(db.employee,{as: 'department', foreignKey:{name:'employeeId',allowNull:false}});
//one
db.employee.hasOne(db.shift,{as: 'shift', foreignKey:{name:'employeeId',allowNull:false}});
db.shift.belongsTo(db.employee,{as: 'shift', foreignKey:{name:'employeeId',allowNull:false}});
/*//many
db.company.hasMany(db.department, { as: 'departments' });
db.department.belongsTo(db.company, { foreignKey: 'companyId',as:"company" });
//many
db.company.hasMany(db.shift, { as: 'shifts', foreignKey: 'companyId' });
db.shift.belongsTo(db.company, { foreignKey: 'companyId', as: 'company' });
*///many
db.employee.hasMany(db.employeePositionHistory, { as: 'employeePositionHistorys',foreignKey:{name:'employeeId',allowNull:false}, onDelete: 'CASCADE' });
db.employeePositionHistory.belongsTo(db.employee, { foreignKey: {name:'employeeId',allowNull:false}, as: 'employeePositionHistorys' });
//many
db.employee.hasMany(db.leave, { as: 'leaves', foreignKey:{name:'employeeId',allowNull:false} });
db.leave.belongsTo(db.employee, { foreignKey:{name:'employeeId',allowNull:false}, as: 'leaves' });
//many
db.employee.hasMany(db.deduction, { as: 'deductions', foreignKey:{name:'employeeId',allowNull:false} });
db.deduction.belongsTo(db.employee, { foreignKey:{name:'employeeId',allowNull:false}, as:'deductions' });
//one
db.employee.hasOne(db.promotion,{as: 'promotion', foreignKey:{name:'employeeId',allowNull:false}});
db.promotion.belongsTo(db.employee,{as: 'promotion', foreignKey:{name:'employeeId',allowNull:false}});
//many
db.employee.hasMany(db.bonus, { as: 'bonuses', foreignKey:{name:'employeeId',allowNull:false}});
db.bonus.belongsTo(db.employee, { foreignKey:{name:'employeeId',allowNull:false}, as: 'bonuses' });
//one
db.employee.hasOne(db.salary,{as: 'salary', foreignKey:{name:'employeeId',allowNull:false}});
db.salary.belongsTo(db.employee,{as: 'salary', foreignKey:{name:'employeeId',allowNull:false}});
//many 
db.employee.hasMany(db.attendance, { as: 'attendances', foreignKey:{name:'employeeId',allowNull:false} });
db.attendance.belongsTo(db.employee, { foreignKey:{name:'employeeId',allowNull:false}, as: 'attendances' });





sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = db;