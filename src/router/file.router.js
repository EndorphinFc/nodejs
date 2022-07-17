const Router= require ('koa-router')


const fileRouter = new Router({prefix:'/uploads'})

const {verifyAuth} =require ('../middleware/auth.middleware')
const { avatarHandler, pictureHandler ,pictureResize} =require( '../middleware/file.middleware')
const {savaAvatarInfo,savaPictureInfo} =require('../controller/file.controller')
fileRouter.post('/avatar',verifyAuth,avatarHandler,savaAvatarInfo)//上传图片,存储图片到数据库中
fileRouter.post('/picture',verifyAuth,pictureHandler,pictureResize,savaPictureInfo)
module.exports = fileRouter




