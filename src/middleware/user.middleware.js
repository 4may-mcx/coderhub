const errorTypes = require('../constants/error-types');
const serve = require('../service/user.service')
const md5password = require('../utils/password-handle')

const verifyUser = async (ctx, next) => {
  // 1. 获取用户名和密码
  const { name, password } = ctx.request.body;

  // 2. 判断用户名或者密码不能为空
  if (!name || !password || name === '' || password === '') {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }

  // 3. 判断这次注册的用户名是没有被注册过的
  const result = await serve.getUserByName(name);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  // 下一个中间件有异步操作，需要等待其全部处理完才能返回
  await next();
}

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
}

module.exports = {
  verifyUser,
  handlePassword
}