const commentService = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const { id } = ctx.user;
    const { content, momentId } = ctx.request.body;

    const result = await commentService.create(id, content, momentId);
    ctx.body = result;
  }
  async reply(ctx, next) {
    const { id } = ctx.user;
    const { content, momentId } = ctx.request.body;
    const { commentId } = ctx.params;

    const result = await commentService.reply(id, content, momentId, commentId);
    ctx.body = result;
  }
  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    // console.log(commentId, content);
    const result = await commentService.update(content, commentId);

    ctx.body = {
      state: '评论修改成功',
      updated: content,
      result: result
    };
  }
  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const result = await commentService.remove(commentId);
    ctx.body = {
      state: '删除成功',
      result: result
    }
  }

  async list(ctx, next) {
    const { momentId } = ctx.query;
    const result = await commentService.getCommentByMomentId(momentId);
    ctx.body = result;
  }
}

module.exports = new CommentController();