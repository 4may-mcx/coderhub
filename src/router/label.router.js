const Router = require('koa-router');

const labelRouter = new Router({ prefix: '/label' });

const {
  create
} = require('../controller/label.controller')

labelRouter.post('/', create);

module.exports = labelRouter;