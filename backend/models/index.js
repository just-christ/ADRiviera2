const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

// Importer tous les modèles
const Member = require('./Member');
const Group = require('./Group');
const Announcement = require('./Announcement');
const Event = require('./Event');
const Attendance = require('./Attendance');
const Role = require('./Role');
const GroupRole = require('./GroupRole');
const MemberGroupRole = require('./MemberGroupRole');

// 1. Relations Membres <-> Rôles
Member.belongsTo(Role, {
  foreignKey: 'roleId',
  onDelete: 'SET NULL', // Garde les membres si rôle supprimé
  as: 'globalRole' // Alias pour les requêtes
});

Role.hasMany(Member, {
  foreignKey: 'roleId',
  onDelete: 'SET NULL'
});

// 2. Système de rôles par groupe
GroupRole.belongsTo(Group, {
  foreignKey: 'groupId',
  onDelete: 'CASCADE' // Supprime les rôles si groupe supprimé
});

Group.hasMany(GroupRole, {
  foreignKey: 'groupId',
  as: 'customRoles'
});

// 3. Assignation des rôles aux membres
MemberGroupRole.belongsTo(GroupRole, {
  foreignKey: 'groupRoleId',
  onDelete: 'CASCADE'
});

MemberGroupRole.belongsTo(Member, {
  foreignKey: 'memberId',
  onDelete: 'CASCADE'
});

// 4. Relations Many-to-Many avec contraintes
Member.belongsToMany(Group, {
  through: MemberGroupRole,
  foreignKey: 'memberId',
  otherKey: 'groupId',
  onDelete: 'CASCADE'
});

Group.belongsToMany(Member, {
  through: MemberGroupRole,
  foreignKey: 'groupId',
  otherKey: 'memberId',
  onDelete: 'CASCADE'
});

// 5. Relations Annonces/Événements
Announcement.belongsTo(Member, {
  foreignKey: 'authorId',
  as: 'author',
  onDelete: 'SET NULL' // Garde l'annonce si membre supprimé
});

Member.hasMany(Announcement, {
  foreignKey: 'authorId',
  as: 'announcements'
});

// 6. Présence aux événements
Attendance.belongsTo(Event, {
  foreignKey: 'eventId',
  onDelete: 'CASCADE' // Supprime les présences si événement supprimé
});

Attendance.belongsTo(Member, {
  foreignKey: 'memberId',
  onDelete: 'CASCADE'
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
  GroupRole,
  MemberGroupRole
};