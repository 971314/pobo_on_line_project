/**
 * Created by pobo on 2017/2/27.
 */
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

function callback(message) {
    //console.log(message);
    var msg = JSON.parse(message);
    if (msg.functionNO == 56004) {
        console.log('56004')
        console.log('56004');
        if (msg.jData['223'] == 3) {
            if (!refreshFlag) {
                pbE.SYS().stopLoading();
                refreshFlag = 1;
            }
            setBargain();
        }
    } else if (msg.functionNO == 56006) {
        console.log('56006')
        setBargain();
    }
}


function setBargain() {
    pbE.SYS().startLoading();
    var CID = pbE.WT().wtGetCurrentConnectionCID();
    //先取上一次查询结果显示
    dataHis1 = pbE.WT().wtQueryBargainRe(CID);
    if (dataHis1) {
        dataHis = JSON.parse(dataHis1).data;

        for (var i = 0; i < dataHis.length; i++) {
            var market = dataHis[i]['54'],
                code = dataHis[i]['63'];
            var marketInfo = JSON.parse(pbE.WT().wtGetHQInfo(code, market)); //交易信息转换行情信息
            dataHis[i]["name"] = marketInfo.HQName || "";
        }

        if (dataHis[0]) {
            dataHis = sortDeal(dataHis);
            console.log(dataHis.length)
            // ReactDOM.render(React.createElement(DealContentsFutures, {contents: dataHis}), document.getElementById('contents'));
            vm = new Vue({
                el:'#contents',
                data:{
                    datas:dataHis,
                    memorys:[]
                },
                watch:{
                    datas:function (data) {
                        console.log(data);

                    }
                },
                created:function () {
                    var _this = this,
                        data = _this.datas,
                        contract = null,
                        direction = {};
                    for(var i = 0;i < data.length; i++){
                        if (data[i]['112'] == 0 && data[i]['117'] == 0) {
                            direction = {
                                b3:true,
                                b4:false,
                                text:'买开'
                            };
                        } else if (data[i]['112'] == 1 && data[i]['117'] == 1) {
                            direction = {
                                b3:false,
                                b4:true,
                                text:'卖平'
                            };
                        } else if (data[i]['112'] == 0 && data[i]['117'] == 1) {
                            direction = {
                                b3:true,
                                b4:false,
                                text:'买平'
                            };
                        } else if (data[i]['112'] == 1 && data[i]['117'] == 0) {
                            direction = {
                                b3:false,
                                b4:true,
                                text:'卖开'
                            };
                        } else if (data[i]['112'] == 0 && data[i]['117'] == 2) {
                            direction = {
                                b3:true,
                                b4:false,
                                text:'买平今'
                            };
                        } else if (data[i]['112'] == 1 && data[i]['117'] == 2) {
                            direction = {
                                b3:false,
                                b4:true,
                                text:'卖平今'
                            };
                        }
                        if (data[i]['name']){
                            contract = data[i]['name']
                        }else if(data[i]['64']) {
                            contract = data[i]['64'];
                        } else {
                            contract = data[i]['63'];
                        }
                        _this.memorys.push({
                            price:floatToFixed(data[i]['114'], 2),
                            num:floatToFixed(data[i]['113'],0),
                            direction:direction,
                            contract:contract,
                            time:data[i]['116']
                        });
                        // _this.$set(_this.memorys.price,floatToFixed(data[i]['114'], 2));
                        // _this.$set(_this.memorys.num,floatToFixed(data[i]['113'],0));
                        // _this.$set(_this.memorys.direction,direction);
                        // _this.$set(_this.memorys.contract,contract);
                        // _this.$set(_this.memorys.time,time);
                    }
                    console.log(data.length);
                    console.log(_this.memorys.length)
                },
                methods:{
                    
                }
            })
        }

    }
    pbE.SYS().startLoading();

}

function reload() {
    setBargain();
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
var CID, dataHis1, dataHis,vm;
setBargain();
