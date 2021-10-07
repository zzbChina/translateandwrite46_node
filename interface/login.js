const dbConfig = require('../connectDB/conn')
let md5 = require('md5')

//注册接口
register = (req,res)=>{
    let user_phone = req.body.user_phone
    let sql = 'select * from user where ?'
    let sqlArr = {user_phone}
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            if(data != ''){
                console.log('该号码已被注册')
                res.send('this phone was registered')
            }else{
                let user_nickname = req.body.user_nickname
                let user_password = md5(req.body.user_password)
                let register_time = req.body.register_time
                let sql = 'insert into user set user_phone=?,user_nickname=?,user_password=?,register_time=?'
                let sqlArr = [user_phone,user_nickname,user_password,register_time]
                let callback = (err)=>{
                    if(err){
                        console.log('注册信息写入失败')
                    }else{
                        res.send('registered successfully')
                    }
                }
                dbConfig.sqlConnect(sql,sqlArr,callback)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}
//登录接口
login = (req,res)=>{
    let user_phone = req.body.user_phone
    let sql = 'select * from user where ?'
    let sqlArr = {user_phone}
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            if(data != ''){
                let user_password = md5(req.body.user_password)
                if(data[0].user_password == user_password){
                    let sql = 'update user set user_status="true" where user_phone=?'
                    let sqlArr = [user_phone]
                    let callback = (err)=>{
                        if(err){
                            console.log(err)
                        }else{
                            console.log('用户登录成功')
                        }
                    }
                    dbConfig.sqlConnect(sql,sqlArr,callback)
                    //种下一个持久cookie,由于cookie问题容易遭到攻击和法律问题，所以暂时不引入
                    // res.cookie('user_account',data[0].user_phone,{maxAge : 1000 * 60 * 5})
                    res.send(data)
                }else{
                    res.send('password is wrong')
                }
                
            }else{
                res.send('where not have this account')
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}
demo = (req,res)=>{
    res.send(req.body)
}

//退出当前用户
exitAccount = (req,res)=>{
    let {user_phone} = req.body
    let sql = 'update user set user_status="false" where user_phone=?'
    let sqlArr = [user_phone]
    let callback = (err)=>{
        if(err){
            console.log(err)
        }else{
            res.send('ok')
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//向外暴露接口
module.exports = {
    register,
    login,
    demo,
    exitAccount
}