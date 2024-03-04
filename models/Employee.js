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
    department_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'department',
        key: 'id',
      },
    },
    shift_id: {
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
    manager_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'employee',
        key: 'id',
      },
    },
    user_id: {
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