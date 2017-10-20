//2016年11月24日14:43:36

define('futures/scripts/userInfo/index.js', function(require, exports, module) {
	var pageId = '#userInfo_index ';
	var common = require('common');
	require('validatorUtils');
	var loading_img = require("futures/scripts/common/imgloading");
	var userService = require("futures/services/userService").getInstance();

	/**
	 * 全局变量声明
	 */
	var user;
	var checkParam = {
		"fromPage": "userInfo/index",
		"openHref": ""
	}

	var contract, contractInterval, prevCustom, navScroll, newsData, newsCurrent, prevConfig;

	var mainConfig;
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
	var timer;
	/**
	 * 初始化方法
	 */
	function init() {
		timer = setInterval(function() {
			window.reload = function() {
				login();
			}
		}, 300);

		window.doShow = function(flag) {
			timer = setInterval(function() {
				var token = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token'); //获取令牌：
				if($.validatorUtils.isNotEmpty(token)) {
					login();
				}
			}, 1000);
		}
		if(isPoboApp) {
			pbHQ = pbE.HQ();
			pbSYS = pbE.SYS();
			pbZX = pbE.ZX();
			pbINFO = pbE.INFO();
		} else {}
		login();
	}

	function login() {
		if($.validatorUtils.isNotEmpty(pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token'))) {
			/***********静默登录  begin****************/
			var loginName = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName'); //获取登录名：
			var token = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token'); //获取令牌：
			var uid = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId'); //获取用户ID：
			var orgNumber;
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
			var data = {
				"poboNumber": poboNumber,
				"uid": uid,
				"deviceId": deviceId,
				"OS": OS,
				"vsersion": version,
				"token": token,
				"address": "",
				"istoken": "1",
				"orgNumber": orgNumber,
				"login_mobile": loginName
			};
			userService.userLogin(data, function(resultVo) {
				if(resultVo.error_no == 0) {
					var result = resultVo.result;
					if($.validatorUtils.isNotEmpty(resultVo.results[0].user_icon)) {
						$(pageId + " #face_image").attr("src", $.config.global.domain + resultVo.results[0].user_icon);
					}else{
						$(pageId + " #face_image").attr("src", "../../images/user_img.png");
					}
					$(pageId + " .cs").text(resultVo.results[0].mobile_phone);
					$(pageId + " #loginStart1").css('display', 'none');
					$(pageId + " #loginStart2").css('display', 'block');
					common.saveSessionUserInfo(resultVo.results);
				} else {
					$(pageId + " #loginStart2").css('display', 'none');
					$(pageId + " #loginStart1").css('display', 'block');
				}
			}, {
				"isShowWait": false
			});
			/***********静默登录  end******************/
		} else {
			$(pageId + " #loginStart2").css('display', 'none');
			$(pageId + " #loginStart1").css('display', 'block');
		}
	}

	/*
	 * 页面事件绑定
	 */
	function bindPageEvent() {
		//绑定登录按钮
		$.bindEvent($(pageId + " .login_btn"), function() {
			window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/login.html");
		});
		//绑定注册按钮
		$.bindEvent($(pageId + " .reg_link"), function() {
			window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/register.html");
		});

		//绑定点击修改图标
		$.bindEvent($(pageId + " .pic, .head_edit"), function() {
			checkParam.openHref = "pobo:uncheck=1&pageId=900005&url=main/futures/views/userInfo/setUserInfo.html";
			common.isLogin(checkParam);
		});

		//绑定交易设置按钮
		$.bindEvent($(pageId + " #transaction_setting_index"), function() {
				checkParam.openHref = "pobo:uncheck=1&pageId=805006";
				common.isLogin(checkParam);
			})
			//绑定系统设置按钮
		$.bindEvent($(pageId + " #system_setting_index"), function() {
				checkParam.openHref = "pobo:uncheck=1&pageId=805007";
				common.isLogin(checkParam);
			})
			//绑定我的收藏按钮
		$.bindEvent($(pageId + " #my_collection_index"), function() {
			checkParam.openHref = "pobo:uncheck=1&pageId=900005&url=main/futures/views/userInfo/myCollection.html";
			common.isLogin(checkParam);
		});
		//绑定消息推送按钮
		$.bindEvent($(pageId + " #message_push_index"), function() {
			checkParam.openHref = "pobo:uncheck=1&pageId=905003";
			common.isLogin(checkParam);
		});
		//绑定意见反馈按钮
		$.bindEvent($(pageId + " #opinoin_feedback_index"), function() {
			window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/userInfo/opinoinFeedback.html");
		});
		//绑定关于我们按钮
		$.bindEvent($(pageId + " #about_Us_index"), function() {
			window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/aboutUser/index.html");
		});
	}

	/**
	 * 公用方法
	 */
	function update_info() {
		if($.validatorUtils.isNotEmpty(user)) {
			window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/userInfo/index.html");
		} else {
			window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/login.html");
		}
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
		load: load,
		login: login
	};
	module.exports = index;
});