const Router = require('koa-router');
const controller = require('../controller/movie_controller');

const r = new Router({ prefix: '/api/' });

/**
 * @api {get} /api/getMovieList/ 获取电影列表接口
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
 * @apiSuccessExample {json} 失败
 *     {
 *       "code": 1,
 *       "message": "参数错误"
 *     }
 */
r.get('getMovieList', controller.getMovieList);

module.exports = r;
