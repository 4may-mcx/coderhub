const Router = require('koa-router');

const authRouter = new Router();

const {
  login
} = require('../controller/auth.conroller');
const {
  verifyLogin
} = require('../middleware/auth.middleware');

authRouter.post('/login', verifyLogin, login);

module.exports = authRouter;