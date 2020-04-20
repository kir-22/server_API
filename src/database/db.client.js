const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const { logger } = require('../common/winston.config.js');

const mongoDBConnect = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const database = mongoose.connection;

  database.on('error', () => {
    logger.error('Connect Error!!!!');
  });

  database.once('open', async () => {
    console.log('We are connected');
    // database.dropDatabase();
    callback();
  });
};

module.exports = { mongoDBConnect };
