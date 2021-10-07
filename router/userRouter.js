const express = require('express')

const router = express.Router()

let follow = require('../interface/follow');

//检查是否已经关注过该作者
router.post('/checkFollowedAlready',follow.checkFollowedAlready)

//查看我的关注
router.post('/checkMyFollowUser',follow.checkMyFollowUser)

//导入粉丝面板的详细数据
router.post('/intoFansIndex',follow.intoFansIndex)

//取关一个用户
router.post('/cancelFollowedUser',follow.cancelFollowedUser)
//暴露资源
module.exports = function(){
    return router
}