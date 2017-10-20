/**
 *
 * 模块公用 js
 */
define('futures/scripts/common/common.js', function(require, exports, module) {
	var constants = require("constants");
	require('validatorUtils');
	require("makeThumb");

	var mainConfig, contract, news;
	var pbHQ, pbSYS, pbINFO, pbZX;
	var isPoboApp = typeof pbE != "undefined";
	var HISTORY = 9;
	var SELF = 100;
	var HOT = 100;

	/**
	 * 每次页面跳转之前都会执行的方法
	 * @fromPage 当前页面对象
	 * @toPage 要跳转的页面地址
	 * @param 传递的目标页面的参数
	 */
	function checkPermission(fromPage, toPageUrl, param) {
		return true;
	}

	/**
	 * 首次进入模块的时候，调用
	 *里面可以写同步和异步操作
	 */
	function firstLoadFunc(_callback) {

	}

	/**
	 * 统一退出,通常返回-999未登录，需要将当前未登录页面相关信息返回给前端
	 * */
	function filterLoginOut(curPage) {

	}

	/**
	 * 公共是否登录判断
	 */
	function isLogin(param) {
		pobo();
		if($.validatorUtils.isEmpty(pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token'))) {
			window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/login.html");
		} else {
			window.open(param.openHref);
		}
	}

	//存储登录信息
	function saveSessionUserInfo(data) {
		pobo();
		var userInfo = data[0];
		pbE.SYS().storePublicData("userInfo", userInfo);
		pbE.SYS().storePublicData("user_id", userInfo.user_id);
		pbE.SYS().storePublicData("mobile", userInfo.mobile_phone);
		pbE.SYS().storePublicData("image", userInfo.user_icon);
	}

	function pobo() {
		if(isPoboApp) {
			pbHQ = pbE.HQ();
			pbSYS = pbE.SYS();
			pbINFO = pbE.INFO();
		} else {}
	}

	function getEquipmentType() {
		pobo();
		var OS;
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
		}
		return OS;
	}

	var common = {
		"firstLoadFunc": firstLoadFunc,
		"checkPermission": checkPermission,
		"filterLoginOut": filterLoginOut,
		"saveSessionUserInfo": saveSessionUserInfo,
		"isLogin": isLogin,
		"getEquipmentType": getEquipmentType
	};
	module.exports = common;
});