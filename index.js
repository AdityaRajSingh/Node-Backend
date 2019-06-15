const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const mongoose = require('mongoose');


// download nhi karna para express ki dependency hai
const parser = require('body-parser');


// app.get('*',function(req,res,next){
//     count++;
//     next();
// })


mongoose.connect('mongodb://localhost:27017/codeasylums', { useNewUrlParser: true });

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));


let count = 0;
app.use(morgan('dev'));



app.use('*', function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'content-type');
    next();
})

//roting
const users = require('./routes/users');
app.use('/users', users);

const products = require('./routes/products');
app.use('/products', products);

const orders = require('./routes/orders');
app.use('/orders', orders);

app.get('/', function (req, res) {
    res.send("hello world!");
})



app.get('/test', function (req, res) {
    res.send("testing").status(204);
})

app.get('/count', function (req, res, next) {
    res.send(count.toString()).status(204);
})


app.listen(port, function () {
    console.log(`server running on port ${port}`);
})