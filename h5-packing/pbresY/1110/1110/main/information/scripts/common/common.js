/**
 *
 * 模块公用 js
 */
define('information/scripts/common/common.js', function(require, exports, module) {
	require("msgFunction");
	var nativePluginService = require("nativePluginService");
	var constants = require("constants");
	require('validatorUtils');

	/**
	 * 每次页面跳转之前都会执行的方法
	 * @fromPage 当前页面对象
	 * @toPage 要跳转的页面地址
	 * @param 传递的目标页面的参数
	 */
	function checkPermission(fromPage, toPageUrl, param) {
		//控制资讯详情页面的字体大小
		if($.validatorUtils.isNotEmpty($.getSStorageInfo("fontSize"))) {
			if(toPageUrl.pageCode == "details") {
				$("html").css("font-size", $.getSStorageInfo("fontSize"));
			} else {
				$("html").css("font-size", "100px");
			}

		}

		//控制底部bar 显示隐藏
		/*        var pageId;
		        if (typeof toPageUrl == "object") {
		            pageId = toPageUrl.pageId;
		        } else {}
		        if ((pageId == "business-index") || (pageId == "index")) {

		        } else {
		            var param = {};
		            param["flag"] = '0';
		            param["moduleName"] = 'main';
		            nativePluginService.function50108(param);
		        }
		        if (toPageUrl.pageCode == "userInfo/transactionSetting"||toPageUrl.pageCode == "userInfo/systemSetting"||toPageUrl.pageCode == "userInfo/myCollection"||toPageUrl.pageCode == "userInfo/messagePush"||toPageUrl.pageCode == "userInfo/opinoinFeedback"||toPageUrl.pageCode == "aboutUser/index") {
		            if ($.validatorUtils.isNotEmpty($.getSStorageInfo("user_id"))) {
		                console.log(toPageUrl);
		            } else {
		                $.pageInit(fromPage, "login", param);
		            }
		        }
		        // if (toPageUrl.pageCode == "login") {
		        //     if ($.validatorUtils.isNotEmpty($.getSStorageInfo("user_id"))) {
		        //         $.pageInit(fromPage, "userInfo/index", param);
		        //     }
		        //
		        // }


		        //非首页禁止滑动打开侧边栏  openType 0 关闭  1 打开  2 使能  3 禁止
		        if (pageId == "index") {
		            //使能滑动打开侧边栏
		            var param = {};
		            param["moduleName"] = 'main';
		            param["menuType"] = '0';
		            param["openType"] = "2";
		            nativePluginService.function50102(param);
		        } else {
		            //禁止滑动打开侧边栏
		            var param = {};
		            param["moduleName"] = 'main';
		            param["menuType"] = '0';
		            param["openType"] = "3";
		            nativePluginService.function50102(param);
		        }*/
		return true;
	}

	/**
	 * 首次进入模块的时候，调用
	 *里面可以写同步和异步操作
	 */
	function firstLoadFunc(_callback) {
		$.callMessage({
			"funcNo": "50100",
			"moduleName": "information"
		});
	}

	/**
	 * 统一退出,通常返回-999未登录，需要将当前未登录页面相关信息返回给前端
	 * */
	function filterLoginOut(curPage) {

	}

	/**
	 * 公共是否登录判断
	 */
	function isLogin() {
		if($.config.platform == constants.platform.PLATFORM_PC) {
			user_id = $.getSStorageInfo("user_id", true);
		} else {
			var result = $.callMessage({
				"funcNo": "50041",
				"key": "user_id"
			});
			user_id = result.results[0].value;
		}

		if(!user_id) {
			return false;
		} else {
			return true;
		}
	}

	//存储登录信息
	function saveSessionUserInfo(data) {
		console.log(userInfo);
		var userInfo = data[0];
		$.setSStorageInfo("user_id", userInfo.user_id);
		$.setSStorageInfo("mobile", userInfo.mobile_phone);
	}

	function timeBucket(time) {
		//发布日期
		var ptime = time.replace(/\-/g, "/");
		_ptime = new Date(ptime);
		//当前日期
		var date = new Date(new Date());
		//var date = new Date("2014/01/21 15:03:54");
		//两时间的毫秒差
		var s = date - _ptime;
		/*
		 * 判断发布文档时间与查看文档时间的具体时间差，
		 * 距离8个月的显示具体时间，
		 * 距离1 个月 到8 个月之间的，显示 *个月 前 ，
		 * 距离一个月之内的，显示 *天 前
		 * 距离一天之内的，显示 *小时前，*分钟前，*秒前，
		 *
		 * */
		if(s >= 1000 * 60 * 60 * 24 * 30 * 12 * 4) { //4年后
			return time;
		} else if((1000 * 60 * 60 * 24 * 30 * 12 <= s) && (s < 1000 * 60 * 60 * 24 * 30 * 12 * 4)) { //1年 到4年之间
			return "" + Math.floor(s / (1000 * 60 * 60 * 24 * 30 * 12)) + " 年前";
		} else if((1000 * 60 * 60 * 24 * 30 * 1 <= s) && (s < 1000 * 60 * 60 * 24 * 30 * 12)) { //1 个月 到1年之间
			return "" + Math.floor(s / (1000 * 60 * 60 * 24 * 30)) + " 个月前";
		} else if((1000 * 60 * 60 * 24 * 1 <= s) && (s < 1000 * 60 * 60 * 24 * 30)) { //一个月之内
			return "" + Math.floor(s / (1000 * 60 * 60 * 24)) + " 天前";
		} else if((1000 * 60 * 60 <= s) && (s < 1000 * 60 * 60 * 24 * 1)) { //1天之内
			return "" + Math.floor(s / (1000 * 60 * 60)) + " 小时前";
		} else if((1000 * 60 <= s) && (s < 1000 * 60 * 60)) {
			return "" + Math.floor(s / (1000 * 60)) + " 分钟前";
		} else if((1000 <= s) && (s < 1000 * 60)) {
			return "" + Math.floor(s / (1000)) + " 秒前";
		} else if((0 <= s) && (s < 1000)) {
			return "刚刚";
		} else if(s < 0) {
			return "刚刚";
		}
	}

	var common = {
		"firstLoadFunc": firstLoadFunc,
		"checkPermission": checkPermission,
		"filterLoginOut": filterLoginOut,
		"saveSessionUserInfo": saveSessionUserInfo,
		"timeBucket":timeBucket,
		"isLogin": isLogin
	};

	module.exports = common;
});