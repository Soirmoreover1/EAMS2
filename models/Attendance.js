
// models/Attendance.js
module.exports = (sequelize, Sequelize) => {
  const Attendance= sequelize.define("attendance", {
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
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    time_in: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    time_out: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    total_hours_worked: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    overtime_hours: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'attendance',
  });
 return Attendance;
};