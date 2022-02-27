const Router = require('koa-router');

const {
  avatarHandler
} = require('../middleware/file.middlerware')

const {
  verifyAuth
} = require('../middleware/auth.middleware');

const {
  saveAvatarInfo
} = require('../controller/file.controller')

const fileRouter = new Router({ prefix: '/upload' });

fileRouter.post('/avtar', verifyAuth, avatarHandler, saveAvatarInfo)


module.exports = fileRouter;