//引入express模块
const express = require('express')

const router = express.Router()

//引入接口文件
const individual = require('../interface/individual')
//在用户面板请求自己过去发布的的翻译数据
router.post('/getMyTranslateData',individual.getMyTranslateData)

//在用户面板请求自己过去发布的的写作数据
router.post('/getMyWriteData',individual.getMyWriteData)

//更新自己的github的地址
router.post('/updateMyGithubUrl',individual.updateMyGithubUrl)

//更新自己的简介
router.get('/updateMyRecommend',individual.updateMyRecommend)

//关注作者
router.post('/followAuthor',individual.followAuthor)

//查看关注我的粉丝
router.post('/checkMyFans',individual.checkMyFans)

//上传用户头像
router.get('/updateMyHeadImage',individual.updateMyHeadImage)

module.exports = function(){
    return router
}
