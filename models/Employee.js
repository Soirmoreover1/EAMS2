// models/Employee.js
module.exports = (sequelize, Sequelize) => {
  const Employee= sequelize.define("employee", 
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    departmentId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'department',
        key: 'id',
      },
    },
    shiftId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'shift',
        key: 'id',
      },
    },
    hire_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    managerId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'employee',
        key: 'id',
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee',
  }
);


return Employee;
};