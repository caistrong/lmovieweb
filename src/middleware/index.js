const compose = require('koa-compose');
const logRequest = require('./log_request');
const errorHandler = require('./error_handler');
const authorize = require('./authorize');
// const fakeauthorize = require('./fake_authorize');

const middleware = compose([
  authorize,
  logRequest,
  errorHandler,
]);

// 本地也实现了登录的逻辑
// if (process.env.NODE_ENV === 'production') {
//   middleware = compose([
//     authorize,
//     middleware,
//   ]);
// } else {
//   middleware = compose([
//     fakeauthorize,
//     middleware,
//   ]);
// }

module.exports = middleware;
