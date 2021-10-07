const express = require('express')

const router = express.Router()

let offer = require('../interface/offer')//引入offer接口
let comment = require('../interface/comment') //引入comment接口
let likes = require('../interface/likes') //引入like接口

//提交翻译数据
router.post('/submitTranslate',offer.submitTranslate)

//提交写作数据
router.post('/submitWrite',offer.submitWrite)

//提交我的评论
router.post('/addMyComment',comment.addMyComment)

//获取所有用户答案数据
router.get('/getAllUserComments',comment.getAllUserComments)

//获取所有关于我的评论
router.post('/getAllAboutMeComment',comment.getAllAboutMeComment)

//获取所有我的评论
router.post('/getAllAboutMyCommentOthers',comment.getAllAboutMyCommentOthers)

//获取所有自己点过的赞
router.post('/getAllMyLikeItems',likes.getAllMyLikeItems)

//取消一个点赞
router.get('/cancelThisLike',likes.cancelThisLike)

//提交我的详细数据
router.post('/submitMyDetailData',offer.submitMyDetailData)

//点赞用户答案
router.post('/likeThisAnswer',likes.likeThisAnswer)

//获取所有自己点赞过的翻译信息
router.post('/getAllMyLikeTranslateItems',likes.getAllMyLikeTranslateItems)

//获取所有自己点赞过的写作信息
router.post('/getAllMyLikeWriteItems',likes.getAllMyLikeWriteItems)

//删除一条我的评论
router.post('/deleteMyComment',comment.deleteMyComment)

//暴露资源
module.exports = function(){
    return router
}