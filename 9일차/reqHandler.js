const fs = require('fs');
const main_view = fs.readFileSync('./9일차/main.html', 'utf-8')

const mariadb = require('./database/connect/mariadb')


const main = (res) => {
    console.log('main')
    mariadb.query('select * from product', function (err, rows) {
        console.log(rows)
    })
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(main_view);
    res.end()
}

const login = (res) => {
    console.log('login')
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('로그인');
    res.end()
}

const redRacket = (res) => {
    fs.readFile('./9일차/img/redRacket.png', (err, data) => {
        console.log(data)
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(data);
        res.end()
    })
}
const blueRacket = (res) => {
    fs.readFile('./9일차/img/blueRacket.png', (err, data) => {
        console.log(data)
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(data);
        res.end()
    })
}
const blackRacket = (res) => {
    fs.readFile('./9일차/img/blackRacket.png', (err, data) => {
        console.log(data)
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(data);
        res.end()
    })
}

const order = (res) => {
    mariadb.query(`insert into orderlist values (1 ,"${new Date().toLocaleDateString()}")`, (err, rows) => {
        console.log('결과:', rows);
        fs.readFile('./9일차/orderlist.html', (err, data) => {
            mariadb.query('select * from orderlist', (err, rows) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                rows.forEach((data) => {
                    res.write(`
                <tr>
                <td> ${data.product_id} </td>
                <td>${data.order_date} </td>
                <tr>`)
                })

                res.write("</table>")
                res.end()
            })


        })
    })
}



let handle = {};

handle['/'] = main;
handle['/order'] = order;
handle['/login'] = login;
handle['/favicon.ico'] = () => { };
handle['/img/redRacket.png'] = redRacket
handle['/img/blueRacket.png'] = blueRacket
handle['/img/blackRacket.png'] = blackRacket

exports.handle = handle