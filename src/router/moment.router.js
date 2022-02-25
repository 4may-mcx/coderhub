const Router = require('koa-router');

const momentRouter = new Router();

const {
  create
} = require('../controller/moment.controller')
const {
  verifyAuth
} = require('../middleware/auth.middleware')

momentRouter.get('/moment', verifyAuth, create);


module.exports = momentRouter;