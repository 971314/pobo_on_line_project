$(function () {
    ReactDOM.render(React.createElement(EntrustTitleFutures, null), document.getElementById('title'));
    var option = {
        callbacks:[
            {fun:56004,callback:call56004},
            {fun:6022,callback:call6022},
            {fun:56005,callback:call56005}
        ],
        reload:function () {
            $('#indicate').addClass('hide');
            $('#cancel').addClass('hide');
            setEntrust();
        },
        refresh:function () {
            pbApi.sys_startLoading();
            refreshFlag = 0;
            pbApi.wt_synFlash();
        },
        doShow:function (flag) {
            if (!flag) {
                pbApi.sys_stopLoading(); //离开页面时停止转圈
                $('#cancel').addClass('hide');
                $('#indicate').addClass('hide');
                clearTimeout(timer);
            }
        }
    };
    pbPage.initPage(option);

    var timer,
        refreshFlag = 1;


    function setEntrust() {
        pbApi.sys_startLoading();
        //先取上一次查询结果显示
        dataHis1 = pbApi.wt_queryEntrustRe();
        if (dataHis1) {
            dataHis = JSON.parse(dataHis1).data;
            for (var i = 0; i < dataHis.length; i++) {
                var market = dataHis[i]['54'],
                    code = dataHis[i]['63'];
                var marketInfo = JSON.parse(pbApi.wt_getHQInfo(code, market)); //交易信息转换行情信息
                dataHis[i]["name"] = marketInfo.HQName || "";
            }
            if (dataHis[0]) {
                dataHis = sortEntrust(dataHis);
                ReactDOM.render(React.createElement(EntrustContentsFutures, { contents: dataHis }), document.getElementById('contents'));
            }
        }
        pbApi.sys_startLoading();
    }

    var CID, dataHis1, dataHis;
    setEntrust();

    $('.my-modal-backdrop').click(function () {
        $('.my-modal').addClass('hide');
    });
    function call56004(msg) {
        if (msg.jData['223'] == 1) {
            if (!refreshFlag) {
                pbApi.sys_stopLoading();
                refreshFlag = 1;
            }
            setEntrust();
        }
    }

    function call6022(msg) {
        pbApi.sys_hideCircleView().Trade;
        pblog.info('1111');
        if (msg.jData['1'] >= 0) {
            $('#indicate').removeClass('hide');
            //撤单请求已发送的弹框，定时器1s
            timer = setTimeout(function () {
                $('#indicate').addClass('hide');
            }, 1000);
        } else {
            $('#cancel').addClass('hide');
            alert(msg.jData['2']);
        }
    }

    function call56005() {
        setEntrust();
    }
});




