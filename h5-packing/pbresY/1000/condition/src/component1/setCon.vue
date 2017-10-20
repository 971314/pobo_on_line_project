<template>
    <div style="padding-top:39px">
        <div class="setDiv">
            <div class="setOut">
                <ul>
                    <li>
                        <div class="setDivOne">
                            <span  class="inputText" style="display: inline-block;"  @click="selectContractDialog"   v-text="selectContractName" ></span>
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
                            <input  type="text"  placeholder="条件单名称（可选填）" v-model="setDataObj.conditionName"/>
                        </div>
                    </li>
                    <li>
                        <div class="conOne">有效期</div>
                        <div class="conTwo">
                            <span v-bind:class="[validPrice ? 'conSpanOne' : 'conSpanThree']" @click="validDateClick(0)">当日</span>
                            <span v-bind:class="[validTime ? 'conSpanTwo' : 'conSpanFour']"  @click="validDateClick(1)">永久</span>
                        </div>
                    </li>
                    <li>
                        <div class="conOne">条件</div>
                        <div class="conTwo">
                            <span v-bind:class="[conPrice ? 'conSpanOne' : 'conSpanThree']" @click="conditionClick(0)">价格</span>
                            <span v-bind:class="[conTime ? 'conSpanTwo' : 'conSpanFour']"  @click="conditionClick(1)">时间</span>
                        </div>
                    </li>
                    <li v-if="initPrice">
                        <div class="priceOne">
                            <span class="priceStyle" @click="priceTypeClick" v-text="setDataObj.Operator"></span>
                        </div>
                        <div class="priceTwo"></div>
                        <div class="priceThree">
                            <input  type="number" onkeyup="value=value.replace(/[^\.\d]/g,'')"   placeholder="价格" v-model="setDataObj.tjPriceValue"/>
                        </div>
                    </li>
                    <li v-else="initTime">
                        <div class="timeConOne">时间到达</div>
                        <div class="timeConTwo">
                            <vue-timepicker  v-model="touchTimeValue" format="HH:mm:ss"></vue-timepicker>
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
                            <input type="text" @change="trustPrice(1)"    @focus="trustFocus" class="inputText" v-model="setDataObj.priceName"/>
                        </span>
                        <span class="trustSpanOne" @click="priceInfoDialog">
                            类型
                        </span>
                        </div>
                    </li>
                    <li>
                        <div class="conOne">委托数量</div>
                        <div class="conTwo">
                        <span class="market">
                             <input type="number" onkeyup="value=value.replace(/[^\.\d]/g,'')"   class="inputText"  v-model="setDataObj.Volume"/>
                        </span>
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
        <div class="btnDiv conBtn"  v-show="initAddBtn" >
            <button type="button" class="btnSubmitFFF" data-toggle="button">
                添加
            </button>
        </div>
        <div class="btnDiv conBtn" v-show="blueBtn"  >
            <button  type="button" class="btnSubmit" data-toggle="button" @click="addContractInfo">
                添加
            </button>
        </div>
        <select-con-dialog :selectContract.sync="selectContract" @selectContractClick="selectContractClick"></select-con-dialog>
        <price-dialog @priceInfoClick="priceInfoClick"></price-dialog>
        <tip-msg :msgTip.sync="msgTip"></tip-msg>
    </div>
