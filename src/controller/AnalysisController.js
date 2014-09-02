/**
 * Created by zhangfuming on 8/5/14.
 */

exports.input = function(req, res){
    res.render('analysis/input', { title: '上传配置文件' });
};

exports.analysis = function(req, res){
    var formidable = require('formidable');

    var form = new formidable.IncomingForm(),
        //files = [],
        file = null,
        fields = [];
    form.encoding = 'utf-8';
    //form.uploadDir = TEST_TMP;
    form
        .on('field', function(field, value) {
            //console.log(field, value);
            fields.push([field, value]);
        })
        .on('file', function(field, f) {
            //console.log(field, f);
            //files.push([field, file]);
            file = f;
            return; //仅有一个文件
        })
        .on('end', function() {
            var fs = require("fs");
            fs.readFile(file.path, function (err, data) {
                if (err) throw err;
                if(!data || data.length <= 0){
                    res.render('analysis/analysis', {
                        title: 'Analysis API' ,
                        name:"API文件未选择",
                        apis:[]
                    });
                    return ;
                }
                var apiJson = JSON.parse(data.toString("utf8"));
                var projectname = apiJson.projectname ? apiJson.projectname : "默认项目";
                res.render('analysis/analysis', {
                    title: 'Analysis API' ,
                    name:projectname,
                    apis:apiJson.apis
                });
            });
        });
    form.parse(req);
};

exports.ajaxtelnet = function(req,res){
    var ApiCallService = require("../../src/service/ApiCallService");
    var options = {
        hostname: req.body.hostname,
        port: req.body.port,
        path: req.body.path,
        method: req.body.method,
        params: JSON.parse(req.body.params)
    };
    ApiCallService.ApiCallService(options,function(err,data){
        var result = {};
        if(err){
            result.code = 500;
            result.error = err;
        }else{
            result.code = 200;
            result.data = data;
        }
        res.set("Content-type","application/json");
        res.send(result.code,result)
    });
}
