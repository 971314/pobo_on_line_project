if(!isPoboApp) {
    pbWT.wtQueryStock = function(){
        var data = [{
                        'market': 235,
                        'code': 4534,
                        'groupflag': '',
                        'profit': 343543,
                        '125': 1,
                        'remain': 0,
                        '64': '50ETF',
                        'price': 435,
                        '136': 322,
                        '135': 234,
                        'available': 34,
                        'date': ''
                     },
                     {
                        'market': 235,
                        'code': 4534,
                        'groupflag': '',
                        'profit': -343543,
                        '125': 1,
                        'remain': 10,
                        '64': '50ETF',
                        'price': 435,
                        '136': 322,
                        '135': 234,
                        'available': 34,
                        'date': ''
                     },
                     {
                        'market': 235,
                        'code': 4534,
                        'groupflag': '',
                        'profit': 564456,
                        '125': 0,
                        '112': 0,
                        'remain': 10,
                        '64': '50ETF',
                        'price': 435,
                        '136': 322,
                        '135': 234,
                        'available': 34,
                        'date': ''
                     },
                     {
                        'market': 235,
                        'code': 4534,
                        'groupflag': '',
                        'profit': 564456,
                        '125': 0,
                        '112': 1,
                        'remain': 0,
                        '64': '50ETF',
                        'price': 435,
                        '136': 322,
                        '135': 234,
                        'available': 34,
                        'date': '',
                            '152': 45
                        },
                        {
                            'market': 235,
                            'code': 4534,
                            'groupflag': '',
                            'profit': -343543,
                            '125': 0,
                            '112': 1,
                            'remain': 10,
                            '64': '50ETF',
                            'price': 435,
                            '136': 322,
                            '135': 234,
                            'available': 34,
                            'date': '',
                            '152': 34
                        }
                    ];
        ReactDOM.render(React.createElement(PositionContentsOptions, { contents: data }), document.getElementById('contents'));
    }
}

function fmoney(s, n) {
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1];
  t = "";
  for (i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
  }
  return t.split("").reverse().join("") + "." + r;
}

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

//小数转百分数
Number.prototype.toPercent = function (n) {
  n = n || 2;
  return (Math.round(this * Math.pow(10, n + 2)) / Math.pow(10, n)).toFixed(n) + '%';
};

//百分数转小数
function per2num(per) {
  return per.replace(/([0-9.]+)%/, function (a, b) {
    return +b / 100;
  });
}

/*日期格式化*/
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

/*计算两日期时间差，interval是计算类型：D是按照天、H是按照小时、M是按照分钟、S是按照秒、T是按照毫秒，date1是起始日期，格式为“2012-06-20”，date2是结束日期*/
function countTimeLength(interval, date1, date2) {
  var objInterval = { 'D': 1000 * 60 * 60 * 24, 'H': 1000 * 60 * 60, 'M': 1000 * 60, 'S': 1000, 'T': 1 };
  interval = interval.toUpperCase();
  var dt1 = Date.parse(date1.replace(/-/g, "/"));
  var dt2 = Date.parse(date2.replace(/-/g, "/"));
  try {
    return (dt2 - dt1) / objInterval[interval];
  } /*.toFixed(2)*/ //保留两位小数点
  catch (e) {
    return e.message;
  }
}

