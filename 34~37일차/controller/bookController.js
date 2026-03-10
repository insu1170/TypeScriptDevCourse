const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
const ensureAuthorization = require('../auth');
// 전체 도서 조회 (카테고리별 조회 포함)
const allBooks = (req, res) => {
    let allBookRes = {}


    let { category_id, news, limit, currentPage } = req.query;

    // limit: page 당 도서 수
    // currentPage: 현재 몇 페이지
    // offset : 0,3,6,9

    console.log(req.query);
    console.log("news:", news);

    let offset = limit * (currentPage - 1);
    let sql = "select sql_calc_found_rows *, (select count(*) from likes where books.id = liked_book_id) AS likes from books ";
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

    sql += "select found_rows()";
    values.push(parseInt(limit), offset);
    conn.query(sql, values, (err, results) => {
        console.log(sql);
        console.log(values);
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        let totalCount = results[0].found_rows();
        let pagination ={};
        pagination.currentPage =currentPage;
        allBookRes.totalCount = pagination

        if (results.length) {
            return res.status(StatusCodes.OK).json(results);
        } else {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    });
};

// 개별 도서 조회
const bookDetail = (req, res) => {

    let book_id = req.params.id
    let authorization = ensureAuthorization(req)

    if (authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message": '로그인 만료'
        })
    } else if (authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message": "잘못된 토큰"
        })
    } else if (authorization instanceof ReferenceError) {

    } else {

        let sql = `select * (select count(*) from likes where liked_book_id
        from books
        left join categoryon books.category_id = category.category_id
        where books.id = ?;
        )`
        let values = [authorization.id, book_id, book_id]
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

    }
};

module.exports = {
    allBooks,
    bookDetail,
};