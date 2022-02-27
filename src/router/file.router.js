const Router = require('koa-router');

const {
  avatarHandler
} = require('../middleware/file.middlerware')

const {
  verifyAuth
} = require('../middleware/auth.middleware');

const fileRouter = new Router({ prefix: '/upload' });

fileRouter.post('/avtar', verifyAuth, avatarHandler)


module.exports = fileRouter;