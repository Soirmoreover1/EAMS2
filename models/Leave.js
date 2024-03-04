// models/Leave.js
module.exports = (sequelize, Sequelize) => {
  const Leave= sequelize.define("leave", 
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
    type_of_leave: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    start_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'leave',
  }
);

return Leave;
};