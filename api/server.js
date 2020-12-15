const async = require('async');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
require('dotenv').config();

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({}));

var port = process.env.port || 3001;
var server = app.listen(port, function () {
    console.log('Server running');
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
    next();
});

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const user = require('./src/user');
app.get('/users', user.getAll);
app.get('/user/:id', user.getById);
app.post('/register', urlencodedParser, user.register);
app.post('/login', urlencodedParser, user.login);
app.put('/user/:id', urlencodedParser, user.edit);
app.delete('/user/:id', urlencodedParser, user.delete);
app.post('/upload', urlencodedParser, user.upload);

const restaurant = require('./src/restaurant');
app.post('/restaurant', urlencodedParser, restaurant.create);
app.get('/restaurants', restaurant.getAll);
app.get('/restaurant-profile/:id', restaurant.getProfileById);
app.get('/restaurant-store/:id', restaurant.getStoreById);
app.put('/restaurant/:id', urlencodedParser, restaurant.upsert);
app.delete('/restaurant/:id', urlencodedParser, restaurant.delete);
