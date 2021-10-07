const express = require('express')
const router = express.Router()

let write = require('../interface/write')

router.get('/getAllWrite',write.getAllWrite)

//提交自己的写作数据答案
router.post('/submitUserWrite',write.submitUserWrite)

//查看对应写作材料的用户作品
router.get('/checkUserWrite',write.checkUserWrite)

//暴露资源
module.exports = function(){
    return router
}