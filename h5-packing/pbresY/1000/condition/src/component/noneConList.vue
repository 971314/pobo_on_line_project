<template>
    <div>
        <img @click="refresh" :src="refreshImg" style="position: fixed; top: 15px; right: 17px; width: 18px; height: 18px; z-index: 1030;">
        <div  class="warCon refreshContent">
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
                            <th>条件</th>
                            <th>条件单名称</th>
                            <th>创建时间</th>
                            <!--<th>备注</th>-->
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div  id="noneList" class="bottom">
                <div class="TbodyInner">
                    <table class="brief static" v-if="noneTouchLen">
                        <tbody>
                        <tr  v-for="(data,i) in noneTouchLen" :class="{clickTrTd:data.conditionID == 1612290000000105 }" :key="i">
                            <td >
                                {{data.HYMC ? data.HYMC : '----'}}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="detailOuter">
                        <table class="detail"  v-if="noneTouchLen" >
                            <tbody>
                            <tr v-for="(data,i) in noneTouchLen" :class="{clickTrTd:data.conditionID == 1612290000000105 }" @click="conNoneClick(data.conditionID,data.flag1,data.flag3)" :key="i">
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
                                <template v-else-if="data.flag1 == 3 &&　data.flag3 == 21 ">
                                    <td> 正在申报 </td>
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
                                <template v-else-if="data.flag1 == 1 || data.flag1 == 2 || data.flag1 == 3 || data.flag1 == 4 || data.flag1 == 5  && data.flag3 == 27 ||  data.flag3 == 28 ">
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
                                <td>
                                    {{data.subType == 1 ? '价格' : '时间'}}
                                </td>
                                <td>{{data.name}}</td>
                                <td>{{data.createTime}}</td>
                                <!--<td>&#45;&#45;&#45;&#45;</td>-->
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!--<div style="    border: solid 1px red;-->
    <!--width: 100px;-->
    <!--height: 10px;" @click="test">adsssssss </div>-->
        </div>

        <footer-info></footer-info>
        <operate-tip :conNoneTouchObj.sync="conNoneTouchObj" :msg.sync="msg" @conStopOrOnClick="conStopOrOnClick"></operate-tip>
        <tip-msg :msgTip.sync="msgTip"></tip-msg>
    </div>
