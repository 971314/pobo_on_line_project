var option = {
    callbacks:[
        {module:90002,fun:6012,callback:call6012},
        {module:90002,fun:56004,callback:call56004},
        {module:90002,fun:56005,callback:callFresh},
        {module:90002,fun:56006,callback:callFresh},
        {module:90002,fun:56014,callback:callFresh},
        {module:90000,callback:call90000}
    ],
    reload:function () {
        close = 0;
        plFlag = 0;
        p = 0;
        tradePart();
        pbApi.wt_queryMoney(JSON.stringify({}));
        pbApi.sys_startLoading();
    },
    doShow:function (flag) {
        if (!flag) pbE.SYS().stopLoading();
    },
    refresh:function () {
        close = 0, plFlag = 0;
        pbE.SYS().startLoading();
        refreshFlag = 0;
        pbApi.wt_queryMoney(JSON.stringify({}));
        pbApi.wt_synFlash();
    },
    //交易组件推送时更新页面
    fresh:function () {
        close = 0, plFlag = 0;
        p = 0;
        pbApi.wt_queryMoney(JSON.stringify({}));
        tradePart();
    }
};

pbPage.initPage(option);

if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {

                },
                wtQueryMoney: function () {

                },
                wtQueryMoneyRe: function () {
                    var data = {
                        moduleId: 90002,
                        functionNO: 6012,
                        jData: {
                            data: [
                                {
                                    '102': 10,
                                    '182': 20,
                                    '97': 30,
                                    '152': 111,
                                    '111': 10,
                                    '63': 'GTF'
                                }
                            ]
                        }
                    }
                    callback(JSON.stringify(data));
                    $("#float").html(1026 + '元')
                },
                wtQueryStockRe: function () {

                }
            }
            return obj;
        },
        SYS: function () {
            var obj1 = {
                startLoading: function () {

                }
            }
            return obj1;
        }
    }
}

//订阅行情数据市场合约代码 var symbolData = {};
//市场合约代码集合，存储需要订阅的市场合约代码 var marketData = [];
//订阅字段
//var column = [{'6': '29'}, {'6': '24'}]; var column = [{'6': '29'}];
//持仓信息(存储合约代码相关属性：合约代码，成本价，持仓数，放大倍数，每手数量，买卖方向，浮动盈亏) var stockInfo = [];
//合约代码去重使用 var unique = [],
//浮动盈亏 totalPL,
//持仓的其他信息 position, marketInfo, asset;
var marketInfo,
    totalPL,
    position,
/*column = [{'6': '29'}, {'6': '24'}],*/stockInfo = [],
    p = 0,
    asset,
    refreshFlag = 1;
//平仓浮动盈亏
var closePl, sumPl;

//开仓均价保留到价格精度加上一位
function decimalDec(decimal, price) {
    price = price + '';
    var decIndex = price.indexOf('.');
    var length = price.length;
    if (decIndex >= 0) {
        if (length - 1 - decIndex >= decimal + 1) {
            price = price.substr(0, price.indexOf('.') + decimal + 2);
        } else {
            price = (price - 0).toFixed(decimal + 1);
        }
    } else {
        price = (price - 0).toFixed(decimal + 1);
    }
    return price;
}

//最新价保留到价格精度
function decimalDecPrice(decimal, price) {
    price = price + '';
    var decIndex = price.indexOf('.');
    var length = price.length;
    if (decIndex >= 0) {
        if (length - 1 - decIndex >= decimal) {
            price = price.substr(0, price.indexOf('.') + decimal + 1);
        } else {
            price = (price - 0).toFixed(decimal);
        }
    } else {
        price = (price - 0).toFixed(decimal);
    }
    return price;
}

