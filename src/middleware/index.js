const compose = require('koa-compose');
const logRequest = require('./log_request');
const errorHandler = require('./error_handler');
const authorize = require('./authorize');
const fakeauthorize = require('./fake_authorize');

let middleware = compose([
  logRequest,
  errorHandler,
]);

if (process.env.NODE_ENV === 'production') {
  middleware = compose([
    authorize,
    middleware,
  ]);
} else {
  middleware = compose([
    fakeauthorize,
    middleware,
  ]);
}

module.exports = middleware;