</template>
<script>
    import VueTimepicker from 'vue2-timepicker';
    import selectConDialog from '../component/dialog/selectConDialog.vue';
    import priceDialog from '../component/dialog/priceDialog.vue';
    import tipMsg from '../component/dialog/tipMsg.vue';
    //价格倍数
    var priceMulriple;
    var lastPrice;//最新价
    var opponentPriceBuy;//对手价买
    var opponentPriceSell;//对手价卖
    var upPrice;//涨停价
    var downPrice;//跌停价
    var nameCode = '';

    export default{
        data:function(){
            return{
                selectContractName: '选择期货合约',
                selectContract:'',
                setDataObj: {
                    contractMarket: '',//合约市场
                    contractCode: '',//合约品种
                    validity: 1,//1-当日有效，2-永久有效   注：默认给当日有效
                    tj: 1,//条件1-价格，2-时间            注：默认给 1 价格
                    tjTime: '19:50:00',
                    Operator: '<=',//条件是价格时的操作，
                    tjPriceValue: '',
                    dealOpen: 0,//买卖方向  0 买 1 卖     注：默认给 0 买
                    OffsetFlag: 0,//开平标识 0，1,2 开仓，平仓，平今  注：默认给 0 开仓
                    Volume: '',//委托数量
                    LimitPriceType: '', //限价类型: 仅PriceType为“限价”时有本字段
                    LimitPrice: '',//仅PriceType为“限价”时有本字段，仅LimitPriceType为“指定价格”时有意义
                    priceName: '',
                    conditionName:"",//条件单名称
                    TradeDate:'',//交易日 用于指明TimeCondition中的“当日有效”到底是指哪一日
                    selectPriceName:""
                },
                touchTimeValue: {
                    HH: "10",
                    mm: "05",
                    ss: "00"
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

                //初始化按钮 颜色
                initAddBtn: true,
                blueBtn: false,

                trustPriceType: 1,//默认给1表示是输入  的委托价格

                token:testToken,//t认证的oken
                authId:testId,//认证的id
                userId:testUserId,//云交易userId
                CID:'',
                orgCode:orgCode,//机构编号

                //价格和时间
                initPrice: true,
                initTime: false,
                msgTip:'',

                loginClass:loginClass,//登录类别
                accountClass:accountClass,//账号类别
                loginAccount:loginAccount,//登录账号

                WTInfo:{//获取当前所选交易的合约名称
                    wtCode:'',
                    wtMarket:'',
                },
                HQInfo:{//获取当前所选行情的合约名称
                    hqCode:'',
                    hqMarket:''
                },
                pingDayShow:true,
                destroyMarket:'',//取消订阅时存的值
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
//                        console.log(data)
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
            if (window.pbE) {
                _this.CID = pbE.WT().wtGetCurrentConnectionCID();
                //交易合约
                _this.WTInfo.wtCode = _this.$route.query.wtCode;
                _this.WTInfo.wtMarket =_this.$route.query.wtMarket;
                //行情合约
                _this.HQInfo.hqCode = _this.$route.query.hqCode;
                _this.HQInfo.hqMarket = _this.$route.query.hqMarket;
                if(this.$route.params.id == 3){
                    if(_this.WTInfo.wtCode && _this.WTInfo.wtMarket){
                        var tradeHq = pbE.WT().wtGetHQInfo( _this.WTInfo.wtCode,_this.WTInfo.wtMarket);//交易信息转换行情信息
                        if(tradeHq){
                            var data = JSON.parse(tradeHq);
                            _this.setDataObj.conditionName = data.HQName;//合约名称
                            _this.setDataObj.contractMarket =  data.HQMarket;//合约市场
                            _this.setDataObj.contractCode = data.HQCode;//合约品种
                            _this.selectContractName = data.HQName;

                            //订阅行情
                            nameCode = _this.WTInfo.wtCode;
                            pbE.HQ().hqSubscribe(0, JSON.stringify({"1": [{2: _this.WTInfo.wtMarket, 3: _this.WTInfo.wtCode}]}));//订阅最新价
                            //获取行情商品价格倍数
                            priceMulriple = pbE.HQ().hqGetPriceRate(_this.WTInfo.wtCode, _this.WTInfo.wtMarket);
                        }
                    }else if(_this.HQInfo.hqCode && _this.HQInfo.hqMarket){
                        var cid = pbE.WT().wtGetCurrentConnectionCID();
                        var tradeWT = pbE.HQ().hqGetWTInfo(_this.HQInfo.hqCode,_this.HQInfo.hqMarket,cid);//行情信息转换交易信息
                        var nameJson = pbE.HQ().getHQInfo(_this.HQInfo.hqCode,_this.HQInfo.hqMarket);//
                        if(tradeWT || nameJson){
                            var data = JSON.parse(tradeWT);
                            _this.setDataObj.contractMarket =  data.WTMarket;//合约市场
                            _this.setDataObj.contractCode = data.WTCode;//合约品种
                            var dataName = JSON.parse(nameJson);
                            _this.selectContractName = dataName.name;

                            //订阅行情
                            nameCode = _this.HQInfo.hqCode;
                            pbE.HQ().hqSubscribe(0, JSON.stringify({"1": [{2: _this.HQInfo.hqMarket, 3: _this.HQInfo.hqCode}]}));//订阅最新价
                            //获取行情商品价格倍数
                            priceMulriple = pbE.HQ().hqGetPriceRate(_this.HQInfo.hqCode, _this.HQInfo.hqMarket);
                        }
                    }
                }
            }
            //从原生接口读取
            if(window.pbE) {
                var allData = pbE.WT().wtLoginRe(_this.CID);
                if(allData){
                    var data = JSON.parse(allData).data;
                    _this.setDataObj.TradeDate = data[0]['75']
                }
            }
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
            //获取云交易的userID
            if(window.pbE){
                _this.userId = pbE.WT().wtGetYunTradeUserId(_this.CID);//获取云交易的userId
                //这里会根据userId是否为空判断云条件单是否登录了交易，如果登录交易，可以直接进入条件单页面
                if(!_this.userId){
                    testUserId = null;//等于0代表未上传交易账号此时应该callback 102001
                }
            }
        },
        destroyed:function(){
            if (window.pbE) {
                pbE.HQ().hqUnSubscribe(0, JSON.stringify({"1": [{2: this.destroyMarket, 3: nameCode}]}));//订阅最新价
            }
        },
        watch:{//非空判断
            selectContractName:function(newVal,oldVal){
                var _this = this;
                this.selectContractName = newVal;
                if(this.setDataObj.tj == 1){//==1  说明是条件选择的是价格，则要校验输入价格非空判断
                    if (newVal && _this.setDataObj.tjPriceValue && _this.setDataObj.priceName && _this.setDataObj.Volume) {
                        _this.blueBtn = true;
                        _this.initAddBtn = false;
                    }
                }else if(newVal  && _this.setDataObj.priceName && _this.setDataObj.Volume){
                    _this.blueBtn = true;
                    _this.initAddBtn = false;
                }else {
                    _this.blueBtn = false;
                    _this.initAddBtn = true;
                }
            },
            'setDataObj.tjPriceValue':function(newVal,oldVal){
                var _this = this;
                this.setDataObj.tjPriceValue = newVal;
                if (this.selectContractName && newVal && _this.setDataObj.priceName && _this.setDataObj.Volume) {
                    _this.blueBtn = true;
                    _this.initAddBtn = false;
                } else {
                    _this.blueBtn = false;
                    _this.initAddBtn = true;
                }
            },

            'setDataObj.priceName':function(newVal,oldVal){
                this.setDataObj.priceName = newVal;
                var _this = this;
                if(this.setDataObj.tj == 1){
                    if (this.selectContractName && _this.setDataObj.tjPriceValue && newVal && _this.setDataObj.Volume) {
                        _this.blueBtn = true;
                        _this.initAddBtn = false;
                    }
                }else if (this.selectContractName   && newVal && _this.setDataObj.Volume) {
                    _this.blueBtn = true;
                    _this.initAddBtn = false;
                } else {
                    _this.blueBtn = false;
                    _this.initAddBtn = true;
                }
                //查询可开
                _this.getStockBuyNum();
            },
            'setDataObj.Volume':function(newVal,oldVal){
                this.setDataObj.Volume = newVal;
                var _this = this;
                if(this.setDataObj.tj == 1){
                    if (this.selectContractName && _this.setDataObj.tjPriceValue && _this.setDataObj.priceName && newVal) {
                        //暂时将可开的获取写在这里
                        _this.blueBtn = true;
                        _this.initAddBtn = false;
                        if (window.pbE) {
                            //_this.updated();
                            //CID = pbE.WT().wtGetCurrentConnectionCID();//查询可买数量
                            //var data =  pbE.WT().wtQueryStockAccRe(CID);//查询股东账号、席位号、投保标志
                            //console.log(JSON.parse(data).data)
                        }
                    }
                }else if (this.selectContractName   && _this.setDataObj.priceName && newVal) {
                    //暂时将可开的获取写在这里
                    _this.blueBtn = true;
                    _this.initAddBtn = false;
                    //if (window.pbE) {
                    //CID = pbE.WT().wtGetCurrentConnectionCID();//查询可买数量
                    //var data =  pbE.WT().wtQueryStockAccRe(CID);//查询股东账号、席位号、投保标志
                    //console.log(JSON.parse(data).data)
                    //}
                } else {
                    _this.blueBtn = false;
                    _this.initAddBtn = true;
                }
            },
            '$route'(to,from){
                $("#noneTuchDialog").modal('hide');
                $("#msgTipDialog").modal('hide');
                if($('.modal-backdrop').css('display') == 'block'){
                    $('.modal-backdrop').css('display','none')
                }
            }
        },
        methods:{
            selectContractDialog:function(){
                $('#selectContractDialog').modal('show')
            },
            priceInfoDialog:function(){
                $("#priceInfoDialog").modal('show')
            },
            //条件
            conditionClick: function (flag) {
                var _this = this;
                if (flag == 0) {//价格
                    _this.conPrice = true;
                    _this.conTime = true;
                    _this.initPrice = true;
                    _this.initFooter = false;
                    _this.setDataObj.tj = 1;
                }
                if (flag == 1) {//时间
                    _this.conPrice = false;
                    _this.conTime = false;
                    _this.initPrice = false;
                    _this.initFooter = false;

                    _this.setDataObj.tj = 2;
                }
            },
            //条件单设置中有效期  切换样式
            validDateClick: function (flag) {
                var _this = this;
                //  1-当日有效，2-永久有效
                if (flag == 0) {//当日
                    _this.validPrice = true;
                    _this.validTime = true;
                    _this.setDataObj.validity = 1;

                    _this.pingDayShow = true;//将平今置为可点击
                }
                if (flag == 1) {//永久
                    _this.validPrice = false;
                    _this.validTime = false;
                    _this.setDataObj.validity = 2;

                    _this.pingDayShow = false;//将平今置为不可点击
                }
            },
            //条件单设置中买卖方向 切换样式
            buyClick: function (flag) {
                var _this = this;
                if (flag == 0) {//买
                    _this.buyPrice = true;
                    _this.buyTime = true;
                    _this.setDataObj.dealOpen = 0;//添加时入库
                    //买卖方向  0 买 1 卖     注：默认给 0 买
                    _this.setDataObj.selectPriceName = opponentPriceSell;
                    //根据当前合约和买卖方向从持仓里面再次查下可平
                    _this.getCanBuy(_this.setDataObj.contractMarket, _this.setDataObj.contractCode,0,null);
                }
                if (flag == 1) {//卖
                    _this.buyPrice = false;
                    _this.buyTime = false;
                    _this.setDataObj.dealOpen = 1;//添加时入库
                    //买卖方向  0 买 1 卖     注：默认给 0 买
                    _this.setDataObj.selectPriceName = opponentPriceBuy;
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
                    _this.setDataObj.OffsetFlag = 0;
                }
                //平仓
                if (flag == 1) {
                    _this.pingCangBlue = true;
                    _this.openCang = false;
                    _this.openCangFFF = true;
                    _this.pingDayBlue = false;
                    _this.setDataObj.OffsetFlag = 1;
                    //buyWay字段要根据买卖类别的反方向取值
                    var buyWay;
                    if(_this.setDataObj.dealOpen == 0){//买
                        buyWay = 1;
                    }else if(_this.setDataObj.dealOpen == 1){//卖
                        buyWay = 0;
                    }
                    if(_this.pingDayShow = true){//支持平今 今昨仓标志 == 2
                        _this.getCanBuy(_this.setDataObj.contractMarket, _this.setDataObj.contractCode,buyWay,2);
                    }else{
                        _this.getCanBuy(_this.setDataObj.contractMarket, _this.setDataObj.contractCode,buyWay,null);
                    }
                }
                //平今
                if (flag == 2) {
                    _this.pingDayBlue = true;

                    _this.pingCangBlue = false;
                    _this.openCang = false;
                    _this.openCangFFF = true;
                    _this.setDataObj.OffsetFlag = 2;
                    //buyWay字段要根据买卖类别的反方向取值
                    var buyWay;
                    if(_this.setDataObj.dealOpen == 0){//买
                        buyWay = 1;
                    }else if(_this.setDataObj.dealOpen == 1){//卖
                        buyWay = 0;
                    }
                    //503 == 1 平今
                    _this.getCanBuy(_this.setDataObj.contractMarket, _this.setDataObj.contractCode,buyWay,1);
                }
            },
            trustFocus: function () {
                this.setDataObj.priceName = ''
            },
            priceTypeClick: function () {
                if (this.setDataObj.Operator == ">=") {
                    this.setDataObj.Operator = "<=";
                } else {
                    this.setDataObj.Operator = ">=";
                }
            },
            //添加设置信息
            addContractInfo: function () {
                var _this = this;
                var data = new setConData();
                if(_this.selectContractName && _this.selectContractName == "选择期货合约"){
                    _this.msgTip = "请选择选择期货合约！"
                    $('#msgTipDialog').modal('show')
                    return;
                }
                if(!_this.userId){
                    _this.msgTip = "userId不能为空！"
                    $('#msgTipDialog').modal('show')
                    return;
                }
                //如果所有信息都输入完成 并且类型选的是平仓，但是可平为空就不能进行添加
//                if($("#openNum").val() != '' && _this.setDataObj.OffsetFlag == 1){
//                    _this.msgTip = "userId不能为空！"
//                    $('#msgTipDialog').modal('show')
//                    return;
//                }
                data.Contracts[0] = {
                    ExchangeCode: _this.setDataObj.contractMarket,//合约名称
                    ContractCode: _this.setDataObj.contractCode//合约品种
                }
                console.log(data.Contracts[0],'设置');
                data.TimeCondition = _this.setDataObj.validity;//有效期 1-当日有效，2-永久有效
                data.TradeDate = _this.setDataObj.TradeDate;////交易日，用于指明TimeCondition中的“当日有效”到底是指哪一日
                data.ConditionChoiced = _this.setDataObj.tj;//当前选择条件：1-价格，2-时间
                if (_this.setDataObj.tj == 1) {//代表价格
                    data.ConditionList[0].Price.Operator = _this.setDataObj.Operator;//操作
                    //data.ConditionList[0].Price.Value = _this.setDataObj.tjPriceValue;//条件里面的输入价格
                    //data.ConditionList[0].Price.Value = 3;//条件里面的输入价格
                    //如果输入的是整数，就直接强转为整数类型，如果输入的是小数就转换为double类型
                    if(!numRex.test(_this.setDataObj.tjPriceValue)){
                        data.ConditionList[0].Price.Value = parseInt(_this.setDataObj.tjPriceValue);//条件里面的输入价格
                    }else{
                        data.ConditionList[0].Price.Value = _this.setDataObj.tjPriceValue*1;//条件里面的输入价格
                    }
                }
                if (_this.setDataObj.tj == 2) {//代表时间
                    //this.touchTimeValue.HH+":"+this.touchTimeValue.mm+":"+this.touchTimeValue.ss
                    //data.ConditionList[0].Time = _this.setDataObj.tjTime;
                    data.ConditionList[1].Time = _this.touchTimeValue.HH + ":" + _this.touchTimeValue.mm + ":" + _this.touchTimeValue.ss;
                }
                //下单
                data.OrderAction.SmartOrder.Order.Contract = {
                    ExchangeCode: _this.setDataObj.contractMarket,//合约名称  市场
                    ContractCode: _this.setDataObj.contractCode//合约品种    合约
                }
                //委托数
                data.OrderAction.SmartOrder.Order.Direction = _this.setDataObj.dealOpen+"";//买卖方向
                data.OrderAction.SmartOrder.Order.OffsetFlag =  _this.setDataObj.OffsetFlag+"";//开平标识
                data.OrderAction.SmartOrder.Order.Volume =parseInt(_this.setDataObj.Volume);//委托数量
                //委托价格如果是输入的就将文本框的值CustomPrice赋给LimitPriceType，类型为double类型或者string，如果是通过类型选择的就将选的值赋给LimitPriceType
                if (_this.trustPriceType == 2) {//表示选择
                    data.OrderAction.SmartOrder.Order.LimitPriceType = _this.setDataObj.priceName; //选择的委托价格
//                    data.OrderAction.SmartOrder.Order.LimitPrice = _this.setDataObj.selectPriceName+'';
                } else if (_this.trustPriceType == 1) {//表示输入
                    data.OrderAction.SmartOrder.Order.LimitPrice =_this.setDataObj.priceName+""; //输入的委托价格
                    data.OrderAction.SmartOrder.Order.LimitPriceType ='CustomPrice';//如果是输入的价格就将CustomPrice赋给LimitPriceType
                }
                //console.log(data)
                //条件单名称：让客户选填，不填的默认为合约名称+条件的值(价格[操作>=、<= 和价格的值]和时间)
                if(!_this.setDataObj.conditionName){
                    if(_this.setDataObj.tj == 1){//价格
                        _this.setDataObj.conditionName =  _this.selectContractName +  _this.setDataObj.Operator + _this.setDataObj.tjPriceValue;
                    }else{//时间（2）
                        _this.setDataObj.conditionName =   _this.selectContractName +  _this.touchTimeValue.HH + ":" + _this.touchTimeValue.mm + ":" + _this.touchTimeValue.ss;
                    }
                }
                //登录账号类别   从原生读取
                data.OrderAction.SmartOrder.Order.EAccountId['67'] = _this.loginClass;//登录类别
                data.OrderAction.SmartOrder.Order.EAccountId['53'] = _this.accountClass;//账号类别
                data.OrderAction.SmartOrder.Order.EAccountId['249'] = _this.loginAccount;//登录账号
                console.log(data,'添加');
                circleShowPass("正在下单");//显示转圈
                $.ajax({
                    url: conditionUrl,
                    method: 'post',
                    dataType: 'json',
                    contentType: 'application/json;charest=utf-8',
                    data: JSON.stringify({
                        func: addContract,
                        token:  _this.token,
                        id: _this.authId,
                        name: _this.setDataObj.conditionName,//条件单名称
                        subType: _this.setDataObj.tj+"",
                        HYMC: _this.selectContractName,
                        orgCode:_this.orgCode,
                        type: contractType,
                        terminal: '',//暂且去掉
                        userID: _this.userId,
                        data: data
                    }),
                    success: function (data) {
                        if (data.status == 0) {
                            circleHidePass();//隐藏转圈
                            _this.pageNoneNum = 0;
                            _this.dataOrFlag = 1;
                            console.log("设置成功！")
                            _this.$router.push('/noneConList/1');
                        }else{
                            circleHidePass();//隐藏转圈
                            _this.msgTip = data.msg;
                            $('#msgTipDialog').modal('show')
                            return;
                        }
                    }, error: function () {
                        circleHidePass();//隐藏转圈
                        _this.msgTip = '服务器异常';
                        $('#msgTipDialog').modal('show')
                        return;
                        console.log("服务器异常！")
                    }
                })
            },
            trustPrice: function (type) {
                this.trustPriceType = type;
            },
            //选择合约
            selectContractClick: function (name, market, code) {
                var _this = this;
                _this.selectContractName = name;
                _this.destroyMarket = market;
                if(window.pbE){
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
                        _this.setDataObj.contractMarket = data.WTMarket;//合约市场
                        _this.setDataObj.contractCode = data.WTCode;//合约品种

                        //通过查持仓，获取该合约可平数量
                        var CID = pbE.WT().wtGetCurrentConnectionCID()
                        var allData =  pbE.WT().wtQueryStockRe(CID);
                        if (allData) {
                            var stocks = JSON.parse(allData).data;
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
                            //只有这几个市场支持平今
                            if(data.WTMarket == marketSHFE || marketBOCE || marketHXCE || marketWXBXG || marketQDGCXH ){
                                _this.pingDayShow = true;//将平今置为可点击
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
                    this.setDataObj.priceName = '涨停价' //新增
                    this.setDataObj.selectPriceName = upPrice;
                }
                if (flag == 2) {//跌停价
                    this.setDataObj.priceName = '跌停价'
                    this.setDataObj.selectPriceName = downPrice;
                }
                if (flag == 3) {//对手价
                    this.setDataObj.priceName = '对手价'
                    //根据选择的类型买还是卖   //买卖方向  0 买 1 卖     注：默认给 0 买
                    if(_this.setDataObj.dealOpen == 0){
                        _this.setDataObj.selectPriceName = opponentPriceSell;
                    }else if(_this.setDataObj.dealOpen == 1){
                        _this.setDataObj.selectPriceName = opponentPriceBuy;
                    }
                }
                if (flag == 4) {//最新价
                    this.setDataObj.priceName = '最新价'
                    this.setDataObj.selectPriceName = lastPrice;
                }
                //查询可开
                _this.getStockBuyNum();
            },
            //查可平
            getCanBuy:function(market,code,buyWay,todayFlag) {
                if(window.pbE){
                    //通过查持仓，获取该合约可平数量
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
                if (this.selectContractName &&  _this.setDataObj.priceName ) {
                    if (window.pbE) {
                        var priceValue;
                        if (_this.trustPriceType == 2) {//表示选择
                            priceValue =_this.setDataObj.selectPriceName+''; //选择的委托价格
                        } else if (_this.trustPriceType == 1) {//表示输入
                            priceValue = _this.setDataObj.priceName+'';
                        }
                        var gdZH = pbE.WT().wtGetGDZH(_this.setDataObj.contractMarket);
                        var xwh = pbE.WT().wtGetXWH(_this.setDataObj.contractMarket);
                        var data = {
                            63:_this.setDataObj.contractCode,//合约代码
                            54:_this.setDataObj.contractMarket,//市场代码
                            129:priceValue,//委托价格
                            112:_this.setDataObj.dealOpen+'',//买卖类别
                            117:_this.setDataObj.OffsetFlag+'',//开平仓标志
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