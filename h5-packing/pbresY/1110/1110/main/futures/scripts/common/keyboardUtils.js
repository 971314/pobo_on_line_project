/**
 * 密码键盘插件
 */
define(function(require, exports, module) {
	var nativePluginService = require("nativePluginService"); // 原生插件服务类
	var constants = require("constants"); // 常量类
	var commonExt = require("commonExt"); // 常用公共方法
	require("keyPanel");
    var myKeyPanel = new $.KeyPanel();
	var option = {};
	/**
	 * 初始化密码控件
	 * 适用于弹出密码窗口
	 * @param pageId ：页面ID
	 * @param  pwdInputId： 密码文本框ID
	 * @param callBack:密码支付完成后执行的回调函数
	 * 
	 */ 
	function initPwdWindow(opt){
		option = {
			"pageId" : "", // 页面ID 必传
			"pwdWindowId" : "", // 密码窗口ID 必传
			"pwdInputId" : "", // 密码文本框ID 必传
			"clickObj" : "", // 点击对象，点击该对象呼出密码框，默认密码文本框父节点
			"callBack" : null // 密码输入完成后需要调用的函数	
		}
		// 合并外部入参
		$.extend(option, opt);
		
		var pwdInputEle = option.pageId + option.pwdInputId;
		var clickObj = option.clickObj || $(pwdInputEle).parent(); 
		clickObj = option.pageId + clickObj;
		
		// 点击密码弹出键盘    PC：调用H5键盘，Android & ios 调用原生键盘
		$.bindEvent(clickObj, function(e){
			e.stopPropagation();
			if ($.config.platform == constants.platform.PLATFORM_PC) {
				//myKeyPanel.init(pwdInputEle, 1, true, {skinName: "white"}); // 执行初始化
				var keyPanelConfig = {
						isSaveDom: true, // 是否保存键盘 DOM 在页面中
						beforeInitFunc: function(){
							showPwdWindow();
						},
						afterInitFunc: function(){
							inputKeyEvent(pwdInputEle, curKeyCode, option.callBack);
							console.log("input=" + $(pwdInputEle).val());
						},
						beforeCloseFunc: function(){
							console.log("beforeCloseFunc");
						},
						afterCloseFunc: function(){
							hidePwdWindow();
						}
				};
				var isPwd = $(pwdInputEle).index(this) == 1 ? true : false; // 数字键盘采用密码输入
				keyPanelConfig.isSaveDom = $(pwdInputEle).index(this) == 1 ? false : keyPanelConfig.isSaveDom; // 不保存键盘 dom
				myKeyPanel.init(this, $(pwdInputEle).index($(this)) + 1, isPwd, keyPanelConfig);
			} else {
				callKeyboard(option.pageId, $(pwdInputEle), constants.keyPanelType.NUMBER);
			}
		}, "click");
		
		// PC：绑定文本框input事件 ，Android & Ios 绑定原生键盘监听事件
		if ($.config.platform == constants.platform.PLATFORM_PC) {
			// H5键盘监控文本框输入事件
			$.bindEvent(pwdInputEle, function(e){
				var curKeyCode = e.originalEvent.detail["optType"]; // 按键值
				inputKeyEvent(pwdInputEle, curKeyCode, option.callBack);
			}, "input");
		} else {
			// 原生键盘监听文本框输入事件
			/*window.customKeyboardEvent = {
				keyBoardInputFunction: function(curKeyCode){
					inputKeyEvent(pwdInputEle, curKeyCode, option.callBack);
				}
			};*/
			
			/*window.customKeyboardEvent = {
					keyBoardFinishFunction: function(){
						var $input = $(pwdInputEle); // 密码input控件
						var curTradePwd = $input.val(); 
						if(curTradePwd.length == 6){
				        	var pwdParam = {
			        			"tradePwd" : curTradePwd
			        		};
				        	commonExt.rsaEncrypt(pwdParam, callBack);
			    		}
					}, // 键盘完成按钮的事件
					keyBoardInputFunction: function(curKeyCode){
						inputKeyEvent(pwdInputEle, curKeyCode, option.callBack);
					} // 键盘的输入事件
				};*/
			$.setSStorageInfo("callback",option.callBack);
		}
	}
	
	/**
	 * 调用原生键盘
	 * @param $input 显示在页面的输入框
	 * @param pageId 页面ID 
	 * @param keyType 键盘类型 1：英文键盘，2：股票键盘，3：数字键盘，4：随机数字键盘，9：系统键盘
	 */
	function callKeyboard(pageId, $input, keyType){
		var curInputId = $input.attr("id");
		var invokeParam = {
			moduleName: "main", // String	目标模块名	N
			pageId: pageId.substring(1), // String	页面Id	Y
			eleId: curInputId, // String	元素Id	Y
			doneLable: "done", // String	完成按钮显示字符
			keyboardType: keyType // 1：英文键盘，2：股票键盘，3：数字键盘，4：随机数字键盘，9：系统键盘
		};
		nativePluginService.function50210(invokeParam);
	}
	
	/**
	 * 隐藏原生键盘
	 */
	function hideNativeKeyboard(){
		var invokeParam = {
			moduleName: "main"
		};
		nativePluginService.function50211(invokeParam);
	}
	
	/**
	 * 描述：原生和H5键盘的输入事件
	 * @author 汪卫中
	 * @param curKeyCode 当前输入值
	 */
	function inputKeyEvent(pwdInput, curKeyCode, callBack){
//		var $input = $(pwdInput); // 密码input控件
		var curTradePwd = $(pwdInput).attr("value"); 
		
//		var keycode = $.getSStorageInfo("keyCode");
//		if (keycode && (parseInt(keycode) > 0)) {
//			curTradePwd = curTradePwd + keycode;
//		} else {
//			curTradePwd = $(pwdInput).attr("value"); 
//		}
		
		var len = curTradePwd.length;
		//console.warn("keycode="+keycode+",curTradePwd="+curTradePwd);
		
		curKeyCode = curKeyCode + "";
		var curcode = curKeyCode?curKeyCode:keycode;
		switch(curcode){
		case "-2": // 清空按钮
			$(pwdInput).parent().find("em").html("");
			$(pwdInput).val("");
			curTradePwd = "";
			break;
		case "-3": // 完成按钮
			if(curTradePwd.length == 6){
	        	var pwdParam = {
        			"tradePwd" : curTradePwd
        		};
	        	commonExt.rsaEncrypt(pwdParam, callBack);
    		}
			break;
		case "-5": // 原生键盘删除键
			if (curTradePwd.length >= 0) {
				$(pwdInput).parent().find("em").eq(len).html("");
			}
			break;
		case "del": // H5键盘删除键
			if (curTradePwd.length >= 0) {
				$(pwdInput).parent().find("em").eq(len).html("");
			}
			break;
		default:
			if(curTradePwd.length <= 6){
				$(pwdInput).parent().find("em").eq(len-1).html("●");
	    		if(curTradePwd.length == 6){
		        	var pwdParam = {
	        			"tradePwd" : curTradePwd
	        		};
		        	commonExt.rsaEncrypt(pwdParam, option.callBack);
	    		}
    		}
			break;
		}
	} 
	
	/**
	 * 弹出支付窗口 注：此方法依赖于initPwdWindow
	 */
	function showPwdWindow(){
		var inputId = option.pageId + " " + option.pwdInputId;
		$(option.pageId + " " + option.pwdWindowId).slideDown("slow");
		$(inputId).siblings("em").html("");
		$(inputId).val("");
		
		if ($.config.platform == constants.platform.PLATFORM_PC) {
			myKeyPanel.init(inputId, 1, true, {}); // 执行初始化
		} else {
			callKeyboard(option.pageId, $(inputId), constants.keyPanelType.NUMBER);
		}
	}
	
	/**
	 * 隐藏支付窗口 注：此方法依赖于initPwdWindow
	 */
	function hidePwdWindow(){
		$(option.pageId + " " + option.pwdWindowId).hide();
		hideKeyBoard();
	}
	
	/**
	 *  初始化密码文本框
	 */
	function initPwdInput(pageId, pwdId, callBack){
		// 点击密码弹出键盘 PC：调用H5键盘，Android & ios 调用原生键盘
		$.bindEvent(pageId + " #" + pwdId, function(e){
			e.stopPropagation();
			//设置输入框高亮
			$(pageId + "input").css("background","#F6F6F6");
			$(pageId + " #" + pwdId).css("background","#F9F9C8");
			if ($.config.platform == constants.platform.PLATFORM_PC) {
			    myKeyPanel.init(pageId + " #" + pwdId, 1, true, {}); // 执行初始化
			} else {
				callKeyboard(pageId, $(pageId + " #" + pwdId), constants.keyPanelType.NUMBER);
			}
		}, "click");
		
		// PC：绑定文本框input事件 ，Android & Ios 绑定原生键盘监听事件
		if ($.config.platform == constants.platform.PLATFORM_PC) {
			// H5键盘监控文本框输入事件
			$.bindEvent(pageId + " #" + pwdId, function(e){
				e.stopPropagation();
				if (typeof(callBack) == "function") {
					callBack();
				}
			}, "input");
		} else {
			// 原生键盘监听文本框输入事件
			window.customKeyboardEvent = {
				keyBoardInputFunction: callBack
			};
		}
		
		// 点击页面关闭键盘
		$.bindEvent(pageId, function(){
			//设置输入框背景色
			$(pageId + "input").css("background","#F6F6F6");
			hideKeyBoard();
		});
	}
	
	/**
	 * 隐藏键盘
	 */
	function hideKeyBoard(){
		if ($.config.platform == constants.platform.PLATFORM_PC) {
			if (myKeyPanel) {
				myKeyPanel.close(); // 隐藏h5键盘
			}
		} else {
			hideNativeKeyboard();
		}
	}
	
	/**
	 * 调用系统键盘
	 * @param $input 显示在页面的输入框
	 * @param pageId 页面ID 
	 * @param keyType 键盘类型 1：英文键盘，2：股票键盘，3：数字键盘，4：随机数字键盘，9：系统键盘
	 */
	function inputKeyboard(input,pageId,keyType){
		var invokeParam = {
			moduleName: "main", // String	目标模块名	N
			pageId: pageId, // String	页面Id	Y
			eleId: input, // String	元素Id	Y
			doneLable: "done", // String	完成按钮显示字符
			keyboardType: keyType // 1：英文键盘，2：股票键盘，3：数字键盘，4：随机数字键盘，9：系统键盘
		};
		nativePluginService.function50210(invokeParam);
	}
	
	var keyboardUtils = {
		"initPwdWindow" : initPwdWindow, // 初始化密码输入窗口，弹出窗
		"showPwdWindow" : showPwdWindow, // 显示密码窗口
		"hidePwdWindow" : hidePwdWindow, // 隐藏密码窗口
		"initPwdInput" : initPwdInput, // 初始化密码文本框
		"hideKeyBoard" : hideKeyBoard, // 隐藏键盘
		"inputKeyboard" : inputKeyboard, //调用系统键盘
		"inputKeyEvent" : inputKeyEvent
	};

	// 暴露对外的接口
	module.exports = keyboardUtils;
	
});