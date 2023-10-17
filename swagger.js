const swaggerAutogen = require('swagger-autogen');

const doc = {
  info: {
    version: '1.0.0',
    title: 'MyTodos API',
    description: 'Documentation for MyTodos',
  },
  host: 'localhost:3000',
};

const outputFile = './swagger-output.json';
const endpoints = ['./app.js'];

swaggerAutogen(outputFile, endpoints, doc).then(() => {
  require('./bin/www');
});
