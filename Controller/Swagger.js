const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
swaggerDefinition: {

// Like the one described here: https://swagger.io/specification/#infoObject
info: {
title: 'Student Management APIs',
version: '1.0.0',
description: 'Test and verify all the APIs of Students',
},
components: {
securitySchemes: {
bearerAuth: {
type: "http",
scheme: "bearer",
in: "header",
bearerFormat: "JWT"
}
}
},
openapi: "3.0.3"
},
apis: ['./routes/*.js'],

};
const specs = swaggerJsdoc(options);
module.exports = (app) => {
app.use('/student', swaggerUi.serve, swaggerUi.setup(specs));
}