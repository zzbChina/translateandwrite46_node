const dbConfig = require('../connectDB/conn')

//请求所有写作材料数据
getAllWrite = (req,res)=>{
    let sql = 'select * from writes'
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

//提交自己的写作数据答案
submitUserWrite = (req,res)=>{
    let {uw_writeId,uw_title,user_nickname,user_phone,uw_content,uw_time} = req.body
    let sql = 'insert into user_write set uw_writeId=?,uw_title=?,user_nickname=?,user_phone=?,uw_content=?,uw_time=?'
    let sqlArr = [uw_writeId,uw_title,user_nickname,user_phone,uw_content,uw_time]
    let callback = (err)=>{
        if(err){
            console.log(err)
        }else{
            res.send('ok')
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//查看对应写作材料的用户作品
checkUserWrite = (req,res)=>{
    let {uw_writeId} = req.query
    let sql = 'select * from user_write where uw_writeId=?'
    let sqlArr = [uw_writeId]
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.send(data)
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}


module.exports ={
    getAllWrite,
    submitUserWrite,
    checkUserWrite
}