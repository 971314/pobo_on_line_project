ReactDOM.render(React.createElement(EntrustTitleOptions, null), document.getElementById('title'));

var timer,
    refreshFlag = 1;

function reload() {
  $('#indicate').addClass('hide');
  $('#cancel').addClass('hide');
  pbSYS.startLoading();
  CID = pbWT.wtGetCurrentConnectionCID();
  //先取上一次查询结果显示
  dataHis1 = pbWT.wtQueryEntrustRe(CID);
  if (dataHis1) {
    dataHis = JSON.parse(dataHis1).data;
    //倒序排列
    if (dataHis[0]) {
      sortEntrust(dataHis);
      ReactDOM.render(React.createElement(EntrustContentsOptions, { contents: dataHis }), document.getElementById('contents'));
    }
  }
  pbWT.wtQueryEntrust(CID, JSON.stringify({}));
  pbSYS.stopLoading();
}

function callback(message) {
  var msg = JSON.parse(message);
  if (msg.functionNO == 6019) {
    if (!refreshFlag) {
      pbSYS.stopLoading();
      refreshFlag = 1;
    }
    var CONTENTS = msg.jData.data;
    sortEntrust(CONTENTS);
    ReactDOM.render(React.createElement(EntrustContentsOptions, { contents: CONTENTS }), document.getElementById('contents'));
  } else if (msg.functionNO == 6022) {
    pbSYS.hideCircleView('Pbkey_Trade_WT_Circle');
    if (msg.jData['1'] >= 0) {
      $('#indicate').removeClass('hide');
      //撤单请求已发送的弹框，定时器1s
      timer = setTimeout(function () {
        $('#indicate').addClass('hide');reload();
      }, 1000);
    } else {
      $('#cancel').addClass('hide');
      alert('撤单失败，请稍后重试');
    }
  }
}

function refresh() {
  pbSYS.startLoading();
  refreshFlag = 0;
  pbWT.wtQueryEntrust(CID, JSON.stringify({}));
}

function doShow(flag) {
  if (!flag) {
    pbSYS.stopLoading(); //离开页面时停止转圈
    $('#cancel').addClass('hide');
    $('#indicate').addClass('hide');
    clearTimeout(timer);
  }
}

var CID = pbWT.wtGetCurrentConnectionCID();
//先取上一次查询结果显示
pbSYS.startLoading();
var dataHis1 = pbWT.wtQueryEntrustRe(CID);
if (dataHis1) {
  var dataHis = JSON.parse(dataHis1).data;
  //倒序排列
  if (dataHis[0]) {
    sortEntrust(dataHis);
    ReactDOM.render(React.createElement(EntrustContentsOptions, { contents: dataHis }), document.getElementById('contents'));
  }
}
pbWT.wtQueryEntrust(CID, JSON.stringify({}));
pbSYS.stopLoading();

//$('.status').click(function () {
//  if ($('#order').hasClass('glyphicon-arrow-down')) {
//    $('#order').removeClass('glyphicon-arrow-down').addClass('glyphicon-arrow-up');
//  } else if ($('#order').hasClass('glyphicon-arrow-up')) {
//    $('#order').removeClass('glyphicon-arrow-up').addClass('glyphicon-arrow-down');
//  } else {
//    $('#order').addClass('glyphicon glyphicon-arrow-down');
//  }
//});

//$('.status').click(function () {
//  if ($('#order').hasClass('glyphicon-arrow-down')) {
//    $('#order').removeClass('glyphicon-arrow-down').addClass('glyphicon-arrow-up');
//  } else if ($('#order').hasClass('glyphicon-arrow-up')) {
//    $('#order').removeClass('glyphicon-arrow-up').addClass('glyphicon-arrow-down');
//  } else {
//    $('#order').addClass('glyphicon glyphicon-arrow-down');
//  }
//});
