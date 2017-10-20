/**
 * Created by xiajing on 2016/12/16.
 */

var conditionUrl= 'http://192.168.6.52:8080/1_0';
var conditionList = '1014';
var testToken='c5\/fE0I\/QfhFsysJbjbsuU+K5SKy8n1Qv5SGQaFYkLo8IjzC7khtYDSJlbWnuAbnqTF01CHc7hKtmA0L4u3ql6BwLcEcvLiRj32R5WdpbPzhLou74aJoPipOHWy1spxn'
var testId=10003;
var noneConTouch = 1005;//未触发
var isConTouch = 1004;//已触发
var addContract = 1002;
var conStopOrOn = 1007;//暂停或继续
var delCon = 1003;//删除
var conIdQuery = 1013;//根据条件单编号，查询条件单信息
var editCon = 1006;//编辑条件单的设置
var id=56;
var contractType = 1;//1表示条件单
var stopFiledType =2;//止损止盈
//存储信息
var saveStorageInfo = function(userName,obj){
    if(window.pbEngine){
        pbEngine.storePrivateData(userName,JSON.stringify(obj));
    }else{
        sessionStorage.setItem(userName, JSON.stringify(obj))
    }
}
//获取保存的信息
var getStorageInfo = function(userName){
    if(window.pbEngine){
        return pbEngine.getPrivateData(userName)
    }else{
        return  sessionStorage.getItem(userName)
    }
}
//条件单的设置属性
var setConData =function(){
    this.Id="";  //条件单条件Id
    this.PlanId={//计划任务号
        Type:"",
        Identity:"",
        "CheckSum": ""
    }
    this.Contracts=[ //可以有多个市场、品种,用于行情订阅和比价，
        {
            "ExchangeCode": "",     //市场  **行情端的市场代码 例如：2001
            "ContractCode": ""    //品种  **行情端代码，PBCODE  字符串
        }
    ]
    this.CreateTime="";//条件单创建时间
    this.UpdateTime = "";//条件单更改时间
    this.TradeDate = "";//交易日，用于指明TimeCondition中的“当日有效”到底是指哪一日

    this.imeCondition=""; //有效期: 1-当日有效，2-永久有效
    this.ConditionChoiced=""; //当前选择条件：1-价格，2-时间，3-开盘，4-手工
    this.ConditionList = [
        {
            "Price": {
                "Type": "最新价", //价格：最新价、买一价、卖一价
                "Operator": "",
                "Value": "",
                "Counter": 1, //连续次数
                "MatchedCounter": "", // 已匹配次数,程序填写
                "Enabled": true
            }
        },
        {"Time": ""} //某个触发时间点
    ];
   this.OrderAction = { //下单参数
            "ActionType": 1, //1- 智能委托， 2 - 组合委托
            "SmartOrder": { //智能委托参数,仅在 "ActionType"= 1（组合委托）时有效
            "Id": "",   //智能委托ID（uuid）,下单前生成
                "PlanId": { //计划任务号
                "Type": "",
                    "Identity": "",
                    "CheckSum": ""
            },
                "ComboOrderId": "", //组合委托ID，如果不属于组合委托，这儿为空
                "SplitOrderEnable": false, //是否要拆单
                "ReorderEnable": false, //是否要追单
                "CancelOrderEnable": false, //是否要撤单

                "Order": { //委托参数
                "EAccountId": { //实体账号Id
                    "Type": "AccountID",
                        "Generator": "UserID",
                        "Identity": "151" //账户名
                },
                "Contract": { //品种
                    "ExchangeCode": "", //市场
                     "ContractCode": "" //品种
                },
                    "Volume": "", //委托总数
                    "Direction": "", //买卖方向
                    "OffsetFlag": "", //开平标识
                    "PriceType": "2", //价格类别: 市价、限价（类型）//暂且不考虑限价
                    "LimitPriceType": "", //限价类型: 仅PriceType为“限价”时有本字段
                    "LimitPriceOffset": 2, //限价超价，仅PriceType为“限价”时有本字段，仅LimitPriceType为“对手价”、“挂单价”、“最新价”、“涨停价”、“跌停价”时有意义
                    "LimitPrice": "", //仅PriceType为“限价”时有本字段，仅LimitPriceType为“指定价格”时有意义
                    "AnyPriceType": "1", //市价类型，仅PriceType为“市价”时有本字段 1-POBO_TRADE_OPT_AnyPrice,3-POBO_TRADE_OPT_BestPrice,G-POBO_TRADE_OPT_FiveLevelPrice
                    "41": "1", //有效期类型(STEP_YXQLX)仅PriceType为“市价”时有本字段  1-POBO_TRADE_TC_IOC(立即完成，否则撤销)，3-POBO_TRADE_TC_GFD（当日有效）
                    "42": "1", //成交量类型(STEP_CJLLX)仅PriceType为“市价”时有本字段 1-POBO_TRADE_VC_AV（任意数量）,2-POBO_TRADE_VC_MV(最小)
                    "OutFactorFalg": false, //全局参数,外部撤单，是否继续追单
                    "ExtRawData": //参考STEP协议，投保标记、备兑标记，等等，直接复制到下单参数中
                {
                    "119": "1",
                    "127": "0",
                    "42": "1",
                    "495": "1"
                }
            }
        }
    }
}
