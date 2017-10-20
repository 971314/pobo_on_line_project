$(function () {
    var option = {
        callbacks:[
            {fun:6012,callback:call6012}
        ],
        reload:function () {
            pbApi.sys_startLoading();
            myDate = new Date();
            strToday = myDate.format('yyyy-MM-dd');
            $('#date').html(strToday);
            pbApi.wt_queryMoney(JSON.stringify({}));
        },
        doShow:function (flag) {
            if (!flag) pbApi.sys_stopLoading();
        }
    };

    pbPage.initPage(option);

    var isApp = typeof pbE != 'undefined';

    if(isApp){
        process(JSON.parse(pbApi.sys_readConfig('future/conf/future.json')));
    }else{
        $.get('../conf/future.json',process);
    }


    function scc() {
        /**
         * 日期格式化
         */
        Date.prototype.format = function (format) {
            var date = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "D+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "S+": this.getMilliseconds()
            };
            if (/(y+|Y+)/i.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in date) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                }
            }
            return format;
        };



        //小数转百分数
        Number.prototype.toPercent = function(n) {
            n = n || 2;
            return ( Math.round( this * Math.pow( 10, n + 2 ) ) / Math.pow( 10, n ) ).toFixed( n ) + '%';
        };

        if(typeof pbE == 'undefined'){
            $('#goBack').click(function () {
                location.href = document.referrer;
            })
        }else{
            $('#goBack').click(function () {
                location.href = 'goBack';
            });
        }
        var myDate = new Date();
        var strToday = myDate.format('yyyy-MM-dd');
        $('#date').html(strToday);
        pbApi.sys_startLoading();
        pbApi.wt_queryMoney(JSON.stringify({}));
    }

    /**
     * 币种字典
     */
    function getCurrency(code) {
        code = code - 0;
        switch (code) {
            case 0:
                return '人民币';
                break;
            case 1:
                return '美元';
                break;
            case 2:
                return '港币';
                break;
            case 3:
                return '欧元';
                break;
            case 4:
                return '澳元';
                break;
            case 5:
                return '日元';
                break;
            case 6:
                return '台湾币';
                break;
            default:
                return '未知';
                break;
        }
    }


    function process(data) {
        var dat = data.st;
        var i = '', e = '',s = '',v = '<div class="nav-blank1 row"></div>';
        dat.dataA.forEach(function (n) {
            i += '<div class="row status-row">'+n.name+'<span class="pull-right lh39" id='+n.id+'></span></div>'
        });
        dat.dataB.forEach(function (n) {
            e += '<div class="row status-row">'+n.name+'<span class="pull-right lh39" id='+n.id+'></span></div>'
        });
        dat.dataC.forEach(function (n) {
            s += '<div class="row status-row">'+n.name+'<span class="pull-right lh39" id='+n.id+'></span></div>'
        });
        $('.clearfix').html(v+i+v+e+v+s);
        scc()
    }

    function call6012(msg) {
        pbApi.sys_stopLoading();
        asset = msg.jData.data[0];
        $('#accNum').html(asset['51']);
        $('#currency').html(getCurrency(asset['56']));
        $('#rightNow').html((asset['97'] - 0).toFixed(2));
        $('#rightLast').html((asset['99'] - 0).toFixed(2));
        $('#available').html((asset['111'] - 0).toFixed(2));
        $('#canTrans').html((asset['95'] - 0).toFixed(2));
        if ((asset['345'] + '').indexOf('%') >= 0) {  //带有百分号，直接显示
            $('#risk').html(asset['345']);
        }else{
            $('#risk').html((asset['345']-0).toPercent(2));
        }

        if (asset['101'] > 0) {
            $('#ccpl').addClass('a3');
        } else if (asset['101'] < 0) {
            $('#ccpl').addClass('a4');
        } else if (asset['101'] == 0) {
            $('#ccpl').addClass('bolder');
        }
        if (asset['102'] > 0) {
            $('#pcpl').addClass('a3');
        } else if (asset['102'] < 0) {
            $('#pcpl').addClass('a4');
        } else if (asset['102'] == 0) {
            $('#pcpl').addClass('bolder');
        }
        $('#ccpl').html((asset['101'] - 0).toFixed(2));
        $('#pcpl').html((asset['102'] - 0).toFixed(2));
        $('#frozen').html((asset['94'] - 0).toFixed(2));
        $('#take').html((asset['152'] - 0).toFixed(2));
        /*if (!isNaN(asset['105'])) {
         $('#charge').html((asset['105'] - 0).toFixed(2));
         }*/
        $('#charge').html((asset['182'] - 0).toFixed(2));
        /*$('#takeCharge').html((asset['443'] - 0).toFixed(2));*/
        $('#inOut').html((asset['442'] - 0).toFixed(2));
    }
});
