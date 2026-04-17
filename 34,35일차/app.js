const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

app.use(express.json());
app.use(cors())
dotenv.config();
app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
});
const userRouter = require('./rotues/users');
const bookRouter = require('./rotues/books');
const likeRouter = require('./rotues/likes');
const cartRouter = require('./rotues/cart');
const orderRouter = require('./rotues/orders');
const categoryRouter = require('./rotues/category')

app.use('/users',userRouter)
app.use('/books',bookRouter)
app.use('/likes',likeRouter)
app.use('/category',categoryRouter)
app.use('/carts',cartRouter)
app.use('/orders',orderRouter)