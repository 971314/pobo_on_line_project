var DealTitleHistory = React.createClass({
  displayName: "DealTitleHistory",

  render: function () {
    return React.createElement(
      "div",
      { className: "row four-title" },
      React.createElement(
        "div",
        { className: "col-my-18 text-left" },
        "合约名称"
      ),
      React.createElement(
        "div",
        { className: "col-my-3 text-center" },
        "方向"
      ),
      React.createElement(
        "div",
        { className: "col-my-16 text-center" },
        "价/量"
      ),
      React.createElement(
        "div",
        { className: "col-my-11 text-center" },
        "成交日期"
      )
    );
  }
});

var DealContentsHistory = React.createClass({
  displayName: "DealContentsHistory",

  fold: function (index) {
    $('#hideBox' + index).toggleClass('hide');
    if ($('#arrow' + index).attr('src') == '../../images/arrow-up.png') $('#arrow' + index).attr('src', '../../images/arrow-down.png');else if ($('#arrow' + index).attr('src') == '../../images/arrow-down.png') $('#arrow' + index).attr('src', '../../images/arrow-up.png');
  },
  render: function () {
    var creatContents = function (content, index) {
      var direction = null;
      if (content['112'] == 0 && content['117'] == 0) {
        direction = React.createElement(
          "p",
          { className: "b3 lh55" },
          "买开"
        );
      } else if (content['112'] == 1 && content['117'] == 1) {
        direction = React.createElement(
          "p",
          { className: "b4 lh55" },
          "卖平"
        );
      } else if (content['112'] == 0 && content['117'] == 1) {
        direction = React.createElement(
          "p",
          { className: "b3 lh55" },
          "买平"
        );
      } else if (content['112'] == 1 && content['117'] == 0) {
        direction = React.createElement(
          "p",
          { className: "b4 lh55" },
          "卖开"
        );
      }
      /*content['114'] = (content['114'] - 0).toFixed(2);*/
      content['133'] = (content['133'] - 0).toFixed(2);

      return React.createElement(
        "div",
        { className: "folder-row" },
        React.createElement(
          "div",
          { className: "row content", onClick: this.fold.bind(null, index) },
          React.createElement(
            "div",
            { className: "col-my-18 text-left" },
            React.createElement(
              "p",
              { className: "b1 display-table-row" },
              React.createElement(
                "span",
                { className: "display-table-cell" },
                content['64']
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col-my-3 text-center" },
            direction
          ),
          React.createElement(
            "div",
            { className: "col-my-16 text-center" },
            React.createElement(
              "p",
              { className: "b1 lh28" },
              content['114']
            ),
            React.createElement(
              "p",
              { className: "b1 lh27" },
              content['113']
            )
          ),
          React.createElement(
            "div",
            { className: "col-my-11 text-center" },
            React.createElement("img", { src: "../../images/arrow-down.png", className: "pd24t pull-right", alt: "更多", id: 'arrow' + index }),
            React.createElement(
              "p",
              { className: "b1 lh55" },
              content['173']
            )
          )
        ),
        React.createElement(
          "div",
          { className: "row hide cfgHideBox", id: 'hideBox' + index },
            this.props.hides&&this.props.hides.indexOf("成交金额")!=-1?null:React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "span",
                null,
                "成交金额："
              ),
              React.createElement(
                "span",
                null,
                content['133']
              )
            ),
            this.props.hides&&this.props.hides.indexOf("是否备兑")!=-1?null:React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "span",
                null,
                "是否备兑："
              ),
              React.createElement(
                "span",
                null,
                content['126']
              )
            ),
            this.props.hides&&this.props.hides.indexOf("合约编码")!=-1?null:React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "span",
                null,
                "合约编码："
              ),
              React.createElement(
                "span",
                null,
                content['63']
              )
            ),
            this.props.hides&&this.props.hides.indexOf("成交时间")!=-1?null:React.createElement(
              "div",
              { className: "col-xs-6" },
              React.createElement(
                "span",
                null,
                "成交时间："
              ),
              React.createElement(
                "span",
                null,
                content['116']
              )
            ),
            this.props.hides&&this.props.hides.indexOf("备注信息")!=-1?null:React.createElement(
              "div",
              { className: "col-xs-12" },
              "备注信息：",
              content['163']
            )
        )
      );
    };
    return React.createElement(
      "div",
      null,
      this.props.contents.map(creatContents, this)
    );
  }
});

