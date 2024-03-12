// models/Bonus.js
module.exports = (sequelize, Sequelize) => {
  const Bonus= sequelize.define("bonus", 
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    employeeId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'employee',
        key: 'id',
      },
    },
    bonus_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bonus_amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'bonus',

  });
return Bonus;
};