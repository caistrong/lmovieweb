const service = require('../service/ger_service');
const BaseController = require('../common/base_controller');
const logger = require('../util/log_util');

class GerController extends BaseController {
  static async getNameSpaces(ctx) {
    logger.info('GerController|getNameSpaces...');
    ctx.body = await service.getNameSpaces();
  }

  static async addNameSpaces(ctx) {
    logger.info('GerController|addNameSpaces...');
    const { namespace } = ctx.request.body;
    ctx.body = await service.addNameSpaces(namespace);
  }

  static async delNameSpaces(ctx) {
    logger.info('GerController|delNameSpaces...');
    const { namespace } = ctx.request.body;
    ctx.body = await service.delNameSpaces(namespace);
  }

  static async addEvent(ctx) {
    logger.info('GerController|delNameSpaces...');
    const {
      namespace,
      person,
      action,
      thing,
      expiresAt,
    } = ctx.request.body;
    ctx.body = await service.addEvent(namespace, person, action, thing, expiresAt);
  }

  static async findEvents(ctx) {
    logger.info('GerController|findEvents...');
    const {
      namespace,
    } = ctx.query;
    ctx.body = await service.findEvents(namespace);
  }

  static async delEvent(ctx) {
    logger.info('GerController|delEvents...');
    const {
      namespace,
      person,
      action,
      thing,
    } = ctx.request.body;
    ctx.body = await service.delEvent(namespace, person, action, thing);
  }

  static async getRecommendations(ctx) {
    logger.info('GerController|getRecommendations...');
    const {
      namespace,
      person,
      action,
    } = ctx.request.query;
    ctx.body = await service.getRecommendations(namespace, person, action);
  }

  static async getSimilarityThings(ctx) {
    logger.info('GerController|getSimilarityThings...');
    const {
      namespace,
      thing,
      action,
    } = ctx.request.query;
    ctx.body = await service.getSimilarityThings(namespace, thing, action);
  }
}

module.exports = GerController;
