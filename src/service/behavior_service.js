const moment = require('moment');
const BaseService = require('../common/base_service');
const GerService = require('./ger_service');
const logger = require('../util/log_util');

class BehaviorService extends BaseService {
  static async userLikeMovie(openId, movieId) {
    logger.info('BehaviorService|userLikeMovie|start...');
    const expiresTime = moment().add(1, 'years'); // 喜欢某个电影在一年后过期
    return GerService.addEvent('movie_like', openId, 'like', movieId, expiresTime);
  }
}

module.exports = BehaviorService;
