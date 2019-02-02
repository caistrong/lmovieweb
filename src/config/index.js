/**
 * 使用方法：
 * 1. const config = require('../config/'); config.db.host
 * 2. global.config.fileName.configName, 比如：global.config.db.host
 *
 * 注意事项：
 * 1. 配置放在不同文件夹下，文件名为key，里面的内容为value，格式为json
 * 2. 文件名及json命名统一为：lowerCamelCase，小写驼峰，方便使用者调用
 * 3. 应避免common下的配置文件名跟formal/local/pre下的配置文件名重复
 * 4. formal/local/pre下的配置文件名保持一致
 *
 * common，放置与环境无关的公共配置
 * formal，正式环境配置
 * local，本地环境配置
 * pre，预发布环境配置
 */

const path = require('path');
const fs = require('fs');
const logger = require('../util/log_util');

const config = {};
global.config = config; // Export to global variable
module.exports = config;

// 一、加载本地配置
function loadFolderConfig(folder) {
  logger.info(`start to load config from folder: ${folder}`);
  const fileNameArray = fs.readdirSync(path.join(__dirname, folder));

  fileNameArray.forEach((fileName) => {
    logger.info(`fileName: ${fileName}`);

    const fileData = fs.readFileSync(path.join(__dirname, folder, fileName), 'utf8');
    logger.info(`fileData: ${JSON.stringify(fileData)}`);

    config[fileName] = JSON.parse(fileData);
    logger.info(`config: ${JSON.stringify(config)}`);
  });
}

// 1. 加载common文件夹下的配置
loadFolderConfig('common');

// 1. 加载对应环境下的配置
if (process.env.NODE_ENV === 'production') {
  loadFolderConfig('formal');
} else {
  loadFolderConfig('local');
}
