// models/Promotion.js
module.exports = (sequelize, Sequelize) => {
  const Promotion= sequelize.define("promotion", 
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'employee',
        key: 'id',
      },
    },
    promotion_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    prev_position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    new_position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salary_increase: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  },
  {
   timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'promotion',
  }
);

return Promotion;
};