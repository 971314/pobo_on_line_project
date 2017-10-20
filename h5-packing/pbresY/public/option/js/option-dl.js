ReactDOM.render(React.createElement(DealTitleOptions, null), document.getElementById('title'));

var refreshFlag = 1;

function callback(message) {
  var msg = JSON.parse(message);
  if (msg.functionNO == 6013) {
    if (!refreshFlag) {
      pbSYS.stopLoading();
      refreshFlag = 1;
    }
    var CONTENTS = msg.jData.data;
    //倒序排列
    sortDeal(CONTENTS);
    ReactDOM.render(React.createElement(DealContentsOptions, { contents: CONTENTS, hides: config.dealHides }), document.getElementById('contents'));
  }
}

function reload() {
  pbSYS.startLoading();
  CID = pbWT.wtGetCurrentConnectionCID();
  //先取上一次查询结果显示
  dataHis1 = pbWT.wtQueryBargainRe(CID);
  if (dataHis1) {
    dataHis = JSON.parse(dataHis1).data;
    //倒序排列
    if (dataHis[0]) {
      sortDeal(dataHis);
      ReactDOM.render(React.createElement(DealContentsOptions, { contents: dataHis, hides: config.dealHides }), document.getElementById('contents'));
    }
  }
  pbWT.wtQueryBargain(CID, JSON.stringify({}));
  pbSYS.stopLoading();
}

function refresh() {
  pbSYS.startLoading();
  refreshFlag = 0;
  pbWT.wtQueryBargain(CID, JSON.stringify({}));
}

function doShow(flag) {
  if (!flag) {
    pbSYS.stopLoading(); //离开页面时停止转圈
  }
}

var CID = pbWT.wtGetCurrentConnectionCID();
//先取上一次查询结果显示
pbSYS.startLoading();
var dataHis1 = pbWT.wtQueryBargainRe(CID), dataHis;
getConfig("../conf/option.json", function(){
  if (dataHis1) {
    dataHis = JSON.parse(dataHis1).data;
    //倒序排列
    if (dataHis[0]) {
      sortDeal(dataHis);
      ReactDOM.render(React.createElement(DealContentsOptions, { contents: dataHis, hides: config.dealHides}), document.getElementById('contents'));
    }
  }
  pbWT.wtQueryBargain(CID, JSON.stringify({}));
  pbSYS.stopLoading();
});

