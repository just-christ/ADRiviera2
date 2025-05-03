const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Event = sequelize.define('event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Price: {
    type: DataTypes.STRING(50),
    allowNull: true,
  }
});

module.exports = Event;