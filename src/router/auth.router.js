const Router = require('koa-router');

const authRouter = new Router();

const {
  login
} = require('../controller/auth.conroller');

authRouter.post('/login', login);

module.exports = authRouter;