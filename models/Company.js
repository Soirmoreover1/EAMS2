// models/Company.js
module.exports = (sequelize, Sequelize) => {
  const Company= sequelize.define("company", 
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
    manager:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    tax_number:{
      type: Sequelize.STRING,
      allowNull: false,
    },website:{
      type: Sequelize.STRING,
      allowNull: false,
    },location:{
      type: Sequelize.STRING,
      allowNull: false,
    },industry:{
      type: Sequelize.STRING,
      allowNull: false,
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
    modelName: 'company',
  }
);

return Company;
};
