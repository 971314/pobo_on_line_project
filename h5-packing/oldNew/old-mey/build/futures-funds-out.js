var CID = pbEngine.getTradeCurrentConnectionCID();
var oBank = document.getElementById('bank');
var oCurrency = document.getElementById('currency');
var fundPwd = '', bankPwd = '';
var bankCode, bankAccount, currencyCode, fundAccount, bankCenter;

//币种字典
function getCurrency(code) {
  code = code - 0;
  switch(code) {
    case 0:
      return '人民币';
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
      return '台湾币';
      break;
    default:
      return '未知';
      break;
  }
}

//币种单位
function getUnit(code) {
  code = code - 0;
  switch(code) {
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

//判断输入是不是空
function JTrim(s) {
  return s.replace(/(^\s*)|(\s*$)/g, "");
}

//设置转入或转出账户的下拉列表
function setLiBank(data) {
  var domStr = '', arr = [], indexArr = [];
  //每个币种一条记录，如果一个银行有多个币种则有多条记录，合并相同银行账号的币种
  var account = {};
  for (var i = 0, l = data.length;i<l;i++) {
    var key = data[i]['214'];
    var accountAttr = {
      '56': []
    };
    if (!account.hasOwnProperty(key)) {
      accountAttr['56'].push(data[i]['56']);
      accountAttr['215'] = data[i]['215'];
      accountAttr['216'] = data[i]['216'];
      accountAttr['51'] = data[i]['51'];
      accountAttr['353'] = data[i]['353'];
      accountAttr['218'] = data[i]['218'];
      accountAttr['214'] = data[i]['214'];
      account[key] = accountAttr;
    } else {
      if (account[key]['56'].indexOf(data[i]['56']) < 0) {
        account[key]['56'].push(data[i]['56']);
      }
    }
  } //合并结束
  var k = 0;
  for (var acc in account) {
    if (k == 0) {
      var tail = acc.slice(-4);
      domStr += '<li value="' + acc + '" data-code="' + account[acc]['215'] + '" data-name="' + account[acc]['216'] + '" data-currency="' + account[acc]['56'] + '" data-account="' + account[acc]['51'] + '" center-code="' + account[acc]['353'] + '" balnceFlag="' + account[acc]['218'] + '" bank-account="' + account[acc]['214'] + '" class="hover">' + '<span class="b1">' + account[acc]['216'] + '<span class="d8">'+ '(尾号' + tail + ')' + '</span></span>'; + '</li>';
      if (account[acc]['218'] == 4) {
        $('#moneyPwd').removeClass('hide');
        $('#bankPwd').addClass('hide');
      } else if (account[acc]['218'] == 5) {
        $('#bankPwd').removeClass('hide');
        $('#moneyPwd').addClass('hide');
      } else if (account[acc]['218'] == 6) {
        $('#bankPwd').removeClass('hide');
        $('#moneyPwd').removeClass('hide');
      } else if (account[acc]['218'] == 7) {
        $('#bankPwd').addClass('hide');
        $('#moneyPwd').addClass('hide');
      }
      oBank.innerHTML = '<span class="b1">' + account[acc]['216'] + '<span class="d8">'+ '(尾号' + tail + ')' + '</span></span>';
      var currencyContents = setLiCurrency(account[acc]['56']);
      $('#currency-ul').empty();
      $('#currency-ul').append(currencyContents);
      $('#result-account').html(acc);
      $('#result-bank').html(account[acc]['216']);
      bankCode = account[acc]['215']; bankAccount = account[acc]['214']; fundAccount = account[acc]['51']; bankCenter = account[acc]['353'];
      k++;
    } else {
      var tail = acc.slice(-4);
      domStr += '<li value="' + acc + '" data-code="' + account[acc]['215'] + '" data-name="' + account[acc]['216'] + '" data-currency="' + account[acc]['56'] + '" data-account="' + account[acc]['51']+ '" center-code="' + account[acc]['353'] + '" balnceFlag="' + account[acc]['218'] + '" bank-account="' + account[acc]['214'] + '">' + '<span class="b1">' + account[acc]['216'] + '<span class="d8">'+ '(尾号' + tail + ')' + '</span></span>'; + '</li>';
      k++;
    }
  }
  return domStr;
}

//设置币种的下拉列表
function setLiCurrency(data) {
  var domStr = '';
  for (var i = 0, l = data.length; i < l; i++) {
    if (parseInt(data[i] + 1)) {
    var currency = getCurrency(data[i]);
    var unit = getUnit(data[i]);
    if (i == 0) {
      domStr += '<li data-currency="' + currency + '" currency-unit="' + unit + '" currencyCode="' + data[i] + '" class="hover">' +  currency + '</li>';
      oCurrency.innerHTML = currency;
      $('#currency-unit').val(unit);
      currencyCode = data[i];
    } else {
      domStr += '<li data-currency="' + currency + '" currency-unit="' + unit + '" currencyCode="' + data[i] + '">' +  currency + '</li>';
    }}
  }
  return domStr;
}

function confirmIn() {
  $('.my-modal').addClass('hide');
  $('#error').addClass('hide');
  var reg = new RegExp("^[0-9]*$");
  var obj = document.getElementById("inAmount");
  var obj1 = document.getElementById("inBankPwd").value;
  var obj2 = document.getElementById("inFundPwd").value;
  if(JTrim(obj.value) == '') {
    $('#error').removeClass('hide');
    $('#error').html('请输入转账金额！');
    return;
  } else if(!/^[0-9]+(.[0-9]{1,8})?$/.test(obj.value)){
    $('#error').removeClass('hide');
    $('#error').html('转账金额要为数字！');
    return;
  }
  if (!$('#moneyPwd').hasClass('hide') && !$('#bankPwd').hasClass('hide')) {
    if(JTrim(obj1) == '') {
      $('#error').removeClass('hide');
      $('#error').html('请输入银行密码！');
      return;
    } else if(JTrim(obj2) == '') {
      $('#error').removeClass('hide');
      $('#error').html('请输入资金密码！');
      return;
    } else {
      $('#error').addClass('hide');
      $('.my-modal').removeClass('hide');
      $('.my-modal-backdrop').click(function () {
        $('.my-modal').addClass('hide');
      });
      $('#result-amount').html($('#inAmount').val() + $('#currency-unit').val());
      fundPwd = pbEngine.encrypt(CID, $('#inFundPwd').val());
      bankPwd = pbEngine.encrypt(CID, $('#inBankPwd').val());
    }
  } else if ($('#moneyPwd').hasClass('hide') && !$('#bankPwd').hasClass('hide')) {
    if(JTrim(obj1) == '') {
      $('#error').removeClass('hide');
      $('#error').html('请输入银行密码！');
      return;
    } else {
      $('#error').addClass('hide');
      $('.my-modal').removeClass('hide');
      $('.my-modal-backdrop').click(function () {
        $('.my-modal').addClass('hide');
      });
      $('#result-amount').html($('#inAmount').val() + $('#currency-unit').val());
      bankPwd = pbEngine.encrypt(CID, $('#inBankPwd').val());
    }
  } else if (!$('#moneyPwd').hasClass('hide') && $('#bankPwd').hasClass('hide')) {
    if(JTrim(obj2) == '') {
      $('#error').removeClass('hide');
      $('#error').html('请输入资金密码！');
      return;
    } else {
      $('#error').addClass('hide');
      $('.my-modal').removeClass('hide');
      $('.my-modal-backdrop').click(function () {
        $('.my-modal').addClass('hide');
      });
      $('#result-amount').html($('#inAmount').val() + $('#currency-unit').val());
      fundPwd = pbEngine.encrypt(CID, $('#inFundPwd').val());
    }
  } else {
    $('#error').addClass('hide');
    $('.my-modal').removeClass('hide');
    $('.my-modal-backdrop').click(function () {
      $('.my-modal').addClass('hide');
    });
    $('#result-amount').html($('#inAmount').val() + $('#currency-unit').val());
  }
}

function cancelIn() {
  $('.my-modal').addClass('hide');
}

function completeIn() {
  $('.my-modal').addClass('hide');
  $('#error').addClass('hide');
  var data = {
    '214': bankAccount,
    '215': bankCode,
    '51': fundAccount,
    '56': currencyCode,
    '59': fundPwd,
    '60': bankPwd,
    '220': $('#inAmount').val(),
    '353': bankCenter
  };
  pbEngine.generalRequest(CID, 6202, JSON.stringify(data));
}

function completeOut() {
  $('.my-modal').addClass('hide');
  $('#error').addClass('hide');
  var data = {
    '214': bankAccount,
    '215': bankCode,
    '51': fundAccount,
    '56': currencyCode,
    '59': fundPwd,
    '60': bankPwd,
    '220': $('#inAmount').val(),
    '353': bankCenter
  };
  pbEngine.generalRequest(CID, 6201, JSON.stringify(data));
}

function callback(message) {
  var msg = parseJSON(message);
  if (msg.functionNO == 6200) {
    if (msg.jData['1'] < 0) {
      alert(msg.jData['2']);
    } else {
      var accountInfo = msg.jData.data;
      var bankContents = setLiBank(accountInfo);
      $('#bank-ul').empty();
      $('#bank-ul').append(bankContents);
    }
  } else if (msg.functionNO == 6202 || msg.functionNO == 6201) {
    if (msg.jData['1'] < 0) {
      alert(msg.jData['2']);
    } else {
      alert('提交银行处理');
      /*var pipeCode = msg.jData.data[0]['200'];  //流水号
      pbEngine.generalRequest(CID, 6205, JSON.stringify(pipeCode));*/
    }
  } /*else if (msg.functionNO == 6205) {
    if (msg.jData['1'] < 0) {
      alert(msg.jData['2']);
    } else {
      alert('提交银行处理');
    }
  }*/
}

pbEngine.generalRequest(CID, 6200, JSON.stringify({}));

$(document).ready(function () {
  $('body').click(function () {
    $('#bank-ul').addClass('hide');
    $('#currency-ul').addClass('hide');
  });
  $('.bank-div').click(function (e) {
    $('#currency-ul').addClass('hide');
    $('#bank-ul').toggleClass('hide');
    $('#bank').focus();
    e.stopPropagation();
  });
  $('#bank-ul').on('click', 'li', function () {
    bankCode = $(this).attr('data-code'); bankAccount = $(this).attr('bank-account'); fundAccount = $(this).attr('data-account'); bankCenter = $(this).attr('center-code');
    $('#bank').val($(this).html());
    $('#bank-name').val($(this).attr('data-name'));
    $('#bank-val').val($(this).attr('value'));
    $('#bank-code').val($(this).attr('data-code'));
    $('#bank-currency').val($(this).attr('data-currency'));
    $('#fund-account').val($(this).attr('data-account'));
    $('#bank-center').val($(this).attr('center-code'));
    $('#bank-ul .hover').removeClass('hover');
    $(this).addClass('hover');
    if ($(this).attr('balnceFlag') == 4) {
      $('#moneyPwd').removeClass('hide');
      $('#bankPwd').addClass('hide');
    } else if ($(this).attr('balnceFlag') == 5) {
      $('#bankPwd').removeClass('hide');
      $('#moneyPwd').addClass('hide');
    } else if ($(this).attr('balnceFlag') == 6) {
      $('#bankPwd').removeClass('hide');
      $('#moneyPwd').removeClass('hide');
    } else if ($(this).attr('balnceFlag') == 7) {
      $('#bankPwd').addClass('hide');
      $('#moneyPwd').addClass('hide');
    } else if (($(this).attr('balnceFlag') == 0) || (!($(this).attr('balnceFlag')))) {
      $('#bankPwd').addClass('hide');
      $('#moneyPwd').addClass('hide');
    }
    oBank.innerHTML = $('#bank').val();
    var currencyContents = setLiCurrency($('#bank-currency').val());
    $('#currency-ul').empty();
    $('#currency-ul').append(currencyContents);
    $('#result-account').html($('#bank-val').val());
    $('#result-bank').html($('#bank-name').val());
    
    $('#currency-ul li').click(function () {
      currencyCode = $(this).attr('currencyCode');
      $('#currency').html($(this).val());
      $('#currency-unit').val($(this).attr('currency-unit'));
      $('#currency-ul .hover').removeClass('hover');
      $(this).addClass('hover');
      oCurrency.innerHTML = $(this).html();
    });
    /*$('#result-amount').html($('#inAmount').val());*/
  });
  $('.currency-div').click(function (e) {
    $('#bank-ul').addClass('hide');
    $('#currency-ul').toggleClass('hide');
    $('#currency').focus();
    e.stopPropagation();
  });
  $('#currency-ul li').click(function () {
    $('#currency').html($(this).val());
    $('#currency-unit').val($(this).attr('currency-unit'));
    $('#currency-ul .hover').removeClass('hover');
    $(this).addClass('hover');
    oCurrency.innerHTML = $(this).html();
  });
});