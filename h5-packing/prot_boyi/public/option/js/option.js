function fmoney(s, n) {   
   n = n > 0 && n <= 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1];   
   t = "";   
   for(i = 0; i < l.length; i ++ ) {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   return t.split("").reverse().join("") + "." + r;   
}

//小数转百分数
Number.prototype.toPercent = function(n) {
  n = n || 2;
  return ( Math.round( this * Math.pow( 10, n + 2 ) ) / Math.pow( 10, n ) ).toFixed( n ) + '%';
}

//百分数转小数
function per2num(per) {
  return per.replace(/([0-9.]+)%/, function (a, b) {return +b / 100;})
}


function reload() {
  pbSYS.startLoading();
  CID = pbWT.wtGetCurrentConnectionCID();
  loginInfo = JSON.parse(pbWT.wtLoginRe(CID));
  $('#accnum').html(loginInfo.data[0]['51']);
  $('#name').html(loginInfo.data[0]['74'].substr(0, 1) + '先生/女士');
  pbWT.wtQueryMoney(CID, JSON.stringify({}));
  pbWT.wtQueryStock(CID, JSON.stringify({}));
}

function refresh() {
  pbSYS.startLoading();
  refreshFlag = 0;
  pbWT.wtQueryMoney(CID, JSON.stringify({}));
  pbWT.wtQueryStock(CID, JSON.stringify({}));
}

function doShow(flag) {
  if (!flag) pbSYS.stopLoading();
}

//订阅行情数据市场合约代码
var symbolData = {};
//市场合约代码集合，存储需要订阅的市场合约代码
var marketData = [];
//订阅字段
/*var column = [{'6': '29'}, {'6': '24'}];*/
//持仓信息(存储合约代码相关属性：合约代码，成本价，持仓数，放大倍数，每手数量，买卖方向，浮动盈亏)
var stockInfo = [];
//合约代码去重使用
var unique = [];
//货币单位
var unit;
//市场信息
var marketInfo, totalPL = 0, refreshFlag = 1;
var CID = pbWT.wtGetCurrentConnectionCID();

pbSYS.startLoading();
var loginInfo = JSON.parse(pbWT.wtLoginRe(CID));
$('#accnum').html(loginInfo.data[0]['51']);
$('#name').html(loginInfo.data[0]['74'].substr(0, 1) + '先生/女士');
pbWT.wtQueryMoney(CID, JSON.stringify({}));
pbWT.wtQueryStock(CID, JSON.stringify({}));

