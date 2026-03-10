const conn = require('../mariadb2');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken')


// 장바구니 담기
const addToCart = (req, res) => {
    const { book_id, quantity, user_id } = req.body;
    let authorization = ensureAuthorization(req, res);
    if (authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message": '로그인 만료'
        })
    } else if (authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message": "잘못된 토큰" 
        })
    } else {
        let sql = 'insert into cartItems (book_id,quantity,user_id) values (?,?,?)';
        let values = [book_id, quantity, authorization.id];

        conn.query(sql, values, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            return res.status(StatusCodes.OK).json(results);
        })
    }



}

const getCartItems = (req, res) => {

    const { selected } = req.body
    let authorization = ensureAuthorization(req, res);
    if (authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message": '로그인 만료'
        })
    } else if (authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message": "잘못된 토큰"
        })
    } else {
        let sql = `select cartItems.id, book_id, title, summary, quantity, price 
                    from cartItems left join books 
                    on cartItems.book_id=books.id 
                    where user_id = ?`
        let values = [authorization.id]

        if (selected) { // 주문서 작성 시 선택한 장바구니 조회
            sql+= ` and cartItems.id in(?)`;
            values.push(selected);
        } 



        conn.query(sql, values, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            return res.status(StatusCodes.OK).json(results);
        })
    }

}

const removeCartItem = (req, res) => {
    const { id } = req.params;
    let sql = `delete from cartItems where id = ?`
    conn.query(sql, id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json(results);
    })
}

module.exports = {
    addToCart,
    getCartItems,
    removeCartItem
}