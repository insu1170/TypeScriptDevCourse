const conn = require('../mariadb2');
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes');
const dotenv = require('dotenv');
dotenv.config()
const ensureAuthorization = require('../auth');

const addLike = (req, res) => {
    const  book_id = req.params.id;      // 도서 id


    let receivedJwt = req.headers["authorization"];

    // 1. 토큰이 아예 없는 경우 처리
    if (!receivedJwt) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "로그인이 필요합니다."
        });
    }

    try {
        // 2. Bearer 제거 (만약 포함되어 있다면)
        const token = receivedJwt.startsWith("Bearer ")
            ? receivedJwt.split(" ")[1]
            : receivedJwt;
        // 3. 논리 연산자(||) 사용 및 검증
        // .env 파일 인식이 안 될 경우를 대비해 'hello'를 기본값으로 사용
        let decodedJwt = jwt.verify(token, process.env.PRIVATE_KEY || 'hello');
        console.log("인증된 사용자:", decodedJwt);

        // 4. 데이터베이스 쿼리 실행
        let sql = 'INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)';
        let values = [decodedJwt.id, book_id];

        conn.query(sql, values, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            return res.status(StatusCodes.OK).json(results);
        });

    } catch (err) {
        // 5. 토큰이 유효하지 않을 때 서버가 죽지 않게 에러 응답
        console.log("JWT 에러:", err.message);
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "로그인 세션이 만료되었거나 잘못된 접근입니다."
        });
    }
}



const removeLike = (req, res) => {
    let sql = 'delete from likes where user_id=? and liked_book_id=?';
    const book_id = req.params.id;          // 책 id

    let authorization = ensureAuthorization(req)

    if (authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message": '로그인 만료'
        })
    } else if (authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message": "잘못된 토큰"
        })
    } else {
        let values = [authorization.id, book_id];
        conn.query(sql, values, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            return res.status(StatusCodes.OK).json(results);
        })
    }
}

// function ensureAuthorization(req, res) {
//     try {
//         let receivedJwt = req.headers["authorization"];
//         console.log(receivedJwt);

//         let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY || 'hello')
//         return decodedJwt
//     } catch (err) {
//         console.log(err)
//         return res.status(StatusCodes.UNAUTHORIZED).json({
//             'message': '로그인 만료'
//         })
//     }
// }

module.exports = { addLike, removeLike }