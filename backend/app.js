const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const memberRoutes = require('./routes/memberRoutes');
const groupRoutes = require('./routes/groupRoutes'); 
const roleRoutes = require('./routes/roleRoutes'); 
const eventRoutes = require('./routes/eventRoutes'); 
const announcementRoutes = require('./routes/announcementRoutes'); 
const attendanceRoutes = require('./routes/attendanceRoutes'); 
const departmentRoutes = require('./routes/departmentRoutes.js');
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
app.use('/api/groups', groupRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/departments', departmentRoutes); 

// Gestion des erreurs
app.use(errorHandler);

module.exports = app;