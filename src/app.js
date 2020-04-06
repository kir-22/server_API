const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const bodyParser = require('body-parser');
const boardsRouter = require('./resources/boards/boards.router');
const taskRouter = require('./resources/tasks/tasks.router');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
// express.use().use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardsRouter);
app.use('/boards', taskRouter);

module.exports = app;
