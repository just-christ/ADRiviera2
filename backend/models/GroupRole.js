const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const GroupRole = sequelize.define('grouprole', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
    timestamps: false,
});

module.exports = GroupRole;