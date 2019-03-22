const service = require('../service/behavior_service');
const BaseController = require('../common/base_controller');
const logger = require('../util/log_util');

class LoginController extends BaseController {
  static async userLikeMovie(ctx) {
    logger.info('LoginController|login...');
    const { openId } = ctx.state.userInfo;
    const { movieId } = ctx.request.body;
    ctx.body = await service.userLikeMovie(openId, movieId);
  }
}

module.exports = LoginController;
