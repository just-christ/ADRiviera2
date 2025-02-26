const http = require('http');
const { sequelize, Member, Group, Announcement, Event, Attendance, Role, GroupRole, MemberGroupRole } = require('./models');
const app = require('./app');
const swaggerDocs = require('./swagger');

sequelize
  .sync({ force: true }) // Synchronisation des modèles
  .then(async () => {
    console.log('Base de données synchronisée');

    // Vérifier si les rôles existent déjà
    const existingRoles = await Role.findAll();
    if (existingRoles.length === 0) {
      await Role.bulkCreate([
        { name: 'Membre' },
        { name: 'Chef de Groupe' },
        { name: 'Pasteur' },
        { name: 'Secretaire' },
        { name: 'Administrateur' },
      ]);
      console.log('Rôles ajoutés avec succès !');
    }


    console.log('Toutes les données de test sont en place.');

    // Démarrer le serveur
    const PORT = process.env.PORT || 5000;
    const server = http.createServer(app);
    swaggerDocs(app, PORT);

    server.listen(PORT, () => {
      console.log(`Serveur en cours sur le port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Impossible de synchroniser la base de données :', error);
  });
