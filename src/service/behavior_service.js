const moment = require('moment');
const BaseService = require('../common/base_service');
const ResultPair = require('../common/result_pair');
const GerService = require('./ger_service');
const logger = require('../util/log_util');
const { behavior_info: behaviorInfo } = require('../model');

class BehaviorService extends BaseService {
  static async userLikeMovie(openId, movieId) {
    try {
      logger.info('BehaviorService|userLikeMovie|start...');
      const defaultsInfo = {
        openId,
        behaviorType: 1, // type = 1代表喜欢
        movieId,
      };
      const [record, created] = await behaviorInfo.findOrCreate({
        defaults: defaultsInfo,
        where: defaultsInfo,
      });
      if (!created) { // 已有记录
        return ResultPair.ALREADY_LIKE;
      }
      const expiresTime = moment().add(1, 'years'); // 喜欢某个电影在一年后过期
      const addEventRsp = await GerService.addEvent('movie_like', openId, 'like', movieId, expiresTime);
      logger.info(`BehaviorService|userLikeMovie|addEventRsp: ${JSON.stringify(addEventRsp)}`);
      return ResultPair.ok(record);
    } catch (error) {
      logger.error(error);
      return ResultPair.invalid('失败');
    }
  }

  static async userUnLikeMovie(openId, movieId) {
    try {
      logger.info('BehaviorService|userUnLikeMovie|start...');
      const rsp = await behaviorInfo.destroy({
        where: {
          openId,
          behaviorType: 1, // type = 1代表喜欢
          movieId,
        },
      });
      const delEventRsp = await GerService.delEvent('movie_like', openId, 'like', `${movieId}`);
      logger.info(`BehaviorService|userUnLikeMovie|delEventRsp: ${JSON.stringify(delEventRsp)}`);
      return ResultPair.ok(rsp);
    } catch (error) {
      logger.error(error);
      return ResultPair.invalid('失败');
    }
  }
}

module.exports = BehaviorService;