var PositionContentsOptions = React.createClass({
  displayName: "PositionContentsOptions",

  jump: function (content) {
    pbSYS.sendMessageToNative('Pbkey_H5_Position_XD_Data', JSON.stringify(content));
  },

  render: function () {
    var creatContents = function (content) {
      var pl = null,
          path = null,
          status = null,
          price = null,
          contract = null,
          remain = null;
      var href = 'pobo:uncheck=0&pageId=807003&market=' + content['market'] + '&code=' + content['code'] + '&groupflag=' + content['groupflag'] + '&hideflag=1';
      if (isNaN(content['profit'])) {
        pl = React.createElement(
          "p",
          { className: "lh35" },
          React.createElement(
            "span",
            { className: "b2" },
            "浮盈  ",
            React.createElement(
              "span",
              { className: "a1" },
              content['profit']
            )
          )
        );
      } else {
        if (content['profit'] > 0) {
          pl = React.createElement(
            "p",
            { className: "lh35" },
            React.createElement(
              "span",
              { className: "b2" },
              "浮盈  ",
              React.createElement(
                "span",
                { className: "a3" },
                '+' + content['profit']
              )
            )
          );
        } else if (content['profit'] < 0) {
          pl = React.createElement(
            "p",
            { className: "lh35" },
            React.createElement(
              "span",
              { className: "b2" },
              "浮盈  ",
              React.createElement(
                "span",
                { className: "a4" },
                content['profit']
              )
            )
          );
        } else if (content['profit'] == 0) {
          pl = React.createElement(
            "p",
            { className: "lh35" },
            React.createElement(
              "span",
              { className: "b2" },
              "浮盈  ",
              React.createElement(
                "span",
                { className: "a1" },
                content['profit']
              )
            )
          );
        }
      }
      if (content['125'] == '1' || content['125'] == '0' && content['112'] == '0') {
        if (content['profit'] > 0) {
          path = React.createElement(
            "div",
            { className: "imageBar pull-left" },
            React.createElement("img", { src: "../../images/redBar.png", alt: "盈利条" })
          );
        } else if (content['profit'] < 0) {
          path = React.createElement(
            "div",
            { className: "imageBar pull-left" },
            React.createElement("img", { src: "../../images/greenBar.png", alt: "盈利条" })
          );
        } else {
          path = React.createElement("div", null);
        }
      } else if (content['125'] == '0' && content['112'] == '1') {
        if (content['profit'] > 0) {
          path = React.createElement(
            "div",
            { className: "imageBar pull-left" },
            React.createElement("img", { src: "../../images/redBar.png", alt: "盈利条", height: "100", width: "2" })
          );
        } else if (content['profit'] < 0) {
          path = React.createElement(
            "div",
            { className: "imageBar pull-left" },
            React.createElement("img", { src: "../../images/greenBar.png", alt: "盈利条", height: "100", width: "2" })
          );
        } else {
          path = React.createElement("div", null);
        }
      }

      if (content['125'] == '1') {
        status = React.createElement(
          "div",
          { className: "pull-left pd7t pd3zy" },
          React.createElement("img", { src: "../../images/beidui.png", alt: "备兑", width: "21px", height: "42px" })
        );
        if (content['remain'] == '0') {
          remain = React.createElement(
            "p",
            { className: "pull-right" },
            "等待权利方行权"
          );
        } else {
          remain = React.createElement(
            "p",
            { className: "pull-right" },
            "剩余",
            React.createElement(
              "span",
              null,
              content['remain']
            ),
            "天"
          );
        }
      } else if (content['125'] == '0') {
        if (content['112'] == '0') {
          status = React.createElement(
            "div",
            { className: "pull-left pd7t pd3zy" },
            React.createElement("img", { src: "../../images/quanli.png", alt: "权利", width: "21px", height: "42px" })
          );
          remain = React.createElement(
            "p",
            { className: "pull-right" },
            "剩余",
            React.createElement(
              "span",
              null,
              content['remain']
            ),
            "天"
          );
        } else if (content['112'] == '1') {
          status = React.createElement(
            "div",
            { className: "pull-left pd7t pd3zy" },
            React.createElement("img", { src: "../../images/yiwu.png", alt: "义务", width: "21px", height: "42px" })
          );
          if (content['remain'] == '0') {
            remain = React.createElement(
              "p",
              { className: "pull-right" },
              "等待权利方行权"
            );
          } else {
            remain = React.createElement(
              "p",
              { className: "pull-right" },
              "剩余",
              React.createElement(
                "span",
                null,
                content['remain']
              ),
              "天"
            );
          }
        }
      }

      if (content['64']) {
        contract = content['64'];
      } else {
        contract = content['63'];
      }

      if (content['125'] == '1' || content['125'] == '0' && content['112'] == '0') {
        return React.createElement(
          "div",
          { className: "normal" },
          React.createElement("div", { className: "nav-blank" }),
          React.createElement(
            "div",
            { className: "position-row", onClick: this.jump.bind(null, content) },
            path,
            React.createElement(
              "div",
              { className: "details" },
              React.createElement(
                "div",
                { className: "details-title" },
                React.createElement(
                  "p",
                  { className: "a1" },
                  contract
                ),
                pl
              ),
              React.createElement(
                "div",
                { className: "details-content row" },
                status,
                React.createElement(
                  "div",
                  { className: "col-my-5 details-top" },
                  React.createElement(
                    "p",
                    { className: "c2" },
                    "现价 ",
                    React.createElement(
                      "span",
                      { className: "c1" },
                      content['price']
                    )
                  ),
                  React.createElement(
                    "p",
                    { className: "c2" },
                    "成本 ",
                    React.createElement(
                      "span",
                      { className: "c1" },
                      content['136']
                    )
                  )
                ),
                React.createElement(
                  "div",
                  { className: "pull-left col-my-6 details-top" },
                  React.createElement(
                    "p",
                    { className: "c2" },
                    "持仓 ",
                    React.createElement(
                      "span",
                      { className: "c1" },
                      content['135']
                    )
                  ),
                  React.createElement(
                    "p",
                    { className: "c2" },
                    "可用 ",
                    React.createElement(
                      "span",
                      { className: "c1" },
                      content['available']
                    )
                  )
                ),
                React.createElement(
                  "div",
                  { className: "remain" },
                  remain,
                  React.createElement(
                    "p",
                    { className: "pull-right" },
                    content['date']
                  )
                )
              )
            )
          )
        );
      } else if (content['125'] == '0' && content['112'] == '1') {
        return React.createElement(
          "div",
          { className: "special" },
          React.createElement("div", { className: "nav-blank" }),
          React.createElement(
            "div",
            { className: "position-row", onClick: this.jump.bind(null, content) },
            path,
            React.createElement(
              "div",
              { className: "details" },
              React.createElement(
                "div",
                { className: "details-title" },
                React.createElement(
                  "p",
                  { className: "a1" },
                  contract
                ),
                pl
              ),
              React.createElement(
                "div",
                { className: "details-content row" },
                status,
                React.createElement(
                  "div",
                  { className: "col-my-5 details-top" },
                  React.createElement(
                    "p",
                    { className: "c2" },
                    "现价 ",
                    React.createElement(
                      "span",
                      { className: "c1" },
                      content['price']
                    )
                  ),
                  React.createElement(
                    "p",
                    { className: "c2" },
                    "成本 ",
                    React.createElement(
                      "span",
                      { className: "c1" },
                      content['136']
                    )
                  )
                ),
                React.createElement(
                  "div",
                  { className: "pull-left col-my-6 details-top" },
                  React.createElement(
                    "p",
                    { className: "c2" },
                    "持仓 ",
                    React.createElement(
                      "span",
                      { className: "c1" },
                      content['135']
                    )
                  ),
                  React.createElement(
                    "p",
                    { className: "c2" },
                    "可用 ",
                    React.createElement(
                      "span",
                      { className: "c1" },
                      content['available']
                    )
                  )
                ),
                React.createElement(
                  "div",
                  { className: "remain" },
                  remain,
                  React.createElement(
                    "p",
                    { className: "pull-right" },
                    content['date']
                  )
                )
              )
            ),
            React.createElement(
              "div",
              { className: "bao" },
              React.createElement("img", { src: "../../images/bao.png", height: "20" }),
              React.createElement(
                "span",
                { className: "bao-num" },
                content['152']
              )
            )
          )
        );
      }
    };
    return React.createElement(
      "div",
      null,
      this.props.contents.map(creatContents, this)
    );
  }
});

