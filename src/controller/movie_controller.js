const service = require('../service/movie_service');
const BaseController = require('../common/base_controller');
const logger = require('../util/log_util');

class MovieController extends BaseController {
  static async getMovieList(ctx) {
    logger.info('MovieController|getMovieList...');
    const { openId } = ctx.state.userInfo;
    ctx.body = await service.getMovieList(openId);
  }

  static async getLikedMovieList(ctx) {
    logger.info('MovieController|getLikedMovieList...');
    const { openId } = ctx.state.userInfo;
    ctx.body = await service.getLikedMovieList(openId);
  }

  static async getSimilarMovieList(ctx) {
    logger.info('MovieController|getSimilarMovieList...');
    const { movieId } = ctx.query;
    ctx.body = await service.getSimilarMovieList(movieId);
  }

  static async getMovieDetail(ctx) {
    logger.info('MovieController|getMovieDetail...');
    const { movieId } = ctx.query;
    ctx.body = await service.getMovieDetail(movieId);
  }
}

module.exports = MovieController;
