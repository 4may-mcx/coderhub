const { reset } = require('nodemon');
const serve = require('../service/moment.serve');

class MomentController {
  async create(ctx, next) {
    ctx.body = '发表动态成功~';
    // 1. 获取数据（user_id, content）
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    // 2. 将数据插入到数据库中
    const result = await serve.create(userId, content);
    ctx.body = result;
  }

  async detail(ctx, next) {
    const momentId = ctx.params.momentId;
    const result = await serve.getMomentById(momentId);
    ctx.body = result;
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query;
    const result = await serve.getUserByList(offset, size);
    ctx.body = result;
  }
}

module.exports = new MomentController();