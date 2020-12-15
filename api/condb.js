const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

connection.connect((error) => {
    if (error) throw error;
    console.log('Database connected successfully :) !');
});

module.exports = connection;
