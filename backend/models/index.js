const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

// Importer tous les modèles
const Member = require('./Member');
const Group = require('./Group');
const Announcement = require('./Announcement');
const Event = require('./Event');
const Attendance = require('./Attendance');
const Role = require('./Role');
const Department = require('./Department');

// 1. Relations Membres <-> Rôles
Member.belongsTo(Role, {
  foreignKey: 'roleId',
  onDelete: 'NO ACTION', 
  as: 'globalRole'
});

Role.hasMany(Member, {
  foreignKey: 'roleId',
  onDelete: 'NO ACTION'
});

// 2. Relations Département <-> Groupes
Department.hasMany(Group, {
  foreignKey: 'departmentId',
  onDelete: 'SET NULL'
});

Group.belongsTo(Department, {
  foreignKey: 'departmentId',
  onDelete: 'SET NULL'
});



// 5. Relations Annonces/Événements
Announcement.belongsTo(Member, {
  foreignKey: 'authorId',
  as: 'author',
  onDelete: 'SET NULL'
});

Member.hasMany(Announcement, {
  foreignKey: 'authorId',
  as: 'announcements'
});

// 6. Présence aux événements
Attendance.belongsTo(Event, {
  foreignKey: 'eventId',
  onDelete: 'CASCADE'
});

Attendance.belongsTo(Member, {
  foreignKey: 'memberId',
  onDelete: 'CASCADE'
});

Event.hasMany(Attendance, {
  foreignKey: 'eventId'
});

Member.hasMany(Attendance, {
  foreignKey: 'memberId'
});

// Ajouter des index pour les recherches
Member.addScope('withRoles', {
  include: [{
    model: Role,
    as: 'globalRole'
  }]
});

module.exports = {
  sequelize,
  Member,
  Group,
  Announcement,
  Event,
  Attendance,
  Role,
  Department 
};