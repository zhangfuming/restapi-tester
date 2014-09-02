/**
 * Created by zhangfuming on 14-9-2.
 */

var AccountDAO = require("../model/mysql/AccountDAO")
exports.getUserInfoByAccount = function(account,callback){
    AccountDAO.getUserInfoByAccount(account,function(err,result){
       if(err){
           callback(err,null);
       }else{
           callback(null,result);
       }
    });
}
