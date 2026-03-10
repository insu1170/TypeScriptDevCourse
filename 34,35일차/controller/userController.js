const conn = require('../mariadb')
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config()

const join = (req, res) => {
    const { email, password } = req.body;



    //비번 암호화
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
    const sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)';
    const values = [email, hashPassword, password];

    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end()
        }
        res.status(StatusCodes.CREATED).json(results);
    })
}


const login = (req, res) => {
    let sql = 'select * from users where email = ?';
    const { email, password } = req.body;

    conn.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).end;

        }


        const loginUser = results[0];
        const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64');


        if (loginUser && loginUser.password == hashPassword) {
            // 토큰 발행
            const token = throwDeprecation.sign({
                email: loginUser.email
            }, process.env.PRIVATE_KEY, {
                expiresIn: '5m',
                issuer: "songa"
            })

            res.cookie("token", token, {
                httpOnly: true
            })
            console.log(token);
            return res.status(StatusCodes.OK).json(results);
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).end();
        }

    })

    res.json('로그인')
}

const passwordResetRequest = (req, res) => {
    const { email } = req.body
    let sql = 'select * from users where email = ?';

    conn.query(sql, email, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        const user = results[0];
        if (user) {
            return res.status(StatusCodes.OK).end()
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).end();
        }
    })


    res.json('초기화 요청')
}

const passwordReset = (req, res) => {
    const { password, email } = req.body;
    let sql = 'update users set password=?, salt=? where email = ?'

    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
    let values = [hashPassword, salt, email];

    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if (results.affectedRows == 0) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json(results);
    })

    res.json('초기화')
}


module.exports = {
    join,
    login,
    passwordResetRequest,
    passwordReset
}