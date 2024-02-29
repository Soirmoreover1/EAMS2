// models/Promotion.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Promotion extends Model { }

Promotion.init(
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
    promotion_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    prev_position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    new_position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary_increase: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'promotion',
  }
);

module.exports = Promotion;