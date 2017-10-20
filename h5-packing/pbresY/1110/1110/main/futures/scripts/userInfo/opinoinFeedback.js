//2016年11月24日14:43:36

define('futures/scripts/userInfo/opinoinFeedback.js', function(require, exports, module) {
	var pageId = '#userInfo_opinoinFeedback ';
	require('validatorUtils');
	var userService = require("futures/services/userService").getInstance();

	var mainConfig, contract, news;
	var pbHQ, pbSYS, pbINFO, pbZX;
	var isPoboApp = typeof pbE != "undefined";
	var HISTORY = 9;
	var SELF = 100;
	var HOT = 100;

	var callback = null;
	/**
	 * 初始化方法
	 */
	function init() {
		//		window.confirm("yyy");

		if(isPoboApp) {
			pbHQ = pbE.HQ();
			pbSYS = pbE.SYS();
			pbINFO = pbE.INFO();
		}
	}

	/*
	 * 页面事件绑定
	 */
	function bindPageEvent() {
		//返回按钮
		$.bindEvent($(pageId + " .icon_back"), function() {
			window.location.href = 'goBack';
		});

		//提交按钮
		$.bindEvent($(pageId + " #opinion_btn"), function() {
			if($.validatorUtils.isEmpty($(pageId + " #opinion").val())) {
				alert("反馈内容不能为空");
				return;
			}
			if($.validatorUtils.isEmpty($(pageId + " #contact").val())) {
				alert("联系方式不能为空");
				return;
			} else {
				if(!$.validatorUtils.isMobile($(pageId + " #contact").val())) {
					alert("联系方式不正确");
					return;
				}
			}

			var param = {
				"mobile_no": pbE.SYS().getPublicData("mobile"),
				"content": $(pageId + " #opinion").val(),
				"contact": $(pageId + " #contact").val()
			}
			userService.opinion(param, function(resultVo) {
				if(resultVo.error_no == 0) {
					$("input").val("");
					$(" #opinion").val("");
					setTimeout(function() {
						window.location.href = 'goBack';
					}, '100');
					alert("谢谢你的意见");
				} else {
					alert("提交失败，请重试");
				}
			});

		});
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