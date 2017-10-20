/**
 * 手机前端service层调用接口
 **/
define('futures/services/commService.js',function(require,exports,module){
	//构造方法
	function CommService(){
		this.service = new $.service;
	}


	//用于存储h5提交请求给原生所有请求对象
	var flowNoMap = {};
	//暴露方法供原生调用H5方法(传回服务器返回数据结果集)
	var nativeRequestCallback  = function (flowNo,resultVo){
		$.hidePreloader();
		if(resultVo.error_no == 0)
		{
			flowNoMap[flowNo](resultVo.results);
		}else{
			$.alert(resultVo.error_msg);
		}
         delete flowNoMap[flowNo];
	};

	//此方法由原生定义
    window.httpsCallback  = nativeRequestCallback;

	/********************************公共代码部分********************************/
    CommService.prototype.commonInvoke = function(reqParamVo,callback, ctrlParam){
		ctrlParam = ctrlParam?ctrlParam:{};
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
		if($.config.isFordHttpReq == 1 && $.config.platform != 0)//页面将请求发送给原生app(平台为0情况下)
		{
			var flowNo = (Math.random()+"").substring(2,10);
			flowNoMap[flowNo] = callback;
			if(reqParamVo.obj.isShowWait){
	            $.showPreloader();
	        }
	        require.async('nativePluginService',function(nativePluginService){
	        	nativePluginService.function50118(reqParamVo.obj.url,reqParamVo.obj.reqParam,flowNo,reqParamVo.reqType,30);
	        });

		}else
		{
			this.service.invoke(reqParamVo, callback);
		}

	};


	/********************************应用接口开始********************************/




	/**
	 * 功能号	1109005
	 * 查看手机号是否被登陆了
	 * @return 接口的响应数据
	 */
	CommService.prototype.getRSAKey = function(param,callback,ctrlParam)
    {
	  var paraMap = param || {};
		paraMap["funcNo"] = "1109005";
		// paraMap["login_mobile"] = param.login_mobile;
		// paraMap["login_password"] = param.login_password;
		var reqParamVo = this.service.reqParamVo;
		reqParamVo.setUrl($.config.global.serverPath);
		reqParamVo.setReqParam(paraMap);
		this.commonInvoke(reqParamVo, callback, ctrlParam);
    };

		/**
		 * 功能号	1109005
		 * 查看手机号是否被登陆了
		 * @return 接口的响应数据
		 */
		CommService.prototype.getAppVersion = function(param,callback,ctrlParam)
	    {
		  var paraMap = param || {};
			paraMap["funcNo"] = "1109013";
			// paraMap["login_mobile"] = param.login_mobile;
			// paraMap["login_password"] = param.login_password;
			var reqParamVo = this.service.reqParamVo;
			reqParamVo.setUrl($.config.global.serverPath);
			reqParamVo.setReqParam(paraMap);
			this.commonInvoke(reqParamVo, callback, ctrlParam);
	    };
   /********************************应用接口结束********************************/



    /**
	 * 释放操作
	 */
	CommService.prototype.destroy = function(){
		this.service.destroy();
	};

    /**
	 * 实例化对象
	 */
	function getInstance(){
		return new CommService();
	}

	var commService = {
		"getInstance" : getInstance
	};

	module.exports = commService;


});
