//引入express框架
const express = require('express')
//实例化express框架对象
const app = express()
//引入body-parser中间件，解决post请求参数问题
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

//引入cors解决跨域
const cors = require('cors')
// 开发环境设置，生产环境需要配置安全的参数
app.use(cors());
//引入cookie库
let cookieParser = require('cookie-parser')
//使用cookie库
app.use(cookieParser())

//后端路由引入区
const loginRouter = require('./router/loginRouter') //注册板块路由
const offerRouter = require('./router/offerRouter')//提交offer路由数据
const translateRouter = require('./router/translateRouter')//翻译路由
const writeRouter = require('./router/writeRouter')//写作路由
const individualRouter = require('./router/individualRouter') //个人面板路由
const userRouter = require('./router/userRouter')//引入用户路由

//使用后端路由中间件
app.use(loginRouter())
app.use(offerRouter())
app.use(translateRouter())
app.use(writeRouter())
app.use(individualRouter())
app.use(userRouter())

//引入前端静态页面
app.use(express.static(__dirname+'/static'))

//读取客户端过来的cookie，由于cookie问题可能设计到的安全问题和法律问题，所以当前页面不引入cookie等
// app.get('/cookie',(req,res)=>{
    // if(req.cookies.value != ''){
    //     let info = {
    //         code :200,
    //         cookie : req.cookies,
    //         status : true
    //     }
    //     res.send(info)
    //     console.log(req.cookies.value)
    // }else{
    //     let info = {
    //         code:404,
    //         cookie:'',
    //         status:false
    //     }
    //     res.send(info)
    // }
//     res.send(req.cookies)
//     console.log(req.cookies)
// })

//服务器监听端口
app.listen(8000,(err)=>{
    if(err){
        console.log('项目启动失败')
    }else{
        console.log(`项目启动成功 
        网络：http://10.8.236.179:8000/ 
        本地：http://localhost:8000/`)
    }
})