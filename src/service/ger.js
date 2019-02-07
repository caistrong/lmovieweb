const g = require('ger');
const mysqlEsm = require('ger_mysql_esm');
const config = require('../config');

const { GER, knex: Knex } = g; // class GER and knex = mysql client
const MysqlESM = mysqlEsm.esm;

const esmoptions = {
  client: 'mysql',
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    dateStrings: true,
    timezone: '+08:00', // TODO:东八区包括下面的的设定尝试失败了
    charset: 'utf8',
  },
  pool: {
    afterCreate: (connection, callback) => {
      connection.query('SET global time_zone = "+08:00";', (err) => {
        callback(err, connection);
      });
    },
  },
};

const options = {
  esm: 'mysql',
  esmoptions,
  port: 3000,
  configuration: {},
};


const mysqlKenx = new Knex(esmoptions);

const esm = new MysqlESM({ knex: mysqlKenx }, GER.NamespaceDoestNotExist);

const ger = new GER(esm, options);


module.exports = ger;
