const express = require('express');
const router = express.Router()
router.use(express.json());
const conn = require('./mariadb')
const { body, param, validationResult } = require('express-validator')

const validate = (req, res, next) => {
    const err = validationResult(req)

    if (err.isEmpty()) {
        return next(); // 다음 할 일 
    } else {
        return res.status(400).json(err.array());
    }
}


router.route('/')
    // 채널 전체 조회
    .get(
        [
            body('userId').notEmpty().isInt().withMessage('userId는 숫자여야함'),
            validate
        ],
        (req, res) => {

            const userId = req.body.userId;

            conn.query(
                `SELECT * FROM channels where user_id = ?`,
                [userId],
                function (_err, results) {
                    if (results.length) {
                        return res.status(200).json(results);
                    }
                    return notFoundChannel(res);
                }
            );
        }
    )

    // 채널 개별 생성
    .post([body('userId').notEmpty().isInt().withMessage('userId는 숫자여야함'),
    body('name').notEmpty().isString().withMessage('문자 입력 필요'),
        validate
    ],
        (req, res) => {
            const { name, userId } = req.body

            const query = `insert into channels (name,user_id) values (?,?)`
            let value = [name, userId]
            conn.query(query, value,
                function (err, results, _fields) {
                    if (err) {
                        console.log(err)
                        return res.status(400).end();
                    }
                    res.status(201).json(results)
                }
            );


        })

router.route('/:id')
    // 채널 개별 조회    
    .get([param('id').isEmpty().withMessage('채널id 필요'),
        validate
    ], (req, res) => {
        let id = parseInt(req.params.id);
        conn.query(
            `SELECT * FROM channels where id = ?`, id,
            function (_err, results, _fields) {
                if (err) {
                    console.log(err)
                    return res.status(400).end();
                }

                if (results.length) {
                    res.status(200).json(results)
                }
                else {
                    notFoundChannel(res)
                }
            }
        );
    })

    // 개별 수정
    .put(
        [param('id').notEmpty().withMessage('채널 di 필요'),
        body('name').notEmpty().isString().withMessage('채널 오류'),
            validate]
        , (req, res) => {

            let id = parseInt(req.params.id);
            let { name } = req.body
            let sql = `update channels set name= ? where id=?`
            let values = [name, id]
            conn.query(sql, values,
                function (err, results) {
                    if (err) {
                        console.log(err)
                        return res.status(400).end()
                    }
                    res.status(200).json(results)
                }
            )

        })

    // 채널 삭제
    .delete([param('id').notEmpty().withMessage('채널 아이디 필'), validate], (req, res) => {
        let { id } = req.params
        id = parseInt(id)
        let sql = `delete from channels where id =?`

        conn.query(sql, id),
            function (err, results) {
                if (err) {
                    console.log(err)
                    return res.status(400).end()
                } else {
                    res.status(200).json(results)
                }
            }
    })


const notFoundChannel = (res) => {
    res.status(404).json({
        message: "채널정보 찾기 X"
    })
}


module.exports = router