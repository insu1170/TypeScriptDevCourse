const mariadb = require('./database/connect/mariadb')


const main = (res) => {
    console.log('main')
    mariadb.query('select * from product', function (err, rows) {
        console.log(rows)
    })
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('Kim insu');
    res.end()
}

const login = (res) => {
    console.log('login')
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('login');
    res.end()
}


let handle = {};

handle['/'] = main;
handle['/login'] = login;
handle['/favicon.ico'] = () => { };

exports.handle = handle