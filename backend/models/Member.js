const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./Role');

const Member = sequelize.define('member', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contact : {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  join_date: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  is_church_member: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_baptized: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  gender: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  },
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  baptism_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  baptismLocationId: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  belongs_to_group: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

Member.belongsTo(Role, { foreignKey: 'roleId' });

module.exports = Member;