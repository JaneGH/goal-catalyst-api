// swaggerOptions.js
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', 
    info: {
      title: 'Goal catalyst',
      version: '1.0.0', // Version of your API
      description: 'API for goal catalyst', // Description of your API
      contact: {
        name: process.env.CONTACT_NAME, 
        email: process.env.CONTACT_EMAIL
      },
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:3000/api/v1', 
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

module.exports = swaggerJsDoc(swaggerOptions);