var marketInfo,
    totalPL = 0,
    position,
    stockInfo = [],
    p = 0,
    asset,
    refreshFlag = 1;
var CID = pbWT.wtGetCurrentConnectionCID();
var dateToday = new Date();
dateToday = new Date(dateToday.getTime());
var strToday = dateToday.format('yyyy-MM-dd'); //当前日期格式化
var flag = 0;
var entrust;

function callback(message) {
  var msg = JSON.parse(message);
  if (msg.moduleId == 90002) {
    if (msg.functionNO == 6012) {
      asset = msg.jData.data[0];
      asset['152'] = fmoney(asset['152'], 2);
      asset['97'] = fmoney(asset['97'], 2);
      asset['93'] = fmoney(asset['93'], 2);
      $('#taken').html(asset['152'] + '元');
      if (asset['345']) {
        var a = per2num(asset['345']);
        if (a > 1) {
          var b = 1.0 / a;
          $('#risk').html(b.toPercent(2));
        } else {
          $('#risk').html(asset['345']);
        }
      } else if (asset['107']) {
        var a = per2num(asset['107']);
        if (a > 1) {
          var b = 1.0 / a;
          $('#risk').html(b.toPercent(2));
        } else {
          $('#risk').html(asset['107']);
        }
      } else {
        $('#risk').html('--');
      }
      $('#asset').html(asset['97'] + '元');
      $('#available').html(asset['93'] + '元');
    } else if (msg.functionNO == 6014) {
      if (!refreshFlag) {
        pbSYS.stopLoading();
        refreshFlag = 1;
      }
      position = msg.jData.data;
      if (position.length > 0) {
        var symbolData = {},
            marketData = [],
            unique = [];
        stockInfo = [];
        marketInfo = [];
        for (var i = 0; i < position.length; i++) {
          if (position[i]['137'] == '-99999999') {
            flag = 1; //需要发委托请求
            break;
          }
        }

        for (var i = 0; i < position.length; i++) {
          position[i]['flag'] = 0;
          var market = position[i]['54'],
              code = position[i]['63'];
          var obj = {},
              symbol = 0; //持仓信息(1：合约代码，2：成本价，3：当前数量，4：放大倍数，5：每手数量，6：买卖方向)
          marketInfo = JSON.parse(pbWT.wtGetHQInfo(code, market)); //交易信息转换行情信息
          if (code.indexOf('&') >= 0) symbol = 1;
          if (!marketInfo.HQCode || !marketInfo.HQMarket || isNaN(position[i]['136']) || symbol) {
            position[i]['flag'] = 1;
          }
          var rate = pbHQ.hqGetPriceRate(marketInfo.HQCode, marketInfo.HQMarket),
              //获取行情商品价格倍数
          handNum = pbWT.wtGetMSSL(code, market); //获取交易每手数量
          var dueDay = pbHQ.hqGetDueDate(marketInfo.HQCode, marketInfo.HQMarket);
          position[i]['date'] = dueDay;
          position[i]['remain'] = countTimeLength('D', strToday, dueDay);
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
          position[i]['groupflag'] = pbHQ.hqGetGroupFlag(marketInfo.HQCode, marketInfo.HQMarket);
          position[i]['decimal'] = pbHQ.hqGetPriceDecimal(marketInfo.HQCode, marketInfo.HQMarket);
          position[i]['136'] = position[i]['136'] + '';
          position[i]['136'] = decimalDec(position[i]['decimal'], position[i]['136']);
          if (position[i]['137'] == '-99999999') {
            position[i]['available'] = '--';
          } else {
            position[i]['available'] = position[i]['137'];
          }

          if (!position[i]['flag']) {
            position[i]['price'] = pbHQ.hqGetNowPrice(marketInfo.HQCode, marketInfo.HQMarket);
            position[i]['base'] = pbHQ.hqGetLastBasePrice(marketInfo.HQCode, marketInfo.HQMarket);
            //计算每条合约的盈亏
            if (position[i]['price'] && !isNaN(position[i]['price'])) {
              position[i]['profit'] = ((position[i]['price'] - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * handNum;
              if (position[i]['112'] == '1') {
                position[i]['profit'] = 0 - position[i]['profit'];
              }
              position[i]['dayPl'] = position[i]['profit'];
              position[i]['profit'] = (position[i]['profit'] - 0).toFixed(2);
            } else if (position[i]['base'] && !isNaN(position[i]['base'])) {
              //接口没有拿到现价，有基准价就用基准价计算盈亏，现价显示'--'
              position[i]['profit'] = ((position[i]['base'] - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * handNum;
              if (position[i]['112'] == '1') {
                position[i]['profit'] = 0 - position[i]['profit'];
              }
              position[i]['dayPl'] = position[i]['profit'];
              position[i]['profit'] = (position[i]['profit'] - 0).toFixed(2);
              position[i]['price'] = '--';
            }
          } else if (position[i]['flag']) {
            position[i]['profit'] = '--';
            position[i]['dayPl'] = position[i]['profit'];
            position[i]['price'] = '--';
          }
        }
        ReactDOM.render(React.createElement(PositionContentsOptions, { contents: position }), document.getElementById('contents'));

        totalPL = 0;
        for (var i = 0, l = position.length; i < l; i++) {
          if (typeof position[i]['dayPl'] == 'undefined' || isNaN(position[i]['dayPl'])) {
            continue;
          } else {
            totalPL = totalPL + (position[i]['dayPl'] - 0);
          }
        }
        if (totalPL > 0) {
          $('#float').removeClass();
          $('#float').addClass('a3');
          if (totalPL < 1000) {
            totalPL = (totalPL - 0).toFixed(2);
            $('#float').html('+' + totalPL + '元');
          } else if (totalPL >= 1000) {
            $('#float').html('+' + fmoney(totalPL, 2) + '元');
          }
        } else if (totalPL < 0) {
          $('#float').removeClass();
          $('#float').addClass('a4');
          if (totalPL > -1000) {
            totalPL = (totalPL - 0).toFixed(2);
            $('#float').html(totalPL + '元');
          } else if (totalPL <= -1000) {
            $('#float').html(fmoney(totalPL, 2) + '元');
          }
        } else {
          $('#float').removeClass();
          $('#float').addClass('a1 bolder');
          $('#float').html('0' + '元');
        }
        symbolData['1'] = marketData;
        /*symbolData['5'] = column;*/
        symbolData['7'] = '1';
        pbHQ.hqSubscribe(0, JSON.stringify(symbolData));
      } else if (position.length <= 0) {
        pbSYS.stopLoading();
        totalPL = 0;
        stockInfo = [];
        $('#contents').empty();
        if (totalPL > 0) {
          $('#float').removeClass();
          $('#float').addClass('a3');
          $('#float').html('+' + fmoney(totalPL, 2) + '元');
        } else if (totalPL < 0) {
          $('#float').removeClass();
          $('#float').addClass('a4');
          $('#float').html(fmoney(totalPL, 2) + '元');
        } else {
          $('#float').removeClass();
          $('#float').addClass('a1 bolder');
          $('#float').html('0' + '元');
        }
      }
      if (flag) pbWT.wtQueryEntrust(CID, JSON.stringify({}));
    } else if (msg.functionNO == 6019) {
      entrust = msg.jData.data;
      for (var i = 0; i < position.length; i++) {
        if (position[i]['137'] == '-99999999') {
          position[i]['froze'] = 0;
          for (var j = 0; j < entrust.length; j++) {
            if (position[i]['54'] == entrust[j]['54'] && position[i]['63'] == entrust[j]['63']) {
              if (entrust[j]['117'] == '1' && (entrust[j]['156'] == '0' || entrust[j]['156'] == '1' || entrust[j]['156'] == '2') && (entrust[j]['112'] == '0' && position[i]['112'] == '1' || entrust[j]['112'] == '1' && position[i]['112'] == '0')) {
                position[i]['froze'] += entrust[j]['130'] - entrust[j]['113'];
              }
            }
          }
          position[i]['available'] = position[i]['135'] - position[i]['froze'];
        }
      }
      ReactDOM.render(React.createElement(PositionContentsOptions, { contents: position }), document.getElementById('contents'));
    }
  } else if (msg.moduleId == 90000) {
    totalPL = 0;
    var data = msg.jData.Data,
        lastPrice = 0,
        pl = 0;
    for (var i = 0, l = stockInfo.length; i < l; i++) {
      if (!position[i]['flag']) {
        for (var j = 0, ll = data.length; j < ll; j++) {
          if (stockInfo[i]['1'] == data[j]['10']) {
            position[i]['base'] = pbHQ.hqGetLastBasePrice(position[i]['code'], position[i]['market']);
            if (data[j]['29'] && !isNaN(data[j]['29'])) {
              lastPrice = (data[j]['29'] - 0) / stockInfo[i]['4']; //获取现价/最新价
              pl = ((lastPrice - stockInfo[i]['2']).toFixed(4) - 0) * stockInfo[i]['3'] * stockInfo[i]['5'];
              if (stockInfo[i]['6'] == '1') {
                pl = 0 - pl;
              }
              lastPrice = decimalDecPrice(position[i]['decimal'], lastPrice);
              //浮动盈亏
              stockInfo[i]['7'] = pl;
              position[i]['profit'] = pl;
              position[i]['price'] = lastPrice;
              position[i]['dayPl'] = position[i]['profit'];
              position[i]['profit'] = (position[i]['profit'] - 0).toFixed(2);
            } else if (position[i]['base'] && !isNaN(position[i]['base'])) {
              pl = ((position[i]['base'] - stockInfo[i]['2'] - 0).toFixed(4) - 0) * stockInfo[i]['3'] * stockInfo[i]['5'];
              if (stockInfo[i]['6'] == '1') {
                pl = 0 - pl;
              }
              stockInfo[i]['7'] = pl;
              position[i]['profit'] = pl;
              position[i]['price'] = '--';
              position[i]['dayPl'] = position[i]['profit'];
              position[i]['profit'] = (position[i]['profit'] - 0).toFixed(2);
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
    ReactDOM.render(React.createElement(PositionContentsOptions, { contents: position }), document.getElementById('contents'));

    var complete = false;
    totalPL = 0;
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
      p++;
      if (close) {
        if (totalPL > 0) {
          $('#float').removeClass();
          $('#float').addClass('a3');
          if (totalPL < 1000) {
            totalPL = (totalPL - 0).toFixed(2);
            $('#float').html('+' + totalPL + '元');
          } else if (totalPL >= 1000) {
            $('#float').html('+' + fmoney(totalPL, 2) + '元');
          }
        } else if (totalPL < 0) {
          $('#float').removeClass();
          $('#float').addClass('a4');
          if (totalPL > -1000) {
            totalPL = (totalPL - 0).toFixed(2);
            $('#float').html(totalPL + '元');
          } else if (totalPL <= -1000) {
            $('#float').html(fmoney(totalPL, 2) + '元');
          }
        } else {
          $('#float').removeClass();
          $('#float').addClass('a1 bolder');
          $('#float').html('0' + '元');
        }
        /*asset['457'] = totalPL.toFixed(2);*/
        if (p == 1) pbSYS.stopLoading();
      }
      ReactDOM.render(React.createElement(PositionContentsOptions, { contents: position }), document.getElementById('contents'));
    }
  }
}

function reload() {
  dateToday = new Date();
  dateToday = new Date(dateToday.getTime());
  strToday = dateToday.format('yyyy-MM-dd'); //当前日期格式化
  CID = pbWT.wtGetCurrentConnectionCID();
  p = 0, totalPL = 0, flag = 0;
  pbSYS.startLoading();
  pbWT.wtQueryMoney(CID, JSON.stringify({}));
  pbWT.wtQueryStock(CID, JSON.stringify({}));
}

function doShow(flag) {
  if (!flag) pbSYS.stopLoading();
}

function refresh() {
  pbSYS.startLoading();
  refreshFlag = 0;
  p = 0, totalPL = 0, flag = 0;
  pbWT.wtQueryMoney(CID, JSON.stringify({}));
  pbWT.wtQueryStock(CID, JSON.stringify({}));
}

//先取上一次查询结果显示
var CONTENT1 = pbWT.wtQueryMoneyRe(CID);
if (CONTENT1) {
  var assetHis = JSON.parse(CONTENT1).data[0];
  assetHis['152'] = fmoney(assetHis['152'], 2);
  assetHis['97'] = fmoney(assetHis['97'], 2);
  assetHis['93'] = fmoney(assetHis['93'], 2);
  $('#taken').html(assetHis['152'] + '元');
  if (assetHis['345']) {
    $('#risk').html(assetHis['345']);
  } else if (assetHis['107']) {
    $('#risk').html(assetHis['107']);
  } else {
    $('#risk').html('--');
  }
  $('#asset').html(assetHis['97'] + '元');
  $('#available').html(assetHis['93'] + '元');
}
p = 0;
pbSYS.startLoading();
pbWT.wtQueryMoney(CID, JSON.stringify({}));
pbWT.wtQueryStock(CID, JSON.stringify({}));
