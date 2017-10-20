/**
 * Created by xiajing on 2016/12/19.
 * 止损止盈编辑
 */
new Vue({
    el:"#setStopOfFiled",
    data:{
        initAddBtn:true,//初始化按钮
        blueBtn:false,
        stopFiledObj:{
            conditionID: '',//条件单编号
            Direction:'',//方向
            Volume:'',//数量
            OffsetFlag:'',//开平方向
            stopPrice:'',//止损价
            filedPrice:'',//止盈价
            ExchangeCode:'',//市场
            ContractCode:'',//品种
            hyName:'',
            TimeCondition : 1,         //有效期: 1-当日有效，2-永久有效
            ConditionChoiced : 1,      //当前选择条件：1-PositionStop（止损止盈模板）
            LimitPriceType:'对手价',
            orgCode:'1258',//机构编号
        }
    },
    created:function(){
        var _this = this;
      //取出要编辑修改的信息
        var data =  getStorageInfo("stopOfFiledObj");
        if(data){
            var dataValue = JSON.parse(data)
            console.log(JSON.parse(data))
             console.log(JSON.parse(JSON.parse(data)[0].conditionValue))
            var allContext  = JSON.parse(JSON.parse(data)[0].conditionValue)
             //console.log(orderAction.ConditionList[0])
            _this.stopFiledObj.hyName = dataValue[0].HYDM;
            _this.stopFiledObj.conditionID = dataValue[0].conditionID;

            _this.stopFiledObj.Volume =allContext.OrderAction.SmartOrder.Order.Volume;
            _this.stopFiledObj.Direction =allContext.OrderAction.SmartOrder.Order.Direction;
            _this.stopFiledObj.OffsetFlag =allContext.OrderAction.SmartOrder.Order.OffsetFlag;
            _this.stopFiledObj.LimitPriceType =allContext.OrderAction.SmartOrder.Order.LimitPriceType;

            _this.stopFiledObj.stopPrice =allContext.ConditionList[0].PositionStop.StopLossPrice;
            _this.stopFiledObj.filedPrice =allContext.ConditionList[0].PositionStop.StopProfitPrice;
            _this.stopFiledObj.ExchangeCode = allContext.Contracts[0].ExchangeCode;
            _this.stopFiledObj.ContractCode = allContext.Contracts[0].ContractCode;

        }
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
        blurInfo:function(){
            //非空判断
            if(this.stopFiledObj.filedPrice && this.stopFiledObj.stopPrice){
                this.blueBtn = true;
                this.initAddBtn = false;
            }else if(!this.stopFiledObj.filedPrice || !this.stopFiledObj.stopPrice){
                this.blueBtn = false;
                this.initAddBtn = true;
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
            data.ConditionList[0].PositionStop.StopLossPrice = _this.stopFiledObj.stopPrice;//止损价
            data.ConditionList[0].PositionStop.StopProfitPrice = _this.stopFiledObj.filedPrice;//止盈价
            //下单参数
            //data.OrderAction.SmartOrder.Order.EAccountId
            data.OrderAction.SmartOrder.Order.Contract.ExchangeCode = _this.stopFiledObj.ExchangeCode;//市场
            data.OrderAction.SmartOrder.Order.Contract.ContractCode = _this.stopFiledObj.ContractCode;//品种
            data.OrderAction.SmartOrder.Order.Volume = _this.stopFiledObj.Volume;//买卖数量
            data.OrderAction.SmartOrder.Order.Direction = _this.stopFiledObj.Direction;//买卖方向
            data.OrderAction.SmartOrder.Order.OffsetFlag = _this.stopFiledObj.OffsetFlag;//开平方向
            data.OrderAction.SmartOrder.Order.LimitPriceType = _this.stopFiledObj.LimitPriceType;
            console.log(data)
            $.ajax({
                url: conditionUrl,
                method: 'post',
                dataType: 'json',
                contentType: 'application/json;charest=utf-8',
                data: JSON.stringify({
                    func: editCon,
                    token: testToken,
                    id: id,
                    orgCode:_this.orgCode,
                    conditionID:_this.stopFiledObj.conditionID,
                    data: data
                }),
                success:function(data){
                    if(data.status == 0){
                        console.log(" 修改成功！")
                        window.location.href = 'feture-stop-filled.html'
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        }
    }
})