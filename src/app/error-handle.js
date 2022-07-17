const errorTypes = require('../constants/error-types')
const errorHandler = (error,ctx)=>{
  let status,message
  switch (error.message){
   
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      
      status = 400 ;//Bad Request
      message = '用户名或者密码不能为空~'
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409 ;//Bad Request
      message = '用户名已经存在'
      break;
    case errorTypes.USER_USER_DOES_NOT_EXISTS:
      status = 409 ;//Bad Request
      message = '用户不存在'
      break;
    case errorTypes.PASSWORD_IS_INCORRECT:
      status = 409 ;//Bad Request
      message = '密码错误'
      break;
    case errorTypes.UNAUTHORIZATION:
      
      status = 401 
      message = '无效token~'
      break;
    case errorTypes.UNPERMISSION:
      
      status = 401 
      message = '无权限~'
      break;
    default:
      status = 404
      message= 'NOT FOUND'
      
    
  }
  ctx.status = status
  ctx.body = message
}
module.exports = errorHandler