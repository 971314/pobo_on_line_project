//2016年11月24日14:410:106

define('futures/scripts/register.js', function(require, exports, module) {
	var pageId = '#register ';
	var common = require("common");
	var commonExt = require("commonExt");
	require("2.0.0/js/plugins/validator/scripts/validatorUtils"); //校验
	var userService = require("futures/services/userService").getInstance();

	var serverAddr = 'https://pbmobile.pobo.net.cn/pobocertification_WebService/';
	var poboNumber = '123';
	var loginType = '1';
	var deviceId = '127.0.0.1';
	var orgNumber = '789'; //券商编号
	var FatherAccount = 'pobo';
	var OS = 'Android';
	var version = '1.0.0.1';

	var contract, contractInterval, prevCustom, navScroll, newsData, newsCurrent, prevConfig;
	var mainConfig;
	var pbHQ, pbSYS, pbINFO, pbZX;
	var isPoboApp = typeof pbE != "undefined";
	var HISTORY = 9;
	var SELF = 100;
	var HOT = 100;
	var setUserInfo;

	var countdown = 60;
	/**
	 * 初始化方法
	 */
	function init() {
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
		createVerification();
	}

	/*
	 * 页面事件绑定
	 */
	function bindPageEvent() {
		//绑定返回按钮
		$.bindEvent($(pageId + " .icon_back"), function() {
			window.location.href = 'goBack';
		});

		//监听页面输入手机号和图形验证码事件
		$.bindEvent($(pageId + " #mobile , #graphical"), function() {
			var graphical = $.trim($(pageId + "#graphical").val()); //图形验证码
			if(!$.validatorUtils.isMobile($.trim($(pageId + " #mobile").val()))) {
				$(pageId + " #message_code_btn").attr("class", "code_btn1");
			} else if(graphical.length < 4) {
				$(pageId + " #message_code_btn").attr("class", "code_btn1");
			} else if($(pageId + " #message_code_btn").text()=="获取验证码"){
				$(pageId + " #message_code_btn").attr("class", "code_btn");
			}
		}, "change");

		//切换图形验证码
		$.bindEvent($(pageId + " #captcha_img"), function() {
			createVerification();
		});

		//获取短信验证码
		$.preBindEvent($(pageId + " .input_text"), ".code_btn", function(e) {
			checkMobile();
		});
//
//		$.preBindEvent($(pageId + " .input_text"), ".code_btn1", function(e) {
//			var pwd = $.trim($(pageId + " #login_pwd").val());
//			//手机号不为空
//			if(!$.validatorUtils.isMobile($.trim($(pageId + " #mobile").val()))) {
//				alert("请输入正确的手机号");
//				return;
//			} else if($.validatorUtils.isEmpty($.trim($(pageId + " #graphical").val()))) {
//				alert("图形验证码不能为空");
//			}
//
//		});
		$.bindEvent($(pageId + "#register_btn"), function() {
			var pwd = $.trim($(pageId + " #login_pwd").val());
			var re_pwd = $.trim($(pageId + " #re_login_pwd").val());

			//手机号不为空
			if(!$.validatorUtils.isMobile($.trim($(pageId + " #mobile").val()))) {
				alert("请输入正确的手机号");
				return;
			}
			//短信验证码不为空
			if(!$.validatorUtils.isNotEmpty($.trim($(pageId + " #message").val()))) {
				alert("短信验证码不能为空");
				return;
			}

			//校验密码格式
			if(pwd.length < 7 && pwd.length > 20) {
				alert("登录密码必须是8-20位字母和数字的组合");
				return;
			}
			if(pwd.length < 8 || pwd.length > 20) {
				if(pwd.length == 0) {
					alert("登录密码不能为空");
					return;
				}
				alert("登录密码必须是8-20位字母和数字的组合");
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

			//校验确认密码格式
			if(re_pwd.length < 7 && re_pwd.length > 20) {
				alert("确认密码必须是8-20位字母和数字的组合");
				return;
			}
			if(re_pwd.length < 7 || re_pwd.length > 20) {
				if(re_pwd.length == 0) {
					alert("确认密码不能为空");
					return;
				}
				alert("确认密码必须是8-20位字母和数字的组合");
				return;
			} else {
				var flag = 0;
				for(var i = 0; i < re_pwd.length; i++) {
					if(re_pwd[i].match(/^[a-zA-z]+$/)) {
						flag = flag + 1;
						break;
					}
				}
				for(var i = 0; i < re_pwd.length; i++) {
					if(re_pwd[i].match(/^\d+$/)) {
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
				//注册
				register();
			} else {
				alert("两次密码不一致");
			}
		});
	}

	/**
	 *切换图形验证码
	 */
	function createVerification() {
		$(pageId + "#captcha_img").attr("src", $.config.global.imagePath + "?r=" + new Date().getTime());
	}
	/**
	 *校验手机号
	 */
	function checkMobile() {
		if($.validatorUtils.isMobile($.trim($(pageId + " #mobile").val()))) {
			var param = {
					"mobile_phone": $(pageId + " #mobile").val(),
					"type": "1" //手机类型
				}
				//手机号类型验证没问题，校验是否登录
			userService.CheckPhoneNumber(param, function callBack(resultVo) {
				//手机号是否被使用
				if(resultVo.error_no == "0") {
					var result = resultVo.results;
					if(result[0].is_exist == "0") {
						//帐号未注册，校验图形验证码
						CheckGraphicalCode();
					} else {
						createVerification();
						alert("该手机号码已注册，请使用其他号码");
					}
				}
			}, {
				"isShowWait": false
			});
		} else {
			alert("请输入正确的手机号");
			createVerification();
		}
	}

	/**
	 *校验图形验证码
	 */
	function CheckGraphicalCode() {
		// stringUtils.trimAll
		var graphical = $.trim($(pageId + "#graphical").val()); //图形验证码
		if($.validatorUtils.isNotEmpty(graphical)) {
			var param = {
					"ticket": graphical
				}
				//校验图形验证码
			userService.CheckGraphicalCode(param, function callback(resultVo) {
				if(resultVo.error_no == "0") {
					$(pageId + " #message_code_btn").attr("class", "code_btn");
					/******走彭博通道发送验证码  begin**********************/
					$.ajax({
						type: 'POST',
						url: serverAddr + 'firstregister',
						data: {
							poboNumber: poboNumber,
							loginName: $(pageId + " #mobile").val(),
							loginType: loginType,
							deviceId: deviceId,
							pwd: '',
							FatherAccount: FatherAccount,
							OS: OS,
							version: version,
							orgNumber: orgNumber
						},
						dataType: 'json',
						success: function(data) {
							if(data.loginUser.returnFlag == 0) {
								countdown = 60;
								settime($(pageId + " #message_code_btn"));
							}else{
								alert("短信发送失败，请稍后再试");
								return;
							}
						},
						error: function() {
							alert("连接超时，请检查网络后重试");
						}
					});
					/*********************走彭博通道发送验证码 end****************************/

				} else {
					alert(resultVo.error_info);
					createVerification();
				}
			}, {
				"isShowWait": false
			});
		} else {
			alert("请输入正确的图形验证码");
		}
	}

	/**
	 *校验手机号、图形验证码框
	 */
	function actionEvent() {
		if(!$.validatorUtils.isMobile($.trim($(pageId + " #mobile").val()))) {
			$(pageId + " #message_code_btn").attr("class", "code_btn1");
			return false;
		}
		var graphical = $.trim($(pageId + "#graphical").val()); //图形验证码
		if(!($.validatorUtils.isNotEmpty(graphical) && graphical.length == 4)) {
			$(pageId + " #message_code_btn").attr("class", "code_btn1");
			return false;
		}
		$(pageId + " #message_code_btn").attr("class", "code_btn");
	}

	//倒计时
	function settime(obj) {
		if(countdown == 0) {
			actionEvent()
			obj.text("获取验证码")
			return;
		} else {
			obj.attr("class", "code_btn1");
			obj.text("重新发送(" + countdown + ")")
			countdown--;
		}
		setTimeout(function() {
			settime(obj)
		}, 1000)
	}

	/**
	 *注册
	 */
	function register() {
		var param = {
			"pwd": $.trim($(pageId + " #login_pwd").val())
		};
		/****************彭博注册  begin********************/
		var phone = $.trim($(pageId + " #mobile").val()),
			code = $.trim($('#message').val()),
			pwd = $.trim($(pageId + " #login_pwd").val()),
			cfm = pwd; //确认密码

		$.ajax({
			type: 'POST',
			url: serverAddr + 'checkRegister',
			data: {
				poboNumber: poboNumber,
				loginName: phone,
				loginType: loginType,
				OTP: code,
				deviceId: deviceId,
				pwd: pwd,
				orgNumber: orgNumber
			},
			dataType: 'json',
			success: function(data) {
				console.log(data);
				if(data.checkOTP.returnFlag == 8) {
					alert("校验码错误，请重新获取");
				} else if(data.checkOTP.returnFlag == 0 || data.checkOTP.returnFlag == 5) {
					data.checkOTP.pwd = phone.substr(-6);
					data.checkOTP.loginName = phone;
					data.checkOTP.loginType = loginType;
					setUserInfo = data.checkOTP;
					//我们平台注册
					//密码加密
					commonExt.rsaEncrypt(param, function(paraMap) {
						var Regparam = {
								"mobile_phone": $.trim($(pageId + " #mobile").val()),
								"login_password": paraMap.pwd
							}
							//注册回调
						userService.registerUser(Regparam, function callback(resultVo) {
							if(resultVo.error_no == "0") {
								setTimeout(function() {
									pbE.SYS().sendMessageToNative('PbKey_H5_Home_Auth_Data', JSON.stringify(setUserInfo));
								}, 1000);
								window.location.href = 'close';
							} else {
								alert(resultVo.error_info);
							}
						});
					});
				}
			},
			error: function() {
				alert("连接超时，请检查网络后重试");
			}
		});
		/****************彭博注册  end********************/
		//密码加密
		//      commonExt.rsaEncrypt(param, function(paraMap) {
		//          var Regparam = {
		//                  "mobile_phone": $.trim($(pageId + " #mobile").val()),
		//                  "login_password": paraMap.pwd
		//              }
		//              //注册回调
		//          userService.registerUser(Regparam, function callback(resultVo) {
		//              if (resultVo.error_no == "0") {
		//              	window.location.href='close';
		////					window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/login.html?mobile="+$.trim($(pageId + " #mobile").val()));                      
		//              } else {
		//                  alert(resultVo.error_info);
		//              }
		//          });
		//
		//      });
	}

	// 注册
	function Pbregister() {

	}

	/**
	 * 页面跳转后销毁方法
	 */
	function destroy() {}

	/**
	 * 页面返回方法
	 */
	function pageBack() {

	}

	/**
	 * 页面效果执行完毕方法
	 *
	 */
	function load() {

	}

	var index = {
		init: init,
		bindPageEvent: bindPageEvent,
		destroy: destroy,
		pageBack: pageBack,
		load: load
	};

	module.exports = index;
});