// const { tasks, pushTask } = require('../../database/tasks');
const Task = require('./tasks.model');
const boardsService = require('../boards/boards.service');

const getAll = async boardId => {
  const board = await boardsService.getBoard(boardId);
  if (!board) return null;
  // if (tasks.length === 0) return [];
  const _tasks = await Task.find({}).exec();
  if (_tasks.length === 0) return [];
  return _tasks.filter(task => task.boardId === boardId);
};

const getTask = async (boardId, id) => {
  const board = await boardsService.getBoard(boardId);
  if (!board) return null;
  const task = await Task.findById(id);
  if (!task) return null;
  if (task.boardId !== boardId) return null;
  return task;
};
const addNewTask = async (boardId, task) => {
  const board = await boardsService.getBoard(boardId);
  if (!board) return null;
  const _task = await Task.create({ ...task, boardId });
  console.log('_tasks -------------------->', _task);
  return _task;
};
const updateTask = async (boardId, taskId, task) => {
  const board = await boardsService.getBoard(boardId);
  // Наверное нужно добавить в колумнс в борде после обновления
  if (!board) return null;
  // const index = tasks.findIndex(item => item.id === taskId);
  const isUpdate = (await Task.updateOne({ _id: taskId }, task)).ok;
  return isUpdate === 1 ? task : null;
};
const deleteTask = async (boardId, taskId) => {
  const board = await boardsService.getBoard(boardId);
  // Наверное нужно добавить в колумнс в борде после обновления
  if (!board) return null;
  const isDeleted = (await Task.deleteOne({ _id: taskId })).ok;
  return isDeleted;
};

module.exports = { getAll, getTask, addNewTask, updateTask, deleteTask };
