const service = require('../service/moment.service');
const labelService = require('../service/label.service');
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

  async remove(ctx, next) {
    const { momentId } = ctx.params;
    const result = await service.remove(momentId);
    ctx.body = {
      state: '删除成功',
      result: result
    }
  }

  async addLabels(ctx, next) {
    const { labels } = ctx;
    const { momentId } = ctx.params;

    // 添加所有的标签
    for (const label of labels) {
      // 判断标签是否已经和动态有关系
      const isExist = await labelService.hasLabel(momentId, label.id);
      // 如果不存在就新增关系
      if (!isExist) {
        await labelService.addLabel(momentId, label.id);
      }
    }
    ctx.body = '标签添加成功';
  }
}

module.exports = new MomentController();