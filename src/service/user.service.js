const connections = require('../app/database')

class UserService{
  async create(user){
    
    const {name,password} = user

    // console.log(` 将user存储到数据库中`,user);

    const statement = `INSERT INTO users (name,password) VALUES(?,?)`

    const result = await connections.execute(statement,[name,password])
    return result[0]
  }
  async getUserByName(name){
    const statement = 'SELECT * FROM users WHERE name = ?;'
    const result = await connections.execute(statement,[name])
   
    return result[0]
    
  }
  async updateAvatarUrlById(avatar_url,userId){
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?`
    const [result] = await connections.execute(statement,[avatar_url,userId])
    return result
  } 
}
module.exports=new UserService()