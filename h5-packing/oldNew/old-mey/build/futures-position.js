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
var CID = pbEngine.getTradeCurrentConnectionCID();
//平仓浮动盈亏
var closePl, sumPl, charge;

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

//交易组件推送时更新页面       
function fresh() {
  close = 0, plFlag = 0;
  p = 0;
  pbEngine.queryMoney(CID, JSON.stringify({}));
  tradePart(CID);
}

function tradePart(CID) {
  var CONTENTS1 = pbEngine.queryStockRe(CID);
  if (CONTENTS1) {
    position = JSON.parse(CONTENTS1).data;
    if (position.length > 0) {
      var symbolData = {},
          marketData = [],
          unique = [];
      stockInfo = [];
      marketInfo = [];
      for (var i = 0; i < position.length; i++) {
        position[i]['flag'] = 0;
        var market = position[i]['54'],
            code = position[i]['63'];
        var obj = {},
            symbol = 0; //持仓信息(1：合约代码，2：成本价，3：当前数量，4：放大倍数，5：每手数量，6：买卖方向)
        marketInfo = JSON.parse(pbEngine.getHQInfo(code, market)); //交易信息转换行情信息
        if (code.indexOf('&') >= 0) symbol = 1;
        if (!marketInfo.HQCode || !marketInfo.HQMarket || isNaN(position[i]['136']) || symbol) {
          position[i]['flag'] = 1;
        }
        var rate = pbEngine.getHQPriceRate(marketInfo.HQCode, marketInfo.HQMarket),
            //获取行情商品价格倍数
        handNum = pbEngine.getTradeMSSL(code, market); //获取交易每手数量
        //合约代码
        obj['1'] = marketInfo.HQCode;
        //买入均价
        obj['2'] = position[i]['136'] - 0;
        //当前数量
        obj['3'] = position[i]['135'] - 0;
        //放大倍数
        obj['4'] = rate;
        //每手数量
        obj['5'] = handNum;
        //买卖方向
        obj['6'] = position[i]['112'];

        //存入持仓信息
        stockInfo.push(obj);
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
        position[i]['market'] = marketInfo.HQMarket;
        position[i]['code'] = marketInfo.HQCode;
        position[i]['groupflag'] = pbEngine.getHQGroupFlag(marketInfo.HQCode, marketInfo.HQMarket);
        position[i]['decimal'] = pbEngine.getHQPriceDecimal(marketInfo.HQCode, marketInfo.HQMarket);
        position[i]['136'] = position[i]['136'] + '';
        position[i]['136'] = decimalDec(position[i]['decimal'], position[i]['136']);
        position[i]['available'] = position[i]['137'];
        if (!position[i]['flag']) {
          position[i]['price'] = pbEngine.getHQNowPrice(marketInfo.HQCode, marketInfo.HQMarket);
          position[i]['base'] = pbEngine.getHQLastBasePrice(marketInfo.HQCode, marketInfo.HQMarket);
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

          //计算当日盈亏
          if (position[i]['503'] == '1') {
            //今仓，现价-开仓均价
            if (position[i]['price'] && !isNaN(position[i]['price'])) {
              position[i]['dayPl'] = ((position[i]['price'] - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * handNum;
              if (position[i]['112'] == '1') {
                position[i]['dayPl'] = 0 - position[i]['dayPl'];
              }
            }
          } else if (position[i]['503'] == '2') {
            //昨仓，现价-基准价
            if (position[i]['price'] && !isNaN(position[i]['price']) && position[i]['base'] && !isNaN(position[i]['base'])) {
              position[i]['dayPl'] = ((position[i]['price'] - position[i]['base'] - 0).toFixed(4) - 0) * position[i]['135'] * handNum;
              if (position[i]['112'] == '1') {
                position[i]['dayPl'] = 0 - position[i]['dayPl'];
              }
            }
          } else if (position[i]['503'] == '0') {
            //不分今昨仓，拆仓，1101字段代表今仓数量
            if (position[i]['1101'] == position[i]['135']) {
              //判断有没有昨仓
              if (position[i]['price'] && !isNaN(position[i]['price'])) {
                //没有昨仓，现价-今仓开仓成本
                position[i]['dayPl'] = ((position[i]['price'] - position[i]['1102'] - 0).toFixed(4) - 0) * position[i]['1101'] * handNum;
                if (position[i]['112'] == '1') {
                  position[i]['dayPl'] = 0 - position[i]['dayPl'];
                }
              }
            } else if (position[i]['1101'] < position[i]['135']) {
              if (position[i]['price'] && !isNaN(position[i]['price']) && position[i]['base'] && !isNaN(position[i]['base'])) {
                position[i]['dayPl'] = ((position[i]['price'] - position[i]['1102'] - 0).toFixed(4) - 0) * position[i]['1101'] * handNum + ((position[i]['price'] - position[i]['base'] - 0).toFixed(4) - 0) * (position[i]['135'] - position[i]['1101'] - 0) * handNum;
                if (position[i]['112'] == '1') {
                  position[i]['dayPl'] = 0 - position[i]['dayPl'];
                }
              }
            }
          }
        } else if (position[i]['flag']) {
          position[i]['profit'] = '--';
          position[i]['price'] = '--';
        }
      }
      position = sortPosition(position);
      ReactDOM.render(React.createElement(PositionContentsFutures, { contents: position }), document.getElementById('contents'));
      var completeP = false;
      totalPL = 0, sumPl = 0;
      for (var i = 0, l = position.length; i < l; i++) {
        if (typeof position[i]['dayPl'] == 'undefined' || isNaN(position[i]['dayPl'])) {
          if (position[i]['flag']) {
            continue;
          } else {
            completeP = false;
            break;
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
          charge = charge - 0;
          sumPl = (closePl + totalPL - charge - 0).toFixed(2);
          $('#float').html(sumPl + '元');
        }
      }
      symbolData['1'] = marketData;
      /*symbolData['5'] = column;*/
      symbolData['7'] = '1';
      pbEngine.hqSubscribe(0, JSON.stringify(symbolData));
    } else if (position.length <= 0) {
      pbEngine.stopLoading();
      plFlag = 1;
      totalPL = 0;
      stockInfo = [];
      $('#contents').empty();
      if (closePl) {
        $('#float').html((closePl - charge - 0).toFixed(2) + '元');
      }
    }
  }
}

function hqPart(msg) {
  var data = msg.jData.Data,
      lastPrice = 0,
      pl = 0;
  for (var i = 0, l = stockInfo.length; i < l; i++) {
    if (!position[i]['flag']) {
      for (var j = 0, ll = data.length; j < ll; j++) {
        if (stockInfo[i]['1'] == data[j]['10']) {
          if (data[j]['29'] && !isNaN(data[j]['29'])) {
            lastPrice = (data[j]['29'] - 0) / stockInfo[i]['4']; //获取现价/最新价
            pl = ((lastPrice - stockInfo[i]['2']).toFixed(4) - 0) * stockInfo[i]['3'] * stockInfo[i]['5'];
            if (stockInfo[i]['6'] == '1') {
              pl = 0 - pl;
            }
            /*lastPrice = (lastPrice - 0).toFixed(5);
            lastPrice = fiveDec(lastPrice);*/
            lastPrice = decimalDecPrice(position[i]['decimal'], lastPrice);
            //浮动盈亏
            stockInfo[i]['7'] = pl;
            position[i]['profit'] = pl;
            position[i]['price'] = lastPrice;
            position[i]['profit'] = (position[i]['profit'] - 0).toFixed(2);
            position[i]['base'] = pbEngine.getHQLastBasePrice(position[i]['code'], position[i]['market']);
            //计算当日盈亏
            if (position[i]['503'] == '1') {
              //今仓，现价-开仓均价
              if (position[i]['price'] && !isNaN(position[i]['price'])) {
                position[i]['dayPl'] = ((position[i]['price'] - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * stockInfo[i]['5'];
                if (position[i]['112'] == '1') {
                  position[i]['dayPl'] = 0 - position[i]['dayPl'];
                }
              }
            } else if (position[i]['503'] == '2') {
              //昨仓，现价-基准价
              if (position[i]['price'] && !isNaN(position[i]['price']) && position[i]['base'] && !isNaN(position[i]['base'])) {
                position[i]['dayPl'] = ((position[i]['price'] - position[i]['base'] - 0).toFixed(4) - 0) * position[i]['135'] * stockInfo[i]['5'];
                if (position[i]['112'] == '1') {
                  position[i]['dayPl'] = 0 - position[i]['dayPl'];
                }
              }
            } else if (position[i]['503'] == '0') {
              //不分今昨仓，拆仓，1101字段代表今仓数量
              if (position[i]['1101'] == position[i]['135']) {
                //判断有没有昨仓
                if (position[i]['price'] && !isNaN(position[i]['price'])) {
                  //没有昨仓，现价-今仓开仓成本
                  position[i]['dayPl'] = ((position[i]['price'] - position[i]['1102'] - 0).toFixed(4) - 0) * position[i]['1101'] * stockInfo[i]['5'];
                  if (position[i]['112'] == '1') {
                    position[i]['dayPl'] = 0 - position[i]['dayPl'];
                  }
                }
              } else if (position[i]['1101'] < position[i]['135']) {
                if (position[i]['price'] && !isNaN(position[i]['price']) && position[i]['base'] && !isNaN(position[i]['base'])) {
                  position[i]['dayPl'] = ((position[i]['price'] - position[i]['1102'] - 0).toFixed(4) - 0) * position[i]['1101'] * stockInfo[i]['5'] + ((position[i]['price'] - position[i]['base'] - 0).toFixed(4) - 0) * (position[i]['135'] - position[i]['1101'] - 0) * stockInfo[i]['5'];
                  if (position[i]['112'] == '1') {
                    position[i]['dayPl'] = 0 - position[i]['dayPl'];
                  }
                }
              }
            }
          } else {
            position[i]['dayPl'] = 0;
          }
        }
        break;
      }
    } else if (position[i]['flag']) {
      position[i]['profit'] = '--';
      position[i]['price'] = '--';
    }
  }
  position = sortPosition(position);
  ReactDOM.render(React.createElement(PositionContentsFutures, { contents: position }), document.getElementById('contents'));

  var complete = false;
  totalPL = 0, sumPl = 0;
  for (var i = 0, l = stockInfo.length; i < l; i++) {
    if (typeof position[i]['dayPl'] == 'undefined' || isNaN(position[i]['dayPl'])) {
      if (position[i]['flag']) {
        continue;
      } else {
        complete = false;
        break;
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
      sumPl = (totalPL - 0 + (closePl - 0) - charge - 0).toFixed(2);
      $('#float').html(sumPl + '元');
      /*asset['457'] = totalPL.toFixed(2);*/
      if (p == 1) pbEngine.stopLoading();
    }
    position = sortPosition(position);
    ReactDOM.render(React.createElement(PositionContentsFutures, { contents: position }), document.getElementById('contents'));
  }
}

function callback(message) {
  var msg = JSON.parse(message);
  if (msg.moduleId == 90002) {
    if (msg.functionNO == 6012) {
      asset = msg.jData.data[0];
      close = 1;
      closePl = asset['102'] - 0;
      charge = asset['182'] - 0;
      asset['97'] = (asset['97'] - 0).toFixed(2);
      asset['152'] = (asset['152'] - 0).toFixed(2);
      asset['111'] = (asset['111'] - 0).toFixed(2);
      if (plFlag) {
        asset['sumPl'] = (totalPL - 0 + (closePl - 0) - charge - 0).toFixed(2);
      } else {
        var arr = $('#float').html();
        asset['sumPl'] = arr.substring(0, arr.length - 1);
      }
      ReactDOM.render(React.createElement(FundsInfoFutures, { info: asset }), document.getElementById('fund'));
    } else if (msg.functionNO == 56004 && msg.reservId == CID) {
      if (msg.jData['223'] == 5) {
        if (!refreshFlag) {
          pbEngine.stopLoading();
          refreshFlag = 1;
        }
        fresh();
      }
    } else if (msg.functionNO == 56005 && msg.reservId == CID) {
      fresh();
    } else if (msg.functionNO == 56006 && msg.reservId == CID) {
      fresh();
    } else if (msg.functionNO == 56014 && msg.reservId == CID) {
      fresh();
    }
  } else if (msg.moduleId == 90000) {
    totalPL = 0;
    hqPart(msg);
  }
}

function reload() {
  close = 0;plFlag = 0;
  CID = pbEngine.getTradeCurrentConnectionCID();
  p = 0;
  pbEngine.queryMoney(CID, JSON.stringify({}));
  pbEngine.startLoading();
  tradePart(CID);
}

function isShow(flag) {
  if (!flag) pbEngine.stopLoading();
}

function refresh() {
  close = 0, plFlag = 0;
  pbEngine.startLoading();
  refreshFlag = 0;
  pbEngine.queryMoney(CID, JSON.stringify({}));
  pbEngine.synFlash(CID);
}

//先取上一次查询结果显示
var close = 0,
    plFlag = 0; //close平仓浮动盈亏是否返回的标志，plFlag总盈亏是否计算出来的标志
var CONTENT1 = pbEngine.queryMoneyRe(CID);
if (CONTENT1) {
  var assetHis = JSON.parse(CONTENT1).data[0];
  assetHis['97'] = (assetHis['97'] - 0).toFixed(2);
  assetHis['152'] = (assetHis['152'] - 0).toFixed(2);
  assetHis['111'] = (assetHis['111'] - 0).toFixed(2);
  assetHis['sumPl'] = '--';
  ReactDOM.render(React.createElement(FundsInfoFutures, { info: assetHis }), document.getElementById('fund'));
}
p = 0;
pbEngine.startLoading();
pbEngine.queryMoney(CID, JSON.stringify({}));
tradePart(CID);
