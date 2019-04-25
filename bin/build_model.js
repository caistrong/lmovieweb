/**
 * 把DB定义的表结构，自动转为model下对应的模型js
 */
const SequelizeAuto = require('sequelize-auto');
const config = require('../src/config/');

const auto = new SequelizeAuto(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'mysql',
  directory: './src/model/',
  tables: ['movie_info', 'user_info', 'behavior_info'], // TODO, fill in the table names
});

auto.run((err) => {
  if (err) throw err;

  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});
