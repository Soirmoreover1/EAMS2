// models/Attendance.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Attendance extends Model { }

Attendance.init(
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time_in: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    time_out: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    total_hours_worked: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    overtime_hours: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'attendance',
  }
);

module.exports = Attendance;