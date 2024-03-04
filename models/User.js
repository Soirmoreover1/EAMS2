module.exports = (sequelize, Sequelize) => {
  const User= sequelize.define("user", 
  {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: 'username',
      msg: 'This username is already taken!'
  }},
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.ENUM('admin', 'employee', 'manager'),
    allowNull: false,
    defaultValue:'admin',

  }
}, {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',

});
return User;
};