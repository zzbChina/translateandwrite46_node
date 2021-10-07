const express = require('express')

const router = express.Router()

let translate = require('../interface/translate')
//获取所有翻译数据
router.get('/getAllTranslates',translate.getAllTranslates)

//提交用户自己的翻译数据
router.post('/submitUserTranslate',translate.submitUserTranslate)

//查看对应翻译材料的用户提交答案
router.get('/checkUserTranslate',translate.checkUserTranslate)

//查看当前翻译材料用户点赞状态
router.get('/checkUserLikeStatus',translate.checkUserLikeStatus)

//
router.get('/checkThisLikeStatus',translate.checkThisLikeStatus)

//获取所有cet4的翻译结果
router.get('/getAllCet4Translates',translate.getAllCet4Translates)

//获取所有cet6的翻译结果
router.get('/getAllCet6Translates',translate.getAllCet6Translates)

//暴露资源
module.exports = function(){
    return router
}