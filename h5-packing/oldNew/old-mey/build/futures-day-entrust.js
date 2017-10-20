ReactDOM.render(React.createElement(EntrustTitleFutures, null), document.getElementById('title'));

var timer,
    refreshFlag = 1;

function callback(message) {
  var msg =  parseJSON(message);
  if (msg.functionNO == 56004) {
    if (msg.jData['223'] == 1) {
      if (!refreshFlag) {
        pbEngine.stopLoading();
        refreshFlag = 1;
      }
      var CONTENTS1 = pbEngine.queryEntrustRe(CID);
      if (CONTENTS1) {
        var CONTENTS = JSON.parse(CONTENTS1).data;
        //倒序排列
        if (CONTENTS[0]) {
          sortEntrust(CONTENTS);
          ReactDOM.render(React.createElement(EntrustContentsFutures, { contents: CONTENTS }), document.getElementById('contents'));
        }
      }
    }
  } else if (msg.functionNO == 6022) {
    pbEngine.hideCircleView('Pbkey_Trade_WT_Circle');
    if (msg.jData['1'] >= 0) {
      $('#indicate').removeClass('hide');
      //撤单请求已发送的弹框，定时器1s
      timer = setTimeout(function () {
        $('#indicate').addClass('hide');
      }, 1000);
    } else {
      $('#cancel').addClass('hide');
      alert('撤单失败，请稍后重试');
    }
  } else if (msg.functionNO == 56005) {
    var CONTENTS2 = pbEngine.queryEntrustRe(CID);
    if (CONTENTS2) {
      var CONTENTS3 = JSON.parse(CONTENTS2).data;
      //倒序排列
      if (CONTENTS3[0]) {
        sortEntrust(CONTENTS3);
        ReactDOM.render(React.createElement(EntrustContentsFutures, { contents: CONTENTS3 }), document.getElementById('contents'));
      }
    }
  }
}

function reload() {
  $('#indicate').addClass('hide');
  $('#cancel').addClass('hide');
  pbEngine.startLoading();
  var CID = pbEngine.getTradeCurrentConnectionCID();
  //先取上一次查询结果显示
  dataHis1 = pbEngine.queryEntrustRe(CID);
  if (dataHis1) {
    dataHis = JSON.parse(dataHis1).data;
    //倒序排列
    if (dataHis[0]) {
      sortEntrust(dataHis);
      ReactDOM.render(React.createElement(EntrustContentsFutures, { contents: dataHis }), document.getElementById('contents'));
    }
  }
  pbEngine.stopLoading();
}

function refresh() {
  pbEngine.startLoading();
  refreshFlag = 0;
  pbEngine.synFlash(CID);
}

function isShow(flag) {
  if (!flag) {
    pbEngine.stopLoading(); //离开页面时停止转圈
    $('#cancel').addClass('hide');
    $('#indicate').addClass('hide');
    clearTimeout(timer);
  }
}

var CID = pbEngine.getTradeCurrentConnectionCID();
//先取上一次查询结果显示
pbEngine.startLoading();
var dataHis1 = pbEngine.queryEntrustRe(CID);
if (dataHis1) {
  var dataHis = JSON.parse(dataHis1).data;
  //倒序排列
  if (dataHis[0]) {
    sortEntrust(dataHis);
    ReactDOM.render(React.createElement(EntrustContentsFutures, { contents: dataHis }), document.getElementById('contents'));
  }
}
pbEngine.stopLoading();

$('.my-modal-backdrop').click(function () {
  $('.my-modal').addClass('hide');
});

//$('.status').click(function () {
//  if ($('#order').hasClass('glyphicon-arrow-down')) {
//    $('#order').removeClass('glyphicon-arrow-down').addClass('glyphicon-arrow-up');
//  } else if ($('#order').hasClass('glyphicon-arrow-up')) {
//    $('#order').removeClass('glyphicon-arrow-up').addClass('glyphicon-arrow-down');
//  } else {
//    $('#order').addClass('glyphicon glyphicon-arrow-down');
//  }
//});