</template>
<script>
//    var testUserId = "10023";//云交易userId;
    import operateTip from './dialog/operateTip.vue';
    import footerInfo from './footer.vue';
    import tipMsg from './dialog/tipMsg.vue';
    export default{
        data:function(){
            return{
                noneTouchConID: [],//删除全部未触发的条件单id
                noneTouchLen:[],
                token:testToken,//t认证的oken
                authId:testId,//认证的id
                userId:null,//云交易userId
                orgCode:orgCode,//机构编号
                CID:'',

                conNoneTouchObj: {
                    conditionID: '',//条件单编号
                    clientFlag: '',//客户端操作状态
                    serverFlag: ''//服务器端操作状态
                },

                refreshImg: '../images/refresh.png',
                refreshing: false,
                msgTip:''
            }
        },
        components:{
            operateTip:operateTip,
            footerInfo:footerInfo,
            tipMsg:tipMsg
        },
        created:function(){
            $('.modal-backdrop').remove();
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
            $("#noneTuchDialog").modal('show')
            var _this = this;
            //获取云交易的userID
            if(window.pbE){
                _this.CID = pbE.WT().wtGetCurrentConnectionCID();
                if(_this.CID <= 0){
                    location.href ='pobo:uncheck=1&pageId=802005';
                }else{
                    _this.userId = pbE.WT().wtGetYunTradeUserId(_this.CID);//获取云交易的userId
                    //未触发列表
                    this.noneTouchClick();
                    //这里会根据userId是否为空判断云条件单是否登录了交易，如果登录交易，可以直接进入条件单页面
                    if(!_this.userId){
                        _this.userId = null;//等于0代表未上传交易账号此时应该callback 102001
                    }
                }
            }
            console.log(_this.CID);
        },
        updated:function(){
            //未触发滚动
            Ps.initialize(document.getElementById('noneList'), {
                frozen: true,
                wheelSpeed: 0.4
            });
        },
        methods:{
//            test:function(){
//                this.$router.push('/editCon/4');
//            },
            conNoneClick:function(conditionID, flag1, flag3){
//                $(".clickTrTd").removeClass('clickTrTd')//点击时移除从通知进来时添加的样式
                this.conNoneTouchObj = {
                    conditionID: conditionID,
                    clientFlag: flag1,
                    serverFlag: flag3
                }
                $("#noneTuchDialog").modal('show')
            },
            //获取未触发列表信息
            noneTouchClick: function () {
                circleShowPass("正在加载");//显示转圈
                var _this = this;
                //未触发列表信息
                $.ajax({
                    url: conditionUrl,
                    method: 'post',
                    dataType: 'json',
                    contentType: 'application/json;charest=utf-8',
                    data: JSON.stringify({
                        func: noneConTouch,
                        token: _this.token,
                        id: _this.authId,
                        userID: _this.userId,
                        orgCode:_this.orgCode,
                        begin: '0',
                        total: '10000',
                        type: contractType,
                        os:os
                    }),
                    success: function (data) {
                        if (data.status == 0) {
                            circleHidePass();
                            _this.noneTouchConID = [];
                            console.log(data.data,data.data.length );
                            var storageData = [];
                            if(data.data.length > 0){
                                console.log(_this.noneTouchLen.length,data.data.length,'length')
                                if(_this.noneTouchLen.length > data.data.length){
                                    console.log('>');
                                    for(var i = 0; i < _this.noneTouchLen.length; i++){
                                        var obj = _this.noneTouchLen[i];
                                        var num = obj.HYMC;
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
                                            console.log(storageData);
                                            if(storageData.length > 0){
                                                for(var k= 0; k < storageData.length;k++){
                                                    if(num === storageData[k].HYMC){
                                                         _this.noneTouchLen.splice(i,1);
                                                        console.log(_this.noneTouchLen,_this.noneTouchLen.lenght,'删除');
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }else{
                                    console.log('else')
                                    $.each(data.data, function (key, value) {
                                        _this.noneTouchConID.push(value.conditionID);
                                        _this.$set(_this.noneTouchLen,key,{
                                                conditionID:value.conditionID,
                                                flag1:value.flag1,
                                                flag3:value.flag3,
                                                createTime:value.createTime,
                                                HYMC:value.HYMC,
                                                name:value.name,//条件单名称
                                                subType:JSON.parse(value.conditionValue).TimeCondition,
                                            }
                                        )
                                    });
                                }
                            }else if(data.data.length === 0){
                                _this.noneTouchLen.splice(0,_this.noneTouchLen.length);
                            }
                        }else{
                            circleHidePass();
                            _this.msgTip = data.msg;
                            $('#msgTipDialog').modal('show')
                            return;
                        }
                    }, error: function () {
                        circleHidePass();
                        console.log("服务器异常！")
                        _this.msgTip = "服务器异常";
                        $('#msgTipDialog').modal('show')
                        return;
                    }
                })
            },
            //暂停或继续
            conStopOrOnClick: function (type) {
                var _this = this;
                //type 1：暂停 2：继续 3:修改 4：删除 5:全部删除
                //暂停和继续
                if (type == 1 || type == 2) {
                    $.ajax({
                        url: conditionUrl,
                        method: 'post',
                        dataType: 'json',
                        contentType: 'application/json;charest=utf-8',
                        data: JSON.stringify({
                            func: conStopOrOn,
                            token:  _this.token,
                            id: _this.authId,
                            orgCode:_this.orgCode,
                            operType: type+"",
                            conditionID: _this.conNoneTouchObj.conditionID,//条件点编号
                            type:contractType,
                            userID:_this.userId
                        }),
                        success: function (data) {
                            if (data.status == 0) {
                                _this.dataOrFlag = 1;
                                _this.noneTouchClick();
                                if (type == 1) {
                                    console.log("暂停成功！")
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
                            _this.msgTip = "服务器异常";
                            $('#msgTipDialog').modal('show')
                            return;
                        }
                    })
                }
                //修改
                if (type == 3) {
                    var _this = this;
                    $.ajax({
                        url: conditionUrl,
                        method: 'post',
                        dataType: 'json',
                        contentType: 'application/json;charest=utf-8',
                        data: JSON.stringify({
                            func: conIdQuery,
                            token:  _this.token,
                            id: _this.authId,
                            userID: _this.userId,
                            orgCode:_this.orgCode,
                            type:contractType+"",
                            data: [_this.conNoneTouchObj.conditionID],//条件单编号
                        }),
                        success: function (data) {
                            if (data.status == 0) {
                                console.log(data.data)
                                //缓存条件单的单条信息信息
                                saveStorageInfo("conNoneListObj",data.data);
                                _this.$router.push('/editCon/4');
                            }else{
                                _this.msgTip = data.msg;
                                $('#msgTipDialog').modal('show')
                                return;
                            }
                        }, error: function () {
                            console.log("服务器异常！")
                            _this.msgTip = "服务器异常";
                            $('#msgTipDialog').modal('show')
                            return;
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
                            token:  _this.token,
                            id: _this.authId,
                            orgCode:_this.orgCode,
                            type:contractType,
                            data: [_this.conNoneTouchObj.conditionID],//条件点编号
                            userID:_this.userId
                        }),
                        success: function (data) {
                            if (data.status == 0) {
                                _this.dataOrFlag = 1;
                                _this.noneTouchClick();
                                console.log("删除成功！")
                            }else{
                                _this.msgTip = data.msg;
                                $('#msgTipDialog').modal('show')
                                return;
                            }
                        }, error: function () {
                            console.log("服务器异常！")
                            _this.msgTip = "服务器异常";
                            $('#msgTipDialog').modal('show')
                            return;
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
                            token:  _this.token,
                            id: _this.authId,
                            orgCode:_this.orgCode,
                            type:contractType,
                            data: _this.noneTouchConID,//条件單编号
                            userID:_this.userId
                        }),
                        success: function (data) {
                            if (data.status == 0) {
                                _this.dataOrFlag = 1;
                                _this.noneTouchClick();
                                console.log("删除成功！")
                            }else{
                                _this.msgTip = data.msg;
                                $('#msgTipDialog').modal('show')
                                return;
                            }
                        }, error: function () {
                            console.log("服务器异常！")
                            _this.msgTip = "服务器异常";
                            $('#msgTipDialog').modal('show')
                            return;
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
                _this.noneTouchClick();
              }
            }
        }
    }
</script>