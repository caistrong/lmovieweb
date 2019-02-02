const { createLogger, format, transports } = require('winston');

const {
  combine,
  timestamp,
  simple,
  json,
} = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    json(),
  ),
  // defaultMeta: { appName: 'recweb' }
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.clear();
  logger.add(new transports.Console({
    format: simple(),
  }));
}

module.exports = logger;
