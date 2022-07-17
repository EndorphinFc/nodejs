const fs =require('fs')
const fileService = require('../service/file.service.js');
const momentService = require('../service/moment.service.js')
const {PICTURE_PATH} = require('../constants/file-path')
class MomentController{
   async create(ctx,next) {
      // 1.获取数据（user_id,content,图片)
      const userId = ctx.user.id//前面验证登录时，jwt的result赋值给了user
      const content = ctx.request.body.content
      // 2.将数据插入到数据库
      const result = await momentService.create(userId,content)
      ctx.body = result;
   }  
   async detail(ctx,next){
      
      // 1.获取数据，拿到id
      const momentId = ctx.params.momentId
      
      // 2.根据id拿到数据
      const result = await momentService.getMomentById(momentId)

      ctx.body=result
   }
   async list(ctx,next){
      // 获取数据（offset/size)
      const {offset,size} = ctx.query;
      // 2.查询列表
      const result = await momentService.getMomentList(offset,size)
      
      ctx.body = result
   }
   async update(ctx,next){
     
      const {momentId} = ctx.params
      const {content} = ctx.request.body
      
      // 2.修改内容
      
      const result = await momentService.update(content, momentId)
      ctx.body = result
   }
   async remove(ctx,next){
      //1.获得momentId
      const {momentId} =ctx.params

      // 2.删除内容
      const result =await momentService.remove(momentId)
      ctx.body =result
   }
   async addLabels(ctx,next){
      const {labels} =ctx
      const {momentId} = ctx.params
      ctx.body = '添加所有标签'

      // 添加所有标签
      for(let label of labels){
         // 2.1判断标签是否和动态有关系
         const isExist = await momentService.hasLabel(momentId,label.id)
         if(!isExist){
            await momentService.addLabel(momentId,label.id)
         }
      }
      ctx.body='给动态添加标签成功'
   }
   async fileInfo(ctx,next){
      // 获取图片信息
      let {filename } = ctx.params
      const fileInfo = await fileService.getFileByFilename(filename)
      const {type} = ctx.query;
      const types = ['small','middle','large']
      if (types.some(item => item===type)) {
         filename = filename +'-'+type
      }
      console.log(filename);
      ctx.response.set('content-type',fileInfo.mimetype)
      
      ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`) 
   }
}

module.exports = new MomentController()