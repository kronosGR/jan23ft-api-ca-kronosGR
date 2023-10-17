const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
require('dotenv').config();
const InitializeService = require('../services/InitializeService');
console.log(process.env.DIALECT);
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.ADMIN_USERNAME,
  process.env.ADMIN_PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.DBPORT,
    dialect: process.env.DIALECT,
    dialectmodel: process.env.DIALECTMODEL,
  }
);
const db = {};
db.sequelize = sequelize;
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

init();
module.exports = db;

async function init() {
  await db.sequelize.sync({ force: false });
  const initializeService = new InitializeService(db);
  initializeService.initialize();
}
