const path = require('path');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.label({ label: path.basename(process.mainModule.filename) }),
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(
      winston.format.colorize(),
      winston.format.cli()
    ),
    new winston.transports.File({
      filename: path.join(__dirname, '../logger/error.log'),
      level: 'error',
      format: winston.format.combine(
        winston.format.uncolorize(),
        winston.format.json()
      )
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '../logger/info.log'),
      level: 'info',
      format: winston.format.combine(
        winston.format.uncolorize(),
        winston.format.json()
      )
    })
  ],
  exceptionHandlers: [
    new winston.transports.Console(
      winston.format.colorize(),
      winston.format.cli()
    ),
    new winston.transports.File({
      filename: path.join(__dirname, '../logger/exeption.log'),
      format: winston.format.combine(
        winston.format.uncolorize(),
        winston.format.json()
      )
    })
  ],
  exitOnError: true
});
// logger.info('INFO');
// logger.warn('WARN');
// logger.error('ERROR');
// logger.silly('SILLY');
// logger.debug('DEBUG');
// logger.verbose('VERBOSE');
// logger.log('INFO', 'info from log');

const middlewareLoggerReq = (req, res, next) => {
  logger.info('Request Logger', {
    url: req.url,
    body: req.body,
    method: req.method,
    queryParams: req.query
  });
  next();
};

const middlewareErrorLogger = (err, req, res, next) => {
  console.log('I HEre', err.message, err.statusCode);
  if (err) {
    res.status(500).send(err.message);
    logger.error('Error', {
      message: err.message,
      statusCode: err.statusCode,
      method: req.method,
      body: req.body
    });
  }
  middlewareLoggerReq(req, res, next);
  next();
};

module.exports = { logger, middlewareLoggerReq, middlewareErrorLogger };
