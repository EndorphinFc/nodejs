const app=require('./app')//把中间键写在app.js中
require('./app/database')
const config=require('./app/config')//dotenv 存储拿取


app.listen(config.APP_PORT,()=>{
  console.log(`服务器${config.APP_PORT}端口启动成功`);
})
