const express = require('express');

const router =  express.Router();

router.use(express.json());

// 회원가입
router.post('/join',(req,res)=>{
    res.send('회원가입')
});

// 로그인
router.post('/login', (req, res) => {
    res.send("login success")
})


// 비번 초기화 요청 
router.post('/reset', (req,res)=>{
    res.send('비밀번호 초기화 요청')
});

// 비번 초기화
router.put('/reset', (req,res)=>{
    res.send('비밀번호 초기화')
});



module.exports = router;