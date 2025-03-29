const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestion d\'Église',
      version: '1.0.1',
      description: 'Système complet de gestion des membres, événements et groupes',
      contact: {
        name: 'Support Technique',
        Authors: 'Kouassi Christ & Sossa Daniel',
        email: 'kouassichrist004@gmail.com || '
      },
      license: {
        name: 'MIT'
      }
    },
    servers: [
      { 
        url: process.env.NODE_ENV === 'production' 
          ? 'https://api.eglise.com' 
          : 'http://localhost:5000',
        description: `${process.env.NODE_ENV || 'development'} environment`
      }
    ],
    tags: [
      { name: 'Authentification', description: 'Inscription et connexion' },
      { name: 'Membres', description: 'Gestion des membres' },
      { name: 'Événements', description: 'Gestion des événements' }
    ]
  },
  apis: [
    './routes/*.js',
    './controllers/*.js',
    './models/*.js'
  ]
};

const swaggerDocs = (app, port) => {
  const specs = swaggerJsDoc(swaggerOptions);
  
  const options = {
    customSiteTitle: "API Église - Documentation",
    customCss: '.swagger-ui .topbar { display: none }',
    customfavIcon: '/public/favicon.ico'
  };

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, options));
  
  console.log(`\x1b[34m📚 Documentation Swagger disponible : http://localhost:${port}/api-docs\x1b[0m`);
};

module.exports = swaggerDocs;