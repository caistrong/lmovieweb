const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');
const logger = require('../util/log_util');

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'mysql',
  timezone: '+08:00',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  define: {
    timestamps: false,
  },
  operatorsAliases: false,
});
const models = {};

fs.readdirSync(__dirname).filter(file => file !== 'index.js').forEach((file) => {
  const model = sequelize.import(path.join(__dirname, file));
  logger.info(`import model name: ${model.name}`);
  models[model.name] = model;
});

/*
Object.keys(models).forEach(function (modelName) {
  if ('associate' in models[modelName]) {
    models[modelName].associate(db);
  }
});
*/

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
