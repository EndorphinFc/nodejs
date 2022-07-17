const labelService = require('../service/label.service')
class LabelController{
  async create(ctx,next){
    
    const {name} = ctx.request.body
    const result = await labelService.create(name)
    console.log(result);
    ctx.body = result
  }
  async list(ctx,next){
    const {limit,offset} = ctx.query
    const result =await labelService.getLabels(limit, offset)
    ctx.body = result 
  }
}
module.exports = new LabelController()