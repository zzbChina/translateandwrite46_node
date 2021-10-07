const dbConfig = require('../connectDB/conn')

//在用户面板请求自己过去发布的的翻译数据
getMyTranslateData = (req,res)=>{
    let {user_phone} = req.body
    let sql = 'select * from user_translate where user_phone=?'
    let sqlArr = [user_phone]
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            //如果返回的数据为空，给前端返回一个no
            if(data == ''){
                res.send('no')
            }else{
                res.send(data)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//在用户面板请求自己过去发布的的写作数据
getMyWriteData = (req,res)=>{
    let {user_phone} = req.body
    let sql = 'select * from user_write where user_phone=?'
    let sqlArr = [user_phone]
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            if(data == ''){
                res.send('no')
            }else{
                res.send(data)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//更新自己的github的url
updateMyGithubUrl = (req,res)=>{
    let {github_url,user_phone} = req.body
    let sql = 'update user set github_url=? where user_phone=?'
    let sqlArr = [github_url,user_phone]
    let callback = (err)=>{
        if(err){
            console.log(err)
        }else{
            res.send('ok')
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//更新我的简介
updateMyRecommend = (req,res)=>{
    let {user_recommend,user_phone} = req.query
    let sql  = 'update user set user_recommend=? where user_phone=?'
    let sqlArr = [user_recommend,user_phone]
    let callback = (err)=>{
        if(err){
            console.log(err)
        }else{
            res.send('ok')
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}


//关注作者
followAuthor = (req,res)=>{
    let {user_nickname,user_phone,fans_nickname,fans_phone,focus_time} = req.body
    let sql = 'insert into user_fans set ?'
    let sqlArr = {user_nickname,user_phone,fans_nickname,fans_phone,focus_time} 
    let callback = (err)=>{
        if(err){
            console.log(err)
        }else{
            res.send('ok')
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//查看我的粉丝
checkMyFans = (req,res)=>{
    let {user_phone} = req.body
    let sql = 'select * from user_fans where user_phone=?'
    let sqlArr = [user_phone]
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.send(data)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//上传用户头像
updateMyHeadImage = (req,res)=>{
    let {user_headImage,user_phone} = req.query
    let sql = 'update user set user_headImage=? where user_phone=?'
    let sqlArr = [user_headImage,user_phone]
    let callback =(err)=>{
        if(err){
            console.log(err)
        }else{
            let info = {
                code : 200,
                data : 'ok'
            }
            res.send(info)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//暴露资源
module.exports = {
    getMyTranslateData,
    getMyWriteData,
    updateMyGithubUrl,
    updateMyRecommend,
    followAuthor,
    checkMyFans,
    updateMyHeadImage
}