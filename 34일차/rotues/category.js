const express = require('express');
const { allCategory } = require('../controller/categoryController');

const router =  express.Router();


router.use(express.json());

// 전체 조회
router.get('/',allCategory)




module.exports = router