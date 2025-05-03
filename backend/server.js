const http = require('http');
const { sequelize } = require('./models');
const app = require('./app');
const swaggerDocs = require('./swagger');
const { Role } = require('./models');

require('dotenv').config();

// Configuration des couleurs pour les logs
const log = {
  info: (text) => console.log(`\x1b[36m[${new Date().toLocaleTimeString()}] 🌸 ${text}\x1b[0m`),
  success: (text) => console.log(`\x1b[32m[${new Date().toLocaleTimeString()}] 🚀 ${text}\x1b[0m`),
  error: (text) => console.log(`\x1b[31m[${new Date().toLocaleTimeString()}] ❌ ${text}\x1b[0m`)
};

async function initializeDatabase() {
  try {
    // Correction ici : utiliser === au lieu de !==
    const forceSync = process.env.NODE_ENV === 'development'; // ⚠️ Changement crucial
    
    if (forceSync) {
      log.info('Synchronisation des modèles (mode développement)');
      await sequelize.sync({ force: true }); // Supprime et recrée les tables
      log.success('Base de données recréée');
      
      // Recréer les rôles après la suppression
      // const roles = await Role.bulkCreate([
      //   { name: 'Membre' },
      //   { name: 'Secretaire' },
      //   { name: 'Administrateur' }
      // ]);
      // log.success(`${roles.length} rôles recréés`);
    } else {
      await sequelize.sync({ alter: true }); // Mode production sécurisé
      log.success('Base de données mise à jour (mode production)');
    }

  } catch (error) {
    log.error(`Échec de l'initialisation : ${error.message}`);
    process.exit(1);
  }
}

function startServer() {
  const PORT = process.env.PORT || 5000;
  const server = http.createServer(app);
  
  server.listen(PORT, () => {
    log.success(`Serveur actif sur : http://localhost:${PORT}`);
    swaggerDocs(app, PORT);
  });
  
  server.on('error', (error) => {
    log.error(`Erreur serveur : ${error.message}`);
  });
}

// Démarrage séquentiel
initializeDatabase().then(startServer);