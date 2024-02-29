// models/Bonus.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const { Employee } = require('./Employee'); // Import the Employee model

class Bonus extends Model { }

Bonus.init(
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
    bonus_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bonus_amount: {
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
    tableName: 'Bonus',

  }
);

module.exports = Bonus;