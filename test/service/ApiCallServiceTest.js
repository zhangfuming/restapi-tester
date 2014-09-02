/**
 * Created by zhangfuming on 8/5/14.
 */

var ApiCallService = require("../../src/service/ApiCallService");

var options = {
      hostname: 'www.chargedot.com',
      port: 80,
      path: '/mob/city/data',
      method: 'GET',
      params:{
          name:"zhangsan",
          age:22
      }
};
ApiCallService.ApiCallService(options,function(err,data){
    if(err){
        console.log("error!" + err);
    }
    console.log(data);
});