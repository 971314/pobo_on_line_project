<template>
    <div   class="warCon refreshContent" id="refreshIsContent">
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
                        <th>触发时间</th>
                        <th>数量</th>
                        <th>止损价</th>
                        <th>止盈价</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div  id="isList" class="bottom">
            <div class="TbodyInner">
                <table class="brief static" v-if="isTouchArray">
                    <tbody>
                    <tr  v-for="data in isTouchArray" data-toggle="modal">
                        <td >
                            {{data.hyName ? data.hyName : '----'}}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="detailOuter">
                    <table class="detail"  v-if="isTouchArray" >
                        <tbody>
                        <tr v-for="data in isTouchArray">
                            <td>{{data.createTime}}</td>
                            <td>{{data.Volume}}</td>
                            <td>{{data.StopLossCheckPriceType}}</td>
                            <td>{{data.StopProfitCheckPriceType}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div style="clear: both"></div>
        <div class="moreInfo" @click="btnIsMoreInfo" :class="{hide: isTouchArray.length < 20}">
            {{pullIsTouch}}
        </div>
    </div>
</template>
<script>
    var testUserId = "10025";//云交易userId;
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
                pageIsNum:0,
                pullIsTouch:'点击加载更多',//已触发的加载提示
                orgCode:orgCode,//机构编号
                userId:testUserId
            }
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
            var _this = this;
            if(window.pbE){
                var CID = pbE.WT().wtGetCurrentConnectionCID();
                _this.userId = pbE.WT().wtGetYunTradeUserId(CID);//获取云交易的userId
                //这里会根据userId是否为空判断云条件单是否登录了交易，如果登录交易，可以直接进入条件单页面
                if(!_this.userId){
                    testUserId = null;//等于0代表未上传交易账号此时应该callback 102001
                }
            }
            _this.isTouchList(_this.pageSize);//已触发
        },
        updated:function(){
            //已触发
            Ps.initialize(document.getElementById('isList'), {
                frozen: true,
                wheelSpeed: 0.2
            });
        },
        methods:{
            //点击更多加载数据
            btnIsMoreInfo:function(){
                this.isTouchList(this.pageSize)
            },
            isTouchList:function(pageSize){
                var _this =  this;
                //已触发的列表
                $.ajax({
                    url:conditionUrl,
                    method:'post',
                    dataType:'json',
                    contentType:'application/json;charest=utf-8',
                    data:JSON.stringify({
                        func: isConTouch,
                        token: testToken,
                        id: id,
                        userID:_this.userId,
                        orgCode:_this.orgCode,
                        begin:_this.pageIsNum+"",
                        total:pageSize+"",
                        type:stopFiledType
                    }),
                    success:function(data){
                        if(data.status == 0){
                            $.each(data.data,function(key,value){
                                var list = JSON.parse(value.conditionValue);
                                _this.isTouchArray.push({
                                    hyName:value.HYMC,
                                    createTime:value.createTime,
                                    StopLossCheckPriceType:list.ConditionList[0].PositionStop.StopLossPrice,//止损参数
                                    StopProfitCheckPriceType:list.ConditionList[0].PositionStop.StopProfitPrice,//止盈参数
                                    Volume:list.AttachObject[0].Volume//数量
                                })
                            })
                            if(data.data.length) {//如果有记录就加载
                                _this.pageIsNum = _this.pageIsNum + 1;
                            } else {
                                _this.pullIsTouch = '已经没有更多';
                            }
                        }
                    },error:function(){
                        console.log("服务器异常！")
                    }
                })
            },
        }
    }
</script>