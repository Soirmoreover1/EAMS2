// models/Company.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Company extends Model { }

Company.init(
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
    manager:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    tax_number:{
      type: DataTypes.STRING,
      allowNull: false,
    },website:{
      type: DataTypes.STRING,
      allowNull: false,
    },location:{
      type: DataTypes.STRING,
      allowNull: false,
    },industry:{
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'company',
  }
);

module.exports = Company;