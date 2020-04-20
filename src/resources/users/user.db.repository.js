// const { users, pushUser } = require('../../database/users');
// const { tasks } = require('../../database/tasks');
// const { updateTask } = require('../tasks/tasks.memory.repository');
const User = require('./user.model');

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  const users = await User.find({}).exec();
  return users;
};
const getUser = async id => {
  const _user = await User.findById(id);
  return _user;
};
const addUser = async user => {
  // const _user = new User(user);
  // pushUser(_user);
  // // users.push(_user);
  // return User.toResponse(_user);
  const _user = await User.create(user);
  // _user.save();
  return _user;
};

const updateUser = async (id, user) => {
  // const index = users.findIndex(item => item.id === id);
  // if (index === -1) return null;
  // const _user = { id, ...user };
  // users[index] = _user;
  // return User.toResponse(_user);
  const _user = (await User.updateOne({ _id: id }, user)).ok;
  return _user === 1 ? user : null;
};

const onDeleteUser = async id => {
  // const findIndex = users.findIndex(item => item.id === id);
  // if (findIndex === -1) return false;
  // const selectedTasks = tasks.filter(el => el.userId === id);
  // // console.log('tasks1: ', tasks);
  // for (const task of selectedTasks) {
  //   await updateTask(task.boardId, task.id, { ...task, userId: null });
  // }
  // // console.log('tasks2: ', tasks);
  // users.splice(findIndex, 1);
  // return id;
  const isDelete = (await User.deleteOne({ _id: id })).ok;
  return isDelete;
};

module.exports = { getAll, getUser, addUser, updateUser, onDeleteUser };
