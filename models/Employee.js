// models/Employee.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Employee extends Model { }

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'department',
        key: 'id',
      },
    },
    shift_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'shift',
        key: 'id',
      },
    },
    hire_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    manager_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'employee',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee',
  }
);

module.exports = Employee;