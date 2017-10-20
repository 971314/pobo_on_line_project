var config, params = location.search.substr(1).split("&");

function callback(msg){
    msg = JSON.parse(msg);
    if (msg.moduleId == 90007 && msg.functionNO == 111) {
        pbSYS.stopLoading();
        if(msg.errorCode != 0) {
            alert("errorCode:" + msg.errorCode);
            return;
        }
        if(msg.jData["1"] != "0"){
            alert("return code:" + msg.jData["1"]);
            return;
        }
        msg = JSON.parse(pbMSG.ytzGetProFileMsg(params[0]));
        loadData(msg);
    }
}

function loadData(msg) {
    if(msg.readed == 0)
        pbMSG.ytzUpdateReaded(msg.msgid);
    msg.time = msg.time.substr(0, 4) + "-" + msg.time.substr(4, 2) + "-" + msg.time.substr(6, 2)
    + " " + msg.time.substr(8, 2) + ":" + msg.time.substr(10, 2);
    var template = (config.types[msg.typeid] && config.types[msg.typeid].detailTemplate) || "DEFAULT"; 
    TEMPLATES.DETAIL[template].props = ["item"];

    new Vue({
        el:"#app",
        data: function(){
            this.$options.components.detail = Vue.extend(TEMPLATES.DETAIL[template]);
            return {
                msg: msg
            }
        }
    })
    $("#app").show();
}

function init(cfg) {
    config = cfg;
    isReady(function(){
        var title = "其他消息";
        var types = getMsgTypes(false);
        for(var i=0;i<types.length;i++){
            if(types[i].typeid == params[1]) {
                title = types[i].types;
                break;
            }
        }
        $("#navtxt").html(title);
        var msg = JSON.parse(pbMSG.ytzGetProFileMsg(params[0]));
        if(msg.msgid)
            loadData(msg);
        else {
            pbSYS.startLoading();
            pbMSG.ytzHandleMsgHistoryQuery(params[1]-0, "");
        }
    });
}

getConf("../", init);