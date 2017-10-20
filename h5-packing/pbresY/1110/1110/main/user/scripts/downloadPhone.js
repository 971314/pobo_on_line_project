define('user/scripts/downloadPhone.js', function(require, exports, module) {
	var pageId = '#downloadPhone';
	/**
	 * 全局变量声明
	 */

	/**
	 * 初始化方法
	 */
	function init() {}

	/*
	 * 页面事件绑定
	 */
	function bindPageEvent() {
		//返回按钮
		$.bindEvent($(pageId + " .iphone, .android"), function() {
			download();
		});
	}

	function download() {
		var domainURL = "https://kaihu.gyzq.com.cn";
		var u = navigator.userAgent,
			app = navigator.appVersion;
		var versions = { //移动终端浏览器版本信息 
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1 //是否为微信浏览器
		};
		//    	var language = (navigator.browserLanguage || navigator.language).toLowerCase();
		if(versions.ios || versions.iPhone || versions.iPad) {
			window.location = "https://itunes.apple.com/cn/app/guo-yuan-zheng-quan-kai-hu/id1022240606?l=zh&ls=1&mt=8";
		} else if(versions.android) {
			var url = "";
			if(versions.weixin) {
				//         		url = "http://a.app.qq.com/o/simple.jsp?pkgname=com.thinkive.mobile.account";
				//				url = "http://mp.weixin.qq.com/mp/redirect?url=http://www.thinkive.cn:5053/download/MobileAccount.apk#weixin.qq.com#wechat_redirect";
				url = domainURL + "download.html";
			} else {
				url = domainURL + "/download/MobileAccount.apk";
			}
			try {
				document.location.href = url;
			} catch(e) {
				try {
					document.window.location = url;
				} catch(e) {

				}
			}
		}
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