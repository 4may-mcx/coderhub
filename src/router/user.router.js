const Router = require('koa-router');
const userRouter = new Router({prefix:'/users'});
const {
    create
} = require('../controller/user.conroller');
const {
    verifyUser
} = require('../middleware/user.middleware');


userRouter.post('/', verifyUser, create);

module.exports = userRouter;