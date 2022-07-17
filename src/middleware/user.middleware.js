const errorType=require('../constants/error-types')
const service = require('../service/user.service')
const md5password =require('../utills/password-handle')
// 中间键单独函数会好一点
const verifyUser = async (ctx,next)=>{
  //1.获取用户名和密码
  const {name,password} = ctx.request.body

  //2.判断用户名和密码不能为空
  if(!name || !password){
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)//要常量原因是方便逻辑处理
    return ctx.app.emit('error',error,ctx)//发送要事件'error'和参数error与ctx
  }

  // 3. 判断这次注册的用户名没有注册过--->需要查询数据库
    const result = await service.getUserByName(name);
    
    if(result.length){
      const error = new Error(errorType.USER_ALREADY_EXISTS)//要常量原因是方便逻辑处理
      return ctx.app.emit('error',error,ctx)//发送要事件'error'和参数error与ctx
    }

  await next() //await：在一个中间键有异步操作，需要等下一个中间完成才下一个进行，洋葱模型

}

const handlePassword = async (ctx,next)=>{
  const { password } =ctx.request.body
  ctx.request.body.password=md5password(password)
  await next()
}
module.exports ={
  verifyUser,
  handlePassword
};