$(function () {
    var option = {
        callbacks:[{fun:6205,callback:call6205}]
    };
    pbPage.initPage(option);

    ReactDOM.render(React.createElement(NavHeader, { name: '当日转账记录' }), document.getElementById('nav-header'));
    if(typeof pbE == 'undefined'){
        window.pbE = {
            WT:function () {
                var obj = {
                    wtGeneralRequest:function () {
                        var data = {
                            functionNO:6205,
                            jData:{
                                '1':0,
                                data:[
                                    {
                                        '56':0,
                                        '216':'工商银行',
                                        '207':'转入',
                                        '200':123456,
                                        '228':'10:10',
                                        '211':'成功',
                                        '224':0,
                                        '220':1234561,
                                        '226':'备注信息'
                                    },
                                    {
                                        '56':0,
                                        '216':'工商银行',
                                        '207':'转入',
                                        '200':123456,
                                        '228':'10:10',
                                        '211':'成功',
                                        '224':0,
                                        '220':1234561,
                                        '226':'   '
                                    },
                                    {
                                        '56':0,
                                        '216':'工商银行',
                                        '207':'转入',
                                        '200':123456,
                                        '228':'10:10',
                                        '211':'成功',
                                        '224':0,
                                        '220':1234561
                                    }
                                ]
                            }
                        };
                        callback(JSON.stringify(data))
                    }
                }
                return obj;
            }
        }
        $('#goBack').click(function () {
            location.href = document.referrer;
        })
    }else{
        $('#goBack').click(function () {
            location.href = 'goBack';
        })
    }

    function call6205(msg) {
        if (msg.jData['1'] < 0) {
            alert(msg.jData['2']);
        } else {
            var CONTENTS = msg.jData.data;
            ReactDOM.render(React.createElement(RecContentsFutures, { contents: CONTENTS }), document.getElementById('contents'));
        }
    }
    pbApi.wt_generalRequest(6205, JSON.stringify({}));
});
