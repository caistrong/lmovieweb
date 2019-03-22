const Router = require('koa-router');
const controller = require('../controller/ger_controller');

const r = new Router({ prefix: '/api/' });

// 这些接口供测试ger用,不供前端调用

r.get('namespaces', controller.getNameSpaces);

r.post('namespaces', controller.addNameSpaces);

r.delete('namespaces', controller.delNameSpaces);

r.get('events', controller.findEvents);

r.post('events', controller.addEvent);

r.delete('events', controller.delEvent);

r.get('recommendations', controller.getRecommendations);

r.get('similarity', controller.getSimilarityThings);

module.exports = r;
