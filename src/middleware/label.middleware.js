const labelService = require('../service/label.service');

const verifyLabelExists = async (ctx, next) => {

  // 1. 取出所有标签
  const { labels } = ctx.request.body;

  // 2. 判断每一个标签在 label 表中是否存在
  const newLabels = [];
  for (const name of labels) {
    const labelResult = await labelService.getLabelByName(name);
    const label = { name };
    if (!labelResult) { //如果标签不存在
      // 创建标签数据
      const result = await labelService.create(name);
      label.id = result.insertId;
    } else {
      label.id = labelResult.id;
    }
    newLabels.push(label);
  }
  // 存入 ctx 给下一个中间件使用
  ctx.labels = newLabels;

  await next();
}

module.exports = {
  verifyLabelExists
}