const fs = require('fs');

const useRoutes = function () {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return;
    const router = require(`./${file}`);
    // 相当于 app.use()
    this.use(router.routes());
    this.use(router.allowedMethods);
  })
}

module.exports = useRoutes;