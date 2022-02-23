const errorType = require('../constants/error-types')

const errorHandler = (error, ctx) => {
  let status, message;

  console.log(error.message);
  switch (error.message){
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; // bad request
      message = "用户名或者密码不能为空";
      break;
    case errorType.USER_ALREADY_EXISTS:
      status = 409; // conflict
      message = "用户名已存在";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }
  ctx.status = status;
  ctx.body = message;
}

module.exports = errorHandler;