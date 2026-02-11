const express = require('express');

const app = express();
const dotenv = require('dotenv');

dotenv.config();
app.listen(process.env.PORT);

const userRouter = require('./rotues/users');
const bookRouter = require('./rotues/books');
const likeRouter = require('./rotues/likes');
const cartRouter = require('./rotues/cart');
const orderRouter = require('./rotues/orders');

app.use('/users',userRouter)
app.use('/books',bookRouter)
app.use('/likes',likeRouter)
app.use('/carts',cartRouter)
app.use('/orders',orderRouter)