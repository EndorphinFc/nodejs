const fs = require('fs')
const service=require('../service/user.service')
const FileService = require('../service/file.service')
const {AVATAR_PATH} = require('../constants/file-path')
//处理逻辑 

class UserController {
  async create(ctx,next){//操作数据库一般是异步操作
    // 1.获取参数
    const user=ctx.request.body
    // 2.查询数据
    const result=await service.create(user)//service里面进行相关操作
    // 3.返回数据
    ctx.body=result;
  }
  async avatarInfo(ctx,next){
    // 1.用户头像是哪一个文件
    const {userId} = ctx.params;
    const avatarInfo = await FileService.getAvatarByUserId(userId)//
    // 提供图像信息
    ctx.response.set('content-type',avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}
module.exports=new UserController()//导出一个对象