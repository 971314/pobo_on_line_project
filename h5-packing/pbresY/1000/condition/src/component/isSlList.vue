<template>
  <div>
    <img @click="refresh" :src="refreshImg" style="position: fixed; top: 15px; right: 17px; width: 18px; height: 18px; z-index: 1030;">
    <div class="warCon refreshContent" id="refreshIsContent">
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
                    <tr  v-for="(data,i) in isTouchArray" data-toggle="modal" :key="i">
                        <td >
                            {{data.hyName ? data.hyName : '----'}}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="detailOuter">
                    <table class="detail"  v-if="isTouchArray" >
                        <tbody>
                        <tr v-for="(data,i) in isTouchArray" :key="i">
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
  </div>
</template>
<script>
//    var testUserId = "10025";//云交易userId;
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
                userId:null,
                refreshImg: '../../images/refresh.png',
                refreshing: false,
                CID:'',
                os:''//系统
            }
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
                    _this.isTouchList(_this.pageSize, _this.pageIsNum);//已触发
                    //这里会根据userId是否为空判断云条件单是否登录了交易，如果登录交易，可以直接进入条件单页面
                    if(!_this.userId){
                        _this.userId = null;//等于0代表未上传交易账号此时应该callback 102001
                    }
                }
            }
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
                this.isTouchList(this.pageSize, this.pageIsNum)
            },
            isTouchList:function(pageSize, pageIsNum){
                circleShowPass("正在加载");
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
                        begin:pageIsNum+"",
                        total:pageSize+"",
                        type:stopFiledType,
                        os:_this.os
                    }),
                    success:function(data){
                        if(data.status == 0){
                            circleHidePass();
                            _this.isTouchArray = [];
                            _this.pageIsNum = 0;
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
                        }else{
                            circleHidePass();
                            alert(data.msg);
                        }
                    },error:function(){
                        circleHidePass();
                        alert("服务器异常！");
                        console.log("服务器异常！")
                    }
                })
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
                _this.isTouchList(_this.pageSize, 0);
              }
            }
        }
    }
</script>