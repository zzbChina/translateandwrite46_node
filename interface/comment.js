const dbConfig = require('../connectDB/conn')

//添加我的评论
addMyComment = (req,res)=>{
    let {user_phone,user_nickname,user_comment,target_id,target_title,target_phone,target_nickname,comment_time,type} = req.body
    let sql = 'insert into user_comments set ?'
    let sqlArr = {user_phone,user_nickname,user_comment,target_id,target_title,target_phone,target_nickname,comment_time,type}
    let callback = (err)=>{
        if(err){
            console.log(err)
        }else{
            res.send('ok')
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//获取所有用户答案数据
getAllUserComments = (req,res)=>{
    let {target_id,type} = req.query
    //获取目标id对应的评论，且类型为translate
    let sql = 'select * from user_comments where target_id=?&&type=?'
    let sqlArr = [target_id,type]
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            if(data != ''){
                res.send(data)
            }else{
                res.send('no')
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//获取所有关于我的评论
getAllAboutMeComment = (req,res)=>{
    let {target_phone} = req.body
    let sql  = 'select * from user_comments where target_phone=?'
    let sqlArr = [target_phone]
    let callback =(err,data)=>{
        if(err){
            console.log(err)
        }else{
            if(data != ''){
                res.send(data)
            }else{
                res.send('no')
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//获取所有我对别人的评论
getAllAboutMyCommentOthers = (req,res)=>{
    let {user_phone} = req.body
    let sql = 'select * from user_comments where user_phone=?'
    let sqlArr = [user_phone]
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            if(data == ''){
                let info = {
                    code : 404,
                    data : ''
                }
                res.send(info)
            }else{
                let info = {
                    code : 200,
                    data : data
                }
                res.send(info)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//删除一条我的评论
deleteMyComment = (req,res)=>{
    let {id,user_phone} = req.body
    let sql = 'delete from user_comments where id=? and user_phone=?'
    let sqlArr = [id,user_phone]
    let callback = (err)=>{
        if(err){
            let info = {
                code : 500,
                data : 'no',
                status : false
            }
            res.send(info)
            console.log(err)
        }else{
            let info = {
                code : 200,
                data:'ok',
                status: true
            }
            res.send(info)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//暴露资源
module.exports = {
    addMyComment,
    getAllUserComments,
    getAllAboutMeComment,
    getAllAboutMyCommentOthers,
    deleteMyComment
}