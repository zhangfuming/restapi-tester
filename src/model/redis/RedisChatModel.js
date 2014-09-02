/**
 * Created with IntelliJ IDEA.
 * User: zhangfuming
 * Date: 13-6-24
 * Time: 下午5:42
 * To change this template use File | Settings | File Templates.
 */


var RedisConfig = require("../../../resources/redis_settings").RedisConfig;

var redis = require("redis");
var client;
var client2;
try{
    client = redis.createClient(RedisConfig.port, RedisConfig.host, {detect_buffers: true, connect_timeout: 30 * 1000});
    client2 = redis.createClient(RedisConfig.port, RedisConfig.host, {detect_buffers: true, connect_timeout: 30 * 1000});
}catch(e){
    console.log(e);
}

module.exports = {
    publish: function (channel, message, callback) {
        try {
            if(typeof message != "String"){
                message = JSON.stringify(message);
            }
            client.publish(channel,message);
            callback(null,null);
        } catch (e) {
            //TODO
            console.log(e)
            callback(e,null);
        }
    },
    subscribe: function(channel,callback){
        try {
            client2.subscribe(channel);
            client2.on("message", function (_channel, message) {
                 if(channel == _channel){
                     callback(null,message?message.toString("utf8"):"");
                 }
            });
        } catch (e) {
            console.log(e)
            callback(e,null);
        }
    },
    unsubscribe: function(channel,callback){
        try {
            client2.unsubscribe(channel);
            callback(null,null)
        } catch (e) {
            console.log(e)
            callback(e,null);
        }
    },
    expire : function(key, seconds,callback){
        client.expire([key,seconds],function(err,response){
            callback(err,response);
        });
    }

};
