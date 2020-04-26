const bcrypt = require('bcrypt');

const hashedPassword = async ({ password }) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

module.exports = { hashedPassword };
