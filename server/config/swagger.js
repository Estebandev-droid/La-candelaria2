const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentación de la API de tu aplicación',
        },
        servers: [
            {
                url: 'http://localhost:5001',
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'], // Archivos donde se encuentran las anotaciones de Swagger
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs,
};