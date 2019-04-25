const service = require('../service/behavior_service');
const BaseController = require('../common/base_controller');
const logger = require('../util/log_util');

class BehaviorController extends BaseController {
  static async userLikeMovie(ctx) {
    logger.info('BehaviorController|userLikeMovie...');
    const { openId } = ctx.state.userInfo;
    // const openId = 'oqPrs0BatbBtkXyNRUfRPbw-xxxx';
    const { movieId } = ctx.request.body;
    ctx.body = await service.userLikeMovie(openId, movieId);
  }

  static async userUnLikeMovie(ctx) {
    logger.info('BehaviorController|userUnLikeMovie...');
    const { openId } = ctx.state.userInfo;
    const { movieId } = ctx.request.body;
    ctx.body = await service.userUnLikeMovie(openId, movieId);
  }
}

module.exports = BehaviorController;
