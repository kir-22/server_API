const router = require('express').Router();
const tasksService = require('./tasks.service');
const Task = require('./tasks.model');

router.get('/:boardId/tasks', async (req, res) => {
  if (!req.params.boardId) {
    return res.status(404).json({
      message: 'Request error!',
      code: res.statusCode
    });
  }
  console.log(req.params.boardId);
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});

router.get('/:boardId/tasks/:taskId', async (req, res) => {
  const { boardId, taskId } = req.params;
  if (!boardId || !taskId) {
    return res.status(404).json({
      message: 'Request error!',
      code: req.statusCode
    });
  }
  const task = await tasksService.getTask(boardId, taskId);
  if (!task) {
    return res.status(404).json({
      message: 'Not found!',
      code: res.statusCode
    });
  }
  res.json(Task.toResponse(task));
});

router.post('/:boardId/tasks', async (req, res) => {
  if (!req.params.boardId) {
    return res.status(404).json({
      message: 'Request error!',
      code: res.statusCode
    });
  }
  const task = await tasksService.addNewTask(req.params.boardId, req.body);
  res.json(Task.toResponse(task));
});

router.put('/:boardId/tasks/:taskId', async (req, res) => {
  const { boardId, taskId } = req.params;
  if (!boardId || !taskId) {
    return res.status(404).json({
      message: 'Request error!',
      code: req.statusCode
    });
  }
  const task = await tasksService.updateTask(boardId, taskId, req.body);
  if (!task) {
    return res.status(404).json({
      message: 'Not found!',
      code: res.statusCode
    });
  }
  res.json(Task.toResponse(task));
});

router.delete('/:boardId/tasks/:taskId', async (req, res) => {
  const { boardId, taskId } = req.params;
  // console.log('boardId, taskId: ', boardId, taskId);
  if (!boardId || !taskId) {
    return res.status(404).json({
      message: 'Task not found!',
      code: req.statusCode
    });
  }
  const isDelete = await tasksService.deleteTask(boardId, taskId);
  if (!isDelete) {
    return res
      .status(404)
      .json({ message: 'Task not found', code: res.statusCode });
  }

  res.status(204).send('The board has been deleted');
});

module.exports = router;
