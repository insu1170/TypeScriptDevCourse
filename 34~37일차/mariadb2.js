
const mysql = require('mysql2');

// 함수로 감싸지 말고 바로 생성합니다.
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'book',
    dateStrings: true
});

// 함수가 아닌 '객체(conn)'를 내보냅니다.
module.exports = conn;