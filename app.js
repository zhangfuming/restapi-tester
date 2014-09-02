
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'src/webroot/views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'src/webroot/public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/**
 * controller
 */
var controller = require('./src/controller/IndexController');
var AnalysisController = require("./src/controller/AnalysisController");
app.get('/', controller.index);
app.get('/chat/admin', controller.chatadmin);
app.get('/chat/message', controller.message);
app.get('/settings/input', AnalysisController.input);
app.post('/analysis', AnalysisController.analysis);
app.post('/ajaxtelnet', AnalysisController.ajaxtelnet);

/**
 * test api
 */
var TestApiController = require("./src/controller/TestApiController");
app.post('/test/user/login', TestApiController.login);
app.get('/test/user/info', TestApiController.queryUser);
app.get('/test/user/mobile', TestApiController.queryMobile);
app.get('/test/user/delete', TestApiController.delete);
app.get('/test/prize/get', TestApiController.prize);
//app.get('/test/user/fromdb',TestApiController.getUserFromMysql);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});





/**********************************************************************/
/************************* socket io *********************************/
/**********************************************************************/
var ChatMessageModel = require("./src/model/mongodb/ChatMessageModel");
var RedisChatModel = require("./src/model/redis/RedisChatModel");
var io = require('socket.io').listen(3001);
var adminSocketRoute = io
    .of('/admin')
    .on('connection', function (socket) {
         console.log("投顾上线 "+socket.admin);
         socket.admin = {name:"金牌顾问"};
         socket.on("news",function(message){
             var msg = {message: message.message,author:socket.admin.name,dt:new Date().getTime()};
             RedisChatModel.publish("chat-message",msg,function(err,result){
                 if(err){
                     socket.emit("error",{message:e});
                 }else{
                     socket.emit("success",msg);
                     //record message
                     ChatMessageModel.insert(msg,function(err,result){ })
                 }
             });

         });
    });


var clientSocketRoute = io
    .of('/user')
    .on('connection', function (socket) {
        socket.on('disconnect', function (message) {
            console.log("client disconnect");
        });
        socket.on('userin', function (message) {
            console.log(message);
            socket.emit("welcome",{message: "欢迎进入系统",author:"系统通知",dt:new Date().getTime()});
        });
}) ;
//listen message channel
RedisChatModel.subscribe("chat-message",function(err,result){
    if(err){
        console.log("error " + err);
    }else{
        io.of("/user").emit("news",JSON.parse(result));
    }
});