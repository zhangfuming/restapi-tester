/**
 * Created by zhangfuming on 8/5/14.
 */

/**
 *
 * @param options
 *  var options = {
 *      hostname: 'www.xxxxx.com',
 *      port: 80,
 *      path: '/mob/city/data',
 *      method: 'POST',
 *      params:{name:"zhangsan",age:22}
 *      };
 * @constructor
 * @result
 * {status:200,headers:{},body:""}
 */
exports.ApiCallService = function(options,callback){
    try{
        var http = require("http");
        var response = {};
        if(options.params && options.method.toUpperCase() == "GET"){
            options.path = options.path + "?" + require('querystring').stringify(options.params);
        }
        var postData = null;
        if(options.params && options.method.toUpperCase() == "POST"){
            postData = require('querystring').stringify(options.params);
            if(options.headers){
                options.headers["Content-Type"]="application/x-www-form-urlencoded";
                options.headers["Content-Length"]= postData.length;
            }else{
                options.headers ={
                    "Content-Type": 'application/x-www-form-urlencoded',
                    "Content-Length": postData.length
                }
            }
        }

        var req = http.request(options, function(res) {
            response.status = res.statusCode;
            response.headers = res.headers;
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                response.body = chunk;
                callback(null,response);
            });
        });
        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            callback(e,null);
        });
        if(postData){
            req.write(postData);
        }
        req.end();
    }catch(err){
        callback(err,null);
    }
};
