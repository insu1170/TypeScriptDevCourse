const express = require('express');

const router = express.Router()
const conn = require('./mariadb')


router.route('/users')
    .get((req, res) => {
        let { email } = req.body
        console.log('sdfsd', email)

        conn.query(
            `SELECT * FROM users where email = ?`, email,
            function (_err, results, _fields) {
                res.status(200).json(results)
            }
        );
    })

    .delete((req, res) => {
        let { email } = req.body
        console.log('delete', email)
        conn.query(
            `delete from users where email = ?`, email,
            function (_err, results, _fields) {
                res.status(200).json(results)
            }
        );

    });


// 로그인
router.post('/login', (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    const query = `select * from users where email = ?`
    conn.query(
        query, email,
        function (_err, results, _fields) {
            var loginUser = results[0]
            if (loginUser && loginUser.password == password) {
                res.status(200).json({
                    message: `${loginUser.name} 환요ㅕㅇ`
                })
            } else {
                res.status(404).json({
                    message: '회원 정보 없삼'
                })
            }
        }
    );

})


// 회원가입
router.post('/join', (req, res) => {
    if (!req.body == {}) {
        return res.status(400).json({
            message: '이름을 입력하세요'
        });
    } else {
        const { email, name, password, contact } = req.body
        console.log(email, name, password, contact)
        const query = `insert into users (email,name,password,contact) value (?,?,?,?)`
        let values = [email, name, password, contact]
        conn.query(
            query, values,
            function (err, results, fields) {
                res.status(200).json(results)
            }
        );
    }

});


// 개별 조회

// 개별 탈퇴

module.exports = router