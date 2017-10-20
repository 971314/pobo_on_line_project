var isPoboApp = typeof pbE != "undefined";
if (isPoboApp) {
    var pbSYS = pbE.SYS();
}
var config;

function processConfig(cfg) {
    if (!config || config.my.version != cfg.my.version) {
        var s = "";
        for (var i = 0; i < cfg.my.data.length; i++) {
            var needRrade = cfg.my.data[i].needRrade ? true:false;
            s += "<li" + (i == 0 ? " style='margin-top:0;'" : "") + "><a href='javascript:;' onclick='myItenmClick(\""+cfg.my.data[i].url+"\","+needRrade+")'>" + cfg.my.data[i].name
                + '<img class="more" src="../../images/more.png" alt="详细"></a></li>';
        }
        $("#menus").html(s);
    }
    config = cfg;
}

function myItenmClick(url,needRrade) {
    console.log(url,needRrade);
    var cid = pbE.WT().wtGetCurrentConnectionCID();
    console.log(cid);
    if(needRrade === true) {
        if(cid <= 0){
            window.location.href = 'pobo:uncheck=1&pageId=802005';
        }else{
            window.location.href=url;
        }
    }
    else
    {
        window.location.href=url;
    }
}

pbPage.initPage({
    reload: function(){
        if (isPoboApp) {
            var phone = pbSYS.getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName');

        if (phone) {
            $('#info').show();
            $('#login').hide();
            $('#phone').html(phone.substr(0, 3) + '****' + phone.substr(-4));
        }
        else
        {
            $('#login').show();
            $('#info').hide();
        }

        processConfig(JSON.parse(pbSYS.readConfig("main/conf/main.json")));

        } else
            $.get("../conf/main.json?" + Date.now(), processConfig);
    }
});

reload();