const router = require('express').Router();
const loginService = require('./login.service');

router.post('/', async (req, res) => {
  const user = req.body;
  const token = await loginService.getToken(user);
  if (!token) {
    return res.status(403).json({
      message: 'FORBIDDEN! INCORRECT_LOGIN_OR_PASSWORD',
      statusCode: res.statusCode
    });
  }
  res.status(200).json({ token });
});

module.exports = router;
