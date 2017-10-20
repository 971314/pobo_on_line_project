/**
 * Created by pobo on 2016/12/16.
 */
$('#loading').addClass('hide');

//获取url参数
function GetQueryString(name) {
    var urls = decodeURI(window.location.search.substr(1));
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = urls.match(reg);
    if (r) return unescape(r[2]);return null;
}
//预警的设置
var alertInsert = function () {
        this.Stock = {MarketID:null,PBCode:''};
        this.ConditionChoiced = 1;
        this.ConditionList = [{
            PriceUpLimit:{Enabled:false,Value:'--'},
            PriceDownLimit:{Enabled:false,Value:'--'},
            CurVolUpLimit:{Enabled:false,Value:'--'},
            VolumeUpLimit:{Enabled:false,Value:'--'},
            AmountUpLimit:{Enabled:false,Value:'--'},
            TurnOverUpLimit:{Enabled:false,Value:'--'}
        }];
        this.AlertAction = {
            PopupTips : {
                Enabled:true
            },
            PlaySound:{
                Enabled:true,
                File:"alert.wav"
            }
        }
    },
    conditionUrl= 'http://61.172.197.205:8888/cloud_trade/1_0',
    testToken='c5\/fE0I\/QfhFsysJbjbsuU+K5SKy8n1Qv5SGQaFYkLo8IjzC7khtYDSJlbWnuAbnqTF01CHc7hKtmA0L4u3ql6BwLcEcvLiRj32R5WdpbPzhLou74aJoPipOHWy1spxn',
    testId='10003',
    type = '3',
    userId = '10019',
    orgCode = '1998';
var alerted = new Vue({
    el: '#alerted',
    data: {
        noneTouchOne: false,
        isTouchOne: true,
        noneTouchTwo: true,
        isTouchTwo: false,
        initImg: false,
        reSetValue: '重置',
        selectOne: false,
        unselectOne: true,
        selectTwo: false,
        unselectTwo: true,
        selectThree: false,
        unselectThree: true,
        selectFour: false,
        unselectFour: true,
        selectFive: false,
        unselectFive: true,
        dealname:'选择期货合约',//合约名称显示框
        dealnameColor:'#c0c6cd',//合约名称显示框字体颜色
        dealnames:'',//选择合约名称数组
        nameCode:'',//合约代码
        nameMarket:'',//合约市场
        myAlerted:null,
        ContractCode:[],
        selClick:false,
        msg0:'',//价格上限
        msg1:'',//价格下限
        msg2:'',//现手上限
        msg3:'',//成交量上限
        msg4:'',//持仓上限
        limit:true,//合约选择框
        GetPriceRate:'',//行情商品价格倍数
        testId:pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId'),//认证userId/id
        userId:pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName'),//认证用户名/userId
        testToken:pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token'),//token
        orgCode:JSON.parse(pbE.SYS().getDeviceJsonInfo()).jgid//机构编码
    },
    created:function () {
        $('.btnSubmit').css('background','#c0c6cd');
        var _this = this,
            marketU = GetQueryString('hqMarket'),
            codeU = GetQueryString('hqCode'),
            types = GetQueryString('type'),
            constractName;
        console.log(marketU + '-' + typeof marketU);
        console.log(codeU + '-' + typeof codeU);
        // if(_this.testId){
        if(types == 0){
            this.touchClick(1);
            $('#my').click();
        }else{
            if(marketU && codeU){
                _this.nameCode = codeU;
                _this.GetPriceRate = pbE.HQ().hqGetPriceRate(codeU,marketU);
                if(window.pbE){
                    pbE.HQ().hqSubscribe(0, JSON.stringify({"1":[{"2":marketU,"3":codeU}]}));
                    var tradeHq = JSON.parse(pbE.HQ().getHQInfo(codeU,marketU)).name;
                    if(tradeHq){
                        _this.dealname = tradeHq;
                    }
                }else{
                    _this.dealnames =[{"name":"沪铜1702","market":5000,"code":'GLNG'}]
                }
            }
            if(window.pbE){
                constractName =  pbE.ZX().getSelfStock(0);
                if(constractName){
                    _this.dealnames = JSON.parse(constractName);
                }else{
                    _this.dealnames = [{"name":"无选择合约"}]
                }
            }else{
                _this.dealnames = [
                    {"name":"沪铜1702","market":5000,"code":'GLNG'},
                    {"name":"沪铝1702","market":2001,"code":'010102'},
                    {"name":"沪锌1702","market":2001,"code":"010302"},
                    {"name":"沪铅1702","market":2001,"code":"010902"},
                    {"name":"黄金1706","market":2001,"code":"010506"},
                    {"name":"白银1706","market":2001,"code":"011006"},
                    {"name":"螺纹1705","market":2001,"code":"010605"},
                    {"name":"橡胶1705","market":2001,"code":"010705"},
                    {"name":"沥青1706","market":2001,"code":"011106"},
                    {"name":"热卷1705","market":2001,"code":"013005"},
                    {"name":"沪镍1705","market":2001,"code":"013205"},
                    {"name":"沪锡1701","market":2001,"code":"013301"},
                    {"name":"玉米1705","market":2100,"code":"020305"},
                    {"name":"L1705","market":2100,"code":"020405"},
                    {"name":"PVC1705","market":2100,"code":"020605"},
                    {"name":"鸡蛋1705","market":2100,"code":"020905"}
                ]
            }
        }
        // }else{
        //     window.location.href = '../reg/component/reg-log.html';
        // }
        var yesterdayP,
            option = {
                callbacks: [{module: 90000, callback: function (mag) {
                    console.log(mag);
                    var data = mag.jData.Data;
                    for(var i = 0;i < data.length;i++){
                        if(data[i]['10'] == _this.nameCode){
                            $('#priceValue').text(data[i]['29']/_this.GetPriceRate);
                            $("#openInterest").text(data[i]['39']);
                            if(data[i]['25']){
                                yesterdayP = data[i]['25'];
                                $('#warehouseBad').text(data[i]['39'] - data[i]['25']);
                            }else{
                                $('#warehouseBad').text(data[i]['39'] - yesterdayP);
                            }
                        }
                        if(data[i]['10'] == _this.ContractCode[i]){
                            for(var j = 0; i < _this.myAlerted.length;j++){
                                _this.myAlerted[j].newPrice = data[i]['29']
                            }
                        }
                    }
                }}
                ],

                reload: function () {

                },
                refresh: function () {

                },
                fresh: function () {

                },
                doShow: function (flag) {
                    if (!flag) pbApi.sys_stopLoading();
                }
            };
        pbPage.initPage(option);
    },
    watch:{
        msg0:function (val) {
            this.iblur(val)
        },
        msg1:function (val) {
            this.iblur(val)
        },
        msg2:function (val) {
            this.iblur(val)
        },
        msg3:function (val) {
            this.iblur(val)
        },
        msg4:function (val) {
            this.iblur(val)
        },
    },
    methods: {
        //切换点击事件
        touchClick: function (flag) {
            var _this = this;
            //未触发列表 事件
            if (flag == 0) {
                _this.isTouchOne = true;
                _this.noneTouchTwo = true;
                _this.isTouchTwo = false;
                _this.initImg = false;//将重置按钮替换成刷新按钮
                _this.showOne = true;
                _this.hideOne = false;
                _this.hideTwo = true;
                _this.showTwo = false;
            }
            //已触发列表 事件
            if (flag == 1) {
                _this.isTouchTwo = true;
                _this.noneTouchOne = true;
                _this.isTouchOne = false;
                _this.initImg = true;//将重置按钮替换成刷新按钮
                _this.hideOne = true;
                _this.showOne = false;
                _this.showTwo = true;
                _this.hideTwo = false;
                $.ajax({
                    url: conditionUrl,
                    method: 'post',
                    dataType: 'json',
                    xhrFields: {withCredentials: true},
                    crossDomain: true,
                    data:
                        JSON.stringify({
                            func: '1005',
                            token: _this.testToken,
                            type:type,
                            id: _this.testId,
                            userID:_this.userId,
                            begin:'0',
                            total:'100',
                            orgCode:_this.orgCode
                        }),
                    success: function (data) {
                        console.log(data);
                        if(data.status == 0){
                            alert(data.msg)
                            var myAlertValue = [];
                            $.each(data.data,function (key,val) {
                                myAlertValue.push({
                                    HYDM:val.HYMC,
                                    newPrice:'--',//最新价
                                    priceup:JSON.parse(val.conditionValue).ConditionList[0].PriceUpLimit.Value,//价格上限
                                    pricedown:JSON.parse(val.conditionValue).ConditionList[0].PriceDownLimit.Value,//价格下限
                                    CurVolUp:JSON.parse(val.conditionValue).ConditionList[0].CurVolUpLimit.Value,//现手上限
                                    VolumeUp:JSON.parse(val.conditionValue).ConditionList[0].VolumeUpLimit.Value,//成交量上限
                                    AmountUp:JSON.parse(val.conditionValue).ConditionList[0].AmountUpLimit.Value//持仓上限
                                });
                                var market = JSON.parse(val.conditionValue).Stock.MarketID,
                                    code = JSON.parse(val.conditionValue).Stock.PBCode;
                                _this.ContractCode.push(code);
                                if(window.pbE){
                                    pbE.HQ().hqSubscribe(0, JSON.stringify({"1":[{"2":market,"3":code}]}));
                                }
                            });
                            _this.myAlerted = myAlertValue;
                        }
                    },
                    error: function () {
                        console.log("服务器异常！")
                    }
                })
            }
        },
        //选择点击设置
        selectClick: function (flag) {
            var _this = this,
                btnSubmit = $('.btnSubmit');
            if(_this.limit){
                if($('#dealname').html() != '选择期货合约'){
                    if (flag == 0) {
                        btnSubmit.attr('disabled','disabled');
                        btnSubmit.css('background','#c0c6cd');
                        _this.selectOne = !_this.selectOne;
                        _this.unselectOne = !_this.unselectOne;
                        if (_this.selectOne) {
                            $('#priceup').removeAttr('disabled');
                            $('#priceup').focus();
                        }else{
                            $('#priceup').attr('disabled','disabled');
                            _this.msg0 = '';
                        }
                    } else if (flag == 1) {
                        btnSubmit.attr('disabled','disabled');
                        btnSubmit.css('background','#c0c6cd');
                        _this.selectTwo = !_this.selectTwo;
                        _this.unselectTwo = !_this.unselectTwo;
                        if (_this.selectTwo) {
                            $('#pricedown').removeAttr('disabled');
                            $('#pricedown').focus();
                        }else{
                            $('#pricedown').attr('disabled','disabled');
                            _this.msg1 = '';
                        }
                    } else if (flag == 2) {
                        btnSubmit.attr('disabled','disabled');
                        btnSubmit.css('background','#c0c6cd');
                        _this.selectThree = !_this.selectThree;
                        _this.unselectThree = !_this.unselectThree;
                        if (_this.selectThree) {
                            $('#curVolUp').removeAttr('disabled');
                            $('#curVolUp').focus();
                        }else{
                            $('#curVolUp').attr('disabled','disabled');
                            _this.msg2 = '';
                        }
                    } else if (flag == 3) {
                        btnSubmit.attr('disabled','disabled');
                        btnSubmit.css('background','#c0c6cd');
                        _this.selectFour = !_this.selectFour;
                        _this.unselectFour = !_this.unselectFour;
                        if (_this.selectFour) {
                            $('#volumeUp').removeAttr('disabled');
                            $('#volumeUp').focus();
                        }else{
                            $('#volumeUp').attr('disabled','disabled');
                            _this.msg3 = '';
                        }
                    } else if (flag == 4) {
                        btnSubmit.attr('disabled','disabled');
                        btnSubmit.css('background','#c0c6cd');
                        _this.selectFive = !_this.selectFive;
                        _this.unselectFive = !_this.unselectFive;
                        if (_this.selectFive) {
                            $('#entrustUp').removeAttr('disabled');
                            $('#entrustUp').focus();
                        }else{
                            $('#entrustUp').attr('disabled','disabled');
                            _this.msg4 = '';
                        }
                    }
                }else{
                    alert('请选择合约');
                }
            }
        },
        //重置点击事件
        replacementClick:function () {
            this.inputDisabled();
            this.dealname = '';
            /*var _this = this;
             _this.dealname = '';
             _this.selectOne = false;
             _this.unselectOne = true;
             _this.selectTwo = false;
             _this.unselectTwo = true;
             _this.selectThree = false;
             _this.unselectThree = true;
             _this.selectFour = false;
             _this.unselectFour = true;
             _this.selectFive = false;
             _this.unselectFive = true;
             _this.dealname = '选择期货合约';
             _this.dealnameColor = '#c0c6cd';
             $('#priceup').attr('disabled','disabled');
             $('#priceup').val('');
             $('#pricedown').attr('disabled','disabled');
             $('#pricedown').val('');
             $('#curVolUp').attr('disabled','disabled');
             $('#curVolUp').val('');
             $('#volumeUp').attr('disabled','disabled');
             $('#volumeUp').val('');
             $('#entrustUp').attr('disabled','disabled');
             $('#entrustUp').val('');*/
        },
        //刷新点击事件
        refreshClick:function () {
            var _this = this;
            $.ajax({
                url: conditionUrl,
                method: 'post',
                dataType: 'json',
                xhrFields: {withCredentials: true},
                crossDomain: true,
                data:
                    JSON.stringify({
                        func: '1005',
                        token: _this.testToken,
                        type:type,
                        id: _this.testId,
                        userID:_this.userId,
                        begin:'1',
                        total:'100',
                        orgCode:_this.orgCode
                    }),
                success: function (data) {
                    console.log(data);
                    if(data.status == 0){
                        var myAlertValue = [];
                        $.each(data.data,function (key,val) {
                            myAlertValue.push({
                                HYDM:val.HYMC,
                                newPrice:'--',//最新价
                                priceup:JSON.parse(val.conditionValue).ConditionList[0].PriceUpLimit.Value,//价格上限
                                pricedown:JSON.parse(val.conditionValue).ConditionList[0].PriceDownLimit.Value,//价格下限
                                CurVolUp:JSON.parse(val.conditionValue).ConditionList[0].CurVolUpLimit.Value,//现手上限
                                VolumeUp:JSON.parse(val.conditionValue).ConditionList[0].VolumeUpLimit.Value,//成交量上限
                                AmountUp:JSON.parse(val.conditionValue).ConditionList[0].AmountUpLimit.Value//持仓上限
                            });
                            var market = JSON.parse(val.conditionValue).Stock.MarketID,
                                code = JSON.parse(val.conditionValue).Stock.PBCode;
                            _this.ContractCode.push(code);
                            if(window.pbE){
                                pbE.HQ().hqSubscribe(0, JSON.stringify({"1":[{"2":market,"3":code}]}));
                            }
                        });
                        _this.myAlerted = myAlertValue;
                    }
                }, error: function () {
                    console.log("服务器异常！")
                }
            })
        },
        //添加预警点击事件
        insertClick:function () {
            var insertAlerted = new alertInsert(),
                _this = this,
                priceup = $("#priceup").prop('disabled'),
                pricedown = $("#pricedown").prop('disabled'),
                curVolUp = $("#curVolUp").prop('disabled'),
                volumeUp = $("#volumeUp").prop('disabled'),
                entrustUp = $("#entrustUp").prop('disabled'),
                btnSubmit = $('.btnSubmit');
            if (_this.limit && $('#dealname').html() != '选择期货合约') {
                insertAlerted.Stock.MarketID = _this.nameMarket;
                insertAlerted.Stock.PBCode = _this.nameCode;
                if (!priceup) {
                    if(_this.msg0 != ''){
                        insertAlerted.ConditionList[0].PriceUpLimit.Enabled = true;
                        insertAlerted.ConditionList[0].PriceUpLimit.Value = parseFloat($("#priceup").val());
                    }else{
                        alert('请输入价格上限内容！');
                        btnSubmit.attr('disabled','disabled');
                        btnSubmit.css('background','#c0c6cd');
                    }
                }
                if (!pricedown) {
                    if(_this.msg1 != ''){
                        insertAlerted.ConditionList[0].PriceDownLimit.Enabled = true;
                        insertAlerted.ConditionList[0].PriceDownLimit.Value = parseFloat($("#pricedown").val());
                    }else{
                        alert('请输入价格下限内容');
                        btnSubmit.attr('disabled','disabled');
                        btnSubmit.css('background','#c0c6cd');
                    }
                }
                if (!curVolUp) {
                    if(_this.msg2 != ''){
                        insertAlerted.ConditionList[0].CurVolUpLimit.Enabled = true;
                        insertAlerted.ConditionList[0].CurVolUpLimit.Value = parseFloat($("#curVolUp").val());
                    }else{
                        alert('请输入现手上限内容');
                        btnSubmit.attr('disabled','disabled');
                        btnSubmit.css('background','#c0c6cd');
                    }
                }
                if (!volumeUp) {
                    if(_this.msg3 != ''){
                        insertAlerted.ConditionList[0].VolumeUpLimit.Enabled = true;
                        insertAlerted.ConditionList[0].VolumeUpLimit.Value = parseFloat($("#volumeUp").val());
                    }else{
                        alert('请输入成交量上限内容');
                        btnSubmit.attr('disabled','disabled');
                        btnSubmit.css('background','#c0c6cd');
                    }
                }
                if (!entrustUp) {
                    if(_this.msg4 != ''){
                        insertAlerted.ConditionList[0].AmountUpLimit.Enabled = true;
                        insertAlerted.ConditionList[0].AmountUpLimit.Value = parseFloat($("#entrustUp").val());
                    }else{
                        alert('请输入持仓上限内容');
                        btnSubmit.attr('disabled','disabled');
                        btnSubmit.css('background','#c0c6cd');
                    }
                }
                console.log(insertAlerted);
                if(!btnSubmit.prop('disabled')){
                    console.log('111');
                    $.ajax({
                        url: conditionUrl,
                        method: 'post',
                        dataType: 'json',
                        xhrFields: {withCredentials: true},
                        crossDomain: true,
                        data:JSON.stringify({
                            func: '1002',
                            token: _this.testToken,
                            type:type,
                            userID:_this.userId,
                            id: _this.testId,
                            subType: "",
                            name: "",
                            orgCode:_this.orgCode,
                            data:insertAlerted,
                            HYMC:_this.dealname
                        }),
                        success: function (data) {
                            console.log(data);
                            if(data.status == 0){
                                alert('添加成功！')
                                _this.dealname = '选择期货合约';
                                _this.dealnameColor = '#c0c6cd';
                                _this.inputDisabled()
                            }else if(data.status == -10){
                                alert('预警限制为20条！');
                                _this.inputDisabled();
                                _this.dealname = '预警限制为20条';
                                _this.dealnameColor = 'red';
                                _this.limit = false;
                            }
                        }, error: function () {
                            console.log("服务器异常！")
                        }
                    })
                }
            }
        },
        // 合约选择点击事件
        dealnameClick:function (name) {
            var _this = this;
            if(_this.limit){
                _this.dealnameColor = 'black';
                _this.dealname = name.name;
                _this.nameCode = name.code;
                _this.nameMarket = name.market;
                if(window.pbE){
                    _this.GetPriceRate = pbE.HQ().hqGetPriceRate(_this.nameCode,_this.nameMarket);
                    pbE.HQ().hqSubscribe(0, JSON.stringify({"1":[{"2":_this.nameMarket,"3":nameCode}]}));
                }
            }
            _this.isHide()
        },
        //input变化判断
        iblur:function (val) {
            var _this = this,
                btnSubmit = $('.btnSubmit');
            if(isNaN(val)){
                alert('请输入数字');
                btnSubmit.attr('disabled','disabled');
                btnSubmit.css('background','#c0c6cd');
            }else if(val == ''){
                btnSubmit.attr('disabled','disabled');
                btnSubmit.css('background','#c0c6cd');
            }else{
                btnSubmit.removeAttr('disabled');
                btnSubmit.css('background','#3366cc');
            }
        },
        //input 禁止编辑&&为空(初始值)
        inputDisabled:function () {
            var _this = this;
            _this.selectOne = false;
            _this.unselectOne = true;
            _this.selectTwo = false;
            _this.unselectTwo = true;
            _this.selectThree = false;
            _this.unselectThree = true;
            _this.selectFour = false;
            _this.unselectFour = true;
            _this.selectFive = false;
            _this.unselectFive = true;
            $('#priceValue').text('--');
            $('#warehouseBad').text('--');
            $("#openInterest").text('--');
            $('.btnSubmit').attr('disabled','disabled');
            $('.btnSubmit').css('background','#c0c6cd');
            $('#priceup').attr('disabled','disabled');
            _this.msg0 = '';
            $('#pricedown').attr('disabled','disabled');
            _this.msg1 = '';
            $('#curVolUp').attr('disabled','disabled');
            _this.msg2 = '';
            $('#volumeUp').attr('disabled','disabled');
            _this.msg3 = '';
            $('#entrustUp').attr('disabled','disabled');
            _this.msg4 = '';
        },
        // 模态框显示
        isShow:function () {
            $("#noneTuchDialog").modal('show')
        },
        //模态框隐藏
        isHide:function () {
            $("#noneTuchDialog").modal('hide')
        }
    }
});
/**
 * Created by pobo on 2017/2/24.
 */
