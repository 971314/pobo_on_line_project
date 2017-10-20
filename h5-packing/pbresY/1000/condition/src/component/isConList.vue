<template>
  <div>
    <img @click="refresh" :src="refreshImg" style="position: fixed; top: 15px; right: 17px; width: 18px; height: 18px; z-index: 1030;">
    <div class="warCon refreshContent">
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
                        <th>条件</th>
                        <th>条件单名称</th>
                        <th>创建时间</th>
                        <!--<th>备注</th>-->
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div  id="isList" class="bottom">
            <div class="TbodyInner">
                <table class="brief static" v-if="isConTouchListObj">
                    <tbody>
                    <tr  v-for="(data,i) in isConTouchListObj" :key="i">
                        <td >
                            {{data.HYDM ? data.HYDM : '----'}}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="detailOuter">
                    <table class="detail"  v-if="isConTouchListObj" >
                        <tbody>
                        <tr v-for="(data,i) in isConTouchListObj" :key="i">
                            <td>{{data.touchTime ? data.touchTime : '---'}}</td>
                            <td>{{data.type == 1 ? '价格' : '时间'}}</td>
                            <td> {{data.name}} </td>
                            <td>{{data.createTime}}</td>
                            <!--<td>&#45;&#45;&#45;&#45;</td>-->
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div style="clear: both"></div>
        <div class="moreInfo" @click="btnIsMoreInfo" :class="{hide: isConTouchListObj.length < 20}">
        {{pullIsTouch}}
        </div>
    </div>
  </div>
</template>
<script>
//    var testUserId = "10023";//云交易userId;
    export default{
        data:function(){
            return{
                pageSize:20,//一页20条
                token:testToken,//t认证的oken
                authId:testId,//认证的id
                userId:null,//云交易userId
                orgCode:orgCode,//机构编号
                isConTouchListObj:[],//存放已触发的列表数据
                pullIsTouch:'点击加载更多',
                CID:'',
                pageIsNum:0,
                refreshImg: '../images/refresh.png',
                refreshing: false
            }
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
            if(window.pbE){
                _this.CID = pbE.WT().wtGetCurrentConnectionCID();
                if(_this.CID <= 0){
                    window.location.href='pobo:uncheck=1&pageId=802005';
                }else{
                    _this.userId = pbE.WT().wtGetYunTradeUserId(_this.CID);//获取云交易的userId
                    //已触发的列表
                    this.isTouchList(this.pageSize);
                    //这里会根据userId是否为空判断云条件单是否登录了交易，如果登录交易，可以直接进入条件单页面
                    if(!_this.userId){
                        _this.userId = null;//等于0代表未上传交易账号此时应该callback 102001
                    }
                }
            }
        },
        updated:function(){
                //已触发滚动
                Ps.initialize(document.getElementById('isList'), {
                    frozen: true,
                    wheelSpeed: 0.4
                });
        },
        methods:{
            //已触发的列表
            isTouchList:function(pageSize, pageIsNum){
                var _this = this;
                circleShowPass("正在加载");//显示转圈
                $.ajax({
                    url: conditionUrl,
                    method: 'post',
                    dataType: 'json',
                    contentType: 'application/json;charest=utf-8',
                    data: JSON.stringify({
                        func: isConTouch,
                        token:  _this.token,
                        id: _this.authId,
                        userID: _this.userId,
                        orgCode:_this.orgCode,
                        begin: pageIsNum+"",
                        total:pageSize+"",
                        type: contractType,
                        os:os
                    }),
                    success: function (data) {
                        if (data.status == 0) {
                            circleHidePass();
                            //console.log(data)
                            //  console.log(JSON.parse(data.data[0].conditionValue))
                            _this.isConTouchListObj = [];
                            _this.pageIsNum = 0;
                            $.each(data.data,function(key,value){
                                var type=JSON.parse(value.conditionValue).ConditionChoiced;
                                var list;
                                if(type == 2 ){//时间
                                    list = JSON.parse(value.conditionValue).ConditionList[1].Time
                                }
                                _this.isConTouchListObj.push({
                                    createTime:value.createTime,
                                    HYDM:value.HYMC,
                                    type:JSON.parse(value.conditionValue).TimeCondition,
                                    //type:value.ConditionChoiced,
                                    name:value.name,//条件单名称
                                    touchTime:value.triggerTime
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
                    }, error: function () {
                        circleHidePass();
                        console.log("服务器异常！")
                    }
                })
            },
            //点击加载更多
            btnIsMoreInfo:function(){
                this.isTouchList(this.pageSize, this.pageIsNum)
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