<template>
    <div class="alert-content tab-content">
        <nav-tress @refurbishButton="refurbishButton"></nav-tress>
        <modal-my :deleatMsg.sync="deleatMsg" @deleatAlert="deleatAlert"></modal-my>
        <!--我的预警-->
        <div id="TableList">
            <div class="TheadWrap h45 color52">
                <table class="brief static">
                    <tbody>
                    <tr>
                        <td>
                            <span class="h45 width15" style="line-height: 45px;">合约</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="detailOuter">
                    <table class="staticBody h45">
                        <tbody class="h45">
                        <tr class=" h45">
                            <td><span class="width11" style="line-height: 45px;">最新价</span></td>
                            <td><span class="width14" style="line-height: 45px;">价格上限</span></td>
                            <td><span class="width14" style="line-height: 45px;">价格下限</span></td>
                            <td><span class="width14" style="line-height: 45px;">现手上限</span></td>
                            <td><span class="width14" style="line-height: 45px;">成交量上限</span></td>
                            <td><span class="width14" style="line-height: 45px;">持仓上限</span></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="TbodyWrap" id="TbodyList">
                <div class="TbodyInner">
                    <table class="brief static">
                        <tbody>
                        <tr v-for="(myVal,i) in myAlerted" v-if="myVal.flag1 != '5'" @click="deleteListShow(myVal.conditionID)" :key="i">
                            <td>
                                <span class="width15">{{myVal.HYDM}}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="detailOuter">
                        <table class="detail staticBody">
                            <tbody>
                            <tr v-for="(myVal,i) in myAlerted" v-if="myVal.flag1 != '5'" @click="deleteListShow(myVal.conditionID)" :key="i">
                                <td><span class="width11">{{myVal.newPrice}}</span></td>
                                <td><span class="width14">{{myVal.priceup}}</span></td>
                                <td><span class="width14">{{myVal.pricedown}}</span></td>
                                <td><span class="width14">{{myVal.CurVolUp}}</span></td>
                                <td><span class="width14">{{myVal.VolumeUp}}</span></td>
                                <td><span class="width14">{{myVal.AmountUp}}</span></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import modalMy from '../component/modalMy.vue';
    import navTress from './navThree.vue';
