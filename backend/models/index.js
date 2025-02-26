const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

// Importer tous les modèles
const Member = require('./Member');
const Group = require('./Group');
const Announcement = require('./Announcement');
const Event = require('./Event');
const Attendance = require('./Attendance');
const Role = require('./Role'); // Ajouté
const GroupRole = require('./GroupRole'); // Ajouté
const MemberGroupRole = require('./MemberGroupRole'); // Ajouté

// Définir les relations

// Un Membre a un Rôle
Member.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(Member, { foreignKey: 'roleId' });

// Un Membre peut appartenir à plusieurs Groupes avec des Rôles spécifiques
Member.belongsToMany(Group, { through: MemberGroupRole, foreignKey: 'memberId' });
Group.belongsToMany(Member, { through: MemberGroupRole, foreignKey: 'groupId' });

// Un Rôle spécifique à un Groupe est associé à un Membre dans un Groupe
MemberGroupRole.belongsTo(GroupRole, { foreignKey: 'groupRoleId' });
GroupRole.hasMany(MemberGroupRole, { foreignKey: 'groupRoleId' });

// Une Annonce est créée par un Membre
Announcement.belongsTo(Member, { foreignKey: 'authorId' });
Member.hasMany(Announcement, { foreignKey: 'authorId' });

// Un Événement est organisé par un Groupe
Event.belongsTo(Group, { foreignKey: 'groupId' });
Group.hasMany(Event, { foreignKey: 'groupId' });

// Une Présence est liée à un Membre et à un Événement
Attendance.belongsTo(Member, { foreignKey: 'memberId' });
Member.hasMany(Attendance, { foreignKey: 'memberId' });

Attendance.belongsTo(Event, { foreignKey: 'eventId' });
Event.hasMany(Attendance, { foreignKey: 'eventId' });

// Exporter les modèles
module.exports = {
  sequelize,
  Member,
  Group,
  Announcement,
  Event,
  Attendance,
  Role, // Ajouté
  GroupRole, // Ajouté
  MemberGroupRole, // Ajouté
};