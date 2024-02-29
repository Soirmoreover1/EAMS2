// models/Deduction.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Deduction extends Model { }

Deduction.init(
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
    deduction_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deduction_amount: {
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
    modelName: 'deduction',
  }
);