var dateYesterday = new Date();
var dateThree = new Date();
var dateWeek = new Date();
var dateMonth = new Date();
dateYesterday = new Date(dateYesterday.getTime() - 1000 * 60 * 60 * 24 * 1);
dateThree = new Date(dateThree.getTime() - 1000 * 60 * 60 * 24 * 3);
dateWeek = new Date(dateWeek.getTime() - 1000 * 60 * 60 * 24 * 7);
dateMonth = new Date(dateMonth.getTime() - 1000 * 60 * 60 * 24 * 30);
var strYesterday = dateYesterday.format('yyyyMMdd'),
    strThree = dateThree.format('yyyyMMdd'),
    strWeek = dateWeek.format('yyyyMMdd'),
    strMonth = dateMonth.format('yyyyMMdd');
var TIMES = {
  yesterday: strYesterday,
  three: strThree,
  week: strWeek,
  month: strMonth
};

var dataTime = {
  '171': strThree,
  '172': strYesterday
};

ReactDOM.render(React.createElement(NavHeader, { name: "历史成交" }), document.getElementById('nav-header'));
ReactDOM.render(React.createElement(TimeTitle, { times: TIMES }), document.getElementById('time-title'));
ReactDOM.render(React.createElement(DealTitleHistory, null), document.getElementById('title'));

if (!pbWT.wtGeneralRequestRe(CID, 6053) && pbWT.wtGeneralRequestRe(CID, 6053) != '') {
  //先取上一次查询结果显示
  var data1 = JSON.parse(pbWT.wtGeneralRequestRe(CID, 6053));
  //倒序排列
  sortDeal(data1);
  getConfig("../conf/option.json", function(){
    ReactDOM.render(React.createElement(DealContentsHistory, { contents: data1, hides: config.dealHides }), document.getElementById('contents'));
  })
}

var dataThree = null;
var dataWeek = null;
var dataMonth = null;
var dataRandom = null;
function callback(message) {
  pbSYS.stopLoading();
  var msg = JSON.parse(message);
  if (msg.functionNO == 6053) {
    var CONTENTS = msg.jData.data;
    sortDeal(CONTENTS);
    if (dataTime['171'] == strThree && dataTime['172'] == strYesterday) {
      dataThree = CONTENTS;
    } else if (dataTime['171'] == strWeek && dataTime['172'] == strYesterday) {
      dataWeek = CONTENTS;
    } else if (dataTime['171'] == strMonth && dataTime['172'] == strYesterday) {
      dataMonth = CONTENTS;
    } else {
      dataRandom = CONTENTS;
    }
    getConfig("../conf/option.json", function(){
      ReactDOM.render(React.createElement(DealContentsHistory, { contents: CONTENTS, hides: config.dealHides }), document.getElementById('contents'));
    });
  }
}

pbSYS.startLoading();
pbWT.wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));

var dateFrom = pikadayResponsive($('#date-from')[0], {
  format: 'YYYY-MM-DD',
  outputFormat: 'YYYYMMDD',
  placeholder: '起始日期'
});
var dateTo = pikadayResponsive($('#date-to')[0], {
  format: 'YYYY-MM-DD',
  outputFormat: 'YYYYMMDD',
  placeholder: '终止日期'
});
dateFrom.setDate(moment(strYesterday, 'YYYYMMDD'), 'YYYY-MM-DD');
dateTo.setDate(moment(strYesterday, 'YYYYMMDD'), 'YYYY-MM-DD');
$('#date-from').change(function (e) {
  var timer = 0;
  clearTimeout(timer);
  timer = setTimeout(function () {
    if ($('#date-from').val() <= $('#date-to').val()) {
      dataTime = {
        '171': $('#date-from').val(),
        '172': $('#date-to').val()
      };
      pbSYS.startLoading();
      pbWT.wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
    } else {
      alert('起始日期不得晚于终止日期');
    }
  }, 2000);
});
$('#date-to').change(function (e) {
  var timer = 0;
  clearTimeout(timer);
  timer = setTimeout(function () {
    if ($('#date-to').val() >= $('#date-from').val() && $('#date-to').val() <= strYesterday) {
      dataTime = {
        '171': $('#date-from').val(),
        '172': $('#date-to').val()
      };
      pbSYS.startLoading();
      pbWT.wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
    } else if ($('#date-to').val() > strYesterday) {
      alert('终止日期不得晚于昨天');
    } else if ($('#date-to').val() < $('#date-from').val()) {
      alert('终止日期不得早于起始日期');
    }
  }, 2000);
});

function doShow(flag) {
  if (!flag) pbSYS.stopLoading();
}
