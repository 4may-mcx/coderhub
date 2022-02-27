const Router = require('koa-router');

const labelRouter = new Router({ prefix: '/label' });

const {
  create,
  list
} = require('../controller/label.controller')

labelRouter.post('/', create);
labelRouter.get('/list', list);


module.exports = labelRouter;