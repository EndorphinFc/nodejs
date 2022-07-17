const Router = require('koa-router')

const momentRouter = new Router({prefix:'/moment'})

const {create , detail, list, update, remove, addLabels, fileInfo} =require('../controller/moment.controller')

const  { verifyAuth,verifyPermission} = require('../middleware/auth.middleware')

const {verifyLabelExists} = require('../middleware/label.middleware')
momentRouter.post('/',verifyAuth,create) //登录了才能评论
momentRouter.get('/',list)//多条选取动态列表
momentRouter.get('/:momentId',detail)//单条选取动态

momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update) 
momentRouter.delete('/:momentId',verifyAuth,verifyPermission,remove) 

// 添加标签
momentRouter.post('/:momentId/labels',verifyAuth,verifyPermission,verifyLabelExists,addLabels)

// 动态配图
momentRouter.get('/images/:filename',fileInfo)
module.exports = momentRouter;