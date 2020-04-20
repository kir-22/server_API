// const boardsRepo = require('./boards.memory.repository');
const boardsRepo = require('./boards.db.repository');

const getAll = () => boardsRepo.getAll();
const getBoard = id => boardsRepo.getBoard(id);
const addNewBoard = data => boardsRepo.addNewBoard(data);
const updateBoard = (id, board) => boardsRepo.updateBoard(id, board);
const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = { getAll, getBoard, addNewBoard, updateBoard, deleteBoard };
