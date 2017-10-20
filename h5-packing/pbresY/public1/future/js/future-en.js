var isApp = typeof pbE != 'undefined';
ReactDOM.render(React.createElement(EntrustTitleFutures, null), document.getElementById('title'));

if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {

                },
                wtQueryEntrustRe: function () {
                    var data = {
                        functionNO: 56004,
                        jData: {
                            '223': 1
                        },
                        data: [
                            {
                                '64': '50ETF',
                                '54': '',
                                '129': 200,
                                '112': 0,
                                '117': 0,
                                '130': 222,
                                '156': 4,
                                '63': '',
                                '40': 1,
                                '113': 123,
                                '159': '13:00:00',
                                '114': 1234,
                                '163': '备注信息'
                            },
                            {
                                '64': '50ETF',
                                '54': '',
                                '129': 200,
                                '112': 0,
                                '117': 0,
                                '130': 222,
                                '156': 4,
                                '63': '',
                                '40': 1,
                                '113': 123,
                                '159': '20:00:00',
                                '114': 1234,
                                '163': '   '
                            },
                            {
                                '64': '50ETF',
                                '54': '',
                                '129': 200,
                                '112': 0,
                                '117': 0,
                                '130': 222,
                                '156': 4,
                                '63': '',
                                '40': 1,
                                '113': 123,
                                '159': '20:00:00',
                                '114': 1234
                            }
                        ]
                    };
                    return JSON.stringify(data);
                },
            }
            return obj;
        },
        SYS: function () {
            var obj2 = {
                stopLoading: function () {

                },
                startLoading: function () {

                }
            }
            return obj2;
        }

    }
}
var timer,
    refreshFlag = 1;

function callback(message) {
    var msg = JSON.parse(message);
    if (msg.functionNO == 56004) {
        if (msg.jData['223'] == 1) {
            if (!refreshFlag) {
                pbE.SYS().stopLoading();
                refreshFlag = 1;
            }
            var CONTENTS1 = pbE.WT().wtQueryEntrustRe(CID);
            if (CONTENTS1) {
                var CONTENTS = JSON.parse(CONTENTS1).data;
                //倒序排列
                if (CONTENTS[0]) {
                    CONTENTS = sortEntrust(CONTENTS);
                    ReactDOM.render(React.createElement(EntrustContentsFutures, {contents: CONTENTS}), document.getElementById('contents'));
                }
            }
        }
    } else if (msg.functionNO == 6022) {
        pbE.SYS().hideCircleView('Pbkey_Trade_WT_Circle');
        if (msg.jData['1'] >= 0) {
            $('#indicate').removeClass('hide');
            //撤单请求已发送的弹框，定时器1s
            timer = setTimeout(function () {
                $('#indicate').addClass('hide');
            }, 1000);
        } else {
            $('#cancel').addClass('hide');
            alert('撤单失败，请稍后重试');
        }
    } else if (msg.functionNO == 56005) {
        var CONTENTS2 = pbE.WT().wtQueryEntrustRe(CID);
        if (CONTENTS2) {
            var CONTENTS3 = JSON.parse(CONTENTS2).data;
            //倒序排列
            if (CONTENTS3[0]) {
                CONTENTS3 = sortEntrust(CONTENTS3);
                ReactDOM.render(React.createElement(EntrustContentsFutures, {contents: CONTENTS3}), document.getElementById('contents'));
            }
        }
    }
}

function reload() {
    $('#indicate').addClass('hide');
    $('#cancel').addClass('hide');
    pbE.SYS().startLoading();
    var CID = pbE.WT().wtGetCurrentConnectionCID();
    //先取上一次查询结果显示
    dataHis1 = pbE.WT().wtQueryEntrustRe(CID);
    if (dataHis1) {
        dataHis = JSON.parse(dataHis1).data;
        //倒序排列
        if (dataHis[0]) {
            dataHis = sortEntrust(dataHis);
            ReactDOM.render(React.createElement(EntrustContentsFutures, {contents: dataHis}), document.getElementById('contents'));
        }
    }
    pbE.SYS().stopLoading();
    if (isApp) {
        process(JSON.parse(pbE.SYS().readConfig('future/conf/future.json')));
    } else {
        $.get('../conf/future.json', process);
    }
}

function refresh() {
    pbE.SYS().startLoading();
    refreshFlag = 0;
    pbE.WT().wtSynFlash(CID);
}

function doShow(flag) {
    if (!flag) {
        pbE.SYS().stopLoading(); //离开页面时停止转圈
        $('#cancel').addClass('hide');
        $('#indicate').addClass('hide');
        clearTimeout(timer);
    }
}

var CID = pbE.WT().wtGetCurrentConnectionCID();
//先取上一次查询结果显示
pbE.SYS().startLoading();
var dataHis1 = pbE.WT().wtQueryEntrustRe(CID);
if (dataHis1) {
    var dataHis = JSON.parse(dataHis1).data;
    //倒序排列
    if (dataHis[0]) {
        dataHis = sortEntrust(dataHis);
        ReactDOM.render(React.createElement(EntrustContentsFutures, {contents: dataHis}), document.getElementById('contents'));
    }
}
pbE.SYS().stopLoading();

$('.my-modal-backdrop').click(function () {
    $('.my-modal').addClass('hide');
});


if (isApp) {
    process(JSON.parse(pbE.SYS().readConfig('future/conf/future.json')));
} else {
    $.get('../conf/future.json', process);
}
function process(config) {
    var con = config.en.fields;
    if (con[0].isShow) {
        $('.deal0').css('display', 'block')
    } else {
        $('.deal0').css('display', 'none')
    }
    if (con[1].isShow) {
        $('.deal1').css('display', 'block')
    } else {
        $('.deal1').css('display', 'none')
    }
    if (con[2].isShow) {
        $('.deal2').css('display', 'block')
    } else {
        $('.deal2').css('display', 'none')
    }
    if (con[3].isShow) {
        $('.deal3').css('display', 'block')
    } else {
        $('.deal3').css('display', 'none')
    }
}
