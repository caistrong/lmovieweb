const compose = require('koa-compose');
const logRequest = require('./log_request');
const errorHandler = require('./error_handler');

module.exports = compose([
  logRequest,
  errorHandler,
]);
