const BaseService = require('../common/base_service');
const ResultPair = require('../common/result_pair');
const logger = require('../util/log_util');

class MovieService extends BaseService {
  static async getMovieList() {
    logger.info('MovieService|getMovieList|start...');
    const rsp = [{
      id: '1',
      name: '肖申克的救赎',
    }];
    logger.info(`MovieService|getMovieList|rsp: ${JSON.stringify(rsp)}`);
    return ResultPair.ok(rsp);
  }
}

module.exports = new MovieService();
