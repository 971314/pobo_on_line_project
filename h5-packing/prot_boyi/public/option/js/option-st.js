/**
 * 币种字典
 */
function getUnit(code) {
  code = code - 0;
  switch (code) {
    case 0:
      return '元';
      break;
    case 1:
      return '美元';
      break;
    case 2:
      return '港币';
      break;
    case 3:
      return '欧元';
      break;
    case 4:
      return '澳元';
      break;
    case 5:
      return '日元';
      break;
    case 6:
      return '台币';
      break;
    default:
      return '未知';
      break;
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

var FundsInfoOptions = React.createClass({
  displayName: 'FundsInfoOptions',

  render: function () {
    var pl = null,
        risk = null,
        ratio1 = null,
        ratio = null,
        a,
        b;
    if (!isNaN(this.props.asset['101'])) {
      if (this.props.asset['101'] > 0) {
        pl = React.createElement(
          'p',
          { className: 'c3' },
          '+' + this.props.asset['101'] + this.props.asset.unit
        );
      } else if (this.props.asset['101'] < 0) {
        pl = React.createElement(
          'p',
          { className: 'c4' },
          this.props.asset['101'] + this.props.asset.unit
        );
      } else {
        pl = React.createElement(
          'p',
          { className: 'c1' },
          this.props.asset['101'] + this.props.asset.unit
        );
      }
    } else {
      pl = React.createElement(
        'p',
        { className: 'c1' },
        '--' + this.props.asset.unit
      );
    }

    if (this.props.asset['345']) {
      if (this.props.asset['345'] == 0) {
        risk = React.createElement(
          'p',
          { className: 'c1' },
          '0'
        );
      } else {
        a = per2num(this.props.asset['345']);
        b = 1.0 / a;
        if (a > 1) {
          risk = React.createElement(
            'p',
            { className: 'c1' },
            b.toPercent(2)
          );
        } else {
          risk = React.createElement(
            'p',
            { className: 'c1' },
            this.props.asset['345']
          );
        }
      }
    } else if (this.props.asset['107']) {
      if (this.props.asset['107'] == 0) {
        risk = React.createElement(
          'p',
          { className: 'c1' },
          '0'
        );
      } else {
        a = per2num(this.props.asset['107']);
        b = 1.0 / a;
        if (a > 1) {
          risk = React.createElement(
            'p',
            { className: 'c1' },
            b.toPercent(2)
          );
        } else {
          risk = React.createElement(
            'p',
            { className: 'c1' },
            this.props.asset['107']
          );
        }
      }
    } else {
      risk = React.createElement(
        'p',
        { className: 'c1' },
        '--'
      );
    }

    if (this.props.asset['107']) {
      if (this.props.asset['107'] == 0) {
        ratio = React.createElement(
          'p',
          { className: 'c1' },
          '0'
        );
      } else {
        a = per2num(this.props.asset['107']);
        b = 1.0 / a;
        if (a > 1) {
          ratio = React.createElement(
            'p',
            { className: 'c1' },
            b.toPercent(2)
          );
        } else {
          ratio = React.createElement(
            'p',
            { className: 'c1' },
            this.props.asset['107']
          );
        }
      }
    } else if (this.props.asset['345']) {
      if (this.props.asset['345'] == 0) {
        ratio = React.createElement(
          'p',
          { className: 'c1' },
          '0'
        );
      } else {
        a = per2num(this.props.asset['345']);
        b = 1.0 / a;
        if (a > 1) {
          ratio = React.createElement(
            'p',
            { className: 'c1' },
            b.toPercent(2)
          );
        } else {
          ratio = React.createElement(
            'p',
            { className: 'c1' },
            this.props.asset['345']
          );
        }
      }
    } else {
      ratio = React.createElement(
        'p',
        { className: 'c1' },
        '--'
      );
    }
    return React.createElement(
      'div',
      { className: 'cfg-funds-detail clearfix' },
        this.props.hides&&this.props.hides.indexOf('现金资产')!=-1 ? null : React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'd2' },
            '现金资产'
          ),
          React.createElement(
            'p',
            { className: 'c1' },
            this.props.asset['110'] + this.props.asset.unit
          )
        ),
        this.props.hides&&this.props.hides.indexOf('可用资金')!=-1 ? null : React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'd2' },
            '可用资金'
          ),
          React.createElement(
            'p',
            { className: 'c1' },
            this.props.asset['93'] + this.props.asset.unit
          )
        ),
        this.props.hides&&this.props.hides.indexOf('已占用保证金')!=-1 ? null : React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'd2' },
            '已占用保证金'
          ),
          React.createElement(
            'p',
            { className: 'c1' },
            this.props.asset['152'] + this.props.asset.unit
          )
        ),
        this.props.hides&&this.props.hides.indexOf('可取资金')!=-1 ? null : React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'd2' },
            '可取资金'
          ),
          React.createElement(
            'p',
            { className: 'c1' },
            this.props.asset['95'] + this.props.asset.unit
          )
        ),
        this.props.hides&&this.props.hides.indexOf('浮动盈亏')!=-1 ? null : React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'd2' },
            '浮动盈亏'
          ),
          React.createElement(
            'p',
            { className: 'c1' },
            pl
          )
        ),
        this.props.hides&&this.props.hides.indexOf('总市值')!=-1 ? null : React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'd2' },
            '总市值'
          ),
          React.createElement(
            'p',
            { className: 'c1' },
            this.props.asset['96'] + this.props.asset.unit
          )
        ),
        this.props.hides&&this.props.hides.indexOf('履约担保比例')!=-1 ? null : React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'd2' },
            '履约担保比例'
          ),
          ratio
        ),
        this.props.hides&&this.props.hides.indexOf('风险度')!=-1 ? null : React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'd2' },
            '风险度'
          ),
          risk
        ),
        this.props.hides&&this.props.hides.indexOf('上海限购额度')!=-1 ? null : React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'd2' },
            '上海限购额度'
          ),
          React.createElement(
            'p',
            { className: 'c1' },
            this.props.asset['475'] + this.props.asset.unit
          )
        ),
        this.props.hides&&this.props.hides.indexOf('上海剩余额度')!=-1 ? null : React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'd2' },
            '上海剩余额度'
          ),
          React.createElement(
            'p',
            { className: 'c1' },
            this.props.asset['477'] + this.props.asset.unit
          )
        ),
        this.props.hides&&this.props.hides.indexOf('深圳限购额度')!=-1 ? null : React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'd2' },
            '深圳限购额度'
          ),
          React.createElement(
            'p',
            { className: 'c1' },
            this.props.asset['476'] + this.props.asset.unit
          )
        ),
        this.props.hides&&this.props.hides.indexOf('深圳剩余额度')!=-1 ? null : React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            { className: 'd2' },
            '深圳剩余额度'
          ),
          React.createElement(
            'p',
            { className: 'c1' },
            this.props.asset['478'] + this.props.asset.unit
          )
        )
    );
  }
});

