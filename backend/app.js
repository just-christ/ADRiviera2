const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const memberRoutes = require('./routes/memberRoutes');
const groupRoutes = require('./routes/groupRoutes'); // Ajout des routes pour les groupes
const roleRoutes = require('./routes/roleRoutes'); // Ajout des routes pour les rôles
const eventRoutes = require('./routes/eventRoutes'); // Ajout des routes pour les événements
const announcementRoutes = require('./routes/announcementRoutes'); // Ajout des routes pour les annonces
const attendanceRoutes = require('./routes/attendanceRoutes'); // Ajout des routes pour les présences
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors({
    origin: '*', // Accepte toutes les origines (à restreindre en production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/groups', groupRoutes); // Routes pour les groupes
app.use('/api/roles', roleRoutes); // Routes pour les rôles
app.use('/api/events', eventRoutes); // Routes pour les événements
app.use('/api/announcements', announcementRoutes); // Routes pour les annonces
app.use('/api/attendances', attendanceRoutes); // Routes pour les présences

// Gestion des erreurs
app.use(errorHandler);

module.exports = app;