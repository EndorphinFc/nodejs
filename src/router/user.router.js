// 抽取路由相关信息
const Router=require('koa-router')

const userRouter=new Router({prefix:'/users'})//controller里面

const {create,avatarInfo}=require('../controller/user.controller')
const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middleware')


userRouter.post('/',verifyUser,handlePassword,create)//在创建用户之前要验证用户输入是否符合格式
userRouter.get('/:userId/avatar',avatarInfo)
module.exports=userRouter



