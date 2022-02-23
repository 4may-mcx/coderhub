const errorTypes = require('../constants/error-types')

const errorHandler = (error, ctx) => {
  let status, message;
  // console.log(error.message);

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; // bad request
      message = "用户名或者密码不能为空";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409; // conflict
      message = "用户名已存在";
      break;
    case errorTypes.USER_NOT_EXISTS:
      status = 400;
      message = "用户不存在";
      break;
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400;
      message = "密码错误";
      break;

    default:
      status = 404;
      message = "NOT FOUND";
  }
  ctx.status = status;
  ctx.body = message;
}

module.exports = errorHandler;