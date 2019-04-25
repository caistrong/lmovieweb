const Router = require('koa-router');
const controller = require('../controller/behavior_controller');

const r = new Router({ prefix: '/api/' });

r.post('user_like_movie', controller.userLikeMovie);

r.post('user_unlike_movie', controller.userUnLikeMovie);

module.exports = r;
