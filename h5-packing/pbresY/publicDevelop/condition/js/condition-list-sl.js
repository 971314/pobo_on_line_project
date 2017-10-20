/**
 * Created by xiajing on 2016/12/16.
 * 止损止盈列表
 */
var refreshScroll;//未触发
var refreshIsScroll;//已触发
var loadingStep = 0;//未触发
var loadingIsStep = 0;//已触发
var pullUpEl;
new Vue({
    el:'#stopOfFiled',
    data:{
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
        orgCode:'1258',//机构编号
    },
    created:function(){
        var _this = this;
        _this.noneTouchList(_this.pageSize);//未触发
        _this.isTouchList(_this.pageSize);//已触发
    },
    updated:function(){
        pullUpEl = document.getElementById('pullUp');
        var _this = this;
        if(_this.stopNoneTouchShow ==  true){
            //未触发
            Ps.initialize(document.getElementById('noneList'), {
                frozen: true,
                wheelSpeed: 0.3
            });
            //已触发
            Ps.initialize(document.getElementById('isList'), {
                frozen: true,
                wheelSpeed: 0.3
            });
        }

    },
        methods:{
        //点击未触发的每条记录获取信息
        conNoneClick: function (conditionID, flag1, flag3) {
            console.log(conditionID,flag1,flag3)
            this.conNoneTouchObj = {
                conditionID: conditionID,
                clientFlag: flag1,
                serverFlag: flag3
            }
            console.log(this.conNoneTouchObj)
        },
        noneTouchList:function(pageSize){
            var _this = this;
            //未触发列表信息
            $.ajax({
                url:getList()+/\/\.json/,
                dataType:'json',
            }).done(function(data){
                console.log(data.stopIsTouchArray)
                _this.stopIsTouchArray = data.stopIsTouchArray
            })
            $.ajax({
                url:conditionUrl,
                method:'post',
                dataType:'json',
                async:true,
                contentType:'application/json;charest=utf-8',
                data:JSON.stringify({
                    func: noneConTouch,
                    token: testToken,
                    id: id,
                    userID:10001,
                    orgCode:_this.orgCode,
                    begin:1,
                    total:10000,
                    type:stopFiledType
                }),
                success:function(data){
                    //console.log(data)
                    if(data.status == 0){
                        $.each(data.data,function(key,value){
                            var list = JSON.parse(value.conditionValue);
                            _this.stopIsTouchArray.push({
                                conditionID:value.conditionID,
                                flag1:value.flag1,
                                flag3:value.flag3,
                                hyName:value.HYDM,
                                market:  list.Contracts[0].ExchangeCode,
                                code:   list.Contracts[0].ContractCode,
                                StopLossCheckPriceType:list.ConditionList[0].PositionStop.StopLossPrice,//止损参数
                                StopProfitCheckPriceType:list.ConditionList[0].PositionStop.StopProfitPrice,//止盈参数
                                Volume:list.AttachObject[0].Volume//数量
                            })
                        })
                    }
                },error:function(){
                    console.log("服务器异常！")
                }
            })
        },
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
                        userID:10001,
                        orgCode:_this.orgCode,
                        begin:_this.pageIsNum,
                        total:pageSize,
                        type:stopFiledType
                    }),
                    success:function(data){
                        if(data.status == 0){
                            $.each(data.data,function(key,value){
                                var list = JSON.parse(value.conditionValue);
                                _this.isTouchArray.push({
                                    hyName:value.HYDM,
                                    createTime:value.createTime,
                                    StopLossCheckPriceType:list.ConditionList[0].PositionStop.StopLossPrice,//止损参数
                                    StopProfitCheckPriceType:list.ConditionList[0].PositionStop.StopProfitPrice,//止盈参数
                                    Volume:list.AttachObject[0].Volume//数量
                                })
                            })
                        }
                        if(data.data.length) {//如果有记录就加载
                            _this.pageIsNum = _this.pageIsNum + 1;
                        } else {
                            _this.pullIsTouch = '已经没有更多';
                        }
                    },error:function(){
                        console.log("服务器异常！")
                    }
                })
            },
        stopFiledClick:function(flag){
            var _this = this;
            if(flag == 0){//未触发初始
                _this.stopFiledNoTuch = true;
                _this.stopFiledIsTuch = true;
                _this.stopNoneTouchShow = true;
                _this.stopIsTouchShow = false;
            }
            if(flag == 1){//已触发初始
                _this.stopFiledNoTuch = false;
                _this.stopFiledIsTuch = false;
                _this.stopNoneTouchShow = false;
                _this.stopIsTouchShow = true;
            }
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
                        type: type,
                        orgCode:_this.orgCode,
                        conditionID: _this.conNoneTouchObj.conditionID,//条件点编号
                    }),
                    success: function (data) {
                        if (data.status == 0) {
                            _this.noneTouchList(_this.pageSize);
                            if (type == 1) {
                                console.log("暂停成功！")
                            }
                            if (type == 2) {
                                console.log("运行成功！")
                            }
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
                        userID: 10001,
                        type: stopFiledType,
                        data: [_this.conNoneTouchObj.conditionID],//条件点编号
                    }),
                    success: function (data) {
                        //缓存信息 并跳转页面
                        saveStorageInfo("stopOfFiledObj",data.data)
                        window.location.href = 'feture-eidt-stop-filed.html';//跳转至编辑页面
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
                    }),
                    success: function (data) {
                        if (data.status == 0) {
                            _this.noneTouchList(_this.pageSize);
                            console.log("删除成功！")
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
                        data: [_this.conNoneTouchObj.conditionID],//条件点编号
                    }),
                    success: function (data) {
                        if (data.status == 0) {
                            _this.noneTouchList(_this.pageSize);
                            console.log("删除成功！")
                        }
                    }, error: function () {
                        console.log("服务器异常！")
                    }
                })
            }
        }
    }
})