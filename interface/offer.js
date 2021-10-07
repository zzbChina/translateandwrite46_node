const dbConfig = require('../connectDB/conn')

//提交翻译数据接口
submitTranslate = (req,res)=>{
    let {t_title,t_level,t_content,t_author,t_time,t_check} = req.body
    let sql = 'insert into translates set t_title=?,t_level=?,t_content=?,t_author=?,t_time=?,t_check=?'
    let sqlArr = [t_title,t_level,t_content,t_author,t_time,t_check]
    let callback = (err)=>{
        if(err){
            console.log(err)
        }else{
            res.send('insert successfully')
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//提交写作数据接口
submitWrite = (req,res)=>{
    let {w_title,w_level,w_content,w_author,w_time,w_check} = req.body
    let sql = 'insert into writes set w_title=?,w_level=?,w_content=?,w_author=?,w_time=?,w_check=?'
    let sqlArr = [w_title,w_level,w_content,w_author,w_time,w_check]
    let callback = (err)=>{
        if(err){
            console.log(err)
        }else{
            res.send('ok')
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//提交我的详细资料
submitMyDetailData = (req,res)=>{
    let {user_nickname,user_email,user_age,user_gender,user_address,user_id} =  req.body
    let sql = 'update user set user_nickname=?,user_email=?,user_age=?,user_gender=?,user_address=? where id=?'
    let sqlArr =  [user_nickname,user_email,user_age,user_gender,user_address,user_id]
    let callback = (err)=>{
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

module.exports = {
    submitTranslate,
    submitWrite,
    submitMyDetailData
}