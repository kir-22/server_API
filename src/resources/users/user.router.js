const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUser(req.params.id);
  // console.log('user: ', user);
  if (!user) {
    return res.status(404).json({
      error: 'Пользователь ненайден',
      status: res.statusCode
    });
    // return res.status(404).end();
  }
  res.json(User.toResponse(user));
});

router.post('/', async (req, res, next) => {
  const { name, login, password } = req.body;
  if (!!name && !!login && !!password) {
    const user = await usersService.addUser(req.body);
    // console.log('user: ', user);
    return res.json(user);
  }
  next({ message: 'Request Error', code: 400 });
});

router.put('/:userId', async (req, res) => {
  // console.log('req.body: ', req.body);
  // console.log('req.params: ', req.params);
  const { userId } = req.params;
  if (!userId) {
    return res
      .status(400)
      .json({ message: 'Request error', code: res.statusCode });
  }
  const user = await usersService.updateUser(userId, req.body);
  if (!user) {
    return res
      .status(400)
      .json({ message: 'Request error', code: res.statusCode });
  }
  res.json(user);
});

router.delete('/:userId', async (req, res) => {
  if (!req.params.userId) {
    return res
      .status(404)
      .json({ message: 'User not found', code: res.statusCode });
  }
  const isDelete = await usersService.onDeleteUser(req.params.userId);
  if (!isDelete) {
    return res
      .status(404)
      .json({ message: 'User not found', code: res.statusCode });
  }
  res.status(204).send('The user has been deleted');
});

module.exports = router;
