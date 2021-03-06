const Router = require('koa-router');

const momentRouter = new Router({ prefix: '/moment' });

const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
  fileInfo
} = require('../controller/moment.controller')
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')
const {
  verifyLabelExists
} = require('../middleware/label.middleware')

momentRouter.post('/', verifyAuth, create);
momentRouter.get('/:momentId', detail);
momentRouter.get('/', list);

// 修改与删除
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove);

// 添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels)

// 获取图像资源
momentRouter.get('/images/:filename', fileInfo)

module.exports = momentRouter;