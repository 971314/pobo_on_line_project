var isPoboApp = typeof pbE != "undefined";

function createMenus(ele, data) {
    if(data.constructor == Array)
        data = {"0":data};
    var html = "";
    for(var group in data) {
        var menus = data[group];
        html += '<ul class="nav nav-pills nav-stacked cfg-nav">';
        for(var i=0;i<menus.length;i++){
            var d = menus[i];
            html += '<li><a' + (d.url ? ' href="' + d.url + '"' : '') 
                  + (d.subs&&d.subs.length>0 ? ' class="hasSub"' : '') + '>' + d.name
                  + (d.desc ? '<span>' + d.desc + '</span>' : '') + '<i></i></a>';
            if(d.subs && d.subs.length > 0) {
                html += '<ul class="nav nav-pills nav-stacked subs">';
                for(var j=0;j<d.subs.length;j++)
                    html += '<li><a href="' + d.subs[j].url + '">' + d.subs[j].name
                          + (d.subs[j].desc ? '<span>' + d.subs[j].desc + '</span>' : '')
                          + '<i></i></a></li>';
                html += '</ul>';
            }
            html += '</li>';
        }
        html += "</ul>";
    }
    ele.html(html).on("click", ".hasSub", function(){
        $(this).parent().toggleClass("showSubs");
    })
}

function getConfig(path, callback){
  if(!window.config) {
    if(isPoboApp) {
        window.config = JSON.parse(pbSYS.readConfig("option/conf/option.json"));
        callback();
    }else { 
      $.get(path + "?" + Date.now(), function(config){
        window.config = config;
        callback();
      });
    }
    return;
  }
  callback();
}

