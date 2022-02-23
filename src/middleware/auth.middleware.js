const errorTypes = require('../constants/error-types');
const service = require('../service/user.service');
const md5password = require('../utils/password-handle');

const verifyLogin = async (ctx, next) => {
  // 1. 获取用户名和密码
  const { name, password } = ctx.request.body;

  // 2. 判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }

  // 3. 判断用户是否存在
  const result = await service.getUserByName(name);
  const user = result[0];
  // console.log(user);
  if (!user) {
    const error = new Error(errorTypes.USER_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }

  // 4. 判断密码是否和数据库中的密码一致（加密）
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit('error', error, ctx);
  }


  await next();
}

module.exports = {
  verifyLogin
}