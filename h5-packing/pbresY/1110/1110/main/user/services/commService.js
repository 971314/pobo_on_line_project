//2016-3-30 16:35:55

define('user/services/commService.js', function(require, exports, module) {
    var constants = require("constants"); //常量工具类
    //构造方法
    function CommService() {
        this.service = new $.service;
    }


    //用于存储h5提交请求给原生所有请求对象
    var flowNoMap = {};
    //暴露方法供原生调用H5方法(传回服务器返回数据结果集)
    var nativeRequestCallback = function(flowNo, resultVo) {
        $.hidePreloader();
        if (resultVo.error_no == 0) {
            flowNoMap[flowNo](resultVo.results);
        } else {
            $.alert(resultVo.error_msg);
        }
        delete flowNoMap[flowNo];
    };

    //此方法由原生定义
    window.httpsCallback = nativeRequestCallback;

    /********************************公共代码部分********************************/
    CommService.prototype.commonInvoke = function(reqParamVo, callback, ctrlParam) {
        /** 唯一码 star  **/
        var paraMap = reqParamVo.obj.reqParam;
        if (paraMap) {
            var client_id = "";
            if ($.config.platform == constants.platform.PLATFORM_PC) {
                client_id = $.getSStorageInfo("client_id", true);
            } else {
                var result = $.callMessage({
                    "funcNo": "50043",
                    "key": "client_id"
                });
                client_id = result.results[0].value;
            }
            paraMap["client_id"] = client_id;
        }
        reqParamVo.setReqParam(paraMap);
        /** 唯一码 end  **/

        //ctrlParam["isShowWait"] = false;
        ctrlParam = ctrlParam ? ctrlParam : {};
        reqParamVo.setIsLastReq(ctrlParam.isLastReq);
        reqParamVo.setIsAsync(ctrlParam.isAsync);
        reqParamVo.setIsShowWait(ctrlParam.isShowWait);
        reqParamVo.setTimeOutFunc(ctrlParam.timeOutFunc);
        reqParamVo.setErrorFunc(ctrlParam.errorFunc);
        reqParamVo.setIsShowOverLay(ctrlParam.isShowOverLay);
        reqParamVo.setTipsWords(ctrlParam.tipsWords);
        reqParamVo.setDataType(ctrlParam.dataType);
        reqParamVo.setIsGlobal(ctrlParam.isGlobal);
        reqParamVo.setProtocol(ctrlParam.protocol);
        reqParamVo.setCacheTime(ctrlParam.cacheTime);
        reqParamVo.setCacheType(ctrlParam.cacheType);
        reqParamVo.setReqType(ctrlParam.reqType);
        if ($.config.isFordHttpReq == 1 && $.config.platform != 0) //页面将请求发送给原生app(平台为0情况下)
        {
            var flowNo = (Math.random() + "").substring(2, 10);
            flowNoMap[flowNo] = callback;
            if (reqParamVo.obj.isShowWait) {
                $.showPreloader();
            }
            require.async('nativePluginService', function(nativePluginService) {
                nativePluginService.function50118(reqParamVo.obj.url, reqParamVo.obj.reqParam, flowNo, reqParamVo.reqType, 30);
            });

        } else {
            this.service.invoke(reqParamVo, callback);
        }
    };

    /**
     * 查询用户自定义的快捷功能
     * @param param
     * @param callback
     * @param ctrlParam
     */
    CommService.prototype.getQuickChannel = function(param, callback, ctrlParam) {
        var paraMap = {};
        paraMap["funcNo"] = "11093201";
        paraMap["module_type"] = param.module_type;
        var reqParamVo = this.service.reqParamVo;
        reqParamVo.setUrl($.config.global.serverPath);
        reqParamVo.setReqParam(paraMap);
        this.commonInvoke(reqParamVo, callback, ctrlParam);
    };

    /**
     * 查询公司公告
     * @param param
     * @param callback
     * @param ctrlParam
     */
    CommService.prototype.getAnnouncement = function(param, callback, ctrlParam) {
        var paraMap = {};
        paraMap["funcNo"] = "1109801";
        paraMap["token"] = param.token;
        paraMap["category_id"] = param.category_id;
        paraMap["pageNum"] = param.pageNum;
        paraMap["pageSize"] = param.pageSize;
        var reqParamVo = this.service.reqParamVo;
        reqParamVo.setUrl($.config.global.serverPath);
        reqParamVo.setReqParam(paraMap);
        this.commonInvoke(reqParamVo, callback, ctrlParam);
    };

    /**
     * 查询首页banner
     * @param param
     * @param callback
     * @param ctrlParam
     */
    CommService.prototype.getBannerAdvertise = function(param, callback, ctrlParam) {
        var paraMap = {};
        paraMap["funcNo"] = "1109300";
        var reqParamVo = this.service.reqParamVo;
        reqParamVo.setUrl($.config.global.serverPath);
        reqParamVo.setReqParam(paraMap);
        this.commonInvoke(reqParamVo, callback, ctrlParam);
    };

    /**
     * 释放操作
     */
    CommService.prototype.destroy = function() {
        this.service.destroy();
    };
    /**
     * 实例化对象
     */
    function getInstance() {
        return new CommService();
    }

    var commService = {
        "getInstance": getInstance
    };
    module.exports = commService;
});
