const dbConfig = require('../connectDB/conn')

//检查是否已经关注过该作者
checkFollowedAlready = (req,res)=>{
    let {user_phone,fans_phone} = req.body
    let sql = 'select * from user_fans where user_phone=? && fans_phone=?'
    let sqlArr = [user_phone,fans_phone]
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            if(data == ''){
                let info = {
                    code : 404,
                    data : '',
                    status : false
                }
                res.send(info)
            }else{
                let info = {
                    code : 200,
                    data : data,
                    status : true
                }
                res.send(info)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//查看的我关注
checkMyFollowUser = (req,res)=>{
    let {fans_phone} = req.body
    let sql = 'select * from user_fans where fans_phone=?'
    let sqlArr = [fans_phone]
    let callback = (err,data)=>{
        if(err){
            let info = {
                code : 500,
                data : '',
                status : false
            }
            res.send(info)
            console.log(err)
        }else{
            let info = {
                code : 200,
                data : data,
                status : true
            }
            res.send(info)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback) 
}

//进入粉丝主页，然后获取该粉丝的信息
intoFansIndex = (req,res)=>{
    let {user_phone} = req.body
    let sql = 'select * from user where user_phone=?'
    let sqlArr = [user_phone]
    let callback = (err,data)=>{
        if(err){
            console.log('it fail in 1')
            console.log(err)
        }else{
            if(data == ''){
                let info = {
                    code : 404,
                    data : '',
                    status : false
                }
                res.send(info)
            }else{
                let sql = 'select * from user_translate where user_phone=?'
                let sqlArr = [user_phone]
                let callback = (err,translate)=>{
                    if(err){
                        console.log('it fail in 2')
                        console.log(err)
                    }else{
                        let sql = 'select * from user_write where user_phone=?'
                        let sqlArr = [user_phone]
                        let callback = (err,write)=>{
                            if(err){
                                console.log('it fail in 3')
                                console.log(err)
                            }else{
                                let info = {
                                    code : 200,
                                    data : {
                                        user : data,
                                        translates : translate,
                                        writes : write
                                    },
                                    status:true
                                }
                                res.send(info)
                            }
                        }
                        dbConfig.sqlConnect(sql,sqlArr,callback)
                    }
                }
                dbConfig.sqlConnect(sql,sqlArr,callback)
                
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//取消关注
cancelFollowedUser = (req,res)=>{
    let {user_phone,fans_phone} = req.body
    let sql = 'delete from user_like where user_phone=? and fans_phone=?'
    let sqlArr = [user_phone,fans_phone]
    let callback = (err)=>{
        if(err){
            let info = {
                code : 500,
                data : '',
                status : false
            }
            res.send(info)
            console.log(err)
        }else{
            let info = {
                code : 200,
                data : 'ok',
                status : true
            }
            res.send(info)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//暴露资源
module.exports = {
    checkFollowedAlready,
    checkMyFollowUser,
    intoFansIndex,
    cancelFollowedUser
}