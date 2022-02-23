const Router = require('koa-router');
const userRouter = new Router({prefix:'/users'});
const {
    create
} = require('../controller/user.conroller');
const {
    verifyUser,
    handlePassword
} = require('../middleware/user.middleware');


userRouter.post('/', verifyUser, handlePassword, create);

module.exports = userRouter;