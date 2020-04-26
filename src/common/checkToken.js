const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

const ignorePath = ['/', '/login', '/doc', '/login/', '/doc/'];

const checkToken = (req, res, next) => {
  const { url, headers } = req;
  if (ignorePath.includes(url)) {
    return next();
  }
  const token = headers.authorization;
  if (!token) {
    return res.status(401).json({
      status: res.statusCode,
      message: 'Unauthorized!!!'
    });
  }
  jwt.verify(token.replace('Bearer ', ''), JWT_SECRET_KEY);
  return next();
};

module.exports = checkToken;
