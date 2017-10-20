!function(){
    var isPoboApp = typeof pbE != "undefined", el;
    if (isPoboApp) {
        var pbSYS = pbE.SYS(), pbMSG = pbE.MSG();
    }
    
    function callback(msg){
        if(pbMSG.ytzGetUnReadMsgCount()>0)
            $("#msgNum").addClass("red");
        else
            $("#msgNum").removeClass("red");
    }
    
    function reload() {
        var phone;
        if (isPoboApp) {
            phone = pbSYS.getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName');
        } else
            phone = 134354545;
        
        if(!phone) {
            $("#msgCon").hide();
            return;
        }
           
        if($("#msgCon").length==0) {
            $(el).append('<ul class="nav nav-pills nav-stacked" id="msgCon">'
                         + '<li><a class="msgMenu" href="pobo:pageId=900005&url=message/index.html">'
                         + '我的消息<span id="msgNum"></span><i class="more"></i>'
                         + '</a></li></ul>');
        }
        $("#msgCon").show();
        if(!pbMSG)
            return;
        if(pbMSG.ytzGetUnReadMsgCount()>0)
            $("#msgNum").addClass("red");
        else {
            $("#msgNum").removeClass("red");
            var hides = JSON.parse(pbSYS.readConfig("message/conf/message.json")).hides;
            var types = JSON.parse(pbMSG.ytzLoadHDMsgTypes(1)).Messages;
            types = types.concat(JSON.parse(pbMSG.ytzLoadHDMsgTypes(2)).Messages);
            for(var i=0;i<types.length;i++) {
                if(hides.indexOf(types[i].typeid) == -1)
                    pbMSG.ytzHandleMsgHistoryQuery(types[i].typeid-0, "");
            }
        } 
    }
    
    window.initMyMsg = function(id){
        el = id;
        if(pbPage.getInitState()) {
            pbPage.addModuleFunCallback(90007, 111, callback);
            pbPage.addReloadFun(reload);
        }else {
            pbPage.initPage({
                reload: reload,
                callbacks:[{module:90007, fun:111, callback:callback}]
            });
        }
        
        reload();
    }
}();
