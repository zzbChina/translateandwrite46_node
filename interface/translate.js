const dbConfig = require('../connectDB/conn')

//请求所有翻译数据
getAllTranslates = (req,res)=>{
    let sql = 'select * from translates'
    let sqlArr = []
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.send(data)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//提交自己的翻译数据
submitUserTranslate = (req,res)=>{
    let {ut_translateId,ut_title,user_nickname,user_phone,ut_content,ut_time} = req.body
    let sql = 'insert into user_translate set ut_translateId=?,ut_title=?,user_nickname=?,user_phone=?,ut_content=?,ut_time=?'
    let sqlArr = [ut_translateId,ut_title,user_nickname,user_phone,ut_content,ut_time]
    let callback = (err)=>{
        if(err){
            console.log(err)
        }else{
            res.send('ok')
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//查看对应翻译材料的用户作品
checkUserTranslate = (req,res)=>{
    let {ut_translateId} = req.query
    let sql = 'select * from user_translate where ut_translateId=?'
    let sqlArr = [ut_translateId]
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.send(data)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//检查当前翻译/写作材料用户点赞状态
checkUserLikeStatus = (req,res)=>{
    let {user_phone,translate_id,write_id,type} = req.query
    if(type == 'translate'){
        let sql = 'select user_translate_id from user_like where user_phone=? && translate_id =?'
        let sqlArr = [user_phone,translate_id]
        let callback  =(err,data)=>{
            if(err){
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
    }else{
        let sql = 'select user_write_id from user_like where user_phone=? && write_id =?'
        let sqlArr = [user_phone,write_id]
        let callback  =(err,data)=>{
            if(err){
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
}

//点赞前校验该评论是否已被点赞
checkThisLikeStatus = (req,res)=>{
    let {user_phone,user_translate_id,user_write_id,type} = req.query
    if(type == 'translate'){
        let sql = 'select * from user_like where user_phone=? && user_translate_id=? '
        let sqlArr = [user_phone,user_translate_id]
        let callback = (err,data)=>{
            if(err){
                console.log(err)
            }else{
                if(data == ''){
                    res.send('no')
                }else{
                    res.send('ok')
                }
            }
        }
        dbConfig.sqlConnect(sql,sqlArr,callback)
    }else{
        let sql = 'select * from user_like where user_phone=? && user_write_id=? '
        let sqlArr = [user_phone,user_write_id]
        let callback = (err,data)=>{
            if(err){
                console.log(err)
            }else{
                if(data == ''){
                    res.send('no')
                }else{
                    res.send('ok')
                }
            }
        }
        dbConfig.sqlConnect(sql,sqlArr,callback)
    }
}

//请求所有cet4的翻译数据
getAllCet4Translates = (req,res)=>{
    let sql = 'select * from translates where t_level="cet4" '
    let sqlArr = []
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            if(data == ''){
                let info = {
                    code : 404,
                    data : [],
                    status : 'false'
                }
                res.send(info)
            }else{
                let info = {
                    code : 200,
                    data : data,
                    status : 'true'
                }
                res.send(info)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//请求所有cet6的翻译数据
getAllCet6Translates = (req,res)=>{
    let sql = 'select * from translates where t_level="cet6" '
    let sqlArr = []
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            if(data == ''){
                let info = {
                    code : 404,
                    data : [],
                    status : 'false'
                }
                res.send(info)
            }else{
                let info = {
                    code : 200,
                    data : data,
                    status : 'true'
                }
                res.send(info)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

module.exports ={
    getAllTranslates,
    submitUserTranslate,
    checkUserTranslate,
    checkUserLikeStatus,
    checkThisLikeStatus,
    getAllCet4Translates,
    getAllCet6Translates
}