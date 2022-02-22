const Koa = require('koa');
// koa-bodyparser 需要另外安装
const bodyParser = require('koa-bodyparser');

const userRouter = require('../router/user.router')

const app = new Koa();

// 才能解析 body 数据
app.use(bodyParser());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());


module.exports = app;