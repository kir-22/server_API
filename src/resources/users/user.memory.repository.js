const { users, pushUser } = require('../../database/users');
const User = require('./user.model');

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  const _users = users.map(User.toResponse);
  return _users;
};
const getUser = async id => {
  console.log('id: ', id, typeof id);
  console.log('users: ', users);
  const _user = users.find(items => items.id === id);
  return _user;
};
const addUser = async user => {
  const _user = new User(user);
  pushUser(_user);
  // users.push(_user);
  return User.toResponse(_user);
};

const updateUser = (id, user) => {
  const index = users.findIndex(item => item.id === id);
  const _user = { id, ...user };
  users[index] = _user;
  return User.toResponse(_user);
};

const onDeleteUser = id => {
  const findIndex = users.findIndex(item => item.id === id);
  if (findIndex === -1) return false;
  users.splice(findIndex, 1);
  return id;
};

module.exports = { getAll, getUser, addUser, updateUser, onDeleteUser };
