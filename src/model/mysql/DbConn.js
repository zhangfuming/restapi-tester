
// Create a MySQL connection pool with
// a max of 10 connections, a min of 2, and a 30 second max idle time

var config = require('../../../resources/mysql_settings');
var poolModule = require('generic-pool');
var mysql = require('mysql');
global.mysql_pool = poolModule.Pool({
    name     : 'mysql',
    create   : function(callback) {
        var connection =  require('mysql').createConnection({
            host     : config.mysql.host,
            port     : config.mysql.port,
            database : config.mysql.database,
            user     : config.mysql.user,
            password : config.mysql.password
        });
        connection.connect();
        // parameter order: err, resource
        callback(null, connection);
    },
    validate : function(client) {
        return client.count != 0;
    },
    destroy  : function(client) { client.end(); },
    max      : 2,
    min      : 1,
    // specifies how long a resource can stay idle in pool before being removed
    idleTimeoutMillis : 30000,
    // if true, logs via console.log - can also be a function
    log : false
});

//acquire(function(err, conn){...})
exports.acquire = global.mysql_pool.acquire;

//release(conn)
exports.release = global.mysql_pool.release;
