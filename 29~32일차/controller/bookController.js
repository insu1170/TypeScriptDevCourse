const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

// 전체 도서 조회 (카테고리별 조회 포함)
const allBooks = (req, res) => {
    // 1. 카테고리 필터링은 보통 쿼리스트링(?category_id=1)으로 들어옵니다.
    // req.params가 아니라 req.query를 확인해야 합니다.
    let { category_id, news, limit, currentPage } = req.query;

    // limit: page 당 도서 수
    // currentPage: 현재 몇 페이지
    // offset : 0,3,6,9

    console.log(req.query);
    console.log("news:", news);

    let offset = limit * (currentPage - 1);
    let sql = "select *, (select count(*) from likes where books.id = liked_book_id) AS likes from books ";
    let values = [];

    if (category_id && news === 'true') {
        sql += "where category_id = ? and pub_date between date_sub(now(), interval 1 month) and now() ";
        values.push(category_id);

    } else if (category_id) {
        sql += "where category_id = ? ";
        values.push(category_id);

    } else if (news === 'true') {
        sql += "where pub_date between date_sub(now(), interval 3 month) and now() ";
    }

    sql += "limit ? offset ?";
    values.push(parseInt(limit), offset);
    conn.query(sql, values, (err, results) => {
        console.log(sql);
        console.log(values);
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if (results.length) {
            return res.status(StatusCodes.OK).json(results);
        } else {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    });
};

// 개별 도서 조회
const bookDetail = (req, res) => {

    let { user_id } = req.body
    let book_id = req.params.id

    let sql = `SELECT 
    books.*,
    (SELECT COUNT(*) FROM likes WHERE liked_book_id = books.id) AS likes,
    (SELECT EXISTS (
        SELECT 1 
        FROM likes 
        WHERE user_id = 1 
        AND liked_book_id = books.id
    )) AS liked
FROM books
LEFT JOIN category 
    ON books.category_id = category.category_id
WHERE books.id = 1`;
    let values = [user_id, book_id, book_id]
    // select * from books left join category 
    // on books.category_id = category.id where books.id = ?;

    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if (results[0]) {
            return res.status(StatusCodes.OK).json(results[0]);
        } else {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    });


};

module.exports = {
    allBooks,
    bookDetail,
};