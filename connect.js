// const mysql = require('mysql');

// const db=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'Bhaskar08',
//     database:'social'
// });

// module.exports=db


var mysql = require('mysql');
var path = require('path');


var connection = mysql.createConnection({
    
    host:'localhost',
    user:'root',
    password:'Bhaskar08',
    database:'letssocial'
});

connection.connect(function (err) {
    if (err) {
        console.log('Error connecting to Database',err);
        return;
    }
    console.log('Connection established');
});
module.exports = connection;