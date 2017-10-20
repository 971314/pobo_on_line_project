$(function () {
    var isApp = typeof pbE != 'undefined';
    ReactDOM.render(React.createElement(DealTitleFutures, null), document.getElementById('title'));

// if(typeof pbE == 'undefined'){
//   window.pbE = {
//     WT:function () {
//       var obj = {
//         wtGetCurrentConnectionCID:function () {
//
//         },
//         wtQueryBargainRe:function () {
//           var data = {
//             functionNO:56004,
//             jData:{
//               '223':3
//             },
//             data:[
//               {
//                 '64': '50ETF',
//                 '54': '',
//                 '159': 0,
//                 '129': 200,
//                 '112': 1,
//                 '117': 1,
//                 '130': 222,
//                 '156': 3,
//                 '63': '',
//                 '40':1,
//                 '113':125,
//                 '116':'10:10',
//                 '114':1000
//               },
//               {
//                 '64': '50ETF',
//                 '54': '',
//                 '159': 123,
//                 '129': 200,
//                 '112': 0,
//                 '117': 0,
//                 '130': 222,
//                 '156': 3,
//                 '63': '',
//                 '40':1,
//                 '113':123,
//                 '116':'11:00',
//                 '114':1234
//               }
//             ]
//           }
//           return JSON.stringify(data);
//         },
//       }
//       return obj;
//     },
//     SYS:function () {
//       var obj1 = {
//         stopLoading:function () {
//
//         },
//         startLoading:function () {
//
//         }
//       }
//       return obj1;
//     }
//   }
// }
    var option = {
        callbacks: [
            {fun: 56004, callback: back56004},
            {fun: 56006, callback: back56006}
        ],
        reload: function () {
            pbApi.sys_startLoading();
            // var CID = pbApi.wt_getCurrentConnectionCID();
            //先取上一次查询结果显示
            dataHis1 = pbApi.wt_wtQueryBargainRe();
            if (dataHis1) {
                dataHis = JSON.parse(dataHis1).data;
                //倒序排列
                if (dataHis[0]) {
                    dataHis = sortDeal(dataHis);
                    ReactDOM.render(React.createElement(DealContentsFutures, {contents: dataHis}), document.getElementById('contents'));
                }
            }
            pbApi.sys_stopLoading();
        },
        refresh: function () {
            pbApi.sys_stopLoading();
            refreshFlag = 0;
            pbApi.wt_synFlash();
        },
        doShow: function () {
            if (!flag) {
                pbApi.sys_stopLoading(); //离开页面时停止转圈
            }
        }
    }

    var refreshFlag = 1;

    // var CID = pbApi.wt_getCurrentConnectionCID();
//先取上一次查询结果显示
    pbApi.sys_stopLoading();
    var dataHis1 = pbApi.wt_wtQueryBargainRe();
    if (dataHis1) {
        var dataHis = JSON.parse(dataHis1).data;
        //倒序排列
        if (dataHis[0]) {
            dataHis = sortDeal(dataHis);
            ReactDOM.render(React.createElement(DealContentsFutures, {contents: dataHis}), document.getElementById('contents'));
        }
    }
    pbApi.sys_stopLoading();
    function back56004(msg) {
        if (msg.jData['223'] == 3) {
            if (!refreshFlag) {
                pbApi.sys_stopLoading();
                refreshFlag = 1;
            }
            var CONTENTS1 = pbApi.wt_wtQueryBargainRe();
            if (CONTENTS1) {
                var CONTENTS = JSON.parse(CONTENTS1).data;
                //倒序排列
                if (CONTENTS[0]) {
                    CONTENTS = sortDeal(CONTENTS);
                    ReactDOM.render(React.createElement(DealContentsFutures, {contents: CONTENTS}), document.getElementById('contents'));
                }
            }
        }
    }

    function back56006(msg) {
        var CONTENTS2 = pbApi.wt_wtQueryBargainRe();
        if (CONTENTS2) {
            var CONTENTS3 = JSON.parse(CONTENTS2).data;
            //倒序排列
            if (CONTENTS3[0]) {
                CONTENTS3 = sortDeal(CONTENTS3);
                ReactDOM.render(React.createElement(DealContentsFutures, {contents: CONTENTS3}), document.getElementById('contents'));
            }
        }
    }
});
