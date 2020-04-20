// const boardsRepo = require('./boards.memory.repository');
const boardsRepo = require('./boards.db.repository');

const getAll = async () => await boardsRepo.getAll();
const getBoard = async id => await boardsRepo.getBoard(id);
const addNewBoard = async data => await boardsRepo.addNewBoard(data);
const updateBoard = async (id, board) =>
  await boardsRepo.updateBoard(id, board);
const deleteBoard = async id => await boardsRepo.deleteBoard(id);

module.exports = { getAll, getBoard, addNewBoard, updateBoard, deleteBoard };