if(!isPoboApp) {
    window.pbE = {
        HQ: function(){
            return {};
        },
        WT: function(){
            return {
                wtGetCurrentConnectionCID: function(){
                    return 0;
                },
                wtLoginRe: function(){
                    return '{"data":[{"51":123456,"74":"张"}]}'; 
                },
                wtQueryMoneyRe: function(){
                    return "";
                },
                wtQueryMoney: function(){
                  var data = {
                    moduleId: 90002,
                    functionNO: 6012,
                    jData: {
                      data:[
                        {
                            '56': 0,
                            '97': 99999999,
                            '96': 999999,
                            '111': 98797987,
                            '152': 3453543,
                            '345': '32',
                            '110': 3455465,
                            '93': 343543,
                            '95': 34543643,
                            '101': 435,
                            '475': 3224354,
                            '476': 23443534,
                            '477': 34534534,
                            '478': 2454545,
                            '107': "56"
                        }
                      ]
                    }
                  };
                  $('#total-PL').removeClass().addClass('c3').html('+' + fmoney(87897797, 2) + '元');
                  $('#float').removeClass().addClass('a3').html('+' + fmoney(456456547, 2) + '元');
                  callback(JSON.stringify(data));
                },
                wtQueryStock: function(){},
                wtQueryBargainRe: function(){
                  return ''; 
                },
                wtQueryBargain: function(){
                  var data = {
                    functionNO: 6013,
                      jData: {
                      data:[
                        {
                            '112': 0,
                            '117': 0,
                            '133': 323,
                            '64': '50ETF',
                            '114': 33,
                            '113': 23,
                            '116': '10:32',
                            '126': '否',
                            '63': 234324
                        },
                        {
                            '112': 1,
                            '117': 1,
                            '133': 323,
                            '64': '50ETF',
                            '114': 33,
                            '113': 23,
                            '116': '10:32',
                            '126': '是',
                            '63': 234324
                        }
                      ]
                    }
                  };
                  callback(JSON.stringify(data));
                },
                wtQueryEntrustRe: function(){
                  return ''; 
                },
                wtQueryEntrust: function(){
                  var data = {
                    functionNO: 6019,
                    jData: {
                      data:[
                        {
                            '112': 0,
                            '117': 0,
                            '156': 3,
                            '159': '2016-4-4 23:33',
                            '64': '50ETF',
                            '113': 435,
                            '130': 345,
                            '129': 322,
                            '54': 234
                        },
                        {
                            '112': 1,
                            '117': 1,
                            '127': 435,
                            '156': 4,
                            '159': '2016-4-4 23:33',
                            '64': '50ETF',
                            '113': 435,
                            '130': 345,
                            '129': 322,
                            '54': 234
                        },
                        {
                            '112': 1,
                            '117': 1,
                            '127': 435,
                            '156': 1,
                            '159': '2016-4-4 23:33',
                            '64': '50ETF',
                            '113': 435,
                            '130': 345,
                            '129': 322,
                            '54': 234
                        }
                      ]
                    }
                  };
                  callback(JSON.stringify(data));
                },
                wtGeneralRequestRe: function(){
                  return true;
                },
                wtGeneralRequest: function(id, code){
                  if(code == 6053)
                    var data = {
                      functionNO: code,
                      jData: {
                        data:[
                        {
                            '112': 0,
                            '117': 0,
                            '133': 4534,
                            '63': 123456,
                            '64': '50ETF',
                            '114': 4543,
                            '113': 4565,
                            '173': '2016-4-6',
                            '126': '否',
                            '116': '13:43'
                        },
                        {
                            '112': 0,
                            '117': 1,
                            '133': 4534,
                            '63': 123456,
                            '64': '50ETF',
                            '114': 4543,
                            '113': 4565,
                            '173': '2016-4-6',
                            '126': '否',
                            '116': '13:43'
                        },
                        {
                            '112': 1,
                            '117': 0,
                            '133': 4534,
                            '63': 123456,
                            '64': '50ETF',
                            '114': 4543,
                            '113': 4565,
                            '173': '2016-4-6',
                            '126': '是',
                            '116': '13:43'
                        },
                        {
                            '112': 1,
                            '117': 1,
                            '133': 4534,
                            '63': 123456,
                            '64': '50ETF',
                            '114': 4543,
                            '113': 4565,
                            '173': '2016-4-6',
                            '126': '是',
                            '116': '13:43'
                        }
                        ]
                      }
                    };
                  else if(code == 6052)
                    data = {
                      functionNO: 6052,
                      jData: {
                        data:[
                        {
                            '112': 0,
                            '117': 0,
                            '156': 3,
                            '160': '2016.11.4',
                            '159': '23:33',
                            '63': 123456,
                            '64': '50ETF',
                            '113': 435,
                            '130': 345,
                            '129': 322,
                            '126': '否',
                            '54': 234
                        },
                        {
                            '112': 0,
                            '117': 1,
                            '127': 435,
                            '156': 4,
                            '160': '2016.11.4',
                            '159': '23:33',
                            '63': 123456,
                            '64': '50ETF',
                            '113': 435,
                            '130': 345,
                            '129': 322,
                            '126': '否',
                            '54': 234
                        },
                        {
                            '112': 1,
                            '117': 0,
                            '127': 435,
                            '156': 1,
                            '160': '2016.11.4',
                            '159': '23:33',
                            '63': 123456,
                            '64': '50ETF',
                            '113': 435,
                            '130': 345,
                            '129': 322,
                            '126': '是',
                            '54': 234
                        },
                        {
                            '112': 1,
                            '117': 1,
                            '156': 2,
                            '160': '2016.11.4',
                            '159': '23:33',
                            '63': 123456,
                            '64': '50ETF',
                            '113': 435,
                            '130': 345,
                            '129': 322,
                            '126': '否',
                            '54': 234
                        }]
                      }
                    };
                  else if(code == 6200) 
                    data = {
                      functionNO: 6200,
                      jData: {
                        '1': 0,
                        data:[
                        {
                            '214': '1234567678943543',
                            '215': 1,
                            '56': 0,
                            '51': 123456,
                            '217': 5,
                            '219': 5,
                            '216': '工商银行',
                            '353': 123
                        },
                        {
                            '214': '1234567678943543',
                            '215': 1,
                            '56': 1,
                            '51': 123456,
                            '217': 5,
                            '219': 5,
                            '216': '工商银行',
                            '353': 123
                        },
                        {
                            '214': '1234567678946788',
                            '215': 3,
                            '56': 0,
                            '51': 123456,
                            '217': 6,
                            '219': 6,
                            '216': '招商银行',
                            '353': 123
                        },
                        {
                            '214': '1234567678946345',
                            '215': 4,
                            '56': 2,
                            '51': 123456,
                            '217': 7,
                            '219': 7,
                            '216': '光大银行',
                            '353': 123
                        },
                        {
                            '214': '1234567678946349',
                            '215': 4,
                            '56': 2,
                            '51': 123456,
                            '217': 4,
                            '219': 4,
                            '216': '建设银行',
                            '353': 123
                        }]
                      }
                    };
                  else if(code == 6203)
                    data = {
                      functionNO: 6203,
                      jData: {
                        '1': 0,
                        data:[
                        {
                            '200': 0,
                            '224': 235345435
                        }]
                      }
                    };
                  else if(code == 6205)
                    data = {
                      functionNO: 6205,
                      jData: {
                        '1': 0,
                        data:[
                        {
                            '56': 0,
                            '224': 0,
                            '220': 2354354,
                            '211': '成功',
                            '228': '23:32',
                            '200': 1234567890,
                            '216': '工商银行',
                            '207': '转入',
                        },
                        {
                            '56': 0,
                            '224': 0,
                            '220': 2354354,
                            '211': '成功',
                            '228': '23:32',
                            '200': 1234567890,
                            '216': '建设银行',
                            '207': '转出',
                        }]
                      }
                    };
                  else 
                    data = {
                      functionNO: 6202,
                      jData: {
                        '1': 0,
                      }
                    };
                  callback(JSON.stringify(data));
                },
                wtEncrypt: function(){
                  return '123456';
                },
                wtGetGDZH: function(){
                  return '';
                },
                wtGetXWH: function(){
                  return '';
                },
                wtCancelEntrust: function(){
                  var data = {
                    functionNO: 6022,
                    jData: {
                        '1': 0
                    }
                  };
                  callback(JSON.stringify(data));
                }
            }
        },
        SYS: function(){
            return {
                startLoading: function(){},
                stopLoading: function(){},
                showFutureTradeConfirm: function(){
                  return true;
                },
                showCircleView: function(){},
                hideCircleView: function(){}
            }
        }
    }
}

var pbHQ = pbE.HQ(), pbWT = pbE.WT(), pbSYS = pbE.SYS();