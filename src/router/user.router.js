const Router = require('koa-router');
const userRouter = new Router({prefix:'/users'});
const {
    create
} = require('../controller/user.conroller');

userRouter.post('/', create);

module.exports = userRouter;