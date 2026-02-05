var jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
var dotenv = require('dotenv');

dotenv.config();

app.listen(process.env.PORT);

var token = jwt.sign({ foo: 'bar' }, process.env.PRIVATE_KEY);
console.log(token);

var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded);
