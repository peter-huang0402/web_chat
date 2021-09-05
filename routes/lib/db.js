var mysql = require('mysql');
var conf = require('./conf');

// create connection pool of database
var pool = mysql.createConnection(conf.db);
module.exports = pool;
