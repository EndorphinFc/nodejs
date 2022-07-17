# 基本框架搭建

1. 目录划分
2. app，controller，service, utill

main.js 项目入口
app：全局相关
control：控制器
service数据库操作相关
utill：工具
middleware：中间键
constants:常量，error用常量是方便他处理
3. dotenv库 把环境变量.env 中APP.PORT弄到框架中

# 用户注册接口

# 连接数据库

# cookie

小甜饼，小型电脑文本文件，某些网站用于  辨认用户而存储在本地终端上的数据

内存cookie（浏览器关闭【默认】）和硬盘cookie（具有过期时间，关闭时cookie就会消失）

判断：是否设置不为0或负数的过期时间

客户端cookie ：document.cookie='key=a'

服务器端 ctx.cookies.get(name, [options])
ctx.cookies.set(name, value, [options])

# session

基于cookie 不能在客户端设置

安装库 koa-session









