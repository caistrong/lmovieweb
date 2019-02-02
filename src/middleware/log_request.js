const util = require('util');
const logger = require('../util/log_util');

module.exports = async (ctx, next) => {
  logger.info(`${ctx.method}|${ctx.path}|cookie : ${util.inspect(ctx.cookies.request.headers.cookie)}`);
  logger.info(`${ctx.method}|${ctx.path}|query : ${JSON.stringify(ctx.query)}`);
  logger.info(`${ctx.method}|${ctx.path}|body : ${JSON.stringify(ctx.request.body)}`);

  const start = new Date();
  await next();
  const ms = new Date() - start;
  logger.info(`${ctx.method}|${ctx.path}|response body - ${ms}ms: ${JSON.stringify(ctx.body)}`);
};
