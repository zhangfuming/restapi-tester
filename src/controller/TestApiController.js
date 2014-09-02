/**
 * Created by zhangfuming on 8/6/14.
 */

//post 用户登录
exports.login = function(req,res){
    var account = req.body.account;
    var password = req.body.password;
    res.set("Content-type","application/json");
    res.send(200,{name:"zhangsan",message:"用户登录成功！"})
}
//get 获取用户信息
exports.queryUser = function(req,res){
    res.set("Content-type","application/json");
    res.send(200,{name:"zhangsan",age:100,address:"上海浦东新区振华企业广场B座H1层"})
}
//get 查询手机号
exports.queryMobile = function(req,res){
    var account = req.query.account;
    res.set("Content-type","application/json");
    res.send(200,{name:"zhangsan",mobile:"186****6010"})
}
//get 删除用户
exports.delete = function(req,res){
    var id = req.query.id;
    res.set("Content-type","application/json");
    //res.send(500,{id:id,message:"用户删除失败"})
    res.send(200,{id:id,message:"用户删除成功"})
}
//get 抽奖
exports.prize = function(req,res){
    var account = req.query.account;
    res.set("Content-type","application/json");
    res.send(200,{account:"C00001",prize:100001,message:"恭喜您，抽中iphone5s一台"})
}

//根据账号获取用户信息
exports.getuser = function(req,res){
    var account = req.query.account;
    res.set("Content-type","application/json");

    var AccountService = require("../service/AccountService");
    AccountService.getUserInfoByAccount(account,function(err,result){
        if(err){
            res.send(500,{error:err});
        }else{
//        `account` varchar(255) NOT NULL,
//  `password` varchar(255) NOT NULL,
//  `real_name` varchar(255) NOT NULL,
//  `email` varchar(255) NOT NULL,
//  `create_user` bigint(20) NOT NULL,
//  `create_date` datetime NOT NULL,
            res.send(200,
                {
                    account:result.account,
                    real_name:result.real_name
                }
            )
        }
    });
}
