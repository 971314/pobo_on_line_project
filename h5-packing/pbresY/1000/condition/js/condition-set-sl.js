/**
 * Created by xiajing on 2016/12/19.
 * 止损止盈设置
 */
function GetQueryString(name) {
    var urls = decodeURI(window.location.search.substr(1));
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = urls.match(reg);
    if (r) return unescape(r[2]);
    return null;
}

// var testUserId = "10019";
var option = {
    callbacks: [
        {fun:102001,callback:function(msg){
            // if(_this.userId == null){
            //     if(msg){
            //         if(102001 == msg.functionNo){
            //             testUserId = pbE.WT().wtGetYunTradeUserId(pbE.WT().wtGetCurrentConnectionCID());//获取云交易的userId
            //         }
            //     }
            // }
        }}
    ],
    reload: function () {
    },
    refresh: function () {
    },
    fresh: function () {
    },
    doShow: function (flag) {
    }
}
pbPage.initPage(option);
var stopLessType,
// osP = JSON.parse(pbE.SYS().getDeviceJsonInfo())['255'],
os = '';
if(osP === '2'){
    os = 'IOS';
}else if(osP === '3'){
    os = 'android';
}
 stopLessType = GetQueryString("type");
 //stopLessType =1;
if(stopLessType == 0 || stopLessType == 3){
    $("#setStopOfFiled").css('display','block');
    //止损止盈添加设置
    new Vue({
        el:"#setStopOfFiled",
        data:{
            initAddBtn:true,//初始化按钮
            blueBtn:false,
            stopFiledObj:{
                Direction:'',//买卖方向  0 买 1 卖
                Volume:'',//数量
                OffsetFlag:'1',//开平方向0，1,2 开仓，平仓，平今  注：默认给 0 开仓
                stopPrice:'',//止损价
                filedPrice:'',//止盈价
                ExchangeCode:'',//市场
                ContractCode:'',//品种
                hyName:'',
                TimeCondition : 1,         //有效期: 1-当日有效，2-永久有效
                ConditionChoiced : 1,      //当前选择条件：1-PositionStop（止损止盈模板）
                LimitPriceType:'对手价',
                orgCode:orgCode,//机构编号
                OpenPrice:'',//开仓价
                TradeDate:'',//交易日 用于指明TimeCondition中的“当日有效”到底是指哪一日
                TodayFlag:'',//今昨仓
                DirectionObj:''
            },
            directionValue:'',//买卖方向  0 买 1 卖
            positionPrice:'',//持仓均价
            msgTip:'',
            tipNum:'',
            WTInfo:{//获取当前所选交易的合约名称
                wtCode:'',
                wtMarket:'',
            },
            HQInfo:{//获取当前所选行情的合约名称
                hqCode:'',
                hqMarket:''
            },
            loginClass:loginClass,//登录类别
            accountClass:accountClass,//账号类别
            loginAccount:loginAccount,//登录账号
            //有效期
            validPrice: true,
            validTime: true,
            userId:null,//云交易userId
            token:testToken,//t认证的oken
            authId:testId,//认证的id
            XWLB:pbE.WT().wtGetCurrentAccountInfo('PbKey_Trade_Server_XWLB')
        },
        created:function(){
            var _this = this;
           var data =  getStorageInfo('addSlInfo');
            if(data){
                var list = JSON.parse(data);
                console.log(list)
                _this.stopFiledObj.hyName = list.HYMC;
                var value;
                if(list.Direction == 0){
                    value = '买开'
                }else if(list.Direction == 1){
                    value = '卖开'
                }
                _this.directionValue = value;
                _this.positionPrice = list.openPrice;
                _this.stopFiledObj.Volume = list.Volume;
                _this.stopFiledObj.ExchangeCode = list.ExchangeCode;//合约市场
                _this.stopFiledObj.ContractCode =list.ContractCode;//合约品种
                _this.stopFiledObj.Direction = list.Direction;//买卖方向
                _this.stopFiledObj.OpenPrice = list.openPrice;//开仓价
                _this.stopFiledObj.TodayFlag = list.TodayFlag;//今昨仓标志
                _this.stopFiledObj.DirectionObj = list.DirectionObj;
            }
            //交易合约
            _this.WTInfo.wtCode = GetQueryString("wtCode");
            _this.WTInfo.wtMarket = GetQueryString("wtMarket");
            //行情合约
            _this.HQInfo.hqCode = GetQueryString("hqCode");
            _this.HQInfo.hqMarket = GetQueryString("hqMarket");
            var direction = GetQueryString("direction");//买卖方向
            var todayFlag = GetQueryString("todayFlag");//今昨仓 （0：总仓，1：今仓，2：昨仓）
            if(window.pbE){
                var CID = pbE.WT().wtGetCurrentConnectionCID();
                /*if(CID <= 0){
                    window.location.href='pobo:uncheck=1&pageId=802005';
                }*/
                _this.token = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token');//token
                _this.authId = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId');//认证的id
                // _this.stopFiledObj.orgCode = JSON.parse(pbE.SYS().getDeviceJsonInfo()).jgid;//机构编号

                if(_this.WTInfo.wtCode && _this.WTInfo.wtMarket){
                    var tradeHq = pbE.WT().wtGetHQInfo( _this.WTInfo.wtCode,_this.WTInfo.wtMarket);//交易信息转换行情信息
                    if(tradeHq){
                        var data = JSON.parse(tradeHq);
                        _this.stopFiledObj.hyName = data.HQName;//合约名称
                        _this.stopFiledObj.ExchangeCode =  _this.WTInfo.wtMarket;//合约市场
                        _this.stopFiledObj.ContractCode = _this.WTInfo.wtCode;//合约品种
                    }
                }
                else if(_this.HQInfo.hqCode && _this.HQInfo.hqMarket) {
                    var tradeWT = pbE.HQ().hqGetWTInfo(_this.HQInfo.hqCode, _this.HQInfo.hqMarket, CID);//行情信息转换交易信息
                    var nameJson = pbE.HQ().getHQInfo(_this.HQInfo.hqCode, _this.HQInfo.hqMarket);//
                    if (tradeWT || nameJson) {
                        var data = JSON.parse(tradeWT);
                        _this.stopFiledObj.ExchangeCode= data.WTMarket;//合约市场
                        _this.stopFiledObj.ContractCode = data.WTCode;//合约品种
                        var dataName = JSON.parse(nameJson);
                        _this.stopFiledObj.hyName = dataName.name;
                    }
                }
                //查询全部持仓
                var allData =  pbE.WT().wtQueryStockRe(CID);
                if(allData){
                    var list = JSON.parse(allData).data;
                    //market：市场，code：合约代码，direction：买卖方向，todayFlag：今昨仓 （0：总仓，1：今仓，2：昨仓） 手机上传过来的值
                    for(var i = 0; i < list.length; i++){
                        //list[i]['503'] ‘0’总仓  ‘2’昨仓 ‘1’今仓
                        var tyDay;
                        var saveDay;
                        if(todayFlag == 1 && list[i]['503'] == 1){//表示是今仓
                            tyDay = 1;
                            saveDay = '2';
                            _this.stopFiledObj.OffsetFlag = '2'
                        }else if(todayFlag == 2 && list[i]['503'] == 2){//表示是昨仓
                            tyDay = 2;
                            saveDay = '1';
                            _this.stopFiledObj.OffsetFlag = '1'
                        }else if(todayFlag == 0 && list[i]['503'] != 1 || list[i]['503'] != 2){//表示总仓
                            tyDay = 0;
                            saveDay = '0'
                            _this.stopFiledObj.OffsetFlag = '1'
                        }

                        if(_this.WTInfo.wtCode == list[i]['63'] && _this.WTInfo.wtMarket == list[i]['54'] && direction == list[i]['112'] && todayFlag == tyDay){
                            if(list[i]['112'] == 0){
                                _this.directionValue = "买开" ;
                                _this.stopFiledObj.Direction = 0
                            }else if(list[i]['112'] == 1){
                                _this.directionValue = "卖开" ;
                                _this.stopFiledObj.Direction = 1
                            }else{
                                _this.directionValue = "----" ;
                            }
                            _this.positionPrice = list[i]['139'];//持仓均价
                            _this.stopFiledObj.Volume = list[i]['137'];//可用数量
                            _this.tipNum = list[i]['137'];//可用数量
                            _this.stopFiledObj.OpenPrice = list[i]['136']//开仓价
                            _this.stopFiledObj.TodayFlag = saveDay;
                        }
                    }
                }
                //查询交易日
                var allData = pbE.WT().wtLoginRe(CID);
                if(allData){
                    var data = JSON.parse(allData).data;
                    _this.stopFiledObj.TradeDate = data[0]['75']
                }
                _this.userId = pbE.WT().wtGetYunTradeUserId(CID);//获取云交易的userId
                //这里会根据userId是否为空判断云条件单是否登录了交易，如果登录交易，可以直接进入条件单页面
                if(!_this.userId){
                    _this.userId = null;//等于0代表未上传交易账号此时应该callback 102001
                }
            }
        },
        watch:{
            //非空判断
            'stopFiledObj.filedPrice':function(newVal){
                this.stopFiledObj.filedPrice = newVal
                //console.log('new: %s, old: %s', val, oldVal)
                if(this.stopFiledObj.stopPrice || newVal){
                    this.blueBtn = true;
                    this.initAddBtn = false;
                }else{
                    this.blueBtn = false;
                    this.initAddBtn = true;
                }
            },
            'stopFiledObj.stopPrice':function(newVal){
                this.stopFiledObj.stopPrice = newVal
                if(this.stopFiledObj.filedPrice || newVal){
                    this.blueBtn = true;
                    this.initAddBtn = false;
                }else{
                    this.blueBtn = false;
                    this.initAddBtn = true;
                }
            },
        },
        methods:{
            priceInfoClick:function(name){
                if(name == 1){//涨停价
                    this.stopFiledObj.LimitPriceType = '涨停价'
                }
                if(name == 2){//跌停价
                    this.stopFiledObj.LimitPriceType = '跌停价'
                }
                if(name == 3){//对手价
                    this.stopFiledObj.LimitPriceType = '对手价'
                }
                if(name == 4){//最新价
                    this.stopFiledObj.LimitPriceType = '最新价'
                }
            },
            //条件单设置中有效期  切换样式
            validDateClick: function (flag) {
                var _this = this;
                //  1-当日有效，2-永久有效
                if (flag == 0) {//当日
                    _this.validPrice = true;
                    _this.validTime = true;
                    _this.stopFiledObj.TimeCondition = 1;
                }
                if (flag == 1) {//永久
                    _this.validPrice = false;
                    _this.validTime = false;
                    _this.stopFiledObj.TimeCondition = 2;
                }
            },
            //添加
            btnConfirmClick:function(){
                var _this = this;
                //console.log(parseInt(_this.stopFiledObj.Volume)+":"+parseInt(_this.tipNum))
                if(parseInt(_this.stopFiledObj.Volume) > parseInt(_this.tipNum)){
                    //弹出提示信息
                    _this.msgTip = "输入的数量不能大于当前的数量！";
                    $('#msgTipDialog').modal('show');
                    return;
                }
                if(!_this.userId){
                    _this.msgTip = "userId不能为空！";
                    $('#msgTipDialog').modal('show');
                    return;
                }
                var data = new stopOfFiled();
                data.AttachObject[0].Contract.ExchangeCode  =  _this.stopFiledObj.ExchangeCode;//市场
                data.AttachObject[0].Contract.ContractCode  =  _this.stopFiledObj.ContractCode;//品种
                data.AttachObject[0].TodayFlag  = _this.stopFiledObj.TodayFlag;//今昨仓
                //从原生持仓里面获取
                data.TimeCondition = _this.stopFiledObj.TimeCondition;//有效期 1-当日有效，2-永久有效
                data.TradeDate = _this.stopFiledObj.TradeDate;//交易日，用于指明TimeCondition中的“当日有效”到底是指哪一日

                if(stopLessType == 3){
                    console.log("1前面的方向："+_this.stopFiledObj.DirectionObj)
                    data.AttachObject[0].Direction = _this.stopFiledObj.DirectionObj;
                }else{
                    console.log("2")
                    data.AttachObject[0].Direction = _this.stopFiledObj.Direction+'';
                }
                //data.AttachObject[0].Direction = _this.stopFiledObj.Direction+"";//买卖方向
                data.AttachObject[0].OpenPrice = _this.stopFiledObj.OpenPrice * 1;//开仓价
                data.AttachObject[0].Volume = parseInt(_this.stopFiledObj.Volume);//买卖数量
                data.Contracts[0] = {
                    ExchangeCode:  _this.stopFiledObj.ExchangeCode,//市场
                    ContractCode:  _this.stopFiledObj.ContractCode//品种
                };
                if(_this.stopFiledObj.stopPrice){
                    data.ConditionList[0].PositionStop.AbsoluteStopLoss = true;//绝对价格止损是否启用
                }
                if(_this.stopFiledObj.filedPrice){
                    data.ConditionList[0].PositionStop.AbsoluteStopProfit = true;//绝对价格止盈是否启用
                }
                if(_this.stopFiledObj.stopPrice && _this.stopFiledObj.filedPrice){
                    data.ConditionList[0].PositionStop.AbsoluteStopLoss = true;//绝对价格止损是否启用
                    data.ConditionList[0].PositionStop.AbsoluteStopProfit = true;//绝对价格止盈是否启用
                }
                //止损止盈条件参数
                data.ConditionList[0].PositionStop.StopLossPrice = parseInt(_this.stopFiledObj.stopPrice) ? parseInt(_this.stopFiledObj.stopPrice):'';//止损价
                data.ConditionList[0].PositionStop.StopProfitPrice =parseInt(_this.stopFiledObj.filedPrice) ? parseInt(_this.stopFiledObj.filedPrice):'';//止盈价
                //下单参数
                //data.OrderAction.SmartOrder.Order.EAccountId
                data.OrderAction.SmartOrder.Order.Contract.ExchangeCode = _this.stopFiledObj.ExchangeCode;//市场
                data.OrderAction.SmartOrder.Order.Contract.ContractCode = _this.stopFiledObj.ContractCode;//品种
                data.OrderAction.SmartOrder.Order.Volume = parseInt(_this.stopFiledObj.Volume);//买卖数量
                if(stopLessType == 3){//表示在编辑页面重复添加这时下单的方向就不用相反直接取值
                    console.log("3:里面的方向"+_this.stopFiledObj.Direction)
                    data.OrderAction.SmartOrder.Order.Direction = _this.stopFiledObj.Direction+'';
                }else{
                    var openWay;//下单的时候方向相反
                    if(_this.stopFiledObj.Direction == 0){//买
                        openWay = '1';
                    }else if(_this.stopFiledObj.Direction == 1){//卖
                        openWay = '0';
                    }
                    data.OrderAction.SmartOrder.Order.Direction = openWay;//买卖方向  下单时方向相反
                }
                data.OrderAction.SmartOrder.Order.OffsetFlag = _this.stopFiledObj.OffsetFlag;//开平方向
                data.OrderAction.SmartOrder.Order.LimitPriceType = _this.stopFiledObj.LimitPriceType+"";
                //登录账号类别   从原生读取
                data.OrderAction.SmartOrder.Order.EAccountId['67'] = _this.loginClass;//登录类别
                data.OrderAction.SmartOrder.Order.EAccountId['53'] = _this.accountClass;//账号类别
                data.OrderAction.SmartOrder.Order.EAccountId['249'] = _this.loginAccount;//登录账号
                data.OrderAction.SmartOrder.Order.EAccountId['895'] = _this.stopFiledObj.orgCode;//机构代码
                data.OrderAction.SmartOrder.Order.EAccountId['879'] = _this.XWLB;//席位类别
                data.OrderAction.SmartOrder.Order.UserAccountID = _this.userId;//用户账号
                console.log(data,'添加')
                circleShowPass("正在下单");//显示转圈
                $.ajax({
                    url:conditionUrl,
                    method:'post',
                    dataType:'json',
                    contentType:'application/json;charest=utf-8',
                    data:JSON.stringify({
                        func: addContract,
                        token: _this.token,
                        id: _this.authId,
                        name:' ',//条件单名称
                        HYMC: _this.stopFiledObj.hyName,
                        type:stopFiledType,
                        terminal:'',
                        userID:_this.userId,
                        subType:_this.stopFiledObj.TimeCondition+"",
                        orgCode:_this.stopFiledObj.orgCode,
                        data:data,
                        os:os
                    }),
                    success:function(data){
                        console.log(data)
                        if(data.status == 0){
                            circleHidePass();//隐藏转圈
                            console.log("设置成功！")
                            _this.msgTip = "设置成功!";
                            $('#msgConfirm').modal('show');
                            return;
                        }else{
                            circleHidePass();//隐藏转圈
                            _this.msgTip = data.msg;
                            $('#msgTipDialog').modal('show')
                            return;
                        }
                    },error:function(){
                        circleHidePass();//隐藏转圈
                        _this.msgTip = "服务器异常";
                        $('#msgTipDialog').modal('show');
                        console.log("服务器异常！")
                        return;
                    }
                })
            },
            //重置信息
            resetClick:function(){
                this.stopFiledObj.Volume = '';
                this.stopFiledObj.filedPrice = '';
                this.stopFiledObj.stopPrice = '';
            },
            /*modalShow:function () {
                console.log('1')
                $('#priceInfoDialog').modal('show');
            }*/
        }
    })
}else if(stopLessType == 1){
    //止损止盈编辑设置
    $("#editStopOfFiled").css('display','block');
    new Vue({
        el:"#editStopOfFiled",
        data:{
            initAddBtn:true,//初始化按钮
            blueBtn:false,
            stopFiledObj:{
                conditionID: '',//条件单编号
                Direction:'',//方向//买卖方向  0 买 1 卖
                Volume:'',//数量
                OffsetFlag:'',//开平方向
                stopPrice:'',//止损价
                filedPrice:'',//止盈价
                ExchangeCode:'',//市场
                ContractCode:'',//品种
                hyName:'',
                TimeCondition : 1,         //有效期: 1-当日有效，2-永久有效
                ConditionChoiced : 1,      //当前选择条件：1-PositionStop（止损止盈模板）
                LimitPriceType:'',
                orgCode:orgCode,//机构编号
                loginClass:loginClass,//登录类别
                accountClass:accountClass,//账号类别
                loginAccount:loginAccount,//登录账号
                TodayFlag:"",//持仓均价
                DirectionObj:''
            },
            //有效期
            validPrice: true,
            validTime: true,
            userId:null,//云交易userId
            token:testToken,//t认证的oken
            authId:testId,//认证的id
            // orgCode:orgCode,
            msgTip:'',
            msgInfo:'',
            XWLB:pbE.WT().wtGetCurrentAccountInfo('PbKey_Trade_Server_XWLB')
        },
        created:function(){
            var _this = this;
            //取出从止损止盈列表进来要编辑修改的信息
            var data =  getStorageInfo("stopOfFiledObj");
            if(data){
                var dataValue = JSON.parse(data)
                console.log(JSON.parse(data))
                console.log(JSON.parse(JSON.parse(data)[0].conditionValue))
                var allContext  = JSON.parse(JSON.parse(data)[0].conditionValue)
                //console.log(orderAction.ConditionList[0])
                _this.stopFiledObj.hyName = dataValue[0].HYMC;
                _this.stopFiledObj.conditionID = dataValue[0].conditionID;
                _this.stopFiledObj.TimeCondition = dataValue[0].TimeCondition; //有效期 1-当日有效，2-永久有效

                _this.stopFiledObj.Volume =allContext.OrderAction.SmartOrder.Order.Volume;
                _this.stopFiledObj.Direction =allContext.OrderAction.SmartOrder.Order.Direction;
                _this.stopFiledObj.OffsetFlag =allContext.OrderAction.SmartOrder.Order.OffsetFlag;
                _this.stopFiledObj.LimitPriceType =allContext.OrderAction.SmartOrder.Order.LimitPriceType;

                _this.stopFiledObj.OpenPrice =allContext.AttachObject[0].OpenPrice ;//开仓价
                _this.stopFiledObj.stopPrice =allContext.ConditionList[0].PositionStop.StopLossPrice;//绝对止损
                _this.stopFiledObj.filedPrice =allContext.ConditionList[0].PositionStop.StopProfitPrice;//绝对止盈
                _this.stopFiledObj.ExchangeCode = allContext.Contracts[0].ExchangeCode;
                _this.stopFiledObj.ContractCode = allContext.Contracts[0].ContractCode;

                _this.stopFiledObj.TodayFlag = allContext.AttachObject[0].TodayFlag;//今昨仓
                _this.stopFiledObj.DirectionObj = allContext.AttachObject[0].Direction;
            }
            if(window.pbE){
                _this.token = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token');//token
                _this.authId = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId');//认证的id
                // _this.orgCode = JSON.parse(pbE.SYS().getDeviceJsonInfo()).jgid;//机构编号
                var CID = pbE.WT().wtGetCurrentConnectionCID();
                if(CID <= 0){
                    window.location.href='pobo:uncheck=1&pageId=802005';
                }
                _this.userId = pbE.WT().wtGetYunTradeUserId(CID);
            }
            //从原生入口编辑止损止盈时获取的详细信息
            var plantId =  GetQueryString("plantId");//市场代码
            _this.stopFiledObj.conditionID = plantId;
            $.ajax({
                url: conditionUrl,
                method: 'post',
                dataType: 'json',
                contentType: 'application/json;charest=utf-8',
                data: JSON.stringify({
                    func: conIdQuery,
                    token: testToken,
                    id: id,
                    orgCode:_this.stopFiledObj.orgCode,
                    userID: _this.userId,
                    type: stopFiledType,
                    data: [plantId],//条件单编号
                    //data: ['2017022300000000004'],//条件单编号
                }),
                success: function (data) {
                    console.log(data.data);
                    if(data.data){
                        var dataValue = JSON.parse(data.data[0].conditionValue);
                        _this.stopFiledObj.hyName = data.data[0].HYMC;
                        _this.stopFiledObj.Direction = dataValue.OrderAction.SmartOrder.Order.Direction;//买卖方向下单的

                        _this.stopFiledObj.TodayFlag = dataValue.AttachObject[0].TodayFlag;//今昨仓标志
                        _this.stopFiledObj.Volume =dataValue.OrderAction.SmartOrder.Order.Volume;
                        _this.stopFiledObj.TimeCondition = dataValue.TimeCondition; //有效期 1-当日有效，2-永久有效
                        _this.stopFiledObj.stopPrice =dataValue.ConditionList[0].PositionStop.StopLossPrice;//绝对止损
                        _this.stopFiledObj.filedPrice =dataValue.ConditionList[0].PositionStop.StopProfitPrice;//绝对止盈
                        _this.stopFiledObj.OpenPrice =dataValue.AttachObject[0].OpenPrice ;//开仓价
                        _this.stopFiledObj.LimitPriceType =dataValue.OrderAction.SmartOrder.Order.LimitPriceType ;//委托价
                        _this.stopFiledObj.ExchangeCode =dataValue.AttachObject[0].Contract.ExchangeCode;
                        _this.stopFiledObj.ContractCode =dataValue.AttachObject[0].Contract.ContractCode;

                        _this.stopFiledObj.DirectionObj = dataValue.AttachObject[0].Direction;
                    }
                }, error: function (data) {

                }
            })
        },
        methods:{
            addInfo:function(){
                var _this = this;
                //缓存合约信息 添加时
                var obj={
                    HYMC:_this.stopFiledObj.hyName,
                    Direction:_this.stopFiledObj.Direction,
                    openPrice:_this.stopFiledObj.OpenPrice,
                    Volume:_this.stopFiledObj.Volume,
                    ExchangeCode : _this.stopFiledObj.ExchangeCode,
                    ContractCode : _this.stopFiledObj.ContractCode,

                    TodayFlag : _this.stopFiledObj.TodayFlag,//今昨仓标志
                    DirectionObj: _this.stopFiledObj.DirectionObj

                }
                console.log(obj)
                saveStorageInfo("addSlInfo",obj);
                console.log(getStorageInfo('addSlInfo'));
                if(window.pbE){
                    $("#nativeUrl").attr('href','pobo:uncheck=1&pageId=900005&url=condition/view/condition-set-sl.html?type=3')
                    window.setTimeout(function(){
                        $("#nativeUrl")[0].click();
                    },1000)
                }else{
                    window.location.href='condition-set-sl.html?type=3';
                }
            },
            priceInfoClick:function(name){
                if(name == 1){//涨停价
                    this.stopFiledObj.LimitPriceType = '涨停价'
                }
                if(name == 2){//跌停价
                    this.stopFiledObj.LimitPriceType = '跌停价'
                }
                if(name == 3){//对手价
                    this.stopFiledObj.LimitPriceType = '对手价'
                }
                if(name == 4){//最新价
                    this.stopFiledObj.LimitPriceType = '最新价'
                }
            },
            //条件单设置中有效期  切换样式
            validDateClick: function (flag) {
                var _this = this;
                //  1-当日有效，2-永久有效
                if (flag == 0) {//当日
                    _this.validPrice = true;
                    _this.validTime = true;
                    _this.stopFiledObj.TimeCondition = 1;
                }
                if (flag == 1) {//永久
                    _this.validPrice = false;
                    _this.validTime = false;
                    _this.stopFiledObj.TimeCondition = 2;
                }
            },
            blurInfo:function(){
                //非空判断
                if(this.stopFiledObj.filedPrice || this.stopFiledObj.stopPrice){
                    this.blueBtn = true;
                    this.initAddBtn = false;
                }
            },
            //修改
            btnConfirmClick:function(){
                var _this = this;
                var data = new stopOfFiled();
                data.AttachObject[0].Contract.ExchangeCode  =  _this.stopFiledObj.ExchangeCode;//市场
                data.AttachObject[0].Contract.ContractCode  =  _this.stopFiledObj.ContractCode;//品种
                //从原生持仓里面获取
                data.AttachObject[0].Direction = _this.stopFiledObj.Direction;//买卖方向
                data.AttachObject[0].Volume = _this.stopFiledObj.Volume;//买卖数量
                data.Contracts[0] = {
                    ExchangeCode:  _this.stopFiledObj.ExchangeCode,//市场
                    ContractCode:  _this.stopFiledObj.ContractCode//品种
                };
                if(_this.stopFiledObj.stopPrice){
                    data.ConditionList[0].PositionStop.AbsoluteStopLoss = true;//绝对价格止损是否启用
                }
                //止损止盈条件参数
                data.ConditionList[0].PositionStop.StopLossPrice = parseInt(_this.stopFiledObj.stopPrice) ? parseInt(_this.stopFiledObj.stopPrice):'';//止损价
                data.ConditionList[0].PositionStop.StopProfitPrice = parseInt(_this.stopFiledObj.filedPrice) ? parseInt(_this.stopFiledObj.filedPrice):'';//止盈价
                //下单参数
                //data.OrderAction.SmartOrder.Order.EAccountId
                data.OrderAction.SmartOrder.Order.Contract.ExchangeCode = _this.stopFiledObj.ExchangeCode;//市场
                data.OrderAction.SmartOrder.Order.Contract.ContractCode = _this.stopFiledObj.ContractCode;//品种
                data.OrderAction.SmartOrder.Order.Volume = _this.stopFiledObj.Volume;//买卖数量
                data.OrderAction.SmartOrder.Order.Direction = _this.stopFiledObj.Direction;//买卖方向
                //data.OrderAction.SmartOrder.Order.OffsetFlag = _this.stopFiledObj.OffsetFlag;//开平方向
                data.OrderAction.SmartOrder.Order.LimitPriceType = _this.stopFiledObj.LimitPriceType;
                //登录账号类别   从原生读取
                data.OrderAction.SmartOrder.Order.EAccountId['67'] = _this.loginClass;//登录类别
                data.OrderAction.SmartOrder.Order.EAccountId['53'] = _this.accountClass;//账号类别
                data.OrderAction.SmartOrder.Order.EAccountId['249']=_this.loginAccount;//登录账号
                data.OrderAction.SmartOrder.Order.EAccountId['895'] = _this.orgCode;//机构代码
                data.OrderAction.SmartOrder.Order.EAccountId['879'] = _this.XWLB;//席位类别
                data.OrderAction.SmartOrder.Order.UserAccountID = _this.userId;//用户账号
                console.log(data)
                circleShowPass("正在编辑");//显示转圈
                $.ajax({
                    url: conditionUrl,
                    method: 'post',
                    dataType: 'json',
                    contentType: 'application/json;charest=utf-8',
                    data: JSON.stringify({
                        func: editCon,
                        token: testToken,
                        id: id,
                        orgCode:_this.stopFiledObj.orgCode,
                        conditionID:_this.stopFiledObj.conditionID,
                        userID:_this.userId,
                        data: data,
                        type:stopFiledType
                    }),
                    success:function(data){
                        circleHidePass();//隐藏转圈
                        console.log(data);
                        if(data.status == 0){
                            console.log(" 修改成功！")
                            _this.msgTip = "修改成功!";
                            $('#msgEditConfirm').modal('show');
                            return;
                        }else if(data.status == -7 ){//首先要暂停才可以修改
                            _this.msgInfo = data.msg;
                            $('#confirmEditTipDialog').modal('show')
                            return;
                        }else{
                            _this.msgTip = data.msg;
                            $('#msgEditTipDialog').modal('show')
                            return;
                        }
                    },error:function(){
                        circleHidePass();//隐藏转圈
                        console.log("服务器异常！")
                        _this.msgTip = "服务器异常!";
                        $('#msgEditConfirm').modal('show');
                        return;
                    }
                })
            },
           /* modalShow:function () {
                console.log('2')
                $('#priceInfoDialog').modal('show');
            }*/
        }
    })
}

