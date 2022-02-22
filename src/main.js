const app = require('./app/index');
const config = require('./app/config');


app.listen(config.APP_PORT, () => {
    console.log(`服务已在${config.APP_PORT}端口开启.....`);
})