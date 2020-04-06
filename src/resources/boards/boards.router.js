const router = require('express').Router();
const boardsService = require('./boards.service');
const Board = require('./boards.model');

router.get('/', async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.get('/:boardId', async (req, res) => {
  const board = await boardsService.getBoard(req.params.boardId);
  if (!board) {
    return res.status(404).json({
      message: 'Board not found',
      code: res.statusCode
    });
  }
  res.json(board);
});

router.post('/', async (req, res) => {
  const _board = await boardsService.addNewBoard(req.body);
  if (!_board) {
    return res.status(400).json({
      message: 'Request error!',
      code: res.statusCode
    });
  }
  res.json(_board);
});

router.put('/:boardId', async (req, res) => {
  if (!req.params.boardId) {
    return res.status(400).json({
      message: 'Request error',
      code: res.statusCode
    });
  }
  const _board = await boardsService.updateBoard(req.params.boardId, req.body);
  if (!_board) {
    return res.status(400).json({
      message: 'Request error',
      code: res.statusCode
    });
  }
  res.json(_board);
});

router.delete('/:boardId', async (req, res) => {
  if (!req.params.boardId) {
    return res
      .status(404)
      .json({ message: 'Board not found', code: res.statusCode });
  }
  const isDelete = await boardsService.deleteBoard(req.params.boardId);
  if (!isDelete) {
    return res
      .status(404)
      .json({ message: 'Board not found', code: res.statusCode });
  }
  res.status(204).send('The board has been deleted');
});

module.exports = router;
