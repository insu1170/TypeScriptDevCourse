const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');


const addLike = (req, res) => {
    let sql = 'insert into likes (user_id, liked_book_id) values (?, ?)';
    const { id } = req.params;          // 책 id
    const { user_id } = req.body;

    let values = [user_id, id];
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    })
}


const removeLike = (req, res) => {
    let sql = 'delete from likes where user_id=? and liked_book_id=?';
    const { id } = req.params;          // 책 id
    const { user_id } = req.body;

    let values = [user_id, id];
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    })
}


module.exports = { addLike, removeLike }