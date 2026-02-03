const express = require('express');

const app = express();
app.use(express.json());
app.listen(3001);

const userRouter = require('./users')
const channel = require('./channels')
app.use('/',userRouter)
app.use('/channels',channel)