function processConfig(o) {
    if (!config || config.my.version != o.my.version) {
        for (var n = "", e = 0; e < o.my.data.length; e++) n += "<li" + (0 == e ? ' style="margin-top:0;"' : "") + '><a href="' + o.my.data[e].url + '">' + o.my.data[e].name + '<img class="more" src="../../images/more.png" alt="详细"></a></li>';
        $("#menus").html(n)
    }
    config = o
}

function reload() {
    if (isPoboApp) {
        var o = pbSYS.getAppCertifyInfo("PbKey_H5_Home_Auth_LoginName");
        $("#phone").html(o.substr(0, 3) + "****" + o.substr(-4)), processConfig(JSON.parse(pbSYS.readConfig("main/conf/main.json")))
    } else $.get("../conf/main.json?" + Date.now(), processConfig)
}
var isPoboApp = "undefined" != typeof pbE;
if (isPoboApp) var pbSYS = pbE.SYS();
var config;
reload();
