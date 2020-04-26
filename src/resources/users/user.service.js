// const usersRepo = require('./user.memory.repository');
const usersRepo = require('./user.db.repository');
const { hashedPassword } = require('../../utils/index');

const getAll = async () => await usersRepo.getAll();
const getUser = async id => await usersRepo.getUser(id);
const addUser = async user => {
  const password = await hashedPassword(user);
  // await usersRepo.addUser({ ...user, password });
  const _user = await usersRepo.addUser({ ...user, password });
  return _user;
};
const updateUser = async (id, user) => {
  const password = await hashedPassword(user);
  const _user = await usersRepo.updateUser(id, { ...user, password });
  return _user;
};
const onDeleteUser = async id => await usersRepo.onDeleteUser(id);

module.exports = { getAll, getUser, addUser, updateUser, onDeleteUser };
