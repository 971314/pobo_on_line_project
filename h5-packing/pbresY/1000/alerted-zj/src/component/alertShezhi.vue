<template>
    <div class="alert-content tab-content">
        <nav-tress @resettingButton="resettingButton"></nav-tress>
        <modal :dealnames.sync="dealnames" @dealnameClick="dealnameClick"></modal>
        <!--预警设置-->
        <div id="alertedSet">
            <div class="setDiv">
                <ul class="clearfloat">
                    <li>
                        <div class="setDivOne" style="height: 32.5px">
                            <span  id="dealname" class="heyuk" @click="isShow" :style="{color:dealnameColor}">{{dealname}}</span>
                        </div>
                        <div>
                            <span class="fontcol8080">仓差：</span>
                            <span class="setDivThree" id="warehouseBad">--</span>
                        </div>
                    </li>
                    <li>
                        <div><span class="fontcol8080">最新价：</span><span class="fontcol1423" id="priceValue">--</span></div>
                        <div><span class="fontcol8080">持仓量：</span><span id="openInterest">--</span></div>
                    </li>
                    <li>
                        <div>
                            <span :class="{set:selectOne,unset:unselectOne}" class="select"
                                  @click="selectClick(0)"></span>
                            <span class="fontcol8080">价格上限</span>
                        </div>
                        <div id="setinput">
                            <input type="number" class="inputText" disabled id="priceup" v-model="msg0"/>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span :class="{set:selectTwo,unset:unselectTwo}" class="select"
                                  @click="selectClick(1)"></span>
                            <span class="fontcol8080">价格下限</span>
                        </div>
                        <div id="setinput">
                            <input type="number" class="inputText" disabled id="pricedown" v-model="msg1"/>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span :class="{set:selectThree,unset:unselectThree}" class="select"
                                  @click="selectClick(2)"></span>
                            <span class="fontcol8080">现手上限</span>
                        </div>
                        <div id="setinput">
                            <input type="number" class="inputText" disabled id="curVolUp" v-model="msg2"/>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span :class="{set:selectFour,unset:unselectFour}" class="select"
                                  @click="selectClick(3)"></span>
                            <span class="fontcol8080">成交量上限</span>
                        </div>
                        <div id="setinput">
                            <input type="number" class="inputText" disabled id="volumeUp" v-model="msg3"/>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span :class="{set:selectFive,unset:unselectFive}" class="select"
                                  @click="selectClick(4)"></span>
                            <span class="fontcol8080">持仓上限</span>
                        </div>
                        <div id="setinput">
                            <input type="number" class="inputText" disabled id="entrustUp" v-model="msg4"/>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="navbar-fixed-bottom" :style="Android ? 'position:fixed' : 'position:absolute'">
                <div>
                    注：该预警永久有效<br/>
                    当其中一条条件被触发后，不会再次预警<br/>
                    预警限制为二十条
                </div>
            </div>
            <div class="btnDiv">
                <button type="button" class="btnSubmit" :style={background:buttonColor} :disabled="buttonDisabled" @click="insertClick">
                    添加
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import modal from './modalSet.vue';
    import navTress from './navThree.vue';
    export default{
        data:function () {
            return {
                selectOne: false,//设置
                unselectOne: true,
                selectTwo: false,
                unselectTwo: true,
                selectThree: false,
                unselectThree: true,
                selectFour: false,
                unselectFour: true,
                selectFive: false,
                unselectFive: true,
                msg0:'',//价格上限
                msg1:'',//价格下限
                msg2:'',//现手上限
                msg3:'',//成交量上限
                msg4:'',//持仓上限
                dealnames:'',//选择合约名称数组
                dealnameColor:'black',//合约名称显示框字体颜色
                dealname:'选择合约',//合约名称显示框
                buttonColor:'#c0c6cd',//按钮颜色
                buttonDisabled:true, //按钮属性
                limit:true,//是否可添加
                nameCode:'',//合约代码
                nameMarket:'',//合约市场
                Android:navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1,
                os:'',//系统
                GetPriceRate:null,//价格倍数
                decimal:null//价格小数位
            }
        },
        watch: {
            msg0:function (val) {
                this.iblur(val)
            },
            msg1:function (val) {
                if(val.indexOf('-') > -1){
                    this.msg1 = '';
                }else{
                    this.iblur(val)
                }
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
            '$route' (to, from){
                if(to.params.id == 1){
                    $("#deleteList").modal('hide');
                    if($('.modal-backdrop').css('display') == 'block'){
                        $('.modal-backdrop').css('display','none')
                    }
                    $('.deleatMes').css('display','none');
                }
            }
        },
        created:function () {
            var constractName;
            if(osP === '2'){
                this.os = 'IOS';
            }else if(osP === '3'){
                this.os = 'android';
            }
            if(window.pbE){
                constractName =  pbE.ZX().getSelfStock(0);
                if(constractName){
                    this.dealnames = JSON.parse(constractName);
                }else{
                    this.dealnames = [{"name":"请添加自选"}]
                }
            }else{
                this.dealnames = [
                    {"name":"沪铜1702","market":5000,"code":'GLNG'},
                    {"name":"沪铝1702","market":2001,"code":'010102'},
                    {"name":"沪锌1702","market":2001,"code":'010302'}
                ]
            }
            this.nameCode = this.$route.query.hqCode;
            this.nameMarket = parseFloat(this.$route.query.hqMarket);
            if(this.nameCode && this.nameMarket){
                if(window.pbE){
                    pbE.HQ().hqSubscribe(0, JSON.stringify({"1":[{2:this.nameMarket,3:this.nameCode}]}));
                    this.GetPriceRate = pbE.HQ().hqGetPriceRate(this.nameCode,this.nameMarket);
                    this.decimal = pbE.HQ().hqGetPriceDecimal(this.nameCode,this.nameMarket)
                    var tradeHq = JSON.parse(pbE.HQ().getHQInfo(this.nameCode,this.nameMarket)).name;
                    if(tradeHq){
                        this.dealname = tradeHq;
                    }
                    this.nativeInteraction();
                }else{
                    this.dealname ="沪铜1702";
                }
            }
            if(!accountID){
                this.getAccountId()
            }
        },
        components:{
            modal:modal,
            navTress:navTress
        },
        methods:{
            //添加预警点击事件
            insertClick:function () {
                pbE.SYS().showCircleView('Pbkey_Default_Circle',JSON.stringify({'Pbkey_Circle_MSG':'正在添加'}));
                var insertAlerted = new alertInsert(),
                    _this = this,
                    priceup = $("#priceup").prop('disabled'),
                    pricedown = $("#pricedown").prop('disabled'),
                    curVolUp = $("#curVolUp").prop('disabled'),
                    volumeUp = $("#volumeUp").prop('disabled'),
                    entrustUp = $("#entrustUp").prop('disabled');
                if (_this.limit && $('#dealname').html() != '选择合约') {
                    insertAlerted.Stock.MarketID = _this.nameMarket;
                    insertAlerted.Stock.PBCode = _this.nameCode;
                    if (!priceup) {
                        if(_this.msg0 != ''){
                            insertAlerted.ConditionList[0].PriceUpLimit.Enabled = true;
                            insertAlerted.ConditionList[0].PriceUpLimit.Value = parseFloat($("#priceup").val());
                        }else{
                            pbE.SYS().hideCircleView('Pbkey_Default_Circle');
                            alert('请输入价格上限内容！');
                            _this.buttonColor = '#c0c6cd';
                            _this.buttonDisabled = true;
                        }
                    }
                    if (!pricedown) {
                        if(_this.msg1 != ''){
                            insertAlerted.ConditionList[0].PriceDownLimit.Enabled = true;
                            insertAlerted.ConditionList[0].PriceDownLimit.Value = parseFloat($("#pricedown").val());
                        }else{
                            pbE.SYS().hideCircleView('Pbkey_Default_Circle');
                            alert('请输入价格下限内容');
                            _this.buttonColor = '#c0c6cd';
                            _this.buttonDisabled = true;
                        }
                    }
                    if (!curVolUp) {
                        if(_this.msg2 != ''){
                            insertAlerted.ConditionList[0].CurVolUpLimit.Enabled = true;
                            insertAlerted.ConditionList[0].CurVolUpLimit.Value = parseFloat($("#curVolUp").val());
                        }else{
                            pbE.SYS().hideCircleView('Pbkey_Default_Circle');
                            alert('请输入现手上限内容');
                            _this.buttonColor = '#c0c6cd';
                            _this.buttonDisabled = true;
                        }
                    }
                    if (!volumeUp) {
                        if(_this.msg3 != ''){
                            insertAlerted.ConditionList[0].VolumeUpLimit.Enabled = true;
                            insertAlerted.ConditionList[0].VolumeUpLimit.Value = parseFloat($("#volumeUp").val());
                        }else{
                            pbE.SYS().hideCircleView('Pbkey_Default_Circle');
                            alert('请输入成交量上限内容');
                            _this.buttonColor = '#c0c6cd';
                            _this.buttonDisabled = true;
                        }
                    }
                    if (!entrustUp) {
                        if(_this.msg4 != ''){
                            insertAlerted.ConditionList[0].AmountUpLimit.Enabled = true;
                            insertAlerted.ConditionList[0].AmountUpLimit.Value = parseFloat($("#entrustUp").val());
                        }else{
                            pbE.SYS().hideCircleView('Pbkey_Default_Circle');
                            alert('请输入持仓上限内容');
                            _this.buttonColor = '#c0c6cd';
                            _this.buttonDisabled = true;
                        }
                    }
                    if(!priceup && !pricedown){
                        if(_this.msg0 < _this.msg1){
                            pbE.SYS().hideCircleView('Pbkey_Default_Circle');
                            alert('价格下限不能低于价格上限');
                            _this.buttonColor = '#c0c6cd';
                            _this.buttonDisabled = true;
                        }
                    }
                    if(!$('.btnSubmit').prop('disabled')){
                        $.ajax({
                            url: conditionUrl,
                            method: 'post',
                            dataType: 'json',
                            xhrFields: {withCredentials: true},
                            crossDomain: true,
                            data:JSON.stringify({
                                func: '1002',
                                token: testToken,
                                type:type,
                                userID:accountID,
                                id: testId,
                                subType: "",
                                name: "",
                                orgCode:orgCode,
                                data:insertAlerted,
                                HYMC:_this.dealname,
                                os:_this.os
                            }),
                            success: function (data) {
                                console.log(data);
                                if(data.status == 0){
                                    pbE.SYS().hideCircleView('Pbkey_Default_Circle');
                                    alert('添加成功！');
                                    _this.dealname = '选择合约';
                                    _this.dealnameColor = '#c0c6cd';
                                    _this.inputDisabled();
                                }else if(data.status == -10){
                                    pbE.SYS().hideCircleView('Pbkey_Default_Circle');
                                    alert('预警限制为20条！');
                                    _this.inputDisabled();
                                    _this.dealname = '预警限制为20条';
                                    _this.dealnameColor = 'red';
                                    _this.limit = false;
                                }else{
                                    pbE.SYS().hideCircleView('Pbkey_Default_Circle');
                                    alert('添加失败');
                                }
                            }, error: function () {
                                console.log("服务器异常！")
                            }
                        })
                    }
                }
            },
            //选择点击设置
            selectClick: function (flag) {
                var _this = this;
                if(_this.limit){
                    if($('#dealname').html() != '选择合约'){
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
            //input变化判断
            iblur:function (val) {
                var _this = this;
                if(isNaN(val)){
                    alert('请输入数字');
                    _this.buttonColor = '#c0c6cd';
                    _this.buttonDisabled = true;
                }else if(val == ''){
                }else{
                    _this.buttonColor = '#3366cc';
                    _this.buttonDisabled = false;
                }
            },
            // 模态框显示
            isShow:function () {
                $("#noneTuchDialog").modal('show')
            },
            // 合约选择点击事件
            dealnameClick:function (name) {
                var _this = this;
                if(_this.limit) {
                    _this.dealnameColor = 'black';
                    _this.dealname = name.name;
                    _this.nameCode = name.code;
                    _this.nameMarket = name.market;
                    if (window.pbE) {
                        _this.GetPriceRate = pbE.HQ().hqGetPriceRate(_this.nameCode, _this.nameMarket);
                        _this.decimal = pbE.HQ().hqGetPriceDecimal(_this.nameCode, _this.nameMarket);
                        pbE.HQ().hqSubscribe(0, JSON.stringify({"1": [{2: _this.nameMarket, 3: _this.nameCode}]}));
                        $('#priceValue').text('--');
                        $("#openInterest").text('--');
                        $('#warehouseBad').text('--');
                        _this.nativeInteraction();
                    }
                }
                $("#noneTuchDialog").modal('hide');
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
                _this.buttonColor = '#c0c6cd';
                _this.buttonDisabled = true;
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
                $('#priceValue').text('--');
                $('#warehouseBad').text('--');
                $("#openInterest").text('--');
            },
            //获取账号信息
            getAccountId:function () {
                var _this = this;
                $.ajax({
                    url: conditionUrl,
                    method: 'post',
                    dataType: 'json',
                    xhrFields: {withCredentials: true},
                    crossDomain: true,
                    data:
                        JSON.stringify({
                            func: '1001',
                            token: testToken,
                            id: testId,
                            orgCode:orgCode,
                            account:userName,
                            accountType:'',
                            loginType:'',
                            type:type,
                            seatNumber:'',
                            os:_this.os
                        }),
                    success: function (data) {
                        console.log(data);
                        if(data.status == 0){
                            accountID = data.data.accountID;
                        }
                    },
                    error: function () {
                        console.log("服务器异常！")
                    }
                })
            },
            //重置
            resettingButton:function () {
                this.dealname = '选择合约';
                this.selectOne = false;
                this.unselectOne = true;
                this.selectTwo = false;
                this.unselectTwo = true;
                this.selectThree = false;
                this.unselectThree = true;
                this.selectFour = false;
                this.unselectFour = true;
                this.selectFive = false;
                this.unselectFive = true;
                this.buttonDisabled = true;
                this.buttonColor = '#c0c6cd';
                $('#priceup').attr('disabled','disabled');
                this.msg0 = '';
                $('#pricedown').attr('disabled','disabled');
                this.msg1 = '';
                $('#curVolUp').attr('disabled','disabled');
                this.msg2 = '';
                $('#volumeUp').attr('disabled','disabled');
                this.msg3 = '';
                $('#entrustUp').attr('disabled','disabled');
                this.msg4 = '';
                $('#priceValue').text('--');
                $('#warehouseBad').text('--');
                $("#openInterest").text('--');
            },
            //原生交互
            nativeInteraction:function () {
                var _this = this,
                    yesterdayP,
                    option = {
                    callbacks: [{module: 90000, callback: function (mag) {
                        console.log(mag);
                        var data = mag.jData.Data;
                        for(var i = 0;i < data.length;i++){
                            if(_this.dealname != '' && _this.dealname != '选择合约'){
                                if(data[i]['10'] == _this.nameCode){
                                    var priceNew = pbUtils.decimalDecPrice(_this.decimal,data[i]['29']/_this.GetPriceRate);
                                    if(!isNaN(priceNew)){
                                        $('#priceValue').text(priceNew);
                                    }else{
                                        $('#priceValue').text('--');
                                    }
                                    $("#openInterest").text(data[i]['39']);
                                    if(data[i]['25']){
                                        yesterdayP = data[i]['25'];
                                        $('#warehouseBad').text(data[i]['39'] - data[i]['25']);
                                    }else if(yesterdayP){
                                        $('#warehouseBad').text(data[i]['39'] - yesterdayP);
                                    }else{
                                        $('#warehouseBad').text('--')
                                    }
                                }
                            }else if( _this.dealname != '预警限制为20条'){
                                $('#priceValue').text('--');
                                $('#warehouseBad').text('--');
                                $("#openInterest").text('--');
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
                };
                pbPage.initPage(option);
            }
        }
    }
</script>