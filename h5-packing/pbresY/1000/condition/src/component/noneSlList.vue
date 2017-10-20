<template>
    <div>
        <img @click="refresh" :src="refreshImg" style="position: fixed; top: 15px; right: 17px; width: 18px; height:   18px; z-index: 1030;">
        <div  class="warCon refreshContent" id="refreshContent">
            <div class="TheadWrap">
                <table class="brief static">
                    <tbody>
                    <tr>
                        <td class="tdT">
                            合约
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="detailOuter">
                    <table class="detail">
                        <thead>
                        <tr>
                            <th>状态</th>
                            <th>数量</th>
                            <th>止损价</th>
                            <th>止盈价</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div  id="noneList" class="bottom">
                <div class="TbodyInner">
                    <table class="brief static" v-if="stopIsTouchArray">
                        <tbody>
                        <tr v-for="(data,i) in stopIsTouchArray"  @click="conNoneClick(data.conditionID,data.flag1,data.flag3)" :key="i">
                            <td >
                                {{data.hyName ? data.hyName : '----'}}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="detailOuter">
                        <table class="detail"  v-if="stopIsTouchArray" >
                            <tbody class="checkStyle">
                            <tr v-for="(data,i) in stopIsTouchArray" @click="conNoneClick(data.conditionID,data.flag1,data.flag3)" :key="i">
                                <!--//redTd greenTd-->
                                <!--运行、暂停、异常
                                客户端flag1：1：新增 2：修改 3：暂停 4：开始 5：删除
                                服务器flag3: 21：初始化  22：正在执行  23：已暂停  24：已触发  25：已完成  26: 已删除 27:28：执行异常 网络异常
                                如果flag1和flag3不匹配  那就以客户端flag1的值翻译 为 正在.....-->
                                <template v-if="data.flag1 == 1 && !data.flag3">
                                    <td> 正在申报 </td>
                                </template>
                                <template v-else-if="data.flag1 == 1 &&  data.flag3 == 21">
                                    <td> 正在申报 </td>
                                </template>
                                <template v-else-if="data.flag1 == 1 &&  data.flag3 == 22">
                                    <td class="greenTd"> 运行 </td>
                                </template>
                                <template v-else-if="data.flag1 == 2 &&  data.flag3 == 22">
                                    <td class="greenTd"> 运行 </td>
                                </template>
                                <template v-else-if="data.flag1 == 2 &&　data.flag3 == 23 ">
                                    <td class="blueTd"> 暂停 </td>
                                </template>
                                <template v-else-if="data.flag1 == 4  && data.flag3 == 23 ">
                                    <td> 正在申报 </td>
                                </template>
                                <template v-else-if="data.flag1 == 4 &&  data.flag3 == 22">
                                    <td class="greenTd"> 运行 </td>
                                </template>
                                <template v-else-if="data.flag1 == 3 &&　data.flag3 == 22 ">
                                    <td> 正在申报 </td>
                                </template>
                                <template v-else-if="data.flag1 == 3 &&　data.flag3 == 23 ">
                                    <td class="blueTd"> 暂停 </td>
                                </template>
                                <template v-else-if="data.flag1 == 2 &&　data.flag3 == 21 ">
                                    <td> 正在申报 </td>
                                </template>
                                <template v-else-if="data.flag1 == 1 || data.flag1 == 2 || data.flag1 == 3 || data.flag1 == 4 ||
                       data.flag1 == 5  && data.flag3 == 27 ||  data.flag3 == 28 ">
                                    <td class="redTd"> 异常 </td>
                                </template>
                                <template v-else-if="data.flag1 == 5 &&　data.flag3 != 26">
                                    <td>正在删除 </td>
                                </template>
                                <template v-else-if="data.flag1 == 5 && data.flag3 == 26 ">
                                    <td>已删除 </td>
                                </template>
                                <template v-else>
                                    <td> ---- </td>
                                </template>
                                <td>{{data.Volume}}</td>
                                <td>{{data.StopLossCheckPriceType}}</td>
                                <td>{{data.StopProfitCheckPriceType}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <operate-tip :conNoneTouchObj.sync="conNoneTouchObj" :msg.sync="msg" @conStopOrOnClick="conStopOrOnClick"></operate-tip>
        <tip-msg :msgTip.sync="msgTip"></tip-msg>
        <footer-info></footer-info>
        <a id="stopInfo"></a>
    </div>
</template>
<script>
//    var testUserId = "10023";//云交易userId;
    import operateTip from './dialog/operateTip.vue';
    import tipMsg from './dialog/tipMsg.vue';
    import footerInfo from './footer.vue';
    export default{
        data:function(){
            return{
                initImg:true,
                stopFiledNoTuch:true,//未触发初始化样式
                stopFiledIsTuch:true,//已触发初始化样式
                stopIsTouchArray:[],
                isTouchArray:[],//已触发list
                conNoneTouchObj: {
                    conditionID: '',//条件单编号
                    clientFlag: '',//客户端操作状态
                    serverFlag: ''//服务器端操作状态
                },
                stopNoneTouchShow:true,
                stopIsTouchShow:false,
                pageSize:20,//一页20条
                pageNoneNum:1,
                pageIsNum:1,
                pullIsTouch:'点击加载更多',//已触发的加载提示

                orgCode:orgCode,//机构编号
                userId:null,
                authId:testId,//认证的id
                token:testToken,//t认证的oken

                msgTip:'',
                msg:'',

                refreshImg: '../../images/refresh.png',
                refreshing: false,
                CID:'',
                noneTouchConID:[],
                os:''//系统
            }
        },
        components:{
            operateTip:operateTip,
            tipMsg:tipMsg,
            footerInfo:footerInfo
        },
        created:function(){
            $('.modal-backdrop').remove();
            if(osP === '2'){
                this.os = 'IOS';
            }else if(osP === '3'){
                this.os = 'android';
            }
            var _this = this,
                option = {
                callbacks: [
                    {fun:102001,callback:function(msg){
                        if(_this.userId == null){
                            if(msg){
                                if(102001 == msg.functionNo){
                                    _this.userId = pbE.WT().wtGetYunTradeUserId(pbE.WT().wtGetCurrentConnectionCID());//获取云交易的userId
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
            if(window.pbE){
                _this.CID = pbE.WT().wtGetCurrentConnectionCID();
                if(_this.CID <= 0){
                    window.location.href='pobo:uncheck=1&pageId=802005';
                }else{
                    _this.userId = pbE.WT().wtGetYunTradeUserId(_this.CID);//获取云交易的userId
                    _this.noneTouchList(_this.pageSize);//未触发
                    //这里会根据userId是否为空判断云条件单是否登录了交易，如果登录交易，可以直接进入条件单页面
                    if(!_this.userId){
                        _this.userId = null;//等于0代表未上传交易账号此时应该callback 102001
                    }
                }
            }
        },
        updated:function(){
            //未触发
            Ps.initialize(document.getElementById('noneList'), {
                frozen: true,
                wheelSpeed: 0.2
            });
        },
        methods:{
            //点击未触发的每条记录获取信息
            conNoneClick: function (conditionID, flag1, flag3) {
                $(".checkStyle > tr").click(function(){
                    $(this).addClass("tableCheckCss").siblings().removeClass("tableCheckCss");
                });
                this.conNoneTouchObj = {
                    conditionID: conditionID,
                    clientFlag: flag1,
                    serverFlag: flag3
                }
                console.log(this.conNoneTouchObj)
                $("#noneTuchDialog").modal('show')
            },
            noneTouchList:function(pageSize){
                circleShowPass("正在加载");//显示转圈
                var _this = this;
                //未触发列表信息
                $.ajax({
                    url:conditionUrl,
                    method:'post',
                    dataType:'json',
                    async:true,
                    contentType:'application/json;charest=utf-8',
                    data:JSON.stringify({
                        func: noneConTouch,
                        token: _this.token,
                        id: _this.authId,
                        userID:_this.userId,
                        orgCode:_this.orgCode,
                        begin:'0',
                        total:'10000',
                        type:stopFiledType,
                        os:_this.os
                    }),
                    success:function(data){
                        //console.log(data)
                        if(data.status == 0){
                            circleHidePass();
                            _this.noneTouchConID = [];
                            console.log(data.data);
                            var storageData = [];
                            if(data.data.length > 0){
                                if(_this.stopIsTouchArray.length > data.data.length){
                                    for(var i = 0; i < _this.stopIsTouchArray.length; i++){
                                        var obj = _this.stopIsTouchArray[i];
                                        var num = obj.hyName;
                                        var isExist = false;
                                        for(var j = 0; j < data.data.length; j++){
                                            var aj = data.data[j];
                                            var n = aj.HYMC;
                                            if(n == num){
                                                isExist = true;
                                                break;
                                            }
                                        }
                                        if(!isExist){
                                            storageData.push(obj);
                                            if(storageData.length > 0){
                                                for(var k= 0; k < storageData.length;k++){
                                                    if(num === storageData[k].hyName){
                                                        _this.stopIsTouchArray.splice(i,1);
                                                        console.log(_this.stopIsTouchArray,_this.stopIsTouchArray.lenght,'删除');
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }else{
                                    console.log('else')
                                    $.each(data.data, function (key, value) {
                                        _this.noneTouchConID.push(value.conditionID);
                                        var list = JSON.parse(value.conditionValue);
                                        _this.$set(_this.stopIsTouchArray,key,{
                                            conditionID:value.conditionID,
                                            flag1:value.flag1,
                                            flag3:value.flag3,
                                            hyName:value.HYMC,
                                            market:  list.Contracts[0].ExchangeCode,
                                            code:   list.Contracts[0].ContractCode,
                                            StopLossCheckPriceType:list.ConditionList[0].PositionStop.StopLossPrice,//止损参数
                                            StopProfitCheckPriceType:list.ConditionList[0].PositionStop.StopProfitPrice,//止盈参数
                                            Volume:list.AttachObject[0].Volume//数量
                                            }
                                        )
                                    });
                                }
                            }else if(data.data.length === 0){
                                _this.stopIsTouchArray.splice(0,_this.stopIsTouchArray.length);
                            }
                        }else{
                            circleHidePass();
                            _this.msgTip = data.msg;
                            $('#msgTipDialog').modal('show');
                            return;
                        }
                    },error:function(){
                        circleHidePass();
                        alert("服务器异常！");
                        console.log("服务器异常！")
                    }
                })
            },
            //暂停、运行、删除、删除全部、修改
            conStopOrOnClick:function(type){
                var _this = this;
                if(type == 1 || type == 2){//暂停
                    $.ajax({
                        url: conditionUrl,
                        method: 'post',
                        dataType: 'json',
                        contentType: 'application/json;charest=utf-8',
                        data: JSON.stringify({
                            func: conStopOrOn,
                            token: testToken,
                            id: id,
                            operType: type+'',
                            orgCode:_this.orgCode,
                            conditionID: _this.conNoneTouchObj.conditionID,//条件点编号
                            type:stopFiledType,
                            userID:_this.userId
                        }),
                        success: function (data) {
                            if (data.status == 0) {
                                _this.noneTouchList(_this.pageSize);
                                if (type == 1) {
                                    console.log("暂停成功！")
                                    //关闭当前webview
                                    $("#stopInfo").attr('href','goBack');
//                                    window.setTimeout(function(){
//                                        $("#stopInfo")[0].click();
//                                    },1000)
                                }
                                if (type == 2) {
                                    console.log("运行成功！")
                                }
                            }else{
                                _this.msgTip = data.msg;
                                $('#msgTipDialog').modal('show')
                                return;
                            }
                        }, error: function () {
                            console.log("服务器异常！")
                        }
                    })
                }
                if(type == 3) {//修改
                    $.ajax({
                        url: conditionUrl,
                        method: 'post',
                        dataType: 'json',
                        contentType: 'application/json;charest=utf-8',
                        data: JSON.stringify({
                            func: conIdQuery,
                            token: testToken,
                            id: id,
                            orgCode:_this.orgCode,
                            userID: _this.userId,
                            type: stopFiledType,
                            data: [_this.conNoneTouchObj.conditionID],//条件点编号
                        }),
                        success: function (data) {
                            console.log(data)
                            if(data.status == 0){
                                //缓存信息 并跳转页面
                                saveStorageInfo("stopOfFiledObj",data.data)
                                window.location.href = 'condition-set-sl.html?type=1';//跳转至编辑页面
                            }else{
                                _this.msgTip = data.msg;
                                $('#msgTipDialog').modal('show')
                                return;
                            }
                        }, error: function () {

                        }
                    })
                }
                //删除
                if (type == 4) {
                    $.ajax({
                        url: conditionUrl,
                        method: 'post',
                        dataType: 'json',
                        contentType: 'application/json;charest=utf-8',
                        data: JSON.stringify({
                            func: delCon,
                            token: testToken,
                            id: id,
                            orgCode:_this.orgCode,
                            type:stopFiledType,
                            data: [_this.conNoneTouchObj.conditionID],//条件点
                            userID:_this.userId
                        }),
                        success: function (data) {
                            if (data.status == 0) {
                                _this.noneTouchList(_this.pageSize);
                                console.log("删除成功！")
                            }else{
                                _this.msgTip = data.msg;
                                $('#msgTipDialog').modal('show')
                                return;
                            }
                        }, error: function () {
                            console.log("服务器异常！")
                        }
                    })
                }
                //全部删除
                if (type == 5) {
                    console.log(_this.noneTouchConID)
                    $.ajax({
                        url: conditionUrl,
                        method: 'post',
                        dataType: 'json',
                        contentType: 'application/json;charest=utf-8',
                        data: JSON.stringify({
                            func: delCon,
                            token: testToken,
                            id: id,
                            orgCode:_this.orgCode,
                            type:stopFiledType,
                            data: _this.noneTouchConID,//条件点编号
                            userID:_this.userId
                        }),
                        success: function (data) {
                            if (data.status == 0) {
                                _this.noneTouchList(_this.pageSize);
                                console.log("删除成功！")
                            }else{
                                _this.msgTip = data.msg;
                                $('#msgTipDialog').modal('show')
                                return;
                            }
                        }, error: function () {
                            console.log("服务器异常！")
                        }
                    })
                }
            },
            refresh: function () {
              var _this = this;
              if (_this.refreshing) {
                alert('刷新过于频繁，两次查询间隔至少5秒');
              } else {
                _this.refreshing = true;
                setTimeout(function () {
                  _this.refreshing = false;
                }, 5000);
                _this.noneTouchList(_this.pageSize);
              }
            }
        }
    }
</script>