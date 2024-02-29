// models/Salary.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Salary extends Model { }

Salary.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'employee',
        key: 'id',
      },
    },
    gross_salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    net_salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'salary',
  }
);

module.exports = Salary;