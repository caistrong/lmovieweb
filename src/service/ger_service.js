const BaseService = require('../common/base_service');
const ResultPair = require('../common/result_pair');
const ger = require('./ger');
const logger = require('../util/log_util');

class GerService extends BaseService {
  static async getNameSpaces() {
    try {
      logger.info('GerService|getNameSpaces|start...');
      const rsp = await ger.list_namespaces();
      logger.info(`GerService|getNameSpaces|rsp: ${JSON.stringify(rsp)}`);
      return ResultPair.ok(rsp);
    } catch (error) {
      logger.info(`GerService|getNameSpaces|error: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  static async addNameSpaces(namespace) {
    try {
      logger.info('GerService|addNameSpaces|start...');
      const rsp = await ger.initialize_namespace(namespace);
      logger.info(`GerService|addNameSpaces|rsp: ${JSON.stringify(rsp)}`);
      return ResultPair.ok(rsp);
    } catch (error) {
      logger.info(`GerService|addNameSpaces|error: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  static async delNameSpaces(namespace) {
    try {
      logger.info('GerService|delNameSpaces|start...');
      const rsp = await ger.destroy_namespace(namespace);
      logger.info(`GerService|delNameSpaces|rsp: ${JSON.stringify(rsp)}`);
      return ResultPair.ok(rsp);
    } catch (error) {
      logger.info(`GerService|delNameSpaces|error: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  static async addEvent(namespace, person, action, thing, expiresAt) {
    try {
      logger.info('GerService|delNameSpaces|start...');
      const rsp = await ger.events([{
        namespace,
        person,
        action,
        thing,
        expires_at: expiresAt,
      }]);
      logger.info(`GerService|delNameSpaces|rsp: ${JSON.stringify(rsp)}`);
      return ResultPair.ok(rsp);
    } catch (error) {
      logger.error(`GerService|delNameSpaces|error: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  static async findEvents(namespace) {
    try {
      logger.info('GerService|findEvents|start...');
      const rsp = await ger.find_events(namespace);
      logger.info(`GerService|findEvents|rsp: ${JSON.stringify(rsp)}`);
      return ResultPair.ok(rsp);
    } catch (error) {
      logger.error(`GerService|findEvents|error: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  static async delEvent(namespace, person, action, thing) {
    try {
      logger.info('GerService|delEvents|start...');
      // const rsp = await ger.delete_events(namespace, person, action, thing);
      const rsp = await ger.delete_events(namespace, { person, action, thing });
      logger.info(`GerService|delEvents|rsp: ${JSON.stringify(rsp)}`);
      return ResultPair.ok(rsp);
    } catch (error) {
      logger.error(`GerService|delEvents|error: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  static async getRecommendations(namespace, person, action) {
    try {
      logger.info('GerService|getRecommendations|start...');
      const rsp = await ger.recommendations_for_person(
        namespace,
        person,
        {
          actions: {
            [action]: 1,
          },
          filter_previous_actions: ['like'],
        },
      );
      logger.info(`GerService|getRecommendations|rsp: ${JSON.stringify(rsp)}`);
      // return ResultPair.ok(rsp);
      return rsp;
    } catch (error) {
      logger.error(`GerService|getRecommendations|error: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  static async getSimilarityThings(namespace, thing, action) {
    try {
      logger.info('GerService|getSimilarityThings|start...');
      const rsp = await ger.recommendations_for_thing(
        namespace,
        thing,
        {
          actions: {
            [action]: 1,
          },
        },
      );
      logger.info(`GerService|getSimilarityThings|rsp: ${JSON.stringify(rsp)}`);
      // return ResultPair.ok(rsp);
      return rsp;
    } catch (error) {
      logger.error(`GerService|getSimilarityThings|error: ${JSON.stringify(error)}`);
      throw error;
    }
  }
}

module.exports = GerService;
