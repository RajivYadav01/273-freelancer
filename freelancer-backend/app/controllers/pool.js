var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    port     : '3306',
    user     : 'nodeUser',
    password : 'nodeUser',
    database : 'usersignup'
});

module.exports = pool;