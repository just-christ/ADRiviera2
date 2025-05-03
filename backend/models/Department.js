const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Department = sequelize.define('department', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
});

module.exports = Department;