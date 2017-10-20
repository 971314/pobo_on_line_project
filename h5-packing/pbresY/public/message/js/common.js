var isPoboApp = typeof pbE != "undefined";

function getConf(path, cb) {
    if(isPoboApp) {
        cb(JSON.parse(pbE.SYS().readConfig("message/conf/message.json")));
    }else {
        $.get(path + "conf/message.json?" + Date.now(), cb);
    }
}

function loading(flag){
    if(flag)
        pbSYS.showCircleView("Pbkey_Default_Circle",'{"Pbkey_Circle_MSG":"正在加载"}');
    else
        pbSYS.hideCircleView("Pbkey_Default_Circle");
}

if(!isPoboApp) {
    var pbE = {
        MSG: function(){
            return {
               ytzLoadHDMsgTypes: function(flag) {
                   var types;
                   if(flag==1)
                       types = [{"typeid":"1","types":"通知公告","isoff":"1"},
                       {"typeid":"3","types":"产品消息","isoff":"1"},
                       {"typeid":"2","types":"预警消息","isoff":"1"}];
                   else
                       types = [
                       {"typeid":"5","types":"每日资讯","isoff":"1"},
                       {"typeid":"6","types":"重要警示","isoff":"1"},
                       {"typeid":"7","types":"成交回报","isoff":"1"}];
                   return JSON.stringify(
                       {"Messages":types}
                       );   
               },
               ytzLoadProFileMsg: function(count, id){
                   var msg = [], time = Date.now();
                   id = id - 0;
                   for(var i=0;i<count;i++){
                       msg.push({msgid:++id, typeid:i%7+"", title:"消息标题"+id, cont:"消息内容"+id+" "+time,readed:i%2+"",time:"20161221195218",par:"908110508,沪银1412,触发预警,34680,+170,价格达到设定上限34680"});
                   }
                   return JSON.stringify({
                       Messages:msg
                   });
               },
               ytzLoadProfileTypeMsg: function(type, count, id){
                   var msg = [];
                   id = id - 0;
                   for(var i=0;i<count;i++){
                       msg.push({msgid:++id, typeid:type+"", title:"消息标题"+id, cont:"消息内容"+id,readed:i%2+"",time:"20161213195218",par:"908110508,沪银1412,触发预警,34680,+170,价格达到设定上限34680"});
                   }
                   return JSON.stringify({
                       Messages:msg
                   });
               },
               ytzLoadProfileTypesMsg: function(json){
                   json = JSON.parse(json);
                   return this.ytzLoadProfileTypeMsg(1, json.maxmsgcount-0, json.latestid);
               },
               ytzGetUnReadMsgCount: function() {
                   return 10;
               },
               ytzGetUnReadMsgCountByType: function(i){
                   return i;   
               },
               ytzUpdateReaded: function(){
                   
               },
               ytzGetProFileMsg: function(){
                    return JSON.stringify({msgid:1, typeid:"1", title:"消息标题", cont:"消息内容",par:"       消息内容\n消息内容消息内容\n消息内容", readed:0,time:"20161213195218"})
               },
               ytzCloudRequestInquire: function(){
                   callback(JSON.stringify({moduleId:90007, functionNO:113, errorCode:0, jData:{"1":"0","content":[{"4":"1","5":"0"},{"4":"2","5":"0"},{"4":"3","5":"0"},{"4":"4","5":"0"},{"4":"5","5":"1"},{"4":"6","5":"0"},{"4":"7","5":"0"},{"4":"8","5":"0"}]}}));
               },
               ytzCloudRequestOffLineMsg: function(typeid, b){
                   callback(JSON.stringify({moduleId:90007, functionNO:110, errorCode:0, jData:{"0":"110","1":"0","2":typeid+"","3":b?"1":"2"}}));
               },
               ytzHandleMsgHistoryQuery: function(typeid) {
                   console.log("sync:" + typeid);
                   var no = ++this.requestNo;
                   setTimeout(function(){
                       callback(JSON.stringify({
                       functionNO:111,
                       moduleId:90007,
                       requestNO:no
                   }))}, 1000);
                   return no;
               },
               ytzIsServiceReady: function(){
                    console.log("ready: " + (++this.count));
                    return this.count;
               },
               count:-3,
               requestNo:0    
            }
        },
        SYS: function(){
            return {
                showCircleView: function(){
                    console.log("loading");
                },
                hideCircleView: function(){
                    console.log("finished loading");
                },
                startLoading: function(){
                    console.log("start loading");  
                },
                stopLoading: function(){
                    console.log("stop loading");
                }
            }
        }
    }
}

var pbMSG = pbE.MSG(), pbSYS = pbE.SYS();

function getMsgTypes(flag) {
    var types = JSON.parse(pbMSG.ytzLoadHDMsgTypes(1)).Messages;
    if(flag) {
        var types2 = JSON.parse(pbMSG.ytzLoadHDMsgTypes(2)).Messages;
        for(var i=0;i<types2.length;i++){
            types2[i].other = true;
            types.push(types2[i]);
        }
    }
    return types;
}

function isReady(cb){
    if(pbMSG.ytzIsServiceReady()>=0)
        cb();
    else
        setTimeout(function(){
            isReady(cb);
        }, 1000);
}

var TEMPLATES = {
    LIST: {
        DEFAULT: {
            template:"<div>{{item.cont}}</div>"
        },
        UNKNOWN: {
            template:"<div>unknown type:{{item.typeid}}</div>"
        },
        pwarning: {
            created: function(){
                this.item.par = this.item.par.split(",");  
            },
            beforeUpdate: function() {
                if(typeof this.item.par == "string")
                    this.item.par = this.item.par.split(",");  
            },
            template:"<div>{{item.par[1]+item.par[5]}}</div>"
        }
    },
    DETAIL: {
        DEFAULT: {
            template:"<div class='pre'>{{item.par||item.cont}}</div>"
        }
    }
}