const express = require('express');

const router = express.Router();
const conn = require('../mariadb');
router.use(express.json());
const {join,login,passwordResetRequest,passwordReset} = require('../controller/userController')

// 회원가입
router.post('/join',join);

// 로그인
router.post('/login', login)


// 비번 초기화 요청 
router.post('/reset' ,passwordResetRequest);

// 비번 초기화
router.put('/reset', passwordReset);



module.exports = router;