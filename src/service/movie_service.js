const _ = require('lodash');
const BaseService = require('../common/base_service');
const ResultPair = require('../common/result_pair');
const GerService = require('./ger_service');
const { Sequelize, movie_info: movieInfo } = require('../model');
const logger = require('../util/log_util');

const { Op } = Sequelize;

class MovieService extends BaseService {
  static async getMovieList(openId) {
    logger.info('MovieService|getMovieList|start...');
    const hots = await this.getHotMovieList(5);
    const recommends = await this.getRecommendMovieList(openId);
    logger.info(`MovieService|getMovieList|hots: ${JSON.stringify(hots)}|recommends: ${JSON.stringify(recommends)}`);
    return ResultPair.ok({
      hots,
      recommends,
    });
  }

  static async getHotMovieList(num) {
    logger.info('MovieService|getHotMovieList|start...');
    const rsp = await movieInfo.findAll({
      raw: true,
      where: {
        rate: {
          [Op.gte]: 80,
        },
      },
    });
    logger.info(`MovieService|getHotMovieList|rsp: ${JSON.stringify(rsp)}`);
    const hotMovies = _.sampleSize(rsp, num); // 随机挑选num个评分在8.0以上的电影
    return hotMovies;
  }

  static async getRecommendMovieList(openId) {
    logger.info('MovieService|getRecommendMovieList|start...');
    return GerService.getRecommendations('movie_like', openId, 'like');
  }

  static async getSimilarMovieList(movieId) {
    logger.info('MovieService|getSimilarMovieList|start...');
    const similarMovies = await GerService.getSimilarityThings('movie_like', movieId, 'like');
    return ResultPair.ok(similarMovies);
  }

  static async getMovieDetail(movieId) {
    logger.info('MovieService|getMovieDetail|start...');
    logger.info(`MovieService|getMovieDetail|movieId: ${movieId}`);
    const rsp = await movieInfo.findOne({
      raw: true,
      where: {
        id: movieId,
      },
    });
    if (!rsp) return ResultPair.invalid('查询不到该id的电影');
    logger.info(`MovieService|getHotMovieList|rsp: ${JSON.stringify(rsp)}`);
    return ResultPair.ok(rsp);
  }
}

module.exports = MovieService;
