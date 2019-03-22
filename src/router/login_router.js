const Router = require('koa-router');
const controller = require('../controller/login_controller');

const r = new Router({ prefix: '/api/' });

r.post('login', controller.login);

module.exports = r;
