/**
 * @描述: 业务-工具类
 * @作者: 60
 */
define(function(require, exports, module) {
	var layerUtils = require("layerUtils");
	var appUtils = require("appUtils");
	var businessUtil = {
		"init": init
	};

	function init() {

	};

	/**
	 * 判断数据是否需要清空 
	 * @param {Object} insertType append|html
	 * @param {Object} id 判断的元素
	 */
	businessUtil.htmlIsEmpty = function(insertType, id) {
		insertType = typeof insertType == "undefined" || insertType == "" || insertType == null ? "html" : insertType;
		if (insertType === "html") {
			$(id).empty();
		}
	};
	/**
	 * 转为保留两位小数的百分数:  0.001  --->   0.10% 
	 * @param {Object} number
	 */
	businessUtil.toPercent = function(number) {
		number = businessUtil.isNumberBlank(number);
		return (number * 100).toFixed(2) + "%";
	};
	
	/**
	 * number是否为空,为空返回 0 否则返回传入的值
	 * @param {Object} number
	 */
	businessUtil.isNumberBlank = function(number) {
		return number = number ? number : 0;
	};
	/**
	 * 获取红色或绿色的样式  
	 * @param {Object} number
	 */
	businessUtil.getClassName = function(number){
		return parseFloat(number) < 0 ? "agreen" : "ared";
	}
	/**
	 * 判断 _pageId是否存在,不存在的话,返回当前页的_pageId,存在则返回传入参数中的_pageId
	 * @param {Object} _pageId
	 */
	businessUtil.getPageIdExist = function(_pageId){
		return _pageId ? _pageId : businessUtil.getPageId();
	}
	/**
	 * 获取当前页面的id 
	 */
	businessUtil.getPageId = function() {
		var shenwPageId="#userInfo_setUserInfo ";
		return shenwPageId;
//		var code = businessUtil.getPageCode();
//		return code ? "#" + code.replaceAll("[/]", "_").replaceAll("/", "_") +" " : "";
	};
	/**
	 * 获取当前页面标识 
	 */
	businessUtil.getPageCode = function(){
		return appUtils.getSStorageInfo("_curPageCode");
	};
	/**
	 * 获取val的长度 
	 * @param {Object} obj
	 */
	businessUtil.getValLength = function (obj){
		return businessUtil.getVal(obj).length;
	};
	/**
	 * 验证obj元素值的长度
	 * @param {Object} obj 验证的元素
	 * @param {Object} lengthMin 最小长度
	 * @param {Object} lengthMax 最大长度
	 * @param {Object} msg 提示信息  例:msg="观点标题";
	 */
	businessUtil.vLength = function (obj, lengthMin, lengthMax, msg) {
		var length = businessUtil.getValLength(obj);
		if ( 0 < lengthMin && length == 0){
			layerUtils.iAlert(msg + "不能为空", -1);
			return false;
		}
		if (length < lengthMin) {
			layerUtils.iAlert(msg + "的字数不得少于" + lengthMin, -1);
			return false;
		}
		if (length > lengthMax) {
			layerUtils.iAlert(msg + "的字数不得多于" + lengthMax, -1);
			return false;
		}
		return true;
	};
	/**
	 * 验证输入数字的大小范围是否合法 
	 * @param {Object} obj 验证的元素
	 * @param {Object} min 最小值
	 * @param {Object} max 最大值
	 * @param {Object} msg 提示信息  例:msg="观点标题";
	 */
	businessUtil.vNumber = function(obj, min, max, msg) {
		var num = businessUtil.getVal($(obj));
		num = eval(num);
		min = eval(min);
		max = eval(max);
		if (isNaN(num)) {
			layerUtils.iAlert(msg + "必须为数字", -1);
			return false;
		}
		if (num < min) {
			layerUtils.iAlert(msg + "不得小于" + min, -1);
			return false;
		}
		if (num > max) {
			layerUtils.iAlert(msg + "不得大于" + max, -1);
			return false;
		}
		return true;
	};
	/**
	 * 验证输入数字的大小范围是否合法 
	 * @param {Object} obj 验证的元素
	 * @param {Object} min 最小值
	 * @param {Object} max 最大值
	 * @param {Object} msg 提示信息  例:msg="观点标题";
	 */
	businessUtil.vEmpty = function(obj, msg) {
		var b = businessUtil.getValLength($(obj)) > 0 ? true : false;
		if(!b){
			layerUtils.iAlert(msg + "不能为空", -1);
		}
		return b ;
	};
	/**
	 * 获取元素去除html标签后的val;
	 * @param {Object} obj
	 */
	businessUtil.getVal = function(obj) {
		 var a = businessUtil.removeHTMLTag($(obj).val())
		 return a ? a.trim() : "";
	};
	/**
	 * 过滤HTML元素 
	 * @param {Object} content 需要过滤的文本
	 */
	businessUtil.removeHTMLTag = function (content) {
		if (content) {
			content = content.replace(/<\/?[^>]*>/g, ''); // 去除HTML tag
			content = content.replace(/[ | ]*\n/g, '\n'); // 去除行尾空白
			content = content.replace(/\n[\s| | ]*\r/g, '\n'); // 去除多余空行
			content = content.replace(/&nbsp;/ig, '');// 去掉&nbsp;
		}
		return content;
	}
	/**
	 * 获取 check元素选中的状态
	 * @param {Object} obj
	 */
	businessUtil.check = function(obj){
		return $(obj).get(0).checked;
	};
	
	/**
	 * 修改选中状态 并返回切换后的状态
	 * @param {Object} obj check元素
	 * @param {Object} b 改为 true|false; 可不传;
	 */
	businessUtil.setCheck = function (obj,b){
		var checked = $(obj).get(0).checked;
		if(typeof eval(b) == "boolean" ){
			return $(obj).get(0).checked = eval(b);
		}
		return $(obj).get(0).checked = !checked;
	}
	
	businessUtil.vError_no = function(resultVo, msg) {
		if (0 == resultVo.error_no) {
			return true;
		}
		msg = msg ? msg + ":" : "";
	//	layerUtils.iAlert(msg + resultVo.error_info, -1);
		layerUtils.iAlert(msg);
		return false;
	}
	/**
	 * tab切换 
	 * @param {Object} obj tab a元素 
	 * @param {Object} b 是否是初始化 true|false
	 */
	businessUtil.changeTab = function(obj,b) {
		var _pageId = businessUtil.getPageId();
		if(!b && $(_pageId + "[tab='a'].act").text() == $(obj).text()){
			return false;
		}
		$(_pageId + "[tab='a']").not($(obj)).removeClass("act");
		$(obj).addClass("act");
		return true;
	};
	/**
	 * 获取登录用户的id
	 */
	businessUtil.getUserId = function(){
		return appUtils.getSStorageInfo("userId", true);
	}
	/**
	 * 暂无数据试显示的提示信息
	 * @param {Object} obj 显示提示信息的元素
	 * @param {Object} msg 显示提示信息的内容
	 * @param {Object} insertType 提示信息追加的方式 : html|append
	 * @param {Object} myVIscroll 有滑动组件的时候传
	 * @param {Object} _pageId 有滑动组件的时候传
	 */
	businessUtil.getNotData = function(obj, msg, insertType,myVIscroll,_pageId) {
		insertType = typeof insertType == "undefined" || insertType == "" || insertType == null ? "html" : insertType;
		if (insertType === "html") {
			$(obj).empty();
		}
		var html = "";
		html += "<div class='no_option_box'>";
		html += "<em class='no_option_pic'></em>";
		html += "<p class='no_option_tit'>"+msg+"</p>";
		html += "</div>";
		$(obj).append(html); // 追加暂时数据时的提示信息
		if(myVIscroll){
			$(_pageId + ".visc_pullUp").hide(); //隐藏上拉刷新
			myVIscroll.refresh(); //刷新滑动组件
		}
	}
	/**
	 * 千位符格式化 
	 * @param {Object} s 将要格式化的数字
	 * @param {Object} n 保留小数位数
	 */
	businessUtil.fmoney = function(s, n) {
		var num = n;
	    n = n > 0 && n <= 20 ? n : 2;  
	    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
	    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];  
	    t = "";  
	    for (i = 0; i < l.length; i++) {  
	        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
	    }  
	    return num == 0 ?t.split("").reverse().join("") : t.split("").reverse().join("") + "." + r
	}  
	function bindGlobalEvent() {

	};

	function destroy() {}

	// 暴露对外的接口
	module.exports = businessUtil;
});