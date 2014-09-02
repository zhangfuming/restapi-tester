/**
 * Created by zhangfuming on 8/7/14.
 */


var ChatMessageModel = require("../../../src/model/mongodb/ChatMessageModel");

ChatMessageModel.insert({author: "张三", message:"hello",dt:new Date().getTime()},function(err,result){
    if(err){
        console.log(err);
    }else{
        ChatMessageModel.find({},function(err,result){
            if(err){
                console.log(err);
            }else{
                console.log(result);
            }
        })
    }
})
