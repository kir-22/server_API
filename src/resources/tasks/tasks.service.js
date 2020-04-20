// const tasksRepo = require('./tasks.memory.repository');
const tasksRepo = require('./tasks.db.repository');
// const boardsService = require('../boards/boards.service');

const getAll = async boardId => await tasksRepo.getAll(boardId);
const getTask = async (boardId, taskId) =>
  await tasksRepo.getTask(boardId, taskId);
const addNewTask = async (id, task) => await tasksRepo.addNewTask(id, task);
const updateTask = async (boardId, taskId, task) =>
  await tasksRepo.updateTask(boardId, taskId, task);
const deleteTask = async (boardId, taskId) =>
  await tasksRepo.deleteTask(boardId, taskId);

module.exports = { getAll, getTask, addNewTask, updateTask, deleteTask };
