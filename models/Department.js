// models/Department.js
module.exports = (sequelize, Sequelize) => {
  const Department= sequelize.define("department", 
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
    manager_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'employee',
        key: 'id',
      },
    },
    company_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'company',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'department',
  }
);

return Department; 
};