const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MemberGroupRole = sequelize.define('membergrouprole', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  memberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  groupRoleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
    timestamps: false,
});

module.exports = MemberGroupRole;