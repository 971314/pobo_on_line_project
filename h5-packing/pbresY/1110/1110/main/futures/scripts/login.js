//2016年11月24日14:43:36

define('futures/scripts/login.js', function(require, exports, module) {
	var pageId = '#login';
	var user_index = require("index");
	require('validatorUtils');
	var commonExt = require('commonExt');
	var common = require('common');
	var userService = require("futures/services/userService").getInstance();

	var mainConfig, contract, news;
	var pbHQ, pbSYS, pbINFO, pbZX;
	var isPoboApp = typeof pbE != "undefined";
	var HISTORY = 9;
	var SELF = 100;
	var HOT = 100;

	var serverAddr = 'https://pbmobile.pobo.net.cn/pobocertification_WebService/';
	var poboNumber = '123';
	var loginType = '1';
	var deviceId = '127.0.0.1';
	var orgNumber = '789'; //券商编号
	var FatherAccount = 'pobo';
	var OS = 'Android';
	var version = '1.0.0.1';
	var flag = 1;
	var setUserInfo;

	/**
	 * 全局变量定义start
	 */
	var tel;
	var pass;

	/**
	 * 初始化方法
	 */
	function init() {
		$("input").val("");

		if(isPoboApp) {
			pbHQ = pbE.HQ();
			pbSYS = pbE.SYS();
			pbINFO = pbE.INFO();
		} else {}

		if(typeof pbE != "undefined") {
			var deviceInfo1 = pbE.SYS().getDeviceJsonInfo();
			if(deviceInfo1) {
				var deviceInfo = JSON.parse(deviceInfo1);
				if(deviceInfo['71']) {
					deviceId = deviceInfo['71']; //客户端本机ip地址
				}
				if(deviceInfo['255']) { //平台
					var platNum = deviceInfo['255'];
					if(platNum == '2') {
						OS = 'iOS';
					} else if(platNum == '3') {
						OS = 'Android';
					}
				}
				if(deviceInfo['73']) {
					version = deviceInfo['73']; //版本号
				}
				if(deviceInfo['jgid']) {
					orgNumber = deviceInfo['jgid']; //机构代码/券商编号
				}
			}
		}

	}

	/*
	 * 页面事件绑定
	 */
	function bindPageEvent() {
		//绑定登录关闭按钮
		$.bindEvent($(pageId + " .close"), function() {
			window.location.href = 'goBack';
		});
		//绑定忘记密码
		$.bindEvent($(pageId + " #forget_password"), function() {
			window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/forgetPassword/findPassword1.html");
		});
		//快速手机注册
		$.bindEvent($(pageId + " #quick_login"), function() {
			window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/register.html");
		});
		/********************reg登录页面  **********************/
		//绑定忘记密码
		$.bindEvent($(pageId + " #forget_password1"), function() {
//			window.location.href="../main/futures/views/forgetPassword/findPassword1.html";
			window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/forgetPassword/findPassword1.html");
		});
		//快速手机注册
		$.bindEvent($(pageId + " #quick_login1"), function() {
//			window.location.href="../main/futures/views/register.html";
			window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/register.html");
		});
		/********************reg登录页面  **********************/
		
		$.bindEvent($(pageId + " .icon_eye"), function() {
			var input_type = $(pageId + " .icon_eye").parent().find("input").attr("type");
			if(input_type == 'password') {
				$(pageId + " .icon_eye").parent().find("input").attr({
					"type": "text"
				});
				$(this).css("background", "url(../images/ic_eyes_show.png) no-repeat center")
				$(this).css("background-size", "0.22rem");
			} else {
				$(pageId + " .icon_eye").parent().find("input").attr({
					"type": "password"
				});
				$(this).css("background", "url(../images/ic_eyes.png) no-repeat center")
				$(this).css("background-size", "0.22rem");
			}
		});
		//登录
		$.bindEvent($(pageId + " .disable"), function() {
			if(check_tel_pass()) {
				Login();
			};
		});
	}
	//校验用户名和密码
	function check_tel_pass() {
		tel = $.trim($(pageId + " .login_input").eq(0).find("input").val());
		if($.validatorUtils.isEmpty(tel)) {
			alert("请输入手机号");
			return false;
		}
		pass = $.trim($(pageId + " .login_input").eq(1).find("input").val());
		if($.validatorUtils.isEmpty(pass)) {
			alert("请输入登录密码");
			return false;
		}
		return true;
	}
	//登录
	function Login() {
		/******彭博登录 begin **************/
		var phone = $.trim($(pageId + " .login_input").eq(0).find("input").val()),
			pwd = $.trim($(pageId + " .login_input").eq(1).find("input").val());
		$.ajax({
			type: 'POST',
			url: serverAddr + 'login',
			data: {
				poboNumber: poboNumber,
				loginName: phone,
				loginType: loginType,
				pwd: pwd,
				orgNumber: orgNumber,
				deviceId: deviceId,
				OS: OS,
				version: version
			},
			dataType: 'json',
			success: function(data) {
				if(data.loginUser.returnFlag == 0) {
					/****************我们框架登录 begin*****************/
					data.loginUser.pwd = pwd;
					data.loginUser.loginName = phone;
					data.loginUser.loginType = loginType;
					setUserInfo = data.loginUser;
					//密码加密
					commonExt.rsaEncrypt({
							"login_pwd": $.trim($(pageId + " .login_input").eq(1).find("input").val())
						},
						function(paraMap) {
							//回调登录
							var login_param = {
								"poboNumber": poboNumber,
								"uid": data.loginUser.userId,
								"deviceId": deviceId,
								"OS": OS,
								"version": version,
								"token": data.loginUser.token,
								"address": "",
								"orgNumber": orgNumber,
								"istoken": "0",
								"login_mobile": $.trim($(pageId + " .login_input").eq(0).find("input").val()),
								"login_password": paraMap.login_pwd
							};
							userService.userLogin(login_param, function(resultVo) {
								if(resultVo.error_no == 0) {
									setTimeout(function() {
										pbE.SYS().sendMessageToNative('PbKey_H5_Home_Auth_Data', JSON.stringify(data.loginUser));
									}, 100);
									window.doShow = function(flag) {
										if(flag == '1') {
											user_index.login();
										} else {
											user_index.login();
										}
									}
									common.saveSessionUserInfo(resultVo.results);
//									window.open("pobo:uncheck=1&pageId=900004&title=我&url=main/futures/views/userInfo/index.html");
									window.location.href = 'goBack';
								} else {
									alert(resultVo.error_info);
								}
							}); //{"isShowWait":false}
						});
					/****************我们框架登录 end*****************/

				} else if(data.loginUser.returnFlag == 2) {
					alert("账号或密码有误，请修改后重试");
				} else {
					alert("发送失败，请稍后重试");
				}
			},
			error: function() {
				alert("连接超时，请检查网络后重试");
			}
		});

		/******彭博登录 end **************/

	}
	/**
	 * 页面跳转后销毁方法
	 */
	function destroy() {}

	/**
	 * 页面返回方法
	 */
	function pageBack() {}

	/**
	 * 页面效果执行完毕方法
	 *
	 */
	function load() {}

	var index = {
		init: init,
		bindPageEvent: bindPageEvent,
		destroy: destroy,
		pageBack: pageBack,
		load: load
	};

	module.exports = index;
});