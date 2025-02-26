const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./Role'); // Assurez-vous que le modèle Role est bien importé

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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1, // ✅ Définit un rôle par défaut
  },
  join_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
});

// Ajout de la contrainte de clé étrangère séparément
Member.belongsTo(Role, { foreignKey: 'roleId' });

module.exports = Member;
