// models/EmployeePositionHistory.js
module.exports = (sequelize, Sequelize) => {
  const EmployeePositionHistory= sequelize.define("employeePositionHistory", 
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
    position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    department_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'department',
        key: 'id',
      },
    },
    salary: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    start_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    end_date: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employeePositionHistory',
  }
);

return EmployeePositionHistory;
};
