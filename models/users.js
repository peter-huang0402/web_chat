var mysql = require('mysql');
var conf = require('../routes/lib/conf'); 
var pool = require('../routes/lib/db.js');

var sql = '';
 
module.exports = {
    queryUsers: function (req, callback) {
        sql = 'SELECT * FROM users';
        //return connection.query(sql, callback);
	return pool.query(sql, callback);
    },
    queryUserByID: function (req, callback) {
        sql = mysql.format('SELECT * FROM users WHERE id = ?', [req.params.id]);
        //return connection.query(sql, callback);
	return pool.query(sql, callback);
    },

    queryUserByNamePassword: function (req, callback) {
        //console.log("queryUserByNamePassword() username="+ req.body['username'] +" ,password="+req.body['password'] );
        sql = mysql.format('SELECT * FROM users WHERE username = ? and password = ? ', [ req.body['username'] , req.body['password'] ] );
        //return connection.query(sql, callback);
	return pool.query(sql, callback);
    },
    addUser: function (req, callback) {        
        sql = mysql.format('INSERT INTO users SET ?', req.body);
        //return connection.query(sql, callback);
	return pool.query(sql, callback);
    },
    deleteUserByID: function (req, callback) {
        sql = mysql.format('DELETE FROM users WHERE id = ?', [req.params.id]);
        //return connection.query(sql, callback);
	return pool.query(sql, callback);
    },
    updateByID: function (req, callback) {       
        sql = mysql.format('UPDATE users SET ? WHERE id = ?', [req.body, req.params.id]);
        //return connection.query(sql, callback);
	return pool.query(sql, callback);
    }
};