export default{
    data:function () {
        return {
            myAlerted:{},//预警列表
            ContractCode:[],//我的预警code
            GetPriceRateMy:[],//行情商品价格倍数
            deleatMsg:'',//删除提示问题
            conditionID:null,//条件单编号
            refreshing:false,
            os:'',//系统
            decimal:[]//现价价格小数位
        }
    },
    created:function () {
        if(osP === '2'){
            this.os = 'IOS';
        }else if(osP === '3'){
            this.os = 'android';
        }
        if(accountID){
            this.listRequest()
        }else{
            this.getAccountId()
        }
    },
    components:{
      modalMy:modalMy,
      navTress:navTress
    },
    watch:{
        '$route' (to, from){
            if(to.params.id == 2){
                $("#noneTuchDialog").modal('hide');
                if($('.modal-backdrop').css('display') == 'block'){
                    $('.modal-backdrop').css('display','none')
                }
                $('.deleatMes').css('display','none');
                this.listRequest();
                }
            }
    },
    updated:function(){
        Ps.initialize(document.getElementById('TbodyList'), {
            frozen: true,
            wheelSpeed: 0.2
        });
    },
    methods:{
        // 列表模态框show
        deleteListShow:function (conditionID) {
            $('#deleteList').modal('show');
            this.conditionID = conditionID;
        },
        // 删除预警
        deleatAlert:function () {
            console.log('111');
            var _this = this;
            $.ajax({
                url: conditionUrl,
                method: 'post',
                dataType: 'json',
                xhrFields: {withCredentials: true},
                crossDomain: true,
                data:
                    JSON.stringify({
                        func: '1003',
                        token: testToken,
                        id: testId,
                        userID:accountID,
                        orgCode:orgCode,
                        data:[_this.conditionID],
                        type:type
                    }),
                success: function (data) {
                    console.log(data);
                    if(data.status == 0) {
                        $('#deleteList').modal('hide');
                        $('.deleatMes').css('display','block');
                        _this.deleatMsg = '删除成功';
                        setTimeout(function () {
                            $('.deleatMes').css('display','none');
                        },2000);
                        _this.listRequest()
                    }else{
                        $('#deleteList').modal('hide');
                        $('.deleatMes').css('display','block');
                        _this.deleatMsg = '删除失败';
                        setTimeout(function () {
                            $('.deleatMes').css('display','none');
                        },2000);
                    }
                },
                error: function () {
                    console.log("服务器异常！")
                }
            })
        },
        //获取列表
        listRequest:function () {
            pbE.SYS().showCircleView('Pbkey_Default_Circle',JSON.stringify({'Pbkey_Circle_MSG':'正在加载'}));
            var _this = this;
            $.ajax({
                url: conditionUrl,
                method: 'post',
                dataType: 'json',
                xhrFields: {withCredentials: true},
                crossDomain: true,
                data:JSON.stringify({
                        func: '1005',
                        token: testToken,
                        type:type,
                        id: testId,
                        userID:accountID,
                        begin:'0',
                        total:'100',
                        orgCode:orgCode,
                        os:_this.os
                    }),
                success: function (data) {
                    console.log(data);
                    if(data.status == 0){
                        pbE.SYS().hideCircleView('Pbkey_Default_Circle');
                        _this.myAlerted = {};
                        _this.ContractCode = [];
                        _this.GetPriceRateMy = [];
                        _this.decimal = [];
                        var myAlertValue = [],
                            marketArr = [];
                        $.each(data.data,function (key,val) {
                            myAlertValue.push({
                                HYDM:val.HYMC,
                                newPrice:'--',//最新价
                                priceup:JSON.parse(val.conditionValue).ConditionList[0].PriceUpLimit.Value,//价格上限
                                pricedown:JSON.parse(val.conditionValue).ConditionList[0].PriceDownLimit.Value,//价格下限
                                CurVolUp:JSON.parse(val.conditionValue).ConditionList[0].CurVolUpLimit.Value,//现手上限
                                VolumeUp:JSON.parse(val.conditionValue).ConditionList[0].VolumeUpLimit.Value,//成交量上限
                                AmountUp:JSON.parse(val.conditionValue).ConditionList[0].AmountUpLimit.Value,//持仓上限
                                conditionID:val.conditionID,
                                flag1:val.flag1
                            });
                            var market = JSON.parse(val.conditionValue).Stock.MarketID,
                                code = JSON.parse(val.conditionValue).Stock.PBCode;
                            _this.ContractCode.push(code);
                            marketArr.push({
                                '2': market,
                                '3': code
                            });
                            _this.GetPriceRateMy.push(pbE.HQ().hqGetPriceRate(code,market));//价格倍数
                            _this.decimal.push(pbE.HQ().hqGetPriceDecimal(code,market));
                        });
                        pbE.HQ().hqSubscribe(0, JSON.stringify({"1":marketArr}));
                        _this.myAlerted = myAlertValue;
                        _this.nativeInteraction();
                    }else{
                        pbE.SYS().hideCircleView('Pbkey_Default_Circle');
                        alert('加载失败');
                    }
                },
                error: function () {
                    pbE.SYS().hideCircleView('Pbkey_Default_Circle');
                    console.log("服务器异常！")
                }
            });
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
                data: JSON.stringify({
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
                        _this.listRequest()
                    }
                },
                error: function () {
                    console.log("服务器异常！")
                }
            })
        },
        //刷新
        refurbishButton:function () {
            var _this = this;
            if (_this.refreshing) {
                alert('刷新过于频繁，两次查询间隔至少5秒');
            } else {
                _this.refreshing = true;
                setTimeout(function () {
                    _this.refreshing = false;
                }, 5000);
                _this.listRequest();
            }
        },
        //原生交互
        nativeInteraction:function () {
            var _this = this,
                option = {
                callbacks: [{module: 90000, callback: function (mag) {
                    var data = mag.jData.Data;
                    console.log(mag);
                    for(var i = 0;i < data.length;i++){
                        if(_this.myAlerted.length > 0){
                            for(var j = 0;j < _this.myAlerted.length;j++){
                                if(data[i]['10'] == _this.ContractCode[j]){
                                    if(_this.myAlerted[j].newPrice != 'undefined'){
                                        var newPrice = data[i]['29']/_this.GetPriceRateMy[j];
                                        if(!isNaN(newPrice)){
                                            _this.myAlerted[j].newPrice = pbUtils.decimalDecPrice(_this.decimal[j],newPrice)
                                        }else{
                                            _this.myAlerted[j].newPrice = '--'
                                        }
                                    }
                                }
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
            };
            pbPage.initPage(option);
        }
    }
}
</script>
<style>
    #TbodyList tr{
        border-bottom: 1px solid #e4e7f0;
    }
</style>