var NavHeader = React.createClass({
  displayName: 'NavHeader',

  render: function () {
    return React.createElement(
      'div',
      { className: 'container-fluid' },
      React.createElement(
        'div',
        { className: 'navbar-header' },
        React.createElement(
          'a',
          { href: 'goBack', className: 'navbar-brand' },
          React.createElement('img', { src: '../images/goback.png', alt: '返回' })
        )
      ),
      React.createElement(
        'p',
        { className: 'navbar-text' },
        this.props.name
      )
    );
  }
});

ReactDOM.render(React.createElement(NavHeader, { name: '资金现状' }), document.getElementById('nav-header'));

function callback(message) {
  pbSYS.stopLoading();
  var msg = JSON.parse(message);
  if (msg.functionNO == 6012) {
    asset = msg.jData.data[0];
    $('#total-asset').html(fmoney(asset['97'], 2));
    asset['unit'] = getUnit(asset['56']);
    if (asset['110'] && !isNaN(asset['110'])) {
      asset['110'] = fmoney(asset['110'], 2); //现金资产
    } else {
        asset['110'] = '--';
      }
    if (asset['93'] && !isNaN(asset['93'])) {
      asset['93'] = fmoney(asset['93'], 2); //可用资金
    } else {
        asset['93'] = '--';
      }
    if (asset['152'] && !isNaN(asset['152'])) {
      asset['152'] = fmoney(asset['152'], 2); //已占用保证金
    } else {
        asset['152'] = '--';
      }
    if (asset['95'] && !isNaN(asset['95'])) {
      asset['95'] = fmoney(asset['95'], 2); //可取资金
    } else {
        asset['95'] = '--';
      }
    if (asset['101'] && !isNaN(asset['101'])) {
      asset['101'] = fmoney(asset['101'], 2); //持仓浮动盈亏
    } else {
        asset['101'] = '--';
      }
    if (asset['96'] && !isNaN(asset['96'])) {
      asset['96'] = fmoney(asset['96'], 2); //总市值
    } else {
        asset['96'] = '--';
      }
    var a;
    if (asset['475'] && !isNaN(asset['475'])) {
      a = fmoney(asset['475'], 2);
      asset['475'] = a.substr(0, a.length - 3);
    } else {
      asset['475'] = '--';
    }
    if (asset['476'] && !isNaN(asset['476'])) {
      a = fmoney(asset['476'], 2);
      asset['476'] = a.substr(0, a.length - 3);
    } else {
      asset['476'] = '--';
    }
    if (asset['477'] && !isNaN(asset['477'])) {
      a = fmoney(asset['477'], 2);
      asset['477'] = a.substr(0, a.length - 3);
    } else {
      asset['477'] = '--';
    }
    if (asset['478'] && !isNaN(asset['478'])) {
      a = fmoney(asset['478'], 2);
      asset['478'] = a.substr(0, a.length - 3);
    } else {
      asset['478'] = '--';
    }
    getConfig("../conf/option.json", function(){
      ReactDOM.render(React.createElement(FundsInfoOptions, { asset: asset, hides: config.fundHides }), document.getElementById('contents'));
    })
  }
}

function reload() {
  CID = pbWT.wtGetCurrentConnectionCID();
  pbSYS.startLoading();
  pbWT.wtQueryMoney(CID, JSON.stringify({}));
}

function doShow(flag) {
  if (!flag) pbSYS.stopLoading();
}

var CID = pbWT.wtGetCurrentConnectionCID();
pbSYS.startLoading();
pbWT.wtQueryMoney(CID, JSON.stringify({}));
