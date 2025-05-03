const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Group = sequelize.define('group', {
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
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

module.exports = Group;