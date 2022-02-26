const errorTypes = require('../constants/error-types');
const userService = require('../service/user.service');
const authService = require('../service/auth.service')
const md5password = require('../utils/password-handle');
const jwt = require('jsonwebtoken');
const { PUBLIC_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
  // 1. 获取用户名和密码
  const { name, password } = ctx.request.body;

  // 2. 判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }

  // 3. 判断用户是否存在
  const result = await userService.getUserByName(name);
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

  ctx.user = user;
  await next();
}

const verifyAuth = async (ctx, next) => {
  console.log("令牌验证middleware工作中.....");
  // 1. 获取token
  // 如果 authorization 不存在，则随便赋一个值进入错误捕获
  const authorization = ctx.headers.authorization || '';
  const token = authorization.replace('Bearer ', '');

  // 2. 验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    });
    // console.log(result); //{ id: 10, name: 'niannian', iat: 1645774547, exp: 1645860947 }
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx);
  }
}

const verifyPermission = async (ctx, next) => {
  console.log("权限验证middleware工作中.....");

  // 1. 获取参数
  const { momentId } = ctx.params;
  const { id } = ctx.user;
  try {
    const isPermission = await authService.checkMoment(momentId, id);
    // 如果 isPermission === false (没有权限) ,就抛出错误
    if (!isPermission) throw new Error();
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNPERMISSION);
    return ctx.app.emit('error', error, ctx);
  }

}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}