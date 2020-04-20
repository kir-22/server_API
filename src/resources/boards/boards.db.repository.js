// const { boards, pushBoard } = require('../../database/boards');
const Board = require('./boards.model');
const Column = require('./column.model');
// const { tasks } = require('../../database/users');
// const tasksService = require('../tasks/tasks.service');

const getAll = async () => {
  const _boards = await Board.find({}).exec();
  return _boards;
};

const getBoard = async id => {
  const _board = await Board.findById(id);
  return _board;
};

const addNewBoard = async board => {
  const { columns } = board;
  const _columns = !!columns ? columns.map(item => new Column(item)) : [];
  const _board = await Board.create({ ...board, columns: _columns });
  return _board;
};

const updateBoard = async (id, board) => {
  // console.log('board: ', board);
  // const index = boards.findIndex(item => item.id === id);
  // if (index === -1) return null;
  // const _board = { id, ...board };
  // boards[index] = _board;
  // return Board.toResponse(_board);
  const _board = (await Board.updateOne({ _id: id }, board)).ok;
  return _board === 1 ? Board.toResponse(board) : null;
};

const deleteBoard = async id => {
  // const index = boards.findIndex(item => item.id === id);
  // if (index === -1) return null;
  // boards.splice(index, 1);
  // // tasks.forEach(task => {
  // //   if (task.boardId === id) tasksService.deleteTask(id, task.id);
  // // });
  // return id;

  // const tasks = await tasksService.getAll(id);
  // tasks.forEach(task => {
  //   if (task.boardId === id) tasksService.deleteTask(id, task.id);
  // });
  const isDeleted = (await Board.deleteOne({ _id: id })).ok;
  return isDeleted;
};

module.exports = { getAll, getBoard, addNewBoard, updateBoard, deleteBoard };
