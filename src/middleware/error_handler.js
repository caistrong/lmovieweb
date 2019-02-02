const ResultPair = require('../common/result_pair');
const BusinessError = require('../common/business_error');
const logger = require('../util/log_util');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    logger.error(`error|${err.msg || err.message || JSON.stringify(err.response) || JSON.stringify(err)}`);
    if (err instanceof BusinessError) {
      ctx.body = err;
    } else {
      ctx.body = ResultPair.FAIL;
    }
  }
};
