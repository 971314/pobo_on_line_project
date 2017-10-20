<template>
    <div style="padding-top:39px">
        <span @click="gotoSet()" class="navThreeTitle" style="position: fixed; top: 13px; right: 10px; z-index: 1030;">添加</span>
        <div class="setDiv">
            <div class="setOut">
                <ul>
                    <li>
                        <div class="setDivOne" >
                            <span  class="inputText" style="display: inline-block;"   @click="selectContractDialog"  >{{editQueryInfo.selectContractName ? editQueryInfo.selectContractName : '---'}}</span>
                        </div>
                        <div class="setDivTwo">最新：</div>
                        <div class="setDivThree" id="newPrice">--</div>
                    </li>
                    <li>
                        <div class="priceOne">
                            条件单名称
                        </div>
                        <div class="priceTwo"></div>
                        <div class="priceThree">
                            <input  type="text"  placeholder="条件单名称" v-model="editQueryInfo.conditionEditName"/>
                        </div>
                    </li>
                    <li>
                        <div class="conOne">有效期</div>
                        <div class="conTwo">
                            <!--有效期 1-当日有效，2-永久有效-->
                            <span v-bind:class="[validPrice ? 'conSpanOne' : 'conSpanThree']" @click="validDateClick(0)">当日</span>
                            <span v-bind:class="[validTime ? 'conSpanTwo' : 'conSpanFour']"  @click="validDateClick(1)">永久</span>
                        </div>
                    </li>
                    <li>
                        <div class="conOne">条件</div>
                        <div class="conTwo">
                            <!--//当前选择条件：1-价格，2-时间-->
                            <span v-bind:class="[conPrice ? 'conSpanOne' : 'conSpanThree']" @click="conditionClick(0)">价格</span>
                            <span v-bind:class="[conTime ? 'conSpanTwo' : 'conSpanFour']"  @click="conditionClick(1)">时间</span>
                        </div>
                    </li>
                    <li v-if="initPrice">
                        <div class="priceOne">
                            <span class="priceStyle" @click="priceTypeClick" v-text="editQueryInfo.OperatorEdit ? editQueryInfo.OperatorEdit : '---' "></span>
                        </div>
                        <div class="priceTwo"></div>
                        <div class="priceThree">
                            <input  type="number" v-model="editQueryInfo.valueEdit" placeholder="价格"/>
                        </div>
                    </li>
                    <li v-else="initTime">
                        <div class="timeConOne">时间到达</div>
                        <div class="timeConTwo">
                            <vue-timepicker v-model="editQueryInfo.tjTimeEdit" format="HH:mm:ss"></vue-timepicker>
                        </div>
                    </li>
                    <li>
                        <div class="conOne">买卖方向</div>
                        <div class="conTwo">
                            <span v-bind:class="[buyPrice ? 'conSpanOne' : 'conSpanThree']" @click="buyClick(0)">买</span>
                            <span v-bind:class="[buyTime ? 'conSpanTwo' : 'conSpanFour']"  @click="buyClick(1)">卖</span>
                        </div>
                    </li>
                    <li>
                        <div class="conTypeOne">类型</div>
                        <div class="conTypeTwo">
                            <span   v-bind:class="{conSpanTyeOne:openCang, conSpanTyeOneBlue:openCangFFF}" @click="storehouseTypeClick(0)">开仓</span>
                            <span   v-bind:class="{conSpanTyeTwo:pingCang, conSpanTyeTwoBlue:pingCangBlue}" @click="storehouseTypeClick(1)">平仓</span>
                            <template v-if="pingDayShow">
                                <span   v-bind:class="{conSpanTyeThree:pingDay, conSpanTyeThreeBlue:pingDayBlue}" @click="storehouseTypeClick(2)">平今</span>
                            </template>
                            <template v-else>
                                <span   v-bind:class="{pingDayB:pingDay, conSpanTyeThreeBlue:pingDayBlue}">平今</span>
                            </template>
                        </div>
                    </li>
                    <li>
                        <div class="entrustOne">委托价格</div>
                        <div class="entrustTwo">
                        <span class="trustSpan">
                            <input type="text"  class="inputText"  @click="trustPriceType = 1" v-model="editQueryInfo.priceNameEdit"/>
                        </span>
                        <span class="trustSpanOne" @click="priceInfoDialog">
                            类型
                        </span>
                        </div>
                    </li>
                    <li>
                        <div class="conOne">委托数量</div>
                        <div class="conTwo">
                            <span class="market"><input type="number" class="inputText" v-model="editQueryInfo.VolumeEdit"/></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="conDivInfo">
      <span class="spanRed">
           可开：  <span id="openBuy">--</span>
       </span>
       <span class="spanBlue">
           可平： <span id="openNum">--</span>
       </span>
        </div>
        <div class="btnDiv conBtn" style="display: block">
            <button   type="button" class="btnSubmit" data-toggle="button" @click="editConClick">
                编辑
            </button>
        </div>
        <select-con-dialog :selectContract.sync="selectContract" @selectContractClick="selectContractClick"></select-con-dialog>
        <price-dialog @priceInfoClick="priceInfoClick"></price-dialog>
        <tip-msg :msgTip.sync="msgTip"></tip-msg>
    </div>
