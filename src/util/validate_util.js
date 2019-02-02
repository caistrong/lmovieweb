const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const logger = require('./log_util');

const joi = BaseJoi.extend(Extension);

class ValidateUtil {
  static validate(target, schema) {
    const result = joi.validate(target, schema, {
      allowUnknown: true,
      // when true, allows object to contain unknown keys which are ignored.
      // Defaults to false.
      stripUnknown: false,
      // remove unknown elements from objects and arrays.
      // Defaults to false. when true, all unknown elements will be removed.
      convert: false,
      // when true, attempts to cast values to the required types (e.g. a string to a number).
      // Defaults to true.
    });
    if (result.error) {
      logger.error(`ValidateUtil|validate|joi.result.error: JSON.string ${result.error}`);
      return false;
    }
    return true;
  }
}

module.exports = ValidateUtil;
