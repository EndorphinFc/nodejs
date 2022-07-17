const Koa = require('koa')
const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const app = new Koa()

const testRouter = new Router()

// 公钥和私钥
const PRIVATE_KEY = fs.readFileSync('../key/private.key')
const PUBLIC_KEY = fs.readFileSync('../key/public.key')

testRouter.post('/test', (ctx,next)=>{
  const user = {id:110,name:'why'}
  const token = jwt.sign(user,PRIVATE_KEY,{
    expiresIn:10,
    // 指定算法 --默认hs265
    // 我们用rs256
    algorithm:'RS256'
  })
  ctx.body = token
})
testRouter.get('/demo',(ctx,next)=>{
  const authorization = ctx.headers.authorization;
  const token = authorization.replace('Bearer ','')

  try {
    const res = jwt.verify(token,PUBLIC_KEY,{
      algorithms:['RS256']
    })
    ctx.body=res
  } catch (error) {
    console.log(error.message);
    ctx.body = '?'
  }
})

app.use(testRouter.routes())
app.use(testRouter.allowedMethods())

app.listen(8010,()=>{
  console.log('启动成功');
})