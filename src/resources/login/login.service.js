const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET_KEY } = require('../../common/config');
const usersRepo = require('../users/user.db.repository');

const getToken = async user => {
  const userFromDB = await usersRepo.getUserByLogin(user);
  console.log('==========>>> ', userFromDB);
  if (!userFromDB) {
    return null;
  }
  const passwordValidate = await bcrypt.compare(
    user.password,
    userFromDB.password
  );
  if (!passwordValidate) {
    throw new Error({
      statusCode: 403,
      message: 'FORBIDDEN! INCORRECT_LOGIN_OR_PASSWORD'
    });
  }
  return jwt.sign(
    { id: userFromDB.id, login: userFromDB.login },
    JWT_SECRET_KEY
  );
};

module.exports = { getToken };
