const { PORT } = require('./common/config');
const app = require('./app');
const { logger } = require('./common/winston.config');
const { mongoDBConnect } = require('./database/db.client.js');

process
  .on('unhandledRejection', err => {
    err.statusCode = 500;
    err.message = 'Internal Error';
    logger.error(`unhandledRejection ${err.message}`, {
      message: err.message,
      statusCode: err.statusCode
    });
  })
  .on('uncaughtException', err => {
    logger.error('uncaughtException', {
      message: err.message,
      statusCode: err.statusCode
    });
    const { exit } = process;
    exit(1);
  });

mongoDBConnect(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
