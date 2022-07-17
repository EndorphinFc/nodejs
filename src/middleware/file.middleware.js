const Multer = require('koa-multer')
const Jimp = require('jimp')
const path =require('path')
const {AVATAR_PATH,PICTURE_PATH} = require('../constants/file-path')
const avatarUpload = Multer({
  dest:AVATAR_PATH
})
const avatarHandler = avatarUpload.single('avatar')

const pictureUpload = Multer({
  dest:PICTURE_PATH
})
const pictureHandler = pictureUpload.array('picture',9)

const pictureResize = async (ctx,next)=>{
  // 1.获取所有图像信息
  const files = ctx.req.files;
  // 2.对图像进行处理(sharp(path).resize库 /jimp库)
  for(let file of files){
    const destPath = path.join(file.destination,file.filename)
    Jimp.read(file.path).then(image=>{//返回一个promise不希望阻塞直接then处理，image是一个对象
      image.resize(1280,Jimp.AUTO).write(`${destPath}-large`)//根据宽度调整高度
      image.resize(640,Jimp.AUTO).write(`${destPath}-middle`)//根据宽度调整高度
      image.resize(320,Jimp.AUTO).write(`${destPath}-small`)//根据宽度调整高度
      
    })
  }
  await next()
}
module.exports = {avatarHandler,pictureHandler,pictureResize}