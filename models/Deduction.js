// models/Deduction.js
module.exports = (sequelize, Sequelize) => {
  const Deduction= sequelize.define("deduction", 
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
    deduction_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    deduction_amount: {
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
    freezeTableName: true,
    underscored: true,
    modelName: 'deduction',
  }
);

return Deduction;
};