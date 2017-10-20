//2016年11月24日14:43:36

define('futures/scripts/forgetPassword/findPassword2.js', function(require, exports, module) {
	var pageId = '#forgetPassword_findPassword2 ';
	require("2.0.0/js/plugins/validator/scripts/validatorUtils"); //校验
	var commonExt = require("commonExt");
	var common = require('common');
	var userService = require("futures/services/userService").getInstance();

	var serverAddr = 'https://pbmobile.pobo.net.cn/pobocertification_WebService/';
	var loginType = '1';
	var userId;
	var poboNumber = '123';
	var deviceId = '127.0.0.1';
	var FatherAccount = 'pobo';
	var OS = 'iOS';
	var version = '1.0.0';
	var orgNumber = '789';

	var contract, contractInterval, prevCustom, navScroll, newsData, newsCurrent, prevConfig;
	var mainConfig;
	var pbHQ, pbSYS, pbINFO, pbZX;
	var isPoboApp = typeof pbE != "undefined";
	var HISTORY = 9;
	var SELF = 100;
	var HOT = 100;
	var setUserInfo;

	var countdown = 60;
	var mobile;
	var timer;
	/**
	 * 初始化方法
	 */
	function init() {
		mobile = $.getPageParam("mobile");

		if(isPoboApp) {
			pbHQ = pbE.HQ();
			pbSYS = pbE.SYS();
			pbZX = pbE.ZX();
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

		if($.validatorUtils.isEmpty(mobile)) {
			//发送验证码按钮置为不可用
			$(pageId + " #get_code").attr("class", "code_btn1");
		}
	}

	/*
	 * 页面事件绑定
	 */
	function bindPageEvent() {
		//绑定返回键
		$.bindEvent($(pageId + " .icon_back"), function() {
			window.location.href = 'goBack';
		});

		//发送验证码事件
		$.bindEvent($(pageId + " .code_btn"), function() {
			/***************彭博发送验证码 begin*********************/
			var phone = mobile;
			$.ajax({
				type: 'POST',
				url: serverAddr + 'getOtp',
				data: {
					poboNumber: poboNumber,
					loginName: phone,
					loginType: loginType,
					deviceId: deviceId,
					orgNumber: orgNumber
				},
				dataType: 'json',
				success: function(data) {
					if(data.findByPhone.returnFlag == 0) {
						alert("发送成功");
						userId = data.findByPhone.userId;
						countdown = 60;
						settime($(pageId + " .code_btn"));
					}
				},
				error: function() {
					alert("连接超时，请检查网络后重试");
				}
			});
			/***************彭博发送验证码  end*********************/
		});

		//重置密码
		$.bindEvent($(pageId + " #reset_btn"), function() {
			//校验短信验证码
			if($.validatorUtils.isEmpty($.trim($(pageId + " #message_code").val()))) {
				alert("短信验证码不能为空");
				return;
			}
			if($.trim($(pageId + " #message_code").val()).length < 4) {
				alert("短信验证码不正确");
				return;
			}
			//校验密码
			var pwd = $.trim($(pageId + " #password").val());
			var re_pwd = $.trim($(pageId + " #reset_password").val());
			//校验密码格式
			if(pwd.length < 7 && pwd.length > 20) {
				alert("密码必须是8-20位字母和数字的组合");
				return;
			}
			if(pwd.length < 8 || pwd.length > 20) {
				if(pwd.length == 0) {
					alert("密码不能为空");
					return;
				}
				alert("密码必须是8-20位字母和数字的组合");
				return;
			} else {
				var flag = 0;
				for(var i = 0; i < pwd.length; i++) {
					if(pwd[i].match(/^[a-zA-z]+$/)) {
						flag = flag + 1;
						break;
					}
				}
				for(var i = 0; i < pwd.length; i++) {
					if(pwd[i].match(/^\d+$/)) {
						flag = flag + 1;
						break;
					}
				}
				if(flag != 2) {
					alert("登录密码只能是数字和字母组合");
					return;
				}
			}
			if(pwd == re_pwd) {
				var param = {
					"login_password": pwd,
					"login_password_twice": re_pwd
				};
				resetPassword(param);
			} else {
				alert("两次密码不一致");
			}
		});
	}

	function settime(obj) {
		if(countdown == 0) {
			obj.text("获取验证码");
			obj.attr("class", "code_btn");
			return;
		} else {
			obj.attr("class", "code_btn1");
			obj.text("重新发送(" + countdown + ")");
			countdown--;
		}
		timer = setTimeout(function() {
			settime(obj);
		}, 1000)

	}

	//回调重置方法
	function resetPassword(param) {
		/***************彭博重置密码  begin*******************/
		var phone = mobile,
			code = $.trim($('#message_code').val()),
			pwd = param.login_password,
			cfm = param.login_password_twice;
		$.ajax({
			type: 'POST',
			url: serverAddr + 'changePwd',
			data: {
				poboNumber: poboNumber,
				loginName: phone,
				loginType: loginType,
				pwd: pwd,
				uid: userId,
				orgNumber: orgNumber,
				deviceId: deviceId,
				OS: OS,
				version: version,
				OTP: code
			},
			dataType: 'json',
			success: function(data) {
				if(data.loginUser.returnFlag == 0) {
					data.loginUser.pwd = pwd;
					data.loginUser.loginName = phone;
					data.loginUser.loginType = loginType;
					setUserInfo = data.loginUser;
					// 密码加密
					commonExt.rsaEncrypt(param, function(paraMap) {
						var find_param = {
							"mobile_phone": mobile,
							"login_password": paraMap.login_password,
							"login_password_twice": paraMap.login_password_twice
						};
						userService.resetPassword(find_param, function callback(resultVo) {
							if(resultVo.error_no == 0) {
								if(common.getEquipmentType() == "Android") {
									setTimeout(function() {
										pbE.SYS().sendMessageToNative('PbKey_H5_Home_Auth_Data', JSON.stringify(setUserInfo));
									}, 1000);
									window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/login.html");
									window.location.href = "close";
								} else {
									window.location.href = "pobo:uncheck=1&pageId=900005&url=main/futures/views/login.html";
								}

								//								setTimeout(function() {
								//pbE.SYS().sendMessageToNative('PbKey_H5_Home_Auth_Data', JSON.stringify(setUserInfo));
								//								}, 1000);

								//								window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/login.html");
							} else {
								alert(resultVo.error_info);
							}
						});
					});
				} else if(data.loginUser.returnFlag == 8) {
					alert("校验码错误，请重新获取");
				} else if(data.loginUser.returnFlag == 11) {
					alert("该用户尚未注册");
				} else {
					alert("发送失败，请稍后重试");
				}
			},
			error: function() {
				alert("连接超时，请检查网络后重试");
			}
		});

		/***************彭博重置密码  end*******************/

	}
	/**
	 * 页面跳转后销毁方法
	 */
	function destroy() {
		$(pageId + " #get_code").attr("class", "code_btn");
		$(pageId + " .code_btn").text("获取验证码");
		$(pageId + " .code_btn").attr("class", "code_btn");
		clearTimeout(timer);
	}

	/**
	 * 页面返回方法
	 */
	function pageBack() {}

	/**
	 * 页面效果执行完毕方法
	 *
	 */
	function load() {}

	var findPassword2 = {
		init: init,
		bindPageEvent: bindPageEvent,
		destroy: destroy,
		pageBack: pageBack,
		load: load
	};

	module.exports = findPassword2;
});