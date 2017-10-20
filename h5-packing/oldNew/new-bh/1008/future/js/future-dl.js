var isApp = typeof pbE != 'undefined';
ReactDOM.render(React.createElement(DealTitleFutures, null), document.getElementById('title'));

if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {

                },
                wtQueryBargainRe: function () {
                    var data = {
                        functionNO: 56004,
                        jData: {
                            '223': 3
                        },
                        data: [
                            {
                                '64': '50ETF',
                                '54': '',
                                '159': 0,
                                '129': 200,
                                '112': 1,
                                '117': 1,
                                '130': 222,
                                '156': 3,
                                '63': '',
                                '40': 1,
                                '113': 125,
                                '116': '10:10',
                                '114': 1000
                            },
                            {
                                '64': '50ETF',
                                '54': '',
                                '159': 123,
                                '129': 200,
                                '112': 0,
                                '117': 0,
                                '130': 222,
                                '156': 3,
                                '63': '',
                                '40': 1,
                                '113': 123,
                                '116': '11:00',
                                '114': 1234
                            }
                        ]
                    }
                    return JSON.stringify(data);
                },
            }
            return obj;
        },
        SYS: function () {
            var obj1 = {
                stopLoading: function () {

                },
                startLoading: function () {

                }
            }
            return obj1;
        }
    }
}
var refreshFlag = 1;

function callback(message) {
    var msg = JSON.parse(message);
    if (msg.functionNO == 56004) {
        if (msg.jData['223'] == 3) {
            if (!refreshFlag) {
                pbE.SYS().stopLoading();
                refreshFlag = 1;
            }
            var CONTENTS1 = pbE.WT().wtQueryBargainRe(CID);
            if (CONTENTS1) {
                var CONTENTS = JSON.parse(CONTENTS1).data;
                //倒序排列
                if (CONTENTS[0]) {
                    CONTENTS = sortDeal(CONTENTS);
                    ReactDOM.render(React.createElement(DealContentsFutures, {contents: CONTENTS}), document.getElementById('contents'));
                }
            }
        }
    } else if (msg.functionNO == 56006) {
        var CONTENTS2 = pbE.WT().wtQueryBargainRe(CID);
        if (CONTENTS2) {
            var CONTENTS3 = JSON.parse(CONTENTS2).data;
            //倒序排列
            if (CONTENTS3[0]) {
                CONTENTS3 = sortDeal(CONTENTS3);
                ReactDOM.render(React.createElement(DealContentsFutures, {contents: CONTENTS3}), document.getElementById('contents'));
            }
        }
    }
}

function reload() {
    pbE.SYS().startLoading();
    var CID = pbE.WT().wtGetCurrentConnectionCID();
    //先取上一次查询结果显示
    dataHis1 = pbE.WT().wtQueryBargainRe(CID);
    if (dataHis1) {
        dataHis = JSON.parse(dataHis1).data;
        //倒序排列
        if (dataHis[0]) {
            dataHis = sortDeal(dataHis);
            ReactDOM.render(React.createElement(DealContentsFutures, {contents: dataHis}), document.getElementById('contents'));
        }
    }
    pbE.SYS().stopLoading();
}

function refresh() {
    pbE.SYS().startLoading();
    refreshFlag = 0;
    pbE.WT().wtSynFlash(CID);
}
function doShow(flag) {
    if (!flag) {
        pbE.SYS().stopLoading(); //离开页面时停止转圈
    }
}

var CID = pbE.WT().wtGetCurrentConnectionCID();
//先取上一次查询结果显示
pbE.SYS().startLoading();
var dataHis1 = pbE.WT().wtQueryBargainRe(CID);
if (dataHis1) {
    var dataHis = JSON.parse(dataHis1).data;
    //倒序排列
    if (dataHis[0]) {
        dataHis = sortDeal(dataHis);
        ReactDOM.render(React.createElement(DealContentsFutures, {contents: dataHis}), document.getElementById('contents'));
    }
}
pbE.SYS().stopLoading();
