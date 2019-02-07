const Router = require('koa-router');
const controller = require('../controller/ger_controller');

const r = new Router({ prefix: '/api/' });

/**
 * @api {get} /api/namespaces/ 获取电影列表接口
 * @apiName getMovieList
 * @apiGroup movie
 *
 * @apiParam {Number} openId 微信openId
 *
 * @apiSuccess {Object} data 数据
 *
 * @apiSuccessExample {json} 成功
 *     {
 *       "code": 0,
 *       "message": "success",
 *       "data": [{
 *           id: "1",
 *           name: "肖申克的救赎"
 *       }]
 *     }
 *
 * @apiSuccessExample {json} 失败s
 *     {
 *       "code": 1,
 *       "message": "参数错误"
 *     }
 */
r.get('namespaces', controller.getNameSpaces);

r.post('namespaces', controller.addNameSpaces);

r.delete('namespaces', controller.delNameSpaces);

r.get('events', controller.findEvents);

r.post('events', controller.addEvent);

r.delete('events', controller.delEvent);

r.get('recommendations', controller.getRecommendations);

r.get('similarity', controller.getSimilarityThings);

module.exports = r;
