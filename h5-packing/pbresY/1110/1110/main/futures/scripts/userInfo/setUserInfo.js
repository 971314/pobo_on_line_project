//2016年11月24日14:43:36

define('futures/scripts/userInfo/setUserInfo.js', function(require, exports, module) {
	var pageId = '#userInfo_setUserInfo ';
	require("2.0.0/js/plugins/validator/scripts/validatorUtils"); //校验
	var loading_img = require("futures/scripts/common/imgloading");

	var mainConfig, contract, news;
	var pbHQ, pbSYS, pbINFO, pbZX;
	var isPoboApp = typeof pbE != "undefined";
	var HISTORY = 9;
	var SELF = 100;
	var HOT = 100;

	var user_id;
	/**
	 * 全局变量声明
	 */

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

		if($.validatorUtils.isNotEmpty(pbE.SYS().getPublicData("image"))) {
			$(pageId + " #face_image").attr("src", $.config.global.domain + pbE.SYS().getPublicData("image"));
			var param = {
				"eleImg": $(pageId + " #face_image"),
				"width": "100%",
				"height": "125px",
				"lodingtimeout": 13000,
				"loadFailed": "../../images/user_img.png",
				"loading": "../../images/user_img.png",
				"bindOnclick": true
			}
			loading_img.imgload(param, null);
		}
		$(pageId + "#user_mobile").text(pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName'));
	}

	/*
	 * 页面事件绑定
	 */
	function bindPageEvent() {
		//绑定返回键
		$.bindEvent($(pageId + " .icon_back"), function() {
			window.location.href = 'goBack';
		});
		//绑定修改密码
		$.bindEvent($(pageId + " .spel"), function() {
			window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/userInfo/updatePassword.html");
		});
		//绑定修改头像取消键
		$.bindEvent($(pageId + " .cancel_btn"), function() {
			$(pageId + " .shade_bg").hide();
			$(pageId + " .upload_btn").hide();
		});
		//调相机
		$(pageId + " #btn1").change(function(obj) {
			$.showIndicator = $.showIndicatorHtml();
			var file = obj.target.files[0];
			console.log(file);
			//判断类型是不是图片
			if(!/image\/\w+/.test(file.type)) {
				$.hideIndicator = $.hideIndicatorHtml();
				alert("图片格式不正确，请重新上传");
				return false;
			}
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e) {
				var mobile = $(pageId + "#user_mobile").text();
				var pictureBase64 = this.result;
				$.ajax({
					type: "post",
					data: {
						"mobile_no": mobile,
						"funcNo": "1109804",
						"pictureBase64": pictureBase64
					},
					url: $.config.global.UploadImage, //地址
					dataType: "text",
					error: function(err) {
						$.hideIndicator = $.hideIndicator();
						$(pageId + " #btn1").val("");
						alert("图片格式不正确，请重新上传");
					},
					success: function(result) {
						$(pageId + " #btn1").val("");
						var resultData = eval("(" + result + ")");
						if(resultData.error_no == "0") {
							$(pageId + " #face_image").attr("src", $.config.global.domain + resultData.picture);
							var param = {
								"eleImg": $(pageId + " #face_image"),
								"width": "100%",
								"height": "125px",
								"lodingtimeout": 13000,
								"loadFailed": "../../images/user_img.png",
								"loading": "../../images/user_img.png",
								"bindOnclick": true
							}
							loading_img.imgload(param, null);
							$.hideIndicator = $.hideIndicatorHtml();
							alert("上传成功");
						} else {
							$.hideIndicator = $.hideIndicatorHtml();
							alert("上传失败");
						}
					}
				});
			}
		});
		//退出
		$.bindEvent($(pageId + " #outLogin"), function() {
			pbE.SYS().clearAuthData();
			setTimeout(function() {
				window.location.href = 'close';
			}, '100');
		});
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

	var setUserInfo = {
		init: init,
		bindPageEvent: bindPageEvent,
		destroy: destroy,
		pageBack: pageBack,
		load: load
	};

	module.exports = setUserInfo;
});