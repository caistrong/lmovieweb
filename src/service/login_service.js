const axios = require('axios');
const jwt = require('jsonwebtoken');
const BaseService = require('../common/base_service');
const ResultPair = require('../common/result_pair');
const logger = require('../util/log_util');
const config = require('../config');
const { user_info: userInfo } = require('../model');

const { appid, secret, code2SessionUrl } = config.common.mp;

class LoginService extends BaseService {
  static async login(code) {
    try {
      logger.info('LoginService|login|start...');
      const fullurl = `${code2SessionUrl}?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
      const rsp = await axios.get(fullurl);
      const { openid, session_key: sessionkey } = rsp.data;
      const defaultsInfo = {
        openId: openid,
        sessionKey: sessionkey,
      };
      const [user, created] = await userInfo.findOrCreate({
        defaults: defaultsInfo,
        where: {
          openId: openid,
        },
      });
      if (!created) { // 不是新建的用户
        await user.update(defaultsInfo);
      }
      const token = jwt.sign({
        openId: user.openId,
      }, config.common.jwtSecretKey, {
        expiresIn: 7200,
      });

      return ResultPair.ok({ token });
    } catch (error) {
      logger.error(error);
      return ResultPair.invalid('登录失败');
    }
  }
}

module.exports = LoginService;
