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
    let sql = "select * from books ";
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

    let { id } = req.params;

    let sql = `select * from books left join category 
                on books.category_id = category.id where books.id = ?;`;

    conn.query(sql, [id], (err, results) => {
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