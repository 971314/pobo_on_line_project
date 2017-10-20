var EntrustTitleHistory = React.createClass({
  displayName: "EntrustTitleHistory",

  render: function () {
    return React.createElement(
      "div",
      { className: "row four-title" },
      React.createElement(
        "div",
        { className: "col-my-1 text-left" },
        "合约名称"
      ),
      React.createElement(
        "div",
        { className: "col-my-16 text-right" },
        "委托日期"
      ),
      React.createElement(
        "div",
        { className: "col-my-14 text-right" },
        "方向"
      ),
      React.createElement(
        "div",
        { className: "col-my-4 text-center" },
        "价/量"
      ),
      React.createElement(
        "div",
        { className: "col-my-12 status text-right" },
        React.createElement(
          "span",
          null,
          "状态"
        ),
        React.createElement("span", { id: "order" })
      )
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

ReactDOM.render(React.createElement(NavHeader, { name: "历史委托" }), document.getElementById('nav-header'));
ReactDOM.render(React.createElement(TimeTitle, { times: TIMES, entrust: true }), document.getElementById('time-title'));
ReactDOM.render(React.createElement(EntrustTitleHistory, null), document.getElementById('title'));

if (!pbWT.wtGeneralRequestRe(CID, 6052) && pbWT.wtGeneralRequestRe(CID, 6052) != '') {
  //先取上一次查询结果显示
  var data1 = JSON.parse(pbWT.wtGeneralRequestRe(CID, 6052));
  //倒序排列
  sortEntrust(data1);
  getConfig("../conf/option.json", function(){
    ReactDOM.render(React.createElement(EntrustContentsFutures, { contents: data1, history: true, hides: config.entrustHides }), document.getElementById('contents'));
  })
}

var dataThree = null;
var dataWeek = null;
var dataMonth = null;
var dataRandom = null;
function callback(message) {
  pbSYS.stopLoading();
  var msg = JSON.parse(message);
  if (msg.functionNO == 6052) {
    var CONTENTS = msg.jData.data;
    sortEntrust(CONTENTS);
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
      ReactDOM.render(React.createElement(EntrustContentsOptions, { contents: CONTENTS, history: true, hides: config.entrustHides }), document.getElementById('contents'));
    });
  }
}

pbSYS.startLoading();
pbWT.wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));

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
      pbWT.wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
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
      pbWT.wtGeneralRequest(CID, 6052, JSON.stringify(dataTime));
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

//$('.status').click(function () {
//  if ($('#order').hasClass('glyphicon-arrow-down')) {
//    $('#order').removeClass('glyphicon-arrow-down').addClass('glyphicon-arrow-up');
//  } else if ($('#order').hasClass('glyphicon-arrow-up')) {
//    $('#order').removeClass('glyphicon-arrow-up').addClass('glyphicon-arrow-down');
//  } else {
//    $('#order').addClass('glyphicon glyphicon-arrow-down');
//  }
//});
