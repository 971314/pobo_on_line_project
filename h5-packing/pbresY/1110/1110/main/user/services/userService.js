/**
 * 手机前端service层调用接口
 **/
define('user/services/userService.js', function(require, exports, module) {
	//构造方法
	function UserService() {
		this.service = new $.service;
	}

	//用于存储h5提交请求给原生所有请求对象
	var flowNoMap = {};
	//暴露方法供原生调用H5方法(传回服务器返回数据结果集)
	var nativeRequestCallback = function(flowNo, resultVo) {
		$.hidePreloader();
		if(resultVo.error_no == 0) {
			flowNoMap[flowNo](resultVo.results);
		} else {
			$.alert(resultVo.error_msg);
		}
		delete flowNoMap[flowNo];
	};

	//此方法由原生定义
	window.httpsCallback = nativeRequestCallback;

	/********************************公共代码部分********************************/
	UserService.prototype.commonInvoke = function(reqParamVo, callback, ctrlParam) {
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
		if($.config.isFordHttpReq == 1 && $.config.platform != 0) //页面将请求发送给原生app(平台为0情况下)
		{
			var flowNo = (Math.random() + "").substring(2, 10);
			flowNoMap[flowNo] = callback;
			if(reqParamVo.obj.isShowWait) {
				$.showPreloader();
			}
			require.async('nativePluginService', function(nativePluginService) {
				nativePluginService.function50118(reqParamVo.obj.url, reqParamVo.obj.reqParam, flowNo, reqParamVo.reqType, 30);
			});

		} else {
			this.service.invoke(reqParamVo, callback);
		}

	};

	/********************************应用接口开始********************************/
	/**
	 * 功能号	1109000
	 * 查看手机号是否被登陆了
	 * @return 接口的响应数据
	 */
	UserService.prototype.CheckPhoneNumber = function(param, callback, ctrlParam) {
		var paraMap = param || {};
		paraMap["funcNo"] = "1109000";
		// paraMap["login_mobile"] = param.login_mobile;
		// paraMap["login_password"] = param.login_password;
		var reqParamVo = this.service.reqParamVo;
		reqParamVo.setUrl($.config.global.serverPath);
		reqParamVo.setReqParam(paraMap);
		this.commonInvoke(reqParamVo, callback, ctrlParam);
	};

	/**
	 * 功能号	1109008
	 * 校验图形验证码
	 * @return 接口的响应数据
	 */
	UserService.prototype.CheckGraphicalCode = function(param, callback, ctrlParam) {
		var paraMap = param || {};
		paraMap["funcNo"] = "1109008";
		// paraMap["login_mobile"] = param.login_mobile;
		// paraMap["login_password"] = param.login_password;
		var reqParamVo = this.service.reqParamVo;
		reqParamVo.setUrl($.config.global.serverPath);
		reqParamVo.setReqParam(paraMap);
		this.commonInvoke(reqParamVo, callback, ctrlParam);
	};

	/**
	 * 功能号	1109001
	 * 注册
	 * @return 接口的响应数据
	 */
	UserService.prototype.registerUser = function(param, callback, ctrlParam) {
		var paraMap = param || {};
		paraMap["funcNo"] = "1109001";
		var reqParamVo = this.service.reqParamVo;
		reqParamVo.setUrl($.config.global.serverPath);
		reqParamVo.setReqParam(paraMap);
		this.commonInvoke(reqParamVo, callback, ctrlParam);
	};
	//登录
	UserService.prototype.userLogin = function(param, callback, ctrlParam) {
			var paraMap = param || {};
			paraMap["funcNo"] = "11090061";
			var reqParamVo = this.service.reqParamVo;
			reqParamVo.setUrl($.config.global.serverPath);
			reqParamVo.setReqParam(paraMap);
			this.commonInvoke(reqParamVo, callback, ctrlParam);
		}
		//找回密码（重置密码）
	UserService.prototype.resetPassword = function(param, callback, ctrlParam) {
		var paraMap = param || {};
		paraMap["funcNo"] = "1109004";
		var reqParamVo = this.service.reqParamVo;
		reqParamVo.setUrl($.config.global.serverPath);
		reqParamVo.setReqParam(paraMap);
		this.commonInvoke(reqParamVo, callback, ctrlParam);
	}

	UserService.prototype.resetPasswordByUserId = function(param, callback, ctrlParam) {
		var paraMap = param || {};
		paraMap["funcNo"] = "1109011";
		var reqParamVo = this.service.reqParamVo;
		reqParamVo.setUrl($.config.global.serverPath);
		reqParamVo.setReqParam(paraMap);
		this.commonInvoke(reqParamVo, callback, ctrlParam);
	}
	UserService.prototype.opinion = function(param, callback, ctrlParam) {
			var paraMap = param || {};
			paraMap["funcNo"] = "1109800";
			var reqParamVo = this.service.reqParamVo;
			reqParamVo.setUrl($.config.global.serverPath);
			reqParamVo.setReqParam(paraMap);
			this.commonInvoke(reqParamVo, callback, ctrlParam);
		}
		/********************************应用接口结束********************************/

	/**
	 * 释放操作
	 */
	UserService.prototype.destroy = function() {
		this.service.destroy();
	};

	/**
	 * 实例化对象
	 */
	function getInstance() {
		return new UserService();
	}

	var userService = {
		"getInstance": getInstance
	};

	module.exports = userService;

});