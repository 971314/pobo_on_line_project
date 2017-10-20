/**
 * Created by pobo on 2017/2/14.
 */
var num = 0;
function addClick() {
    var dom = '<li><span class="img"></span><button>按钮</button><span>测试=测试=测试'+num+'</span><span></span></li>',dealnames = [
        {"name":"沪铜1702","market":5000,"code":'GLNG'},
        {"name":"沪铝1702","market":2001,"code":'010102'},
        {"name":"沪锌1702","market":2001,"code":"010302"},
        {"name":"沪铅1702","market":2001,"code":"010902"},
        {"name":"黄金1706","market":2001,"code":"010506"},
        {"name":"白银1706","market":2001,"code":"011006"},
        {"name":"螺纹1705","market":2001,"code":"010605"},
        {"name":"橡胶1705","market":2001,"code":"010705"},
        {"name":"沥青1706","market":2001,"code":"011106"},
        {"name":"热卷1705","market":2001,"code":"013005"},
        {"name":"沪镍1705","market":2001,"code":"013205"},
        {"name":"沪锡1701","market":2001,"code":"013301"},
        {"name":"玉米1705","market":2100,"code":"020305"},
        {"name":"L1705","market":2100,"code":"020405"},
        {"name":"PVC1705","market":2100,"code":"020605"},
        {"name":"鸡蛋1705","market":2100,"code":"020905"}
    ];
    if(window.pbE){
        for(var i = 0; i < dealnames.length;i++){
            pbE.HQ().hqSubscribe(0, JSON.stringify({"1":[{"2":dealnames[i].market,"3":dealnames[i].code}]}));
        }
        console.log('推送订阅');
    }
    setTimeout(function () {
        if(window.pbE){
            for(var i = 0; i < dealnames.length;i++){
                pbE.HQ().hqUnSubscribe(0, JSON.stringify({"1":[{"2":dealnames[i].market,"3":dealnames[i].code}]}));
            }
            console.log('退订订阅')
        }
    },5000);
    document.getElementById('ul').innerHTML += dom;
    num++;
    console.log(num)
}

function callback(message) {
    console.log('1');
    var msg = JSON.parse(message);
    console.log(msg);
}