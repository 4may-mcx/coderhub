const { reset } = require('nodemon');
const service = require('../service/moment.service');

class MomentController {
  async create(ctx, next) {
    ctx.body = '发表动态成功~';
    // 1. 获取数据（user_id, content）
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    // 2. 将数据插入到数据库中
    const result = await service.create(userId, content);
    ctx.body = result;
  }

  async detail(ctx, next) {
    const momentId = ctx.params.momentId;
    const result = await service.getMomentById(momentId);
    ctx.body = result;
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query;
    const result = await service.getUserByList(offset, size);
    ctx.body = result;
  }

  async update(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    const origin = await service.getMomentById(momentId);
    const result = await service.update(content, momentId);

    ctx.body = {
      state: '评论修改成功',
      origin: origin.content,
      updated: content,
      result: result
    };
  }
}

module.exports = new MomentController();