//引入express模块
const express = require('express')

const router = express.Router()

let login = require('../interface/login') //引入login接口文件

//注册
router.post('/register',login.register)
router.post('/demo',login.demo)

//登录
router.post('/login',login.login)

//退出用户登录
router.post('/exitAccount',login.exitAccount)

//暴露资源
module.exports = function(){
    return router
}