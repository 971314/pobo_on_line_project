<template>
    <div>
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
                        <tr  v-for="data in noneTouchLen" :class="{clickTrTd:data.conditionID == 1612290000000105 }">
                            <td >
                                {{data.HYMC ? data.HYMC : '----'}}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="detailOuter">
                        <table class="detail"  v-if="noneTouchLen" >
                            <tbody>
                            <tr v-for="data in noneTouchLen" :class="{clickTrTd:data.conditionID == 1612290000000105 }"    @click="conNoneClick(data.conditionID,data.flag1,data.flag3)">
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
    var testUserId = "10023";//云交易userId;
    import operateTip from '../component/dialog/operateTip.vue';
    import footerInfo from '../component/footer.vue';
    import tipMsg from '../component/dialog/tipMsg.vue';
    export default{
        data:function(){
            return{
                noneTouchConID: [],//删除全部未触发的条件单id
                noneTouchLen:[],
                token:testToken,//t认证的oken
                authId:testId,//认证的id
                userId:testUserId,//云交易userId
                orgCode:orgCode,//机构编号
                CID:'',

                conNoneTouchObj: {
                    conditionID: '',//条件单编号
                    clientFlag: '',//客户端操作状态
                    serverFlag: ''//服务器端操作状态
                },

            }
        },
        components:{
            operateTip:operateTip,
            footerInfo:footerInfo,
            tipMsg:tipMsg
        },
        created:function(){
            var option = {
                callbacks: [
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
            $("#noneTuchDialog").modal('show')
            var _this = this;
            //获取云交易的userID
            if(window.pbE){
                _this.CID = pbE.WT().wtGetCurrentConnectionCID();
                _this.userId = pbE.WT().wtGetYunTradeUserId(_this.CID);//获取云交易的userId
                //这里会根据userId是否为空判断云条件单是否登录了交易，如果登录交易，可以直接进入条件单页面
                if(!_this.userId){
                    testUserId = null;//等于0代表未上传交易账号此时应该callback 102001
                }
            }
            //未触发列表
            this.noneTouchClick();
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
                console.log(this.conNoneTouchObj)
                $("#noneTuchDialog").modal('show')
            },
            //获取未触发列表信息
            noneTouchClick: function () {
                //$.ajax({
                //    url:getList()+/\/\.json/,
                //    dataType:'json',
                //}).done(function(data){
                //    console.log(data.stopIsTouchArray)
                //    _this.noneTouchLen = data.stopIsTouchArray
                //})
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
                        type: contractType
                    }),
                    success: function (data) {
                        if (data.status == 0) {
                            console.log(data.data)
                            $.each(data.data, function (key, value) {
                                _this.noneTouchConID.push(value.conditionID);
                                _this.noneTouchLen.push({
                                            conditionID:value.conditionID,
                                            flag1:value.flag1,
                                            flag3:value.flag3,
                                            createTime:value.createTime,
                                            HYMC:value.HYMC,
                                            name:value.name,//条件单名称
                                            subType:JSON.parse(value.conditionValue).TimeCondition,
                                        }
                                )
                            })
                            //_this.noneTouchLen = data.data
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
                            type: type+"",
                            conditionID: _this.conNoneTouchObj.conditionID,//条件点编号
                        }),
                        success: function (data) {
                            if (data.status == 0) {
                                _this.dataOrFlag = 1;
                                _this.noneTouchLen = [];
                                _this.noneTouchClick(_this.pageSize);
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
                        }),
                        success: function (data) {
                            if (data.status == 0) {
                                _this.dataOrFlag = 1;
                                _this.noneTouchLen = [];
                                _this.noneTouchClick(_this.pageSize);
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
                        }),
                        success: function (data) {
                            if (data.status == 0) {
                                _this.dataOrFlag = 1;
                                _this.noneTouchLen = [];
                                _this.noneTouchClick(_this.pageSize);
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
        }
    }
</script>