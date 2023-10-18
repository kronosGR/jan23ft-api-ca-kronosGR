const swaggerAutogen = require('swagger-autogen');

const doc = {
  info: {
    version: '1.0.0',
    title: 'MyTodos API',
    description: 'Documentation for MyTodos',
  },
  host: 'localhost:3000',
  definitions: {
    CategoryAdd: {
      $name: 'Category name',
      $UserId: '1',
    },
    CategoryUpdate: {
      $name: 'Category name',
      $UserId: '1',
    },
    SignUp: {
      $name: 'kronos',
      $email: 'geo.elgeo@gmail.com',
      $password: '123456',
    },
    Login: { $email: 'geo.elgeo@gmail.com', $password: '123456' },
  },
};

const outputFile = './swagger-output.json';
const endpoints = ['./app.js'];

swaggerAutogen(outputFile, endpoints, doc).then(() => {
  require('./bin/www');
});