function callback(message) {
  var msg = JSON.parse(message);
  if (msg.moduleId == 90002) {
    if (msg.functionNO == 6012) {
      pbSYS.stopLoading();
      var info = msg.jData.data[0];
      var unit = getUnit(info['56']);
      info['97'] = fmoney(info['97'], 2);
      $('#total-asset').html(info['97'] + unit);
      if (info['96'] < 0) {
        if (info['96'] > -1000) {
          info['96'] = (info['96'] - 0).toFixed(2);
          $('#position').html(info['96'] + unit);
        } else if (info['96'] <= -1000) {
          $('#position').html(fmoney(info['96'], 2) + unit);
        }
      } else if (info['96'] >= 0) {
        info['96'] = fmoney(info['96'], 2);  //持仓市值
        $('#position').html(info['96'] + unit);
      }
      info['111'] = fmoney(info['111'], 2);  //可用保证金
      $('#available').html(info['111'] + unit);
      info['152'] = fmoney(info['152'], 2);  //已用保证金
      $('#guarantee').html(info['152'] + unit);
      if (info['345']) {
        var a = per2num(info['345']);
        if (a > 1) {
          var b = 1.0 / a;
          $('#risk').html(b.toPercent(2));
        } else {
          $('#risk').html(info['345']);
        }
      } else if (info['107']) {
        var a = per2num(info['107']);
        if (a > 1) {
          var b = 1.0 / a;
          $('#risk').html(b.toPercent(2));
        } else {
          $('#risk').html(info['107']);
        }
      } else {
        $('#risk').html('--');
      }
    } else if (msg.functionNO == 6014) {
      if (!refreshFlag) {
        pbSYS.stopLoading();
        refreshFlag = 1;
      }
      var data = msg.jData.data;
      if (data.length > 0) {
        symbolData = {}, marketData = [], unique = [];
        stockInfo = [];
        marketInfo = [];
        for (var i = 0; i < data.length; i++) {
          var market = data[i]['54'],
              code = data[i]['63'];
          var obj = {}, symbol = 0; //持仓信息(1：合约代码，2：成本价，3：当前数量，4：放大倍数，5：每手数量，6：买卖方向)
          marketInfo = JSON.parse(pbWT.wtGetHQInfo(code, market)); //交易信息转换行情信息
          if (code.indexOf('&') >= 0) symbol = 1;
          if (!marketInfo.HQCode || !marketInfo.HQMarket || isNaN(parseFloat(data[i]['136'])) || symbol) {
            continue;
          }
          var rate = pbHQ.hqGetPriceRate(marketInfo.HQCode, marketInfo.HQMarket), //获取行情商品价格倍数
              handNum = pbWT.wtGetMSSL(code, market); //获取交易每手数量
              base = pbHQ.hqGetLastBasePrice(marketInfo.HQCode, marketInfo.HQMarket); //获取基准价
          //合约代码
          obj['1'] = marketInfo.HQCode;
          //买入均价
          obj['2'] = data[i]['136'] - 0;
          //当前数量
          obj['3'] = data[i]['135'] - 0;
          //放大倍数
          obj['4'] = rate;
          //每手数量
          obj['5'] = handNum;
          //买卖方向
          obj['6'] = data[i]['112'];
          //基准价
          obj['8'] = base;
          obj['9'] = marketInfo.HQMarket;

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
        }

        symbolData['1'] = marketData;
        /*symbolData['5'] = column;*/
        symbolData['7'] = '1';
        pbHQ.hqSubscribe(0, JSON.stringify(symbolData));
      } else if (data.length <= 0) {
        pbSYS.stopLoading();
        stockInfo = [];
        totalPL = 0;
        totalPL = fmoney(totalPL, 2);
        $('#total-PL').removeClass();
        $('#total-PL').addClass('c1 bolder');
        $('#total-PL').html('0' + '元');
      }
    } 
  } else if (msg.moduleId == 90000) {
      var data = msg.jData.Data;
      for (var i = 0, l = stockInfo.length; i < l; i++) {
        for (var j = 0, ll = data.length; j < ll; j++) {
          if (stockInfo[i]['1'] == data[j]['10']) {
            stockInfo[i]['8'] = pbHQ.hqGetLastBasePrice(stockInfo[i]['1'], stockInfo[i]['9']);
            if (data[j]['29'] && !isNaN(data[j]['29'])) {
              stockInfo[i]['price'] = (data[j]['29'] - 0) / stockInfo[i]['4']; //获取现价/最新价
              if (stockInfo[i]['price'] && !isNaN(stockInfo[i]['price'])) {
                stockInfo[i]['dayPl'] = ((stockInfo[i]['price'] - stockInfo[i]['2'] - 0).toFixed(4) - 0) * stockInfo[i]['3'] * stockInfo[i]['5'];
                if (stockInfo[i]['6'] == '1') {
                  stockInfo[i]['dayPl'] = 0 - stockInfo[i]['dayPl'];
                }
              }
            } else if (stockInfo[i]['8'] && !isNaN(stockInfo[i]['8'])) {
              stockInfo[i]['dayPl'] = ((stockInfo[i]['8'] - stockInfo[i]['2'] - 0).toFixed(4) - 0) * stockInfo[i]['3'] * stockInfo[i]['5'];
              if (stockInfo[i]['6'] == '1') {
                stockInfo[i]['dayPl'] = 0 - stockInfo[i]['dayPl'];
              }
            } else {
              stockInfo[i]['dayPl'] = 0;
            }
            stockInfo[i]['7'] = stockInfo[i]['dayPl'];
            break;
          } 
        }
      }

      var complete = false;
      totalPL = 0;
      for (var i = 0, l = stockInfo.length; i < l; i++) {
        if (typeof stockInfo[i]['7'] == 'undefined' || isNaN(stockInfo[i]['7'])) {
          complete = false;
          break;
        } else {
          totalPL = totalPL + stockInfo[i]['7'];
          complete = true;
        }
      }

      if (complete) {
        if (totalPL > 0) {
          $('#total-PL').removeClass();
          $('#total-PL').addClass('c3');
          if (totalPL < 1000) {
            totalPL = (totalPL - 0).toFixed(2);
            $('#total-PL').html('+' + totalPL + '元');
          } else if (totalPL >= 1000) {
            $('#total-PL').html('+' + fmoney(totalPL, 2) + '元');
          }
        } else if (totalPL < 0) {
          $('#total-PL').removeClass();
          $('#total-PL').addClass('c4');
          if (totalPL > -1000) {
            totalPL = (totalPL - 0).toFixed(2);
            $('#total-PL').html(totalPL + '元');
          } else if (totalPL <= -1000) {
            $('#total-PL').html(fmoney(totalPL, 2) + '元');
          }
        } else {
          $('#total-PL').removeClass();
          $('#total-PL').addClass('c1 bolder');
          $('#total-PL').html('0' + '元');
        }
      }
    }
  }

getConfig("conf/option.json", function(){
    createMenus($("#menuGroup"), config.index);
})