</template>
<script>
    //价格倍数
    var priceMulriple;
    var lastPrice;//最新价
    var opponentPriceBuy;//对手价买
    var opponentPriceSell;//对手价卖
    var upPrice;//涨停价
    var downPrice;//跌停价
    var nameCode = '';
    import VueTimepicker from 'vue2-timepicker';
    import selectConDialog from '../component/dialog/selectConDialog.vue';
    import priceDialog from '../component/dialog/priceDialog.vue';
    import tipMsg from '../component/dialog/tipMsg.vue';
    export default{
            data:function(){
                return{
                    editQueryInfo: {//编辑条件单设置时获取的参数
                        HYDM: '',//合约市场 market
                        contractEditCode: '',//合约品种 code
                        TimeCondition: '',//有效期 1-当日有效，2-永久有效
                        ConditionChoicedEdit: '',//当前选择条件：1-价格，2-时间
                        OperatorEdit: '',//操作 >= <=
                        valueEdit: '',//条件里面的 输入价格值
                        dealOpenEdit: '',//买卖方向
                        OffsetFlagEdit: '',//开平标识
                        VolumeEdit: '',//委托数量
                        LimitPriceTypeEdit: '', //限价类型: 仅PriceType为“限价”时有本字段
                        LimitPriceEdit: '',//仅PriceType为“限价”时有本字段，仅LimitPriceType为“指定价格”时有意义
                        priceNameEdit: '',
                        conditionEditName:'',//条件单名称
                        selectContractName:'',
                        conditionID:'',//条件单id
                        TradeDate:'',//交易日 用于指明TimeCondition中的“当日有效”到底是指哪一日
                    },
                    //有效期 当日、永久
                    validPrice: true,
                    validTime: true,
                    //条件：价格、时间
                    conPrice: true,
                    conTime: true,
                    //买卖方向
                    buyPrice: true,
                    buyTime: true,
                    //开仓、平仓、平今
                    openCang: true,
                    pingCang: true,
                    pingDay: true,
                    pingCangBlue: false,
                    openCangFFF: false,
                    pingDayBlue: false,

                    tjTimeEdit: {//条件里面的时分秒
                        HH: "",
                        mm: "",
                        ss: ""
                    },

                    trustPriceType: null,//默认给mull 表示是选择  的委托价格
                    selectContract: '',//选择合约

                    token:testToken,//t认证的oken
                    authId:testId,//认证的id
                    orgCode:orgCode,//机构编号

                    msgTip:"",
                    loginClass:loginClass,//登录类别
                    accountClass:accountClass,//账号类别
                    loginAccount:loginAccount,//登录账号

                    CID:'',
                    pingDayShow:true,
                    destroyMarket:'',//取消订阅时存的值

                    WTInfo:{//获取当前所选交易的合约名称
                        wtCode:'',
                        wtMarket:'',
                    },
                    HQInfo:{//获取当前所选行情的合约名称
                        hqCode:'',
                        hqMarket:''
                    },
                }
            },
            components:{
                VueTimepicker: VueTimepicker,
                selectConDialog:selectConDialog,
                priceDialog:priceDialog,
                tipMsg:tipMsg
            },
            created:function(){
                // 根据market 和 code 查出单个条件单的合约
                var option = {
                    callbacks: [
                        {module: 90000, callback: function(msg){
                            var data = msg.jData.Data;
                            console.log(data)
                            for(var i = 0;i < data.length;i++){//最新价
                                if(data[i][10] == nameCode){
                                    if(data[i][29]){
                                        lastPrice = data[i][29]/priceMulriple;//最新价
                                        $("#newPrice").html(data[i][29]/priceMulriple);//最新价
                                    }else{
                                        $("#newPrice").html("--");//最新价
                                    }
                                    if(data[i][30]){
                                        upPrice = data[i][30]/priceMulriple;//涨停价
                                    }
                                    if(data[i][31]){
                                        downPrice = data[i][31]/priceMulriple;//跌停价
                                    }
                                    if(data[i].BidSize[0][40]){
                                        opponentPriceSell = data[i].BidSize[0][40]/priceMulriple;//卖
                                    }
                                    if(data[i].AskSize[0][42]){
                                        opponentPriceBuy = data[i].AskSize[0][42]/priceMulriple;//买
                                    }
                                }
                            }
                        }},
                        {fun: 6044, callback: function(msg){//查询可开 可买数量
                            console.log(msg)
                            var data = msg.jData.data;
                            if(data){
                                if(data[0]){
                                    $("#openBuy").html(data[0][250])
                                    console.log(data[0][250])
                                }else{
                                    $("#openBuy").html(0)//如果没值就显示0
                                }
                            }
                        }},
                        {fun:102001,callback:function(msg){
                            if(testUserId == null){
                                if(msg){
                                    if(102001 == msg.functionNo){
                                            testUserId = pbE.WT().wtGetYunTradeUserId(pbE.WT().wtGetCurrentConnectionCID());//获取云交易的userId
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
                    }
                }
                pbPage.initPage(option);
                var _this = this;
                //取出条件单单条详情
                var data =  getStorageInfo("conNoneListObj");
                if(data) {
                   var list = JSON.parse(data);
                  var dataValue = JSON.parse(list[0].conditionValue);
                  console.log(JSON.stringify(dataValue),'第一次获取')
                    //当前选择条件：1-价格，2-时间
                    var priceValue;
                    var priceOper;
                    var priceTime;
                    if (dataValue.ConditionChoiced == 1) {
                        //取价格里面的值
                        priceValue = dataValue.ConditionList[0].Price.Value;
                        priceOper = dataValue.ConditionList[0].Price.Operator;
                    } else if (dataValue.ConditionChoiced == 2) {
                        //取时间的值
                        priceTime = dataValue.ConditionList[1].Time;
                    }
                    //委托价格如果是输入的就将文本框的值CustomPrice赋给LimitPriceType，类型为double类型或者string，如果是通过类型选择的就将选的值赋给LimitPriceType
//                    var trustPriceType;
//                    if (_this.trustPriceType == 2) {//表示选择
//                        trustPriceType = dataValue.OrderAction.SmartOrder.Order.LimitPriceType
//                    } else if (_this.trustPriceType == 1) {//表示输入
//                        trustPriceType = dataValue.OrderAction.SmartOrder.Order.LimitPrice
//                    }
                    var priceOne;
                    var priceTwo;
                    if(dataValue.OrderAction.SmartOrder.Order.LimitPrice){//表示输入的
                        priceOne = dataValue.OrderAction.SmartOrder.Order.LimitPrice;
                        priceTwo = dataValue.OrderAction.SmartOrder.Order.LimitPriceType;
                        _this.trustPriceType = 1;
                    }else{
                        priceTwo = dataValue.OrderAction.SmartOrder.Order.LimitPriceType;
                        _this.trustPriceType = 2;
                    }
                    _this.editQueryInfo = {
                        conditionID:list[0].conditionID,
                        conditionEditName: list[0].name,
                        selectContractName:list[0].HYMC,
                        HYDM:dataValue.Contracts[0].ExchangeCode,//market
                        contractEditCode: dataValue.Contracts[0].ContractCode,//合约品种
                        TimeCondition: dataValue.TimeCondition,//有效期 1-当日有效，2-永久有效
                        TradeDate:dataValue.TradeDate,//交易日，用于指明TimeCondition中的“当日有效”到底是指哪一日
                        ConditionChoicedEdit: dataValue.ConditionChoiced,//当前选择条件：1-价格，2-时间
                        OperatorEdit: priceOper,//操作 >= <=
                        valueEdit: priceValue,//条件里面的 输入价格值
                        tjTimeEdit: priceTime,//条件里面的时分秒
                        dealOpenEdit: dataValue.OrderAction.SmartOrder.Order.Direction,//买卖方向
                        OffsetFlagEdit: dataValue.OrderAction.SmartOrder.Order.OffsetFlag,//开平标识
                        VolumeEdit: dataValue.OrderAction.SmartOrder.Order.Volume,//委托数量
                        LimitPriceTypeEdit: dataValue.OrderAction.SmartOrder.Order.LimitPriceType, //限价类型: 仅PriceType为“限价”时有本字段
                        LimitPriceEdit: priceOne,//仅PriceType为“限价”时有本字段，仅LimitPriceType为“指定价格”时有意义
                        priceNameEdit: priceTwo
                    };
                    console.log(JSON.stringify(_this.editQueryInfo),'获取未触发');
                    //根据合约名称订阅最新价
                    if(window.pbE){
                        var tradeHq = pbE.WT().wtGetHQInfo(  _this.editQueryInfo.contractEditCode,_this.editQueryInfo.HYDM);//交易信息转换行情信息
                        if(tradeHq){
                            var data = JSON.parse(tradeHq);
                            //订阅行情
                            nameCode =  _this.editQueryInfo.contractEditCode;
                            //market\code
                            pbE.HQ().hqSubscribe(0, JSON.stringify({"1": [{2: data.HQMarket, 3:  data.HQCode}]}));//订阅最新价
                            //获取行情商品价格倍数
                            priceMulriple = pbE.HQ().hqGetPriceRate( data.HQCode, data.HQMarket);
                        }
                    }
                    //以下是根据类型来判断当前选中的样式
                    // 有效期 1-当日有效，2-永久有效
                    if (dataValue.TimeCondition == 1) {
                        _this.validPrice = true;
                        _this.validTime = true;
                    } else if (dataValue.TimeCondition == 2) {
                        _this.validPrice = false;
                        _this.validTime = false;
                    }
                    //当前选择条件：1-价格，2-时间
                    if (dataValue.ConditionChoiced == 1) {//价格
                        _this.conPrice = true;
                        _this.conTime = true;
                        _this.initPrice = true;
                        _this.initFooter = false;

                    }
                    if (dataValue.ConditionChoiced == 2) {//时间
                        _this.conPrice = false;
                        _this.conTime = false;
                        _this.initPrice = false;
                        _this.initFooter = false;
                    }
                    //买卖方向
                    if (dataValue.OrderAction.SmartOrder.Order.Direction == 0) {//买
                        _this.buyPrice = true;
                        _this.buyTime = true;
                        //根据当前合约和买卖方向从持仓里面再次查下可平
                        _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode,0,null);
                    }
                    if (dataValue.OrderAction.SmartOrder.Order.Direction == 1) {//卖
                        _this.buyPrice = false;
                        _this.buyTime = false;

                        //根据当前合约和买卖方向从持仓里面再次查下可平
                        _this.getCanBuy(_this.setDataObj.contractMarket, _this.setDataObj.contractCode,1,null);
                    }
                    //开平标识
                    //开仓
                    if (dataValue.OrderAction.SmartOrder.Order.OffsetFlag == 0) {
                        _this.openCang = true;
                        _this.openCangFFF = false;
                        _this.pingCangBlue = false;
                        _this.pingDayBlue = false;

                        //buyWay字段要根据买卖类别的反方向取值
                        var buyWay;
                        if(_this.editQueryInfo.dealOpenEdit == 0){//买
                            buyWay = 1;
                        }else if(_this.editQueryInfo.dealOpenEdit == 1){//卖
                            buyWay = 0;
                        }
                        if(_this.pingDayShow = true){//支持平今 今昨仓标志 == 2
                            _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode,buyWay,2);
                        }else{
                            _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode,buyWay,null);
                        }
                    }
                    //平仓
                    if (dataValue.OrderAction.SmartOrder.Order.OffsetFlag == 1) {
                        _this.pingCangBlue = true;
                        _this.openCang = false;
                        _this.openCangFFF = true;
                        _this.pingDayBlue = false;

                        //buyWay字段要根据买卖类别的反方向取值
                        var buyWay;
                        if(_this.editQueryInfo.dealOpenEdit == 0){//买
                            buyWay = 1;
                        }else if(_this.editQueryInfo.dealOpenEdit == 1){//卖
                            buyWay = 0;
                        }
                        //503 == 1 平今
                        _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode,buyWay,1);
                    }
                    //平今
                    if (dataValue.OrderAction.SmartOrder.Order.OffsetFlag == 2) {
                        _this.pingDayBlue = true;
                        _this.pingCangBlue = false;
                        _this.openCang = false;
                        _this.openCangFFF = true;
                    }
                    if (dataValue.ConditionChoiced == 1) {//当前选择条件：1-价格，2-时间
                        _this.conPrice = true;
                        _this.conTime = true;
                        _this.initPrice = true;
                        _this.initFooter = false;
                        _this.pingDayShow = true;//将平今置为可点击
                    } else if (dataValue.ConditionChoiced == 2) {
                        _this.conPrice = false;
                        _this.conTime = false;
                        _this.initPrice = false;
                        _this.initFooter = false;
                        _this.pingDayShow = false;//将平今置为不可点击
                    }
                };
                //获取合约信息
                if (window.pbE) {
                    var selectContractName = pbE.ZX().getSelfStock(0);//0代表全部合约信息
                    if (selectContractName) {
                        _this.selectContract = JSON.parse(selectContractName);
                    }
                } else {
                    _this.selectContract = [{"name": "沪铜1702", "market": "2001", "code": "010002"},
                        {"name": "沪铝1702", "market": "2001", "code": "010102"},
                        {"name": "沪锌1702", "market": "2001", "code": "010302"},
                        {"name": "沪铅1702", "market": "2001", "code": "010902"},
                        {"name": "黄金1706", "market": "2001", "code": "010506"}
                    ]
                }
                //从原生接口读取
                if(window.pbE) {
//                    _this.CID = pbE.WT().wtGetCurrentConnectionCID();
//                    var allData = pbE.WT().wtLoginRe(_this.CID);
//                    if(allData){
//                        var data = JSON.parse(allData).data;
//                        _this.editQueryInfo.TradeDate = data[0]['75']
//                    }
                }
            },
            watch:{
                '$route'(to,from){
                    if(to.params.id == 4){
                        $("#noneTuchDialog").modal('hide');
                        $("#msgTipDialog").modal('hide');
                        if($('.modal-backdrop').css('display') == 'block'){
                            $('.modal-backdrop').css('display','none')
                        }
                    }
                }
            },
            destroyed:function(){
                if(window.pbE){
                    pbE.HQ().hqUnSubscribe(0, JSON.stringify({"1": [{2: this.destroyMarket, 3: nameCode}]}));//订阅最新价
                }
            },
            methods:{
                priceInfoDialog:function(){
                    $("#priceInfoDialog").modal('show')
                },
                selectContractDialog:function(){
                    $('#selectContractDialog').modal('show')
                },
                //条件
                conditionClick: function (flag) {
                    var _this = this;
                    if (flag == 0) {//价格
                        _this.conPrice = true;
                        _this.conTime = true;
                        _this.initPrice = true;
                        _this.initFooter = false;
                        _this.editQueryInfo.ConditionChoicedEdit = 1;//编辑时条件类型赋值
                    }
                    if (flag == 1) {//时间
                        _this.conPrice = false;
                        _this.conTime = false;
                        _this.initPrice = false;
                        _this.initFooter = false;

                        _this.editQueryInfo.ConditionChoicedEdit = 2;//编辑时条件类型赋值
                    }
                },
                //条件单设置中有效期  切换样式
                validDateClick: function (flag) {
                    var _this = this;
                    //  1-当日有效，2-永久有效
                    if (flag == 0) {//当日
                        _this.validPrice = true;
                        _this.validTime = true;
                        _this.editQueryInfo.TimeCondition = 1;//编辑时有效期类型赋值

                        _this.pingDayShow = true;//将平今置为可点击
                    }
                    if (flag == 1) {//永久
                        _this.validPrice = false;
                        _this.validTime = false;
                        _this.editQueryInfo.TimeCondition = 2;//编辑时有效期类型赋值

                        _this.pingDayShow = false;//将平今置为不可点击
                    }
                },
                //条件单设置中买卖方向 切换样式
                buyClick: function (flag) {
                    var _this = this;
                    if (flag == 0) {//买
                        _this.buyPrice = true;
                        _this.buyTime = true;
                        _this.editQueryInfo.dealOpenEdit = 0;//编辑时入库
                        //根据当前合约和买卖方向从持仓里面再次查下可平
                        _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode,0,null);
                    }
                    if (flag == 1) {//卖
                        _this.buyPrice = false;
                        _this.buyTime = false;
                        _this.editQueryInfo.dealOpenEdit = 1;//编辑时入库
                        //根据当前合约和买卖方向从持仓里面再次查下可平
                        _this.getCanBuy(_this.setDataObj.contractMarket, _this.setDataObj.contractCode,1,null);
                    }
                },
                //条件单设置中类型 切换样式
                storehouseTypeClick: function (flag) {
                    var _this = this;
                    //开仓
                    if (flag == 0) {
                        _this.openCang = true;

                        _this.openCangFFF = false;
                        _this.pingCangBlue = false;
                        _this.pingDayBlue = false;
                        _this.editQueryInfo.OffsetFlagEdit = 0;//编辑时入库
                    }
                    //平仓
                    if (flag == 1) {
                        _this.pingCangBlue = true;
                        _this.openCang = false;
                        _this.openCangFFF = true;
                        _this.pingDayBlue = false;
                        _this.editQueryInfo.OffsetFlagEdit = 1;//编辑时入库
                        //buyWay字段要根据买卖类别的反方向取值
                        var buyWay;
                        if(_this.editQueryInfo.dealOpenEdit == 0){//买
                            buyWay = 1;
                        }else if(_this.editQueryInfo.dealOpenEdit == 1){//卖
                            buyWay = 0;
                        }
                        if(_this.pingDayShow = true){//支持平今 今昨仓标志 == 2
                            _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode,buyWay,2);
                        }else{
                            _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode,buyWay,null);
                        }
                    }
                    //平今
                    if (flag == 2) {
                        _this.pingDayBlue = true;

                        _this.pingCangBlue = false;
                        _this.openCang = false;
                        _this.openCangFFF = true;
                        _this.editQueryInfo.OffsetFlagEdit = 2;//编辑时入库
                        //buyWay字段要根据买卖类别的反方向取值
                        var buyWay;
                        if(_this.editQueryInfo.dealOpenEdit == 0){//买
                            buyWay = 1;
                        }else if(_this.editQueryInfo.dealOpenEdit == 1){//卖
                            buyWay = 0;
                        }
                        //503 == 1 平今
                        _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode,buyWay,1);
                    }
                },
                priceTypeClick: function () {
                    if (this.editQueryInfo.OperatorEdit == ">=") {
                        this.editQueryInfo.OperatorEdit = "<=";
                    } else {
                        this.editQueryInfo.OperatorEdit = ">=";
                    }
                },
                //修改保存条件单的信息
                editConClick: function () {
                    console.log('修改');
                    var _this = this;
                    var data = new setConData();
                    data.Contracts[0] = {
                        ExchangeCode: _this.editQueryInfo.HYDM,//合约名称
                        ContractCode: _this.editQueryInfo.contractEditCode//合约品种
                    }
                    data.TimeCondition = _this.editQueryInfo.TimeCondition;//有效期 1-当日有效，2-永久有效
                    data.TradeDate = _this.editQueryInfo.TradeDate;////交易日，用于指明TimeCondition中的“当日有效”到底是指哪一日
                    data.ConditionChoiced = _this.editQueryInfo.ConditionChoicedEdit;//当前选择条件：1-价格，2-时间
                    if(_this.editQueryInfo.ConditionChoicedEdit == 1){//代表价格
                        data.ConditionList[0].Price.Operator =  _this.editQueryInfo.OperatorEdit;//操作
                        if(!numRex.test(_this.editQueryInfo.valueEdit)){
                            data.ConditionList[0].Price.Value = parseInt(_this.editQueryInfo.valueEdit);//条件里面的输入价格
                        }else{
                            data.ConditionList[0].Price.Value = _this.editQueryInfo.valueEdit*1;//条件里面的输入价格
                        }
                    }
                    if(_this.editQueryInfo.ConditionChoicedEdit == 2){//代表时间
                        data.Contracts[0].Time = _this.tjTimeEdit.HH+":"+ _this.tjTimeEdit.mm+":"+ _this.tjTimeEdit.ss;
                    }
                    //下单
                    data.OrderAction.SmartOrder.Order.Contract={
                        ExchangeCode:_this.editQueryInfo.HYDM,//合约  市场
                        ContractCode: _this.editQueryInfo.contractEditCode//合约品种    合约
                    }
                    //委托数
                    data.OrderAction.SmartOrder.Order.Direction =_this.editQueryInfo.dealOpenEdit;//买卖方向
                    data.OrderAction.SmartOrder.Order.OffsetFlag = _this.editQueryInfo.OffsetFlagEdit;//开平标识
                    data.OrderAction.SmartOrder.Order.Volume =parseInt(_this.editQueryInfo.VolumeEdit);//委托数量
                    //委托价格如果是输入的就将文本框的值CustomPrice赋给LimitPriceType，类型为double类型或者string，如果是通过类型选择的就将选的值赋给LimitPriceType
                    if (_this.trustPriceType == 2) {//表示选择
                        data.OrderAction.SmartOrder.Order.LimitPriceType = _this.editQueryInfo.priceNameEdit; //选择的委托价格
                    } else if (_this.trustPriceType == 1) {//表示输入
                        data.OrderAction.SmartOrder.Order.LimitPrice=  _this.editQueryInfo.priceNameEdit+"";//输入的委托价格
                        data.OrderAction.SmartOrder.Order.LimitPriceType= 'CustomPrice';//如果是输入的价格就将CustomPrice赋给LimitPriceType
                    }
                    //登录账号类别   从原生读取
                    data.OrderAction.SmartOrder.Order.EAccountId['67'] = _this.loginClass;//登录类别
                    data.OrderAction.SmartOrder.Order.EAccountId['53'] = _this.accountClass;//账号类别
                    data.OrderAction.SmartOrder.Order.EAccountId['249'] = _this.loginAccount;//登录账号
                    console.log(JSON.stringify(data),_this.trustPriceType,'修改');
                    //console.log(_this.conNoneTouchObj.conditionID)
                    $.ajax({
                        url: conditionUrl,
                        method: 'post',
                        dataType: 'json',
                        contentType: 'application/json;charest=utf-8',
                        data: JSON.stringify({
                            func: editCon,
                            token:  _this.token,
                            id: _this.authId,
                            orgCode:_this.orgCode,
                            conditionID:_this.editQueryInfo.conditionID,
                            data: data,
                            type:contractType,
                            userID:_this.userID
                        }),
                        success: function (data) {
                            if (data.status == 0) {
                                _this.$router.push('/noneConList/1');
                            }else{
                                _this.msgTip = data.msg;
                                $('#msgTipDialog').modal('show')
                                return;
                            }
                        }, error: function () {
                            console.log("服务器异常！")
                        }
                    })
                },
                //选择合约
                selectContractClick: function (name, market, code) {
                    var _this = this;
                    _this.editQueryInfo.selectContractName  = name;
                    _this.destroyMarket = market;
                    if(window.pbE){
                        //修改时保存的值
                        _this.editQueryInfo.contractEditCode = code;
                        _this.editQueryInfo.HYDM = market;
                        //订阅行情
                        nameCode = code;
                        pbE.HQ().hqSubscribe(0, JSON.stringify({"1": [{2: market, 3: code}]}));//订阅最新价
                        //获取行情商品价格倍数
                        priceMulriple = pbE.HQ().hqGetPriceRate(code,market);

                        var cid = pbE.WT().wtGetCurrentConnectionCID();
                        var tradeWT = pbE.HQ().hqGetWTInfo(code,market,cid);//行情信息转换交易信息
                        if(tradeWT){
                            //添加时保存的值
                            var data = JSON.parse(tradeWT);
                            _this.editQueryInfo.contractMarket = data.WTMarket;//合约市场
                            _this.editQueryInfo.contractCode = data.WTCode;//合约品种

                            //通过查持仓，获取该合约可平数量
                            var CID = pbE.WT().wtGetCurrentConnectionCID()
                            var allData =  pbE.WT().wtQueryStockRe(CID);
                            if (allData) {
                                var stocks = JSON.parse(allData).data;
                                //只有这几个市场支持平今
                                if(data.WTMarket == marketSHFE || marketBOCE || marketHXCE || marketWXBXG || marketQDGCXH ){
                                    _this.pingDayShow = true;//将平今置为可点击
                                    for (var i = 0; i < stocks.length; i++) {
                                        if(data.WTMarket == stocks[i]['54'] && data.WTCode == stocks[i]['63'])
                                        {
                                            if(stocks[i][137]){
                                                $("#openNum").html(stocks[i][137]);
                                            }else{
                                                $("#openNum").html(0);
                                            }
                                        }
                                    }
                                }else{
                                    //将平今置为不可点击
                                    _this.pingDayShow = false;//将平今置为不可点击
                                }
                            }
                        }
                        //查询可开
                        _this.getStockBuyNum();
                    }
                },
                //设置条件单的类型
                priceInfoClick: function (flag) {
                    this.trustPriceType = 2
                    var _this = this;
                    if (flag == 1) {//涨停价
                        this.editQueryInfo.priceNameEdit = '涨停价'
                        this.editQueryInfo.selectPriceName = upPrice;
                    }
                    if (flag == 2) {//跌停价
                        this.editQueryInfo.priceNameEdit = '跌停价'
                        this.editQueryInfo.selectPriceName = downPrice;
                    }
                    if (flag == 3) {//对手价
                        this.editQueryInfo.priceNameEdit = '对手价'
                        //根据选择的类型买还是卖   //买卖方向  0 买 1 卖     注：默认给 0 买
                        if(_this.editQueryInfo.dealOpen == 0){
                            _this.editQueryInfo.selectPriceName = opponentPriceSell;
                        }else if(_this.editQueryInfo.dealOpen == 1){
                            _this.editQueryInfo.selectPriceName = opponentPriceBuy;
                        }
                    }
                    if (flag == 4) {//最新价
                        this.editQueryInfo.priceNameEdit = '最新价'
                        this.editQueryInfo.selectPriceName = lastPrice;
                    }
                    //查询可开
                  _this.getStockBuyNum();
                },
                //查可平
                getCanBuy:function(market,code,buyWay,todayFlag) {
                    //通过查持仓，获取该合约可平数量
                    if(window.pbE){
                        var CID = pbE.WT().wtGetCurrentConnectionCID()
                        var allData = pbE.WT().wtQueryStockRe(CID);
                        if (allData) {
                            var stocks = JSON.parse(allData).data;
                            for (var i = 0; i < stocks.length; i++) {
                                if (market == stocks[i]['54'] && code == stocks[i]['63'] || buyWay == stocks[i]['112'] ||
                                        todayFlag == stocks[i]['503']) {
                                    //112  == 0
                                    if (stocks[i][137]) {
                                        $("#openNum").html(stocks[i][137]);
                                    } else {
                                        $("#openNum").html(0);
                                    }
                                }
                            }
                        }
                    }
                },
                //查可开
                getStockBuyNum:function(){
                    var _this = this;
                    if (_this.editQueryInfo.selectContractName &&  _this.editQueryInfo.priceName ) {
                        if (window.pbE) { 
                            var priceValue;
                            if (_this.trustPriceType == 2) {//表示选择
                                priceValue =_this.editQueryInfo.selectPriceName+''; //选择的委托价格
                            } else if (_this.trustPriceType == 1) {//表示输入
                                priceValue = _this.editQueryInfo.priceName+'';
                            }
                            var gdZH = pbE.WT().wtGetGDZH(_this.editQueryInfo.contractMarket);
                            var xwh = pbE.WT().wtGetXWH(_this.editQueryInfo.contractMarket);
                            var data = {
                                63:_this.editQueryInfo.contractCode,//合约代码
                                54:_this.editQueryInfo.contractMarket,//市场代码
                                129:priceValue,//委托价格
                                112:_this.editQueryInfo.dealOpen+'',//买卖类别
                                117:_this.editQueryInfo.OffsetFlag+'',//开平仓标志
                                119:'1',//投保标志
                                52:gdZH,//股东账号
                                125:'0',//期权备兑标志
                                161:xwh,//席位号
                                40:'2',//价格类别、
                                41:'3',//有效期类别
                                42:'1'//成交数量
                            }
                            console.log(JSON.stringify(data));
                            pbE.WT().wtQueryStockBuy(_this.CID,JSON.stringify(data));//可开
                        }
                    }
                }
        }
    }
</script>