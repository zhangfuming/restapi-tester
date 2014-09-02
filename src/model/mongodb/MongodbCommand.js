/**
 * Created by zhangfuming on 8/6/14.
 */

var MongodbConfig = require("../../../resources/mongodb_settings").MongodbConfig;
var mongoose = require("mongoose");
var util = require("util");
(function(){
    console.log('....init mongoose connection.....');

    var url = util.format('mongodb://%s:%d/%s',MongodbConfig.dbhost,MongodbConfig.dbport,MongodbConfig.dbName);
    mongoose.connect(url);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.on('index', function(err){
        console.log('create index....');
    });
    db.once('open', function callback () {
        console.log('....mongodb connection open....');
    });

})();


exports.save = function(model,params,callback){
    var chatMessage = new model(params);
    chatMessage.save(function (err) {
        if (err){
            callback(err,null);
        }
        callback(null,null);
    })
};


exports.find = function(model,params,callback){
    model.find(params, function(err,result){
         callback(err,result);
    })
}