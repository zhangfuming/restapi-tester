/**
 * Created by zhangfuming on 8/6/14.
 */

var adminClient;
$(function(){
    allMessage();
    adminClient = io.connect('http://127.0.0.1:3001/admin');
    adminClient.on('userin', function (message) {
        console.log(message);
    });
    adminClient.on('success', function (message) {
        console.log(message);
        appendMessage(message);
        $("#message").val("");
    });
    adminClient.on('error', function (message) {
        console.log(message);
        alert("发送失败");
    });
    adminClient.on('count', function (message) {
         $("#user-count").text(message.count);
    });

});

var allMessage =function(){
    $.ajax({
        type: "GET",
        url: "/chat/message",
        data: {},
        cache:false,
        dataType:"json",
        success: function(msg){
            for(var i = 0 ; i < msg.messagelist.length; i++){
                appendMessage(msg.messagelist[i]);
            }
        }
    });
}

var appendMessage = function(message){
    var html = "<div class=\"fields\">";
    html+= "<div class=\"field\">";
    html +=     "<dl>";
    html +=         "<dd><i class=\"comment icon\"></i>"+message.author+" " + new Date(message.dt) + "</dd>";
    html +=         "<dd>"+message.message+"</dd>";
    html +=     "</dl>";
    html += "</div>";
    html += "</div>";
    $(".chat-content").append(html);
}

var adminSender = {
    send : function(message){
        if(message == ""){
            return ;
        }
        adminClient.emit("news",{message:message});
    }
};

window.AdminSender = adminSender;