function tradePart() {
    var CONTENTS1 = pbApi.wt_queryStockRe();
    if (CONTENTS1) {
        position = JSON.parse(CONTENTS1).data;
        if (position.length > 0) {
            var symbolData = {},
                marketData = [],
                unique = [];
            //stockInfo = [];
            marketInfo = [];
            for (var i = 0; i < position.length; i++) {
                position[i]['flag'] = 0;
                var market = position[i]['54'],
                    code = position[i]['63'];
                var obj = {},
                    symbol = 0; //持仓信息(1：合约代码，2：成本价，3：当前数量，4：放大倍数，5：每手数量，6：买卖方向)
                marketInfo = JSON.parse(pbApi.wt_getHQInfo(code, market)); //交易信息转换行情信息
                if (code.indexOf('&') >= 0) symbol = 1;
                if (!marketInfo.HQCode || !marketInfo.HQMarket || isNaN(position[i]['136']) || symbol) {
                    position[i]['flag'] = 1;
                }


                var rate = pbApi.hq_getPriceRate(marketInfo.HQCode, marketInfo.HQMarket),
                //获取行情商品价格倍数
                    handNum = pbApi.wt_getMSSL(code, market); //获取交易每手数量
                //合约代码
                //position[i]['1'] = marketInfo.HQCode;
                //买入均价
                position[i]['2'] = position[i]['136'] - 0;
                //当前数量
                position[i]['3'] = position[i]['135'] - 0;
                //放大倍数
                position[i]['4'] = rate;
                //每手数量
                position[i]['5'] = handNum;
                //买卖方向
                //position[i]['6'] = position[i]['112'];

                //存入持仓信息
                //stockInfo.push(obj);
                //去重数组不包含当前合约代码
                if (unique.indexOf(marketInfo.HQCode) < 0) {
                    //存入去重数组
                    unique.push(marketInfo.HQCode);
                    //存入市场合约代码集合
                    marketData.push({
                        '2': marketInfo.HQMarket,
                        '3': marketInfo.HQCode
                    });
                }

                position[i]['name']= marketInfo.HQName||"";
                position[i]['market'] = marketInfo.HQMarket;
                position[i]['code'] = marketInfo.HQCode;
                position[i]['groupflag'] = pbApi.hq_getGroupFlag(marketInfo.HQCode, marketInfo.HQMarket);
                position[i]['decimal'] = pbApi.hq_getPriceDecimal(marketInfo.HQCode, marketInfo.HQMarket);
                //position[i]['136'] = position[i]['136'] + '';
                position[i]['136'] = decimalDec(position[i]['decimal'], position[i]['136']);
                position[i]['available'] = position[i]['137'];

                if (!position[i]['flag']) {
                    position[i]['price'] = pbApi.hq_getNowPrice(marketInfo.HQCode, marketInfo.HQMarket);
                    position[i]['base'] = pbApi.hq_getLastBasePrice(marketInfo.HQCode, marketInfo.HQMarket);
                    //计算每条合约的盈亏
                    if (position[i]['price'] && !isNaN(position[i]['price'])) {
                        position[i]['profit'] = ((position[i]['price'] - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * handNum;
                        if (position[i]['112'] == '1') {
                            position[i]['profit'] = 0 - position[i]['profit'];
                        }
                        position[i]['profit'] = (position[i]['profit'] - 0).toFixed(2);
                    } else if (position[i]['base'] && !isNaN(position[i]['base'])) {
                        //接口没有拿到现价，有基准价就用基准价计算盈亏，现价显示'--'
                        position[i]['profit'] = ((position[i]['base'] - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * handNum;
                        if (position[i]['112'] == '1') {
                            position[i]['profit'] = 0 - position[i]['profit'];
                        }
                        position[i]['profit'] = (position[i]['profit'] - 0).toFixed(2);
                        position[i]['price'] = '--';
                    }

                    calcProfit(position, i, handNum);
                } else if (position[i]['flag']) {
                    position[i]['profit'] = '--';
                    position[i]['price'] = '--';
                }
            }

            //position = sortPosition(position);
            position.sort(
                firstBy(function (v) { return v[63].toUpperCase(); })
                    .thenBy("112")
                    .thenBy("503")
            );
            ReactDOM.render(React.createElement(PositionContentsFutures, {contents: position}), document.getElementById('contents'));
            var completeP = false;
            totalPL = 0, sumPl = 0;
            for (var i = 0, l = position.length; i < l; i++) {
                if (typeof position[i]['dayPl'] == 'undefined' || isNaN(position[i]['dayPl'])) {
                    if (position[i]['flag']) {
                        continue;
                    }
                } else {
                    totalPL = totalPL + (position[i]['dayPl'] - 0);
                    completeP = true;
                }
            }
            if (completeP) {
                plFlag = 1;
                if (close) {
                    closePl = closePl - 0;
                    totalPL = totalPL - 0;
                    sumPl = (closePl + totalPL - 0).toFixed(2);
                    $('#float').html(sumPl + '元');
                }
            }

            symbolData['1'] = marketData;
            /*symbolData['5'] = column;*/
            symbolData['7'] = '1';
            pbApi.hq_subscribe(0, JSON.stringify(symbolData));
        } else if (position.length <= 0) {
            pbApi.sys_stopLoading();
            plFlag = 1;
            totalPL = 0;
            //stockInfo = [];
            $('#contents').empty();
            if (closePl) {
                $('#float').html((closePl - 0).toFixed(2) + '元');
            }
        }
    }
}

function calcProfit(positions, index, handNum) {
    var i = index;
    var currP = positions[index];
    //计算当日盈亏
    if (currP['503'] == '1') {
        //今仓，现价-开仓均价
        if (currP['price'] && !isNaN(currP['price']) && currP['price'] != '--') {
            currP['dayPl'] = (( currP['price'] - currP['136'] - 0).toFixed(4) - 0) * currP['135'] * handNum;
            if (currP['112'] == '1') {
                currP['dayPl'] = 0 - currP['dayPl'];
            }
        }else if(currP['price'] == '--'){
            currP['dayPl'] = 0
        }
    } else if (currP['503'] == '2') {
        //昨仓，现价-基准价
        if (currP['price'] && !isNaN(currP['price']) && currP['price'] != '--' && currP['base'] && !isNaN(currP['base'])) {
            currP['dayPl'] = ((currP['price'] - currP['base'] - 0).toFixed(4) - 0) * currP['135'] * handNum;
            if (currP['112'] == '1') {
                currP['dayPl'] = 0 - currP['dayPl'];
            }
        }else if(currP['price'] == '--'){
            currP['dayPl'] = 0
        }
    } else if (currP['503'] == '0') {
        //不分今昨仓，拆仓，1101字段代表今仓数量
        if (currP['1101'] == currP['135']) {
            //判断有没有昨仓
            if (currP['price'] && !isNaN(currP['price']) && currP['price'] != '--') {
                //没有昨仓，现价-今仓开仓成本
                currP['dayPl'] = ((currP['price'] - currP['1102'] - 0).toFixed(4) - 0) * currP['1101'] * handNum;
                if (currP['112'] == '1') {
                    currP['dayPl'] = 0 - currP['dayPl'];
                }
            }else if(currP['price'] == '--'){
                currP['dayPl'] = 0
            }
        } else if (currP['1101'] < currP['135']) {
            if (currP['price'] && !isNaN(currP['price']) && currP['price'] != '--' && currP['base'] && !isNaN(currP['base'])) {
                currP['dayPl'] = ((currP['price'] - currP['1102'] - 0).toFixed(4) - 0) * currP['1101'] * handNum + ((currP['price'] - currP['base'] - 0).toFixed(4) - 0) * (currP['135'] - currP['1101'] - 0) * handNum;
                if (currP['112'] == '1') {
                    currP['dayPl'] = 0 - currP['dayPl'] ;
                }
            }else if(currP['price'] == '--'){
                currP['dayPl'] = 0
            }
        }
    }
}

function hqPart(msg) {
    hasSubscribe = true;
    var data = msg.jData.Data,
        lastPrice = 0,
        pl = 0;
    for (var i = 0, l = position.length; i < l; i++) {
        if (!position[i]['flag']) {
            for (var j = 0, ll = data.length; j < ll; j++) {
                if (position[i]['code'] == data[j]['10']) {
                    position[i]['base'] = pbApi.hq_getLastBasePrice(position[i]['code'], position[i]['market']);
                    if (data[j]['29'] && !isNaN(data[j]['29'])) {
                        lastPrice = (data[j]['29'] - 0) / position[i]['4']; //获取现价/最新价
                        pl = ((lastPrice - position[i]['2']).toFixed(4) - 0) * position[i]['3'] * position[i]['5'];
                        if (position[i]['112'] == '1') {
                            pl = 0 - pl;
                        }
                        /*lastPrice = (lastPrice - 0).toFixed(5);
                         lastPrice = fiveDec(lastPrice);*/
                        lastPrice = decimalDecPrice(position[i]['decimal'], lastPrice);
                        //浮动盈亏
                        position[i]['7'] = pl;
                        position[i]['profit'] = pl;
                        position[i]['price'] = lastPrice;
                        position[i]['profit'] = (position[i]['profit'] - 0).toFixed(2);
                        //计算当日盈亏
                        calcProfit(position, i, position[i]['5']);
                    } else {
                        position[i]['dayPl'] = 0;
                        position[i]['price'] = '--';
                        if (position[i]['base'] && !isNaN(position[i]['base'])) {
                            //接口没有拿到现价，有基准价就用基准价计算盈亏，现价显示'--'
                            position[i]['profit'] = ((position[i]['base'] - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * handNum;
                            if (position[i]['112'] == '1') {
                                position[i]['profit'] = 0 - position[i]['profit'];
                            }
                            position[i]['profit'] = (position[i]['profit'] - 0).toFixed(2);
                        } else {
                            position[i]['profit'] = '--';
                        }
                    }
                    $("#profit_"+position[i]['code']).html(position[i]['profit']);
                    $("#price_"+position[i]['code']).html(position[i]['price']);
                }
                break;
            }
        } else if (position[i]['flag']) {
            position[i]['profit'] = '--';
            position[i]['price'] = '--';
        }
    }
    //position = sortPosition(position);
    var complete = false;
    totalPL = 0, sumPl = 0;
    for (var i = 0, l = position.length; i < l; i++) {
        if (typeof position[i]['dayPl'] == 'undefined' || isNaN(position[i]['dayPl'])) {
            if (position[i]['flag']) {
                continue;
            }
        } else {
            totalPL = totalPL + (position[i]['dayPl'] - 0);
            complete = true;
        }
    }

    if (complete) {
        plFlag = 1;
        p++;
        if (close) {
            sumPl = (totalPL - 0 + (closePl - 0) - 0).toFixed(2);
            //
            /*asset['457'] = totalPL.toFixed(2);*/
            if (p == 1) pbApi.sys_stopLoading();
        }
        //position = sortPosition(position);
        //ReactDOM.render(React.createElement(PositionContentsFutures, {contents: position}), document.getElementById('contents'));
    }
}

var hasSubscribe = false;

if(updateVal)
{
    clearInterval(updateVal);
    updateVal = null;
}

var updateVal = setInterval(function () {
    if (hasSubscribe) {

        if (sumPl && sumPl != 0)
            $('#float').html(sumPl + '元');
        /*console.log(sumPl);
         console.log("更新");*/
        //ReactDOM.render(React.createElement(PositionContentsFutures, {contents: position}), document.getElementById('contents'));
        hasSubscribe = false;
    }

}, 100);

//先取上一次查询结果显示
var close = 0,
    plFlag = 0; //close平仓浮动盈亏是否返回的标志，plFlag总盈亏是否计算出来的标志
var CONTENT1 = pbApi.wt_queryMoneyRe();
if (CONTENT1) {
    var assetHis = JSON.parse(CONTENT1).data[0];
    assetHis['97'] = (assetHis['97'] - 0).toFixed(2);
    assetHis['152'] = (assetHis['152'] - 0).toFixed(2);
    assetHis['111'] = (assetHis['111'] - 0).toFixed(2);
    assetHis['sumPl'] = '--';
    ReactDOM.render(React.createElement(FundsInfoFutures, {info: assetHis}), document.getElementById('fund'));
}
p = 0;
pbApi.sys_startLoading();
tradePart();
pbApi.wt_queryMoney(JSON.stringify({}));

function call6012(msg) {
    asset = msg.jData.data[0];
    close = 1;
    closePl = asset['102'] - 0;
    asset['97'] = (asset['97'] - 0).toFixed(2);
    asset['152'] = (asset['152'] - 0).toFixed(2);
    asset['111'] = (asset['111'] - 0).toFixed(2);
    if (plFlag) {
        asset['sumPl'] = (totalPL - 0 + (closePl - 0) - 0).toFixed(2);
    } else {
        var arr = $('#float').html();
        asset['sumPl'] = arr.substring(0, arr.length - 1);
    }
    ReactDOM.render(React.createElement(FundsInfoFutures, {info: asset}), document.getElementById('fund'));
}

function call56004(msg) {
    if (msg.jData['223'] == 5) {
        if (!refreshFlag) {
            pbE.SYS().stopLoading();
            refreshFlag = 1;
        }
        fresh();
    }
}

function callFresh() {
    fresh();
}

function call90000() {
    totalPL = 0;
    hqPart(msg);
}