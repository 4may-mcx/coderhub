const Koa = require('koa');
// koa-bodyparser 需要另外安装
const bodyParser = require('koa-bodyparser');

const userRouter = require('../router/user.router');
const authRouter = require('../router/auth.router');
const errorHandler = require('./error-handler');


const app = new Koa();

// 才能解析 body 数据
app.use(bodyParser());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

// 监听事件
app.on('error', errorHandler);

module.exports = app;