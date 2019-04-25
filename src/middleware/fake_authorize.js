// const jwt = require('jsonwebtoken');
const ResultPair = require('../common/result_pair');
const logger = require('../util/log_util');
const config = require('../config');

module.exports = async (ctx, next) => {
  try {
    const { whiteList } = config.common;
    const freeCheck = whiteList.some(item => new RegExp(item, 'i').test(ctx.path));
    if (freeCheck) {
      await next();
    } else {
      // const token = ctx.request.headers.authorization;
      // if (!token) {
      //   throw new Error('未传递token');
      // }
      // const userInfo = jwt.verify(token, config.common.jwtSecretKey);
      const userInfo = {
        openId: 'xxxxx',
      };
      logger.info(`userInfo: ${userInfo}`);
      ctx.state.userInfo = userInfo;
      await next();
    }
  } catch (error) {
    logger.error(error);
    ctx.body = ResultPair.invalid('登录态校验失败');
  }
};
