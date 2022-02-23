const Koa = require('koa');
// koa-bodyparser 需要另外安装
const bodyParser = require('koa-bodyparser');

const useRoutes = require('../router/index');
const errorHandler = require('./error-handler');


const app = new Koa();
app.useRoutes = useRoutes;
// 才能解析 body 数据
app.use(bodyParser());
// 动态导入路由
app.useRoutes();

// 监听事件
app.on('error', errorHandler);

module.exports = app;