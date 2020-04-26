const Task = require('../tasks/tasks.model');

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
const getUserByLogin = async ({ login }) => {
  const user = (await User.find({ login }).exec())[0];
  return user;
};

const addUser = async user => {
  const _user = await User.create(user);
  return _user;
};

const updateUser = async (id, user) => {
  const _user = (await User.updateOne({ _id: id }, user)).ok;
  return _user === 1 ? user : null;
};

const onDeleteUser = async id => {
  const allTasks = await Task.find({ userId: id });

  console.log('allTasks: ', allTasks);
  allTasks.forEach(async task => {
    await Task.updateOne({ _id: task.id }, { userId: null });
  });

  const isDelete = (await User.deleteOne({ _id: id })).ok;
  return isDelete;
};

module.exports = {
  getAll,
  getUser,
  addUser,
  updateUser,
  onDeleteUser,
  getUserByLogin
};
