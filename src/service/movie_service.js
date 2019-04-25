const _ = require('lodash');
const BaseService = require('../common/base_service');
const ResultPair = require('../common/result_pair');
const GerService = require('./ger_service');
const { Sequelize, movie_info: movieInfo, behavior_info: behaviorInfo } = require('../model');
const logger = require('../util/log_util');

const { Op } = Sequelize;

class MovieService extends BaseService {
  static async getMovieList(openId) {
    try {
      logger.info('MovieService|getMovieList|start...');
      let recN;// 推荐的数量
      let hotN;// 热门的数量
      const recRsp = await this.getRecommendMovieList(openId);
      const recLength = recRsp.recommendations.length;
      if (recLength >= 4) {
        recN = 4;
        hotN = 3;
      } else {
        recN = recLength;
        hotN = 7 - recLength;
      }

      const hots = await this.getHotMovieList(hotN);

      const moviesUserLike = await behaviorInfo.findAll({
        raw: true,
        where: {
          openId,
          behaviorType: 1, // type = 1代表喜欢
        },
      });// 用户喜欢的电影
      const movieIdsUserLike = moviesUserLike.map(movie => movie.movieId);
      const recIds = recRsp.recommendations
        .sort((a, b) => (a.weight - b.weight))
        .slice(0, recN)
        .map(rec => parseInt(rec.thing, 10));
      const recommends = await movieInfo.findAll({
        raw: true,
        where: {
          id: recIds,
        },
      });
      const showMovieList = []; // 用户最后看到的电影列表
      hots.forEach((movie) => {
        const showMovieInfo = {
          ...movie,
          source: 1, // 1代表hot
          userLikeMovie: movieIdsUserLike.includes(movie.id),
        };
        showMovieList.push(showMovieInfo);
      });
      recommends.forEach((movie) => {
        const showMovieInfo = {
          ...movie,
          source: 2, // 2代表recomend
          userLikeMovie: movieIdsUserLike.includes(movie.id),
        };
        showMovieList.push(showMovieInfo);
      });
      logger.info(`MovieService|getMovieList|rsp: ${JSON.stringify(showMovieList)}`);
      return ResultPair.ok(showMovieList);
    } catch (error) {
      logger.error(`MovieService|getMovieList|error: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  static async getLikedMovieList(openId) {
    try {
      const moviesUserLike = await behaviorInfo.findAll({
        raw: true,
        where: {
          openId,
          behaviorType: 1, // type = 1代表喜欢
        },
      });// 用户喜欢的电影
      const movieIdsUserLike = moviesUserLike.map(movie => movie.movieId);
      const likedMovies = await movieInfo.findAll({
        raw: true,
        where: {
          id: movieIdsUserLike,
        },
      });
      const showLikedMovies = likedMovies.map(movie => ({
        ...movie,
        userLikeMovie: movieIdsUserLike.includes(movie.id),
      }));
      logger.info(`MovieService|getLikedMovieList|rsp: ${JSON.stringify(showLikedMovies)}`);
      return ResultPair.ok(showLikedMovies);
    } catch (error) {
      logger.error(`MovieService|getLikedMovieList|error: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  static async getHotMovieList(num) {
    try {
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
    } catch (error) {
      logger.error(`MovieService|getHotMovieList|error: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  static async getRecommendMovieList(openId) {
    try {
      logger.info('MovieService|getRecommendMovieList|start...');
      return GerService.getRecommendations('movie_like', openId, 'like');
    } catch (error) {
      logger.error(`MovieService|getRecommendMovieList|error: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  static async getSimilarMovieList(movieId) {
    try {
      logger.info('MovieService|getSimilarMovieList|start...');
      const similarMovies = await GerService.getSimilarityThings('movie_like', movieId, 'like');
      return ResultPair.ok(similarMovies);
    } catch (error) {
      logger.error(`MovieService|getSimilarMovieList|error: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  static async getMovieDetail(movieId) {
    try {
      logger.info('MovieService|getMovieDetail|start...');
      logger.info(`MovieService|getMovieDetail|movieId: ${movieId}`);
      const rsp = await movieInfo.findOne({
        raw: true,
        where: {
          id: movieId,
        },
      });
      if (!rsp) return ResultPair.invalid('查询不到该id的电影');
      logger.info(`MovieService|getMovieDetail|rsp: ${JSON.stringify(rsp)}`);
      return ResultPair.ok(rsp);
    } catch (error) {
      logger.error(`MovieService|getMovieDetail|error: ${JSON.stringify(error)}`);
      throw error;
    }
  }
}

module.exports = MovieService;
