const Router = require('koa-router');

const {
  avatarHandler,
  pictureHandler
} = require('../middleware/file.middlerware')

const {
  verifyAuth
} = require('../middleware/auth.middleware');

const {
  saveAvatarInfo,
  savePictureInfo
} = require('../controller/file.controller')

const fileRouter = new Router({ prefix: '/upload' });

fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo)
fileRouter.post('/picture', verifyAuth, pictureHandler, savePictureInfo)


module.exports = fileRouter;