/**
 * Created by pobo on 2016/12/16.
 */
$('#loading').addClass('hide');
//止损止盈的设置
var stopOfFiled = function(){
    this.AttachObject=  [// 止损止盈规则的绑定对象，支持数组，表示对组合持仓进行止损止盈
        {
            "Contract": {
                "ExchangeCode": "", //市场
                "ContractCode": "" //品种
            },
            "Direction": "0",   //  方向
            "Volume": 0,        //  数量
            "OpenPrice": 45600, //  开仓价，浮点数，不带放大倍率
            "HedgeFlag": "1",   //  投保标记，参见交易协议中STEP_TBBZ
            "TodayFlag": "0",   //  今昨仓标记，参见交易协议中STEP_JZCBZ
            //  可能还需要别的键值，将来发现再加
        }
    ],
        this.Contracts= [      //  与AttachObject中合约相同，用于快速订阅
            {
                "ExchangeCode": "", //市场
                "ContractCode": "" //品种
            }
        ],
        this.CreateTime = "", //创建时间
        this.UpdateTime = "", //条件单更改时间
        this.TradeDate  = "",  //交易日，用于指明TimeCondition中的“当日有效”到底是指哪一日
        this.TimeCondition = 1,         //有效期: 1-当日有效，2-永久有效
        this.ConditionChoiced = 1,      //当前选择条件：1-PositionStop（止损止盈模板）
        this.ConditionList = [ //条件列表
            {
                "PositionStop": {   //止损止盈条件参数
                    //  止损参数
                    "StopLossCheckPriceType": "最新价",     //  最新价，对手价，挂单价
                    "StopLossCheckPriceCount": 2,
                    "StopLossOrderPriceType": "最新价",     //  最新价，对手价，挂单价，停板价，止损价
                    "StopLossOrderPriceOffset": 0,

                    //  止盈参数
                    "StopProfitCheckPriceType": "最新价",   //  最新价，对手价，挂单价
                    "StopProfitCheckPriceCount": 2,
                    "StopProfitOrderPriceType": "最新价",   //  最新价，对手价，挂单价，停板价，止盈价
                    "StopProfitOrderPriceOffset": 0,

                    //  绝对止损
                    "AbsoluteStopLoss": false,      //绝对价格止损是否启用
                    "StopLossPrice": '',        //绝对止损价，0.0表示不启用绝对价格止损
                    "FlowPrice": 30,               //绝对价止损浮动价格，0表示不启用绝对价止损的浮动功能
                    //  绝对止盈
                    "AbsoluteStopProfit": false,   //绝对价格止盈是否启用
                    "StopProfitPrice": '',        //绝对止盈价，0.0表示不启用绝对价格止盈

                    //  相对止损
                    "RelativeStopLoss": false,     //相对价格止损是否启用
                    "StopLossPercent": 0.0,        //相对止损百分比，0.0表示不启用相对止损
                    "FlowPercent": 0.0,            //相对止损浮动百分比，0.0表示不启用相对止损的浮动功能
                    //  相对止盈
                    "RelativeStopProfit": false,   //相对价格止盈是否启用
                    "StopProfitPercent": 0.0,      //相对止盈百分比，0.0表示不启用相对止盈
                    "FallbackPercent": 0.0,        //回撤百分比，0.0表示不启用相对止盈的回撤功能
                    "FallbackRelativePercent": 0.0 //回撤上涨幅度的百分比，0.0表示不启用相对止盈的相对回撤功能
                }
            }
        ],
        this.OrderAction ={ //下单参数
            "ActionType": 1, //1- 智能委托
            "SmartOrder": { //智能委托参数,仅在 "ActionType"= 1（智能委托）时有效
                "SplitOrderEnable": false, //是否要拆单
                "ReorderEnable": false, //是否要追单
                "CancelOrderEnable": false, //是否要撤单

                "Order": { //委托参数
                    "EAccountId": { //实体账号Id
                        "Type": "EAccountID",   //  ID类型
                        "67": "8",              //  登录类别
                        "53": "9",              //  账号类别
                        "249": "151"            //  登录账号
                    },
                    "Contract": { //品种
                        "ExchangeCode": "", //市场
                        "ContractCode": "" //品种
                    },
                    "Volume": 55, //委托总数
                    "Direction": "0", //买卖方向
                    "OffsetFlag": "0", //开平标识
                    "PriceType": "2", //价格类别: 1-市价、2-限价
                    "LimitPriceType": "", //限价类型: 仅PriceType为"2"（限价）时有本字段
                    "LimitPriceOffset": 2, //限价超价，仅PriceType为"2"（限价）时本字段有效，仅LimitPriceType为"对手价"、"挂单价"、"最新价"、"涨停价"、"跌停价"时有意义
                    "LimitPrice": "", //仅PriceType为"2"（限价）时本字段有效，仅LimitPriceType为"CustomPrice"（指定价格）时有意义
                    "IgnoreAccidentCancel": false,    //  全局参数：被意外撤单时是否继续追单（是否忽略意料之外的撤单）
                    "ExtRawData": //参考STEP协议，投保标记、备兑标记、市价相关参数，等等，直接复制到下单参数中
                        {   //  以下仅为举例
                            "119": "1",
                            "127": "0",
                            "41": "1",
                            "42": "1",
                            "495": "1"
                        }
                }
            }
        }
},
    conditionUrl= 'http://192.168.6.52:8080/1_0',
    testToken='c5\/fE0I\/QfhFsysJbjbsuU+K5SKy8n1Qv5SGQaFYkLo8IjzC7khtYDSJlbWnuAbnqTF01CHc7hKtmA0L4u3ql6BwLcEcvLiRj32R5WdpbPzhLou74aJoPipOHWy1spxn',
    testId=10003;
if(window.pbE){
    var CID = pbE.WT().wtGetCurrentConnectionCID();
}
var slerted = new Vue({
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
        selectedBool:true,
        myAlerted:null,
        ContractCode:[],
        pb:false,
        selClick:false,
        msg0:'',
        msg1:'',
        msg2:'',
        msg3:'',
        msg4:'',
        limit:true
    },
    created:function () {
        $('.btnSubmit').css('background','#c0c6cd');
        var _this = this;
        if(window.pbE){
            var constractName =  pbE.ZX().getSelfStock(0),
                logoinfo = JSON.parse(pbE.WT().wtLoginRe(CID));
            if(constractName){
                _this.dealnames = JSON.parse(constractName);
            }else{
                _this.dealnames = [{"name":"无选择合约"}]
            }
        }else{
            _this.dealnames = [ {"name":"沪铜1702","market":"2001","code":"010002"},
                {"name":"沪铝1702","market":"2001","code":"010102"},
                {"name":"沪锌1702","market":"2001","code":"010302"},
                {"name":"沪铅1702","market":"2001","code":"010902"},
                {"name":"黄金1706","market":"2001","code":"010506"},
                {"name":"白银1706","market":"2001","code":"011006"},
                {"name":"螺纹1705","market":"2001","code":"010605"},
                {"name":"橡胶1705","market":"2001","code":"010705"},
                {"name":"沥青1706","market":"2001","code":"011106"},
                {"name":"热卷1705","market":"2001","code":"013005"},
                {"name":"沪镍1705","market":"2001","code":"013205"},
                {"name":"沪锡1701","market":"2001","code":"013301"},
                {"name":"玉米1705","market":"2100","code":"020305"},
                {"name":"L1705","market":"2100","code":"020405"},
                {"name":"PVC1705","market":"2100","code":"020605"},
                {"name":"鸡蛋1705","market":"2100","code":"020905"}
            ]
        }
        if(_this.pb){
            this.touchClick(1);
            $('#my').click()
        }
        var option = {
            callbacks: [{module: 90000, callback: function (mag) {
                console.log(mag);
                var data = mag.jData.Data;
                for(var i = 0;i < data.length;i++){
                    if(data[i]['10'] == _this.nameCode){
                        $('#priceValue').text(data[i]['29']);
                        $('#warehouseBad').text(data[i]['39'] - data[i]['25'])
                    }
                    if(data[i]['10'] == _this.ContractCode[i]){
                        for(var j = 0; i < _this.myAlerted.length;j++){
                            _this.myAlerted[j].newPrice = data[i]['29']
                        }
                    }
                }
            }},
                {fun: 6014,callback: function(msg){//查询持仓数量
                    var msg = msg.jData.data[0];
                    if(msg){
                        $("#openInterest").html(msg[137])
                    }else{
                        $("#openInterest").html(0)
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
                            func: 1005,
                            token: testToken,
                            type:3,
                            id: testId,
                            userID:10001,
                            begin:1,
                            total:100
                        }),
                    success: function (data) {
                        console.log(data);
                        if(data.status == 0){
                            var myAlertValue = [];
                            $.each(data.data,function (key,val) {
                                myAlertValue.push({
                                    HYDM:val.HYDM,
                                    newPrice:'--',//最新价
                                    priceup:JSON.parse(val.conditionValue).ConditionList[0].PriceUpLimit.Value,//价格上限
                                    pricedown:JSON.parse(val.conditionValue).ConditionList[0].PriceDownLimit.Value,//价格下限
                                    CurVolUp:JSON.parse(val.conditionValue).ConditionList[0].CurVolUpLimit.Value,//现手上限
                                    VolumeUp:JSON.parse(val.conditionValue).ConditionList[0].VolumeUpLimit.Value,//成交量上限
                                    AmountUp:JSON.parse(val.conditionValue).ConditionList[0].AmountUpLimit.Value//持仓上限
                                });
                                var market = JSON.parse(val.conditionValue).Contracts[0].ExchangeCode,
                                    code = JSON.parse(val.conditionValue).Contracts[0].ContractCode;
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
            var _this = this;
            if(_this.limit){
                if($('#dealname').html() != '选择期货合约'){
                    if (flag == 0) {
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
            var _this = this;
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
            $('#entrustUp').val('');
        },
        //刷新点击事件
        refreshClick:function () {
            $.ajax({
                url: conditionUrl,
                method: 'post',
                dataType: 'json',
                xhrFields: {withCredentials: true},
                crossDomain: true,
                data:
                    JSON.stringify({
                        func: 1005,
                        token: testToken,
                        type:3,
                        id: testId,
                        userID:10001,
                        begin:1,
                        total:100
                    }),
                success: function (data) {
                    var dat = data.data,
                        htm = '';
                    if(data.status == 0){
                        for(var i = 0;i < dat.length;i++){
                            var condValue = JSON.parse(dat[i].conditionValue).ConditionList[0];
                            htm += '<li class="h60">'+
                                '<span class="width15">'+dat[i].HYDM+'</span>'+
                                '<span class="width11">--</span>'+
                                '<span class="width14">'+condValue.PriceUpLimit.Value+'</span>'+
                                '<span class="width14">'+condValue.PriceDownLimit.Value+'</span>'+
                                '<span class="width14">'+condValue.CurVolUpLimit.Value+'</span>'+
                                '<span class="width14">'+condValue.VolumeUpLimit.Value+'</span>'+
                                '<span class="width14">'+condValue.AmountUpLimit.Value+'</span>'+
                                '</li>';
                        }
                        $('#condValue').html(htm)
                    }

                }, error: function () {
                    console.log("服务器异常！")
                }
            })
        },
        //添加点击事件
        insertClick:function () {
            var insertAlerted = new alertInsert(),
                _this = this;
            if(_this.limit){
                if($('#dealname').html() != '选择期货合约'){
                    if($('input:not(:disabled)').val() != ''){
                        insertAlerted.Contracts[0].ExchangeCode = _this.nameMarket;
                        insertAlerted.Contracts[0].ContractCode = _this.nameCode;
                        if(!$("#priceup").prop('disabled')){
                            insertAlerted.ConditionList[0].PriceUpLimit.Enabled = true;
                            insertAlerted.ConditionList[0].PriceUpLimit.Value = $("#priceup").val()
                        }
                        if(!$("#pricedown").prop('disabled')){
                            insertAlerted.ConditionList[0].PriceDownLimit.Enabled = true;
                            insertAlerted.ConditionList[0].PriceDownLimit.Value = $("#pricedown").val()
                        }
                        if(!$("#curVolUp").prop('disabled')){
                            insertAlerted.ConditionList[0].CurVolUpLimit.Enabled = true;
                            insertAlerted.ConditionList[0].CurVolUpLimit.Value = $("#curVolUp").val()
                        }
                        if(!$("#volumeUp").prop('disabled')){
                            insertAlerted.ConditionList[0].VolumeUpLimit.Enabled = true;
                            insertAlerted.ConditionList[0].VolumeUpLimit.Value = $("#volumeUp").val()
                        }
                        if(!$("#entrustUp").prop('disabled')){
                            insertAlerted.ConditionList[0].AmountUpLimit.Enabled = true;
                            insertAlerted.ConditionList[0].AmountUpLimit.Value = $("#entrustUp").val()
                        }
                        $.ajax({
                            url: conditionUrl,
                            method: 'post',
                            dataType: 'json',
                            xhrFields: {withCredentials: true},
                            crossDomain: true,
                            data:JSON.stringify({
                                func: '1002',
                                token: testToken,
                                type:3,
                                userID:10001,
                                id: testId,
                                SCDM: _this.nameMarket,
                                HYDM: _this.dealname,
                                terminal: "博弈1.0",
                                data:insertAlerted
                            }),
                            success: function (data) {
                                console.log(data);
                                if(data.status == 0){
                                    _this.dealname = '选择期货合约';
                                    _this.dealnameColor = '#c0c6cd';
                                    _this.inputDisabled()
                                }else if(data.status == -10){
                                    alert('预警限制为20条！');
                                    _this.inputDisabled()
                                    _this.dealname = '预警限制为20条';
                                    _this.dealnameColor = 'red';
                                    _this.limit = false;
                                }
                            }, error: function () {
                                console.log("服务器异常！")
                            }
                        })
                    }else{
                        $('.btnSubmit').attr('disabled','disabled');
                        $('.btnSubmit').css('background','#c0c6cd');
                        alert('选中必须填入数字')
                    }
                }else{
                    console.log('1111')
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
                nameCode = _this.nameCode;
                if(window.pbE){
                    pbE.HQ().hqSubscribe(0, JSON.stringify({"1":[{"2":_this.nameMarket,"3":nameCode}]}));
                    pbE.WT().wtGeneralRequest(CID,6014, JSON.stringify({"54":_this.nameMarket,"63":nameCode}));
                }
            }

        },
        //input失去焦点判断是否为数字
        inputBlur:function (flag) {
            var _this = this;
            if(flag == 0){
                _this.iblur(_this.msg0)
            }else if(flag == 1){
                _this.iblur(_this.msg1)
            }else if(flag == 2){
                _this.iblur(_this.msg2)
            }else if(flag == 3){
                _this.iblur(_this.msg3)
            }else if(flag == 4){
                _this.iblur(_this.msg4)
            }
        },
        //失去焦点判读
        iblur:function (val) {
            var _this = this,
                btnSubmit = $('.btnSubmit');
            if(val == "" || isNaN(val)){
                alert('请输入数字');
                _this.selectedBool = false;
                btnSubmit.attr('disabled','disabled');
                btnSubmit.css('background','#c0c6cd');
            }else{
                _this.selectedBool = true;
                btnSubmit.removeAttr('disabled');
                btnSubmit.css('background','#3366cc');
            }
        },
        ichange:function (val) {
            console.log('222')
            var _this = this,
                btnSubmit = $('.btnSubmit');
            if(!isNaN(val)){
                _this.selectedBool = true;
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
        }
    }
});