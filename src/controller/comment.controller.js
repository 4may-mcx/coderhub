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
}

module.exports = new CommentController();