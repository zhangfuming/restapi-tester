/**
 * Created by zhangfuming on 8/6/14.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatMessage = mongoose.model('ChatMessage', new Schema({
    author: String,
    message:   String,
    dt:Number
}));


var ChatMessageModel = function() {};

var MongodbCommand = require("./MongodbCommand");
/**
 * find
 * @param params
 * @param callback
 */
ChatMessageModel.prototype.insert = function(params,callback){
    MongodbCommand.save(ChatMessage,params,function(err,result){
        callback(err,result);
    });
}

ChatMessageModel.prototype.find = function(params,callback){
    MongodbCommand.find(ChatMessage,params,function(err,result){
        callback(err,result);
    });
}

//exports.ChatMessageModel = ChatMessageModel;
module.exports = new ChatMessageModel();



