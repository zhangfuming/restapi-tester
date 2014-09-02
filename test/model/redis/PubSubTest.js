/**
 * Created by zhangfuming on 8/7/14.
 */


var RedisChatModel = require("../../../src/model/redis/RedisChatModel");

var channel = "test-channel";
RedisChatModel.subscribe(channel,function(err,result){
    if(err){
        console.log("error " + err);
    }else{
        console.log(result);
    }
});

var i = 0;
setInterval(function(){
    RedisChatModel.publish(channel,{message: "just a play " + (++i)});
},2000);