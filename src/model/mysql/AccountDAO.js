/**
 *
 * @type {exports}
 */
var db_conn = require('./DbConn');


exports.getUserInfoByAccount = function(account,callback){
    db_conn.acquire(function (err, conn) {
        try{
            if (err) {
                console.log('get user info error (get DB connection)! error is ' + err);
                callback(err,null);
            } else {
                // selecting rows
                conn.query("SELECT * FROM ACCOUNT WHERE  ACCOUNT = ? ", [ account ], function (err, result) {
                    if (err) {
                        callback(err, null);
                        console.log('get user info error! error is ' + err);
                    } else {
                        callback(null, result.length >0 ? result[0] : {});
                    }
                });
            }
        }finally{
            db_conn.release(conn);
        }
    });
};
