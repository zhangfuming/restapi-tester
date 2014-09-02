/**
 * Created by zhangfuming on 14-9-2.
 */

var accountDAO = require("../model/mysql/AccountDAO");

exports.getUserInfoByAccount = function(account,callback){
    accountDAO.getUserInfoByAccount(account,function(err,result){
        if(err){
            callback(err,null);
        }else{
            callback(null,result);
        }
    });
}
