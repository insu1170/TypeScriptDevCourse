const mariadb = require('mysql2/promise');
const { StatusCodes } = require('http-status-codes');


const order = async (req, res) => {
        const conn = await mariadb.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'book',
            dateStrings: true
        })
const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } = req.body;

    // 1. delivery 테이블 삽입
    let sql = 'insert into delivery (address, receiver, contact) values (?, ?, ?)';
    let values = [delivery.address, delivery.receiver, delivery.contact];

    let [results] = await conn.query(sql, values);
    
    // [수정] results.delivery_id 대신 results.insertId를 사용해야 합니다.
    let delivery_id = results.insertId; 

    // 2. orders 테이블 삽입
    sql = `insert into orders (book_title, total_quantity, total_price, user_id, delivery_id)
            values (?, ?, ?, ?, ?)`;

    // [수정] values 배열을 새로 정의하여 인자 개수를 맞춥니다. (5개)
    let orderValues = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
    [results] = await conn.query(sql, orderValues);
    let order_id = results.insertId;
    
    // 3. orderedBook 삽입을 위해 cartItems 정보 조회
    // [수정] WHERE IN [?] -> WHERE IN (?) / query 사용
    sql = `SELECT book_id, quantity from cartItems where id in (?);`;
    let [orderItems] = await conn.query(sql, [items]);

    // 4. orderedBook 테이블에 벌크 삽입
    // [수정] .book_id 오타 수정 및 이중 배열 구조 생성
    sql = `insert into orderedBook (order_id, book_id, quantity) values ?`;
    let bulkValues = [];
    orderItems.forEach((item) => {
        bulkValues.push([order_id, item.book_id, item.quantity]);
    });

    // [수정] query 대신 query를 사용해야 이중 배열(bulk insert)이 인식됩니다.a
    await conn.query(sql, [bulkValues]);
    
    // 5. 장바구니 삭제
    // [수정] 비동기 함수이므로 await를 붙여야 하며, 결과를 기다린 후 응답합니다.
    let result = await deleteCartItems(conn, items);
    return res.status(StatusCodes.OK).json(result);
    
};

const deleteCartItems = async (conn,items)=>{
    let sql = `delete from cartItems where id in (?)`;
    let resutls = await conn.query(sql,[items]);

    return resutls;
}

const getOrders = async (req, res) => {
        const conn = await mariadb.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'book',
            dateStrings: true
        })

    let sql = `select orders.id, created_at, address, receiver,contact, book_title,total_quantity, total_price, 
    from orders left join delivery 
    on orders.delivery_id = delivery.id`
    let [rows,fields] = await conn.query(sql);
    return res.status(StatusCodes.OK).json(rows);
}

const getOrderDetail = async (req, res) => {

    const {id} = req.params;
            const conn = await mariadb.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'book',
            dateStrings: true
        })
            let sql = `select book_id,title, author, price, quantity,
            from orderedBook left join books on orderedBook.book_id=book.id where order_id=?`
        let [rows,fields] = await conn.query(sql,[id])
        return res.status(StatusCodes.OK).json(rows)
}

module.exports = {
    order, getOrders, getOrderDetail
}





    // // 1. req.body에서 필요한 모든 데이터 추출
    // const { firstBookTitle, delivery, totalQuantity, totalPrice, userId, items } = req.body;

    // // 2. 배송(delivery) 정보 삽입 쿼리
    // const deliverySql = 'INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)';
    // const deliveryValues = [delivery.address, delivery.receiver, delivery.contact];

    // conn.query(deliverySql, deliveryValues, (err, deliveryResult) => {
    //     if (err) {
    //         console.error("Delivery Insert Error:", err);
    //         return res.status(StatusCodes.BAD_REQUEST).end();
    //     }

    //     // DB에서 방금 생성한 delivery_id 가져오기
    //     const delivery_id = deliveryResult.insertId; 

    //     // 3. 주문(orders) 정보 삽입 쿼리 (firstBookTitle 사용)
    //     const orderSql = 'INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)';
    //     const orderValues = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];

    //     conn.query(orderSql, orderValues, (err, orderResult) => {
    //         if (err) {
    //             console.error("Order Insert Error:", err);
    //             return res.status(StatusCodes.BAD_REQUEST).end();
    //         }

    //         const order_id = orderResult.insertId;

    //         const orderedBookSql = 'INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?';
            
    //         let values = [];
    //         items.forEach((item) => {
    //             values.push([order_id, item.book_id, item.quantity]);
    //         });

    //         conn.query(orderedBookSql, [values], (err, results) => {
    //             if (err) {
    //                 console.error("OrderedBook Insert Error:", err);
    //                 return res.status(StatusCodes.BAD_REQUEST).end();
    //             }
                
    //             return res.status(StatusCodes.OK).json(results);
    //         });
    //     });
    // });