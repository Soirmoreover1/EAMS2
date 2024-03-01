const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class User extends Model {}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: 'username',
      msg: 'This username is already taken!'
  }},
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'employee', 'manager'),
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
    freezeTableName: true,
    underscored: true,
  modelName: 'user',

});
module.exports = User;