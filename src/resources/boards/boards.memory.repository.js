const { boards, pushBoard } = require('../../database/boards');
const Board = require('./boards.model');
const Column = require('./column.model');

const getAll = async () => {
  const _boards = boards.map(Board.toResponse);
  return _boards;
};

const getBoard = async id => {
  const _board = boards.find(item => item.id === id);
  return _board;
};

const addNewBoard = async board => {
  const { columns } = board;
  const _columns = !!columns ? columns.map(item => new Column(item)) : [];
  const _board = new Board({ ...board, columns: _columns });
  pushBoard(_board);
  return _board;
};

const updateBoard = (id, board) => {
  console.log('board: ', board);
  const index = boards.findIndex(item => item.id === id);
  if (index === -1) return null;
  const _board = { id, ...board };
  boards[index] = _board;
  return Board.toResponse(_board);
};

const deleteBoard = id => {
  const index = boards.findIndex(item => item.id === id);
  if (index === -1) return null;
  boards.splice(index, 1);
  return id;
};

module.exports = { getAll, getBoard, addNewBoard, updateBoard, deleteBoard };
