// models/Shift.js
module.exports = (sequelize, Sequelize) => {
  const Shift= sequelize.define("shift", 
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    shift_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    start_time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    end_time: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    working_days: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    employeeId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'employee',
        key: 'id',
      },
  },
},{
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'shift',
  }
);
return Shift;
};