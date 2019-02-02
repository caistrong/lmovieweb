const service = require('../service/movie_service');
const BaseController = require('../common/base_controller');
const logger = require('../util/log_util');

class MovieController extends BaseController {
  static async getMovieList(ctx) {
    logger.info('MovieController|getMovieList...');
    ctx.body = await service.getMovieList();
  }
}

module.exports = new MovieController();
