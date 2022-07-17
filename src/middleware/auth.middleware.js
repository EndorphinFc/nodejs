const jwt =require('jsonwebtoken')

const service = require('../service/user.service')
const errorType=require ('../constants/error-types.js')
const md5password = require('../utills/password-handle')
const {PUBLIC_KEY} = require('../app/config')
const authService =require('../service/auth.service')
const verifyLogin = async(ctx,next)=>{
  console.log('验证登录');
  // 1.获取用户名和密码
  const {name, password} = ctx.request.body;

  // 2.判断用户名和密码是否为空
   if(!name || !password){
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)//要常量原因是方便逻辑处理
    return ctx.app.emit('error',error,ctx)//发送要事件'error'和参数error与ctx
  }
  // 3.判断用户是否存在
    const result = await service.getUserByName(name);//取得数组对象
    const user = result[0]
    
    if(!user){
      const error = new Error(errorType.USER_DOES_NOT_EXISTS)//要常量原因是方便逻辑处理
      return ctx.app.emit('error',error,ctx)//发送要事件'error'和参数error与ctx
    }
  // 4.判断密码是否和数据库中密码是一致的（加密）
    if(md5password(password) !== user.password){
      const error = new Error(errorType.PASSWORD_IS_INCORRECT)//要常量原因是方便逻辑处理
      return ctx.app.emit('error',error,ctx)//发送要事件'error'和参数error与ctx
    }
    ctx.user =user;

  await next();
}
const verifyAuth = async(ctx,next)=>{
  console.log('验证token许可');
  // 1.获取
  const authorization = ctx.headers.authorization;
  if(!authorization){
    const error =new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error',error,ctx)
  } 
  const token = authorization.replace('Bearer ','')
  // 验证token{id/name/iat/exp}
  try {
    const result = jwt.verify(token,PUBLIC_KEY,{
      algorithms:['RS256'] 
    })
    ctx.user = result
    await next()
  } catch (err) {
    console.log('无效token原因：'+err);
    const error = new Error(errorType.UNAUTHORIZATION);
    return ctx.app.emit('error',error,ctx)

  }
}
const verifyPermission = async (ctx,next)=>{
  // 也可用函数柯里化
  console.log('验证能否修改的权限的middleware~');

  // 1.获取参数
  const [resourceKey] = Object.keys(ctx.params)
  const tableName = resourceKey.replace('Id','')
  const resourceId = ctx.params[resourceKey]
  const { id } = ctx.user
  
  // 2.查询是否具备权限
  try {
    const isPermission = await authService.checkResource(tableName,resourceId,id)
    if (!isPermission) throw new Error()
    await next()
  } catch (err2) {
    console.log(err2);
    const error = new Error(errorType.UNPERMISSION)
    return ctx.app.emit('error',error,ctx)
  }
}
module.exports = {verifyLogin,verifyAuth,verifyPermission}