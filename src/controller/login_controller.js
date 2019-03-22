const service = require('../service/login_service');
const BaseController = require('../common/base_controller');
const logger = require('../util/log_util');

class LoginController extends BaseController {
  static async login(ctx) {
    logger.info('LoginController|login...');
    const { code } = ctx.request.body;
    ctx.body = await service.login(code);
  }
}

module.exports = LoginController;
