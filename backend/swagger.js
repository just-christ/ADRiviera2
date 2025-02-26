const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestion d\'Église',
      version: '1.0.0',
      description: 'Documentation de l\'API pour le système de gestion d\'église',
    },
    servers: [{ url: 'http://localhost:5000' }], // Remplacez par l'URL de votre serveur
  },
  apis: ['./routes/*.js'], // Chemin vers les fichiers contenant les commentaires Swagger
};

const swaggerDocs = (app, port) => {
  const specs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
};

module.exports = swaggerDocs;