var CID = pbEngine.getTradeCurrentConnectionCID();
var pipeCode;
var bankAccount, bankCode, fundAccount, currencyCode, bankCenter;
var flag = 0;  //能不能查余额的标志

function queryBalance() {  //点击查询按钮
    if (flag) {
        alert("该银行不支持查余额！");
        return;
    }
    var fundPwd = '', bankPwd = '';
    //需要资金密码，不需要银行密码
    if (!$('#moneyPwd').hasClass('hide') && $('#bankPwd').hasClass('hide')) {
        if (!$('#money-pwd').val()) {  //没有输入资金密码，提示错误
            $('#error').removeClass('hide');
            $('#error').html('请输入资金密码');
            return;
        } else {
            fundPwd = pbEngine.encrypt(CID, $('#money-pwd').val());
        }
    } else if (!$('#moneyPwd').hasClass('hide') && !$('#bankPwd').hasClass('hide')) {  //资金密码银行密码都需要
        if (!$('#bank-pwd').val()) {  //没有输入银行密码
            $('#error').removeClass('hide');
            $('#error').html('请输入银行密码');
            return;
        } else if ($('#bank-pwd').val() && !$('#money-pwd').val()) {  //输入了银行密码，没有输入资金密码
            $('#error').removeClass('hide');
            $('#error').html('请输入资金密码');
            return;
        } else {
            fundPwd = pbEngine.encrypt(CID, $('#money-pwd').val());
            bankPwd = pbEngine.encrypt(CID, $('#bank-pwd').val());
        }
    } else if ($('#moneyPwd').hasClass('hide') && !$('#bankPwd').hasClass('hide')) {  //需要银行密码，不需要资金密码
        if (!$('#bank-pwd').val()) {
            $('#error').removeClass('hide');
            $('#error').html('请输入银行密码');
            return;
        } else {
            bankPwd = pbEngine.encrypt(CID, $('#bank-pwd').val());
        }
    }
    var data = {
        '214': bankAccount,
        '215': bankCode,
        '51': fundAccount,
        '56': currencyCode,
        '59': fundPwd,
        '60': bankPwd,
        '353': bankCenter
    };
    pbEngine.generalRequest(CID, 6203, JSON.stringify(data));
}

function closeBalance() {
    $('.my-modal').addClass('hide');
}

//214银行账号，215银行编码，216银行名称，56开通币种，51资金账号
function setLiBank(data) {
    var domStr = '';
    for (var i = 0, l = data.length; i < l; i++) {
        if (i == 0) {
            var tail = data[i]['214'].slice(-4);
            //value银行账号，data-code银行编号，data-currency开通币种，data-account资金账号
            domStr += '<li value="' + data[i]['214'] + '" data-code="' + data[i]['215']
                + '" data-currency="' + data[i]['56'] + '" data-account="' + data[i]['51'] + '" balnceFlag="' + data[i]['217']
                + '" class="hover">' + data[i]['216'] + '<span class="d8">' + '(尾号' + tail + ')' + '</span></span>' + '</li>';
            bankAccount = data[i]['214'];
            bankCode = data[i]['215'];
            currencyCode = data[i]['56'];
            fundAccount = data[i]['51'];
            bankCenter = data[i]['353'];
            if (data[i]['217'] == 4) {
                $('#moneyPwd').removeClass('hide');
                $('#bankPwd').addClass('hide');
            } else if (data[i]['217'] == 5) {
                $('#bankPwd').removeClass('hide');
                $('#moneyPwd').addClass('hide');
            } else if (data[i]['217'] == 6) {
                $('#bankPwd').removeClass('hide');
                $('#moneyPwd').removeClass('hide');
            } else if (data[i]['217'] == 7) {
                $('#bankPwd').addClass('hide');
                $('#moneyPwd').addClass('hide');
            } else if (data[i]['217'] == 3) {
                flag = 1;
                $('#bankPwd').addClass('hide');
                $('#moneyPwd').addClass('hide');
                //alert('该银行不支持查余额！');
            }
            else {
                $('#bankPwd').addClass('hide');
                $('#moneyPwd').addClass('hide');
            }
            $('#bank').html('<span class="b1">' + data[i]['216'] + '<span class="d8">' + '(尾号' + tail + ')' + '</span></span>');
            $('#fund-account').val(data[i]['51']);  //资金账号
            $('#bank-currency').val(data[i]['56']);  //开通币种
            $('#bank-val').val(data[i]['214']);  //银行账号
            $('#bank-code').val(data[i]['215']);  //银行编码
            $('#bank').val(data[i]['216']);  //银行名称
        } else {
            var tail = data[i]['214'].slice(-4);
            domStr += '<li value="' + data[i]['214'] + '" data-code="' + data[i]['215'] + '" data-center="' + data[i]['353']
                + '" data-currency="' + data[i]['56'] + '" data-account="' + data[i]['51'] + '" balnceFlag="' + data[i]['217']
                + '">' + data[i]['216'] + '<span class="d8">' + '(尾号' + tail + ')' + '</span></span>' + '</li>';
        }
    }
    return domStr;
}

function callback(message) {
    var msg = JSON.parse(message);
    if (msg.functionNO == 6200) {  //查银行账号
        if (msg.jData['1'] < 0) {
            alert(msg.jData['2']);
        } else {
            var accountInfo = msg.jData.data;
            var bankContents = setLiBank(accountInfo);
            $('#bank-ul').empty();
            $('#bank-ul').append(bankContents);
        }
    } else if (msg.functionNO == 6203) {
        if (msg.jData['1'] < 0) {
            alert(msg.jData['2']);
        } else {
            pipeCode = msg.jData.data[0]['200'];
            var remain = msg.jData.data[0]['224'];
            if (pipeCode) {
                alert("请求已提交，请到转账记录页面查看");  //转账记录
            } else if (!pipeCode && remain) {
                alert('您的银行余额为：' + remain + '元');
            } else if (!pipeCode && !remain) {
                alert("查询失败，请稍后再试");
            }
        }
    }
}

pbEngine.generalRequest(CID, 6200, JSON.stringify({}));  //查银行账号

$(document).ready(function () {
    $('body').click(function () {
        $('#bank-ul').addClass('hide');
    });
    $('.bank-div').click(function (e) {
        $('#bank-ul').toggleClass('hide');
        $('#bank').focus();
        e.stopPropagation();
    });
    $('#bank-ul').on('click', 'li', function () {
        bankAccount = $(this).attr('value');
        bankCode = $(this).attr('data-code');
        currencyCode = $(this).attr('data-currency');
        fundAccount = $(this).attr('data-account');
        flag = 0;
        $('#bank').html($(this).html());
        $('#bank-val').val($(this).attr('value'));
        $('#bank-code').val($(this).attr('data-code'));
        $('#bank-currency').val($(this).attr('data-currency'));
        $('#fund-account').val($(this).attr('data-account'));
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
        } else if ($(this).attr('balnceFlag') == 3) {
            $('#bankPwd').addClass('hide');
            $('#moneyPwd').addClass('hide');
            flag = 1;
        } else if (($(this).attr('balnceFlag') == 0) || (!($(this).attr('balnceFlag')))) {
            $('#bankPwd').addClass('hide');
            $('#moneyPwd').addClass('hide');
        }
    });
});