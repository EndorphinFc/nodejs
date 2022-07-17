const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { AVATAR_PATH} =require('../constants/file-path')
const {APP_HOST,APP_PORT} = require('../app/config')
class FileController{
  async savaAvatarInfo(ctx,next){
    // 1.获取图像相关信息
    const {filename,mimetype,size}= ctx.req.file
    const{id} = ctx.user
    // 2.将图像信息数据保存到数据库中
    const result = await fileService.createAvatar(filename,mimetype,size,id)

    // 3. 将图片地址保存到user表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/USERS/${id}/avatar`
    await userService.updateAvatarUrlById(avatarUrl, id)
    // 4.返回结果
    ctx.body = '上串图像成功'
    
  }
  async savaPictureInfo(ctx,next){
    // 1.获取图像相关信息
    const files = ctx.req.files
    const{id} =ctx.user
    const {momentId} = ctx.query
    // 2.将所有文件信息保存到数据库中
    for (let file of files) {
      const {filename,mimetype,size} = file
      await fileService.createPicture(filename,mimetype,size,id,momentId)
    }

    // 4.返回结果
    ctx.body = '动态上传成功'
    
  }
}

module.exports = new FileController()