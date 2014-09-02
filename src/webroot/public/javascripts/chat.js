/**
 * Created by zhangfuming on 8/6/14.
 */

var userClient;
var Chat = {
    openClient: function () {
        $('.help.modal').modal('setting', {
            closable: false,
            onShow: function(){
                privateMethod.allMessage();
                privateMethod.call();
                return false;
            },
            onHide: function(){
                if(userClient){
                    //userClient.disconnect();
                    userClient.destroy();
                    userClient = null;
                }
                $(".chat-content").empty();
                window.location.reload();
                return false;
            }
        }).modal('show');
    }

};

var privateMethod = {
    call : function(){
        userClient = io.connect('http://127.0.0.1:3001/user');

        userClient.on('connect', function (message) {
            userClient.emit('userin',{name:"普通用户"});
        });
        userClient.on('welcome', function (message) {
            //console.log(message);
            privateMethod.appendMessage(message);
        });
        userClient.on('news', function (message) {
            //console.log(message);
            privateMethod.appendMessage(message);
            var current = new Date().getTime();
            var overtime = current + 8000;
            var $title = $("#msg-title");
            var oldTitle = $title.text();
            var index = 0;
            var interval = setInterval(function(){
                var nowTime = new Date().getTime();
                if(index % 2 == 0){
                    $title.empty().text("【　新消息　】");
                }else{
                    $title.empty().text("【　     　】");
                }
                if(nowTime > overtime){
                    clearInterval(interval);
                    $title.empty().text(oldTitle);
                }
                index++;
            },200);

        });
    },
    appendMessage: function(message){
        var html = "<div class=\"fields\">";
        html+= "<div class=\"field\">";
        html +=     "<dl>";
        html +=         "<dd><i class=\"comment icon\"></i>"+message.author+" " + new Date(message.dt) + "</dd>";
        html +=         "<dd>"+message.message+"</dd>";
        html +=     "</dl>";
        html += "</div>";
        html += "</div>";
        $(".chat-content").append(html);
    },
    allMessage:function(){
        $.ajax({
            type: "GET",
            url: "/chat/message",
            data: {},
            cache:false,
            dataType:"json",
            success: function(msg){
               for(var i = 0 ; i < msg.messagelist.length; i++){
                   privateMethod.appendMessage(msg.messagelist[i]);
               }
            }
        });
    }
}

window.Chat = Chat;