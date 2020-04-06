const usersRepo = require('./user.memory.repository');

const getAll = async () => await usersRepo.getAll();
const getUser = async id => await usersRepo.getUser(id);
const addUser = async user => await usersRepo.addUser(user);
const updateUser = async (id, user) => await usersRepo.updateUser(id, user);
const onDeleteUser = async id => await usersRepo.onDeleteUser(id);

module.exports = { getAll, getUser, addUser, updateUser, onDeleteUser };
