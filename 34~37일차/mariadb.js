const mariadb = require('mysql2');

const connection = async () => {
    const conn = await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'book',
        dateStrings: true
    })
    return conn
}

module.exports = connection;
