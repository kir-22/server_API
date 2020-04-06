const { tasks, pushTask } = require('../../database/tasks');
const Task = require('./tasks.model');
const boardsService = require('../boards/boards.service');

const getAll = async boardId => {
  const board = await boardsService.getBoard(boardId);
  if (!board) return null;
  if (tasks.length === 0) return [];
  return tasks.filter(task => task.boardId === boardId);
};

const getTask = async (boardId, taskId) => {
  const board = await boardsService.getBoard(boardId);
  if (!board) return null;
  const task = tasks.find(item => item.id === taskId);
  if (!task) return null;
  if (task.boardId !== boardId) return null;
  return task;
};
const addNewTask = async (boardId, task) => {
  const board = await boardsService.getBoard(boardId);
  // Наверное нужно добавить в колумнс в борде
  if (!board) return null;
  const _task = new Task({ ...task, boardId });
  pushTask(_task);
  return _task;
};
const updateTask = async (boardId, taskId, task) => {
  const board = await boardsService.getBoard(boardId);
  // Наверное нужно добавить в колумнс в борде после обновления
  if (!board) return null;
  const index = tasks.findIndex(item => item.id === taskId);
  if (index === -1) return null;
  const _task = { id: taskId, ...task };
  tasks[index] = _task;
  return _task;
};
const deleteTask = async (boardId, taskId) => {
  const board = await boardsService.getBoard(boardId);
  console.log('board: ', board);
  // Наверное нужно добавить в колумнс в борде после обновления
  if (!board) return null;
  const index = tasks.findIndex(item => item.id === taskId);
  if (index === -1) return null;
  tasks.splice(index, 1);
  return taskId;
};

module.exports = { getAll, getTask, addNewTask, updateTask, deleteTask };
