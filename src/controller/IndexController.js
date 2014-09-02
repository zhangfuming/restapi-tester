
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Restapi Tester' });
};

exports.chatadmin = function(req, res){
  res.render('chat/chat-admin', { title: 'Restapi Tester' });
};

exports.message = function(req, res){
    var ChatMessageModel = require("../../src/model/mongodb/ChatMessageModel");
    ChatMessageModel.find({},function(err,result){
        if(err){
            console.log(err);
        }else{
            res.set("Content-type","application/json");
            res.send(200,{messagelist:result})
        }
    })
};

