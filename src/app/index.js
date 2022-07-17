// 工具导入
const Koa=require('koa');
const bodyParser=require('koa-bodyparser')
const errorHandler= require('./error-handle')
const useRoutes = require('../router/index')
const app=new Koa();

// 具体处理逻辑放入user.router.js userRouter.post()
app.use(bodyParser())

app.useRoutes = useRoutes

app.useRoutes()//this隐式绑定

app.on('error',errorHandler)
module.exports=app