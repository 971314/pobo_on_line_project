var option = {
        callbacks:[
            {fun:56004,callback:call56004},
            {fun:56006,callback:call56006}
        ],
        reload:function () {
            setBargain();
        },
        refresh:function () {
            pbApi.sys_startLoading();
            refreshFlag = 0;
            pbApi.wt_synFlash();
        },
        doShow:function (flag) {
            if (!flag) {
                pbApi.sys_stopLoading(); //离开页面时停止转圈
            }
        }
    };

    pbPage.initPage(option);

    var isApp = typeof pbE != 'undefined';
    ReactDOM.render(React.createElement(DealTitleFutures, null), document.getElementById('title'));

    if(typeof pbE == 'undefined'){
        window.pbE = {
            WT:function () {
                var obj = {
                    wtGetCurrentConnectionCID:function () {

                    },
                    wtGetHQInfo:function () {

                    },
                    wtQueryBargainRe:function () {
                        var data = {
                            functionNO:56004,
                            jData:{
                                '223':3
                            },
                            data:[
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
                                    '40':1,
                                    '113':125,
                                    '116':'10:10',
                                    '114':1000
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
                                    '40':1,
                                    '113':123,
                                    '116':'11:00',
                                    '114':1234
                                }
                            ]
                        }
                        return JSON.stringify(data);
                    },
                }
                return obj;
            },
            SYS:function () {
                var obj1 = {
                    stopLoading:function () {

                    },
                    startLoading:function () {

                    }
                }
                return obj1;
            }
        }
    }
    var refreshFlag = 1;


    function setBargain() {
        pbApi.sys_startLoading();
        //先取上一次查询结果显示
        dataHis1 = pbApi.wt_queryBargainRe();
        if (dataHis1) {
            dataHis = JSON.parse(dataHis1).data;

            for (var i = 0; i < dataHis.length; i++) {
                var market = dataHis[i]['54'],
                    code = dataHis[i]['63'];
                var marketInfo = JSON.parse(pbApi.wt_getHQInfo(code, market)); //交易信息转换行情信息
                dataHis[i]["name"] = marketInfo.HQName || "";
            }

            if (dataHis[0]) {
                dataHis = sortDeal(dataHis);
                new Vue({
                    el:'#contents'
                })
            }

        }

        pbApi.sys_startLoading();

    }

    var dataHis1, dataHis;
    setBargain();

    function call56004(msg) {
        if (msg.jData['223'] == 3) {
            if (!refreshFlag) {
                pbApi.sys_stopLoading();
                refreshFlag = 1;
            }
            setBargain();
        }
    }
    function call56006() {
        setBargain();
    }