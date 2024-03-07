// models/Salary.js
module.exports = (sequelize, Sequelize) => {
  const Salary= sequelize.define("salary", 
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
    gross_salary: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    net_salary: {
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
    modelName: 'salary',
  }
);


return Salary;
};