const dbConfig = require('../connectDB/conn')

//获取所有自己点过的赞
getAllMyLikeItems = (req,res)=>{
    let {user_phone} = req.body
    let sql  = 'select * from user_like where user_phone=?'
    let sqlArr = [user_phone]
    let callback = (err,data)=>{
        if(err){
            console.log(err)
        }else{
            if(data == ''){
                let info = {
                    code : '500',
                    status : 'false',
                    data : 'no result'
                }
                res.send(info)
            }else{
                let info = {
                    code : 200,
                    status : 'true',
                    data : data
                }
                res.send(info)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//取消某一个点赞
cancelThisLike = (req,res)=>{
    let {user_phone,user_translate_id,user_write_id,type} = req.query
    if(type == 'translate'){
        let sql = 'delete from user_like where user_translate_id=? && user_phone=?'
        let sqlArr = [user_translate_id,user_phone]
        let callback = (err)=>{
            if(err){
                console.log(err)
                let info = {
                    code : 500,
                    data : 'no',
                    status : false
                }
                res.send(info)
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
    }else{
        let sql = 'delete from user_like where user_write_id=? && user_phone=?'
        let sqlArr = [user_write_id,user_phone]
        let callback = (err)=>{
            if(err){
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
}

//点赞用户答案
likeThisAnswer = (req,res)=>{
    let {user_nickname,user_phone,translate_id,user_translate_id,write_id,user_write_id,type} = req.body
    let sql = 'insert into user_like set user_nickname=?,user_phone=?,translate_id=?,user_translate_id=?,write_id=?,user_write_id=?,type=?'
    let sqlArr = [user_nickname,user_phone,translate_id,user_translate_id,write_id,user_write_id,type]
    let callback = (err)=>{
        if(err){
            console.log(err)
        }else{
            res.send('ok')
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//获取所有自己点赞过的翻译信息
getAllMyLikeTranslateItems= (req,res)=>{
    let {user_phone} = req.body
    let sql = 'select user_translate_id from user_like where user_phone=? && type="translate"'
    let sqlArr = [user_phone]
    let callback = (err,translateId)=>{
        if(err){
            console.log(err)
        }else{
            //声明一个数组用于存储sql语句找到的数据,用数组push的方法，将结果一个一个添加在arr身上，最后输出arr
            let arr = []
            for(let i=0;i<translateId.length;i++){
                let sql = 'select * from user_translate where id=?'
                let sqlArr = [parseInt(translateId[i].user_translate_id)]
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
                            arr.push(data)
                            if(arr.length == translateId.length){
                                let info = {
                                    code : 200,
                                    data : arr,
                                    status : true
                                }
                                res.send(info)
                            }
                        }
                    }
                }
                dbConfig.sqlConnect(sql,sqlArr,callback)
            }
            
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//获取所有自己点赞过的写作信息
getAllMyLikeWriteItems = (req,res)=>{
    let {user_phone} = req.body
    let sql = 'select user_write_id from user_like where user_phone=? && type="write" '
    let sqlArr = [user_phone]
    let callback = (err,writeId)=>{
        if(err){
            console.log(err)
        }else{
            let arr = []
            for(let i=0;i<writeId.length;i++){
                let sql = 'select * from user_write where id=?'
                let sqlArr = [writeId[i].user_write_id]
                let callback = (err,data)=>{
                    if(err){
                        console.log(err)
                    }else{
                        if(data == ''){
                            let info = {
                                code : 404,
                                data : '',
                                status : true
                            }
                            res.send(info)
                        }else{
                            arr.push(data)
                            if(arr.length == writeId.length){
                                let info = {
                                    code : 200,
                                    data  : arr,
                                    status : true
                                }
                                res.send(info)
                            }
                        }
                    }
                }
                dbConfig.sqlConnect(sql,sqlArr,callback)
            }
        }
    }
    dbConfig.sqlConnect(sql,sqlArr,callback)
}

//暴露资源
module.exports ={
    getAllMyLikeItems,
    cancelThisLike,
    likeThisAnswer,
    getAllMyLikeTranslateItems,
    getAllMyLikeWriteItems
}