/**
 * 文本框添加 一键清除和 密码（明/密）切换显示
 * pageId: 页面ID
 * closeClass : 清除按钮样式
 * showClass : 查看密码按钮样式
 * closeHtml : 自定义清除按钮html字符串
 * showPwdHtml : 自定义查看密码按钮html字符串
 * 
 * 提供3个方法：
 * 	1、appendClearBtn：添加清除按钮
 * 	2、appendShowPwdBtn：添加查看密码按钮
 * 	3、appendBothBtn：同时添加清除、查看密码按钮
 * 
 * 使用方法：
 * 	1、引入js
 * 	2、var inputCtl = new inputCtl(opt);
 * 	3、inputCtl.addCloseBtn("#inputId"); 添加清除按钮
 */
define(function(require, exports, module) {
	
	function inputCtl(opt){
		var dftOpt = {
			"pageId" : "", // 页面ID
			"closeClass" : "icon_clear",
			"showClass" : "icon_hidden",
			"hideClass" : "icon_show",
			"closeHtml" : '<a class="icon_clear" style="display:none;"></a>', // 清除按钮html 可自定义
			"showPwdHtml" : '<a class="icon_hidden"></a>' // 查看密码按钮html 可自定义
		};
		
		// 合并外部入参
		$.extend(dftOpt, opt);
		
		/**
		 * 添加清除按钮 
		 * @param callBack: 文本框值变化时回调函数
		 * 
		 */
		this.appendClearBtn = function(ele, callBack){
			ele = ele.indexOf("#") != 0 ? ele = (" #" + ele) : ele;
			addCloseBtn(ele, callBack);
		}
		
		/**
		 * 添加查看密码按钮
		 */ 
		this.appendShowPwdBtn = function(ele){
			ele = ele.indexOf("#") != 0 ? ele = (" #" + ele) : ele;
			addShowPwdBtn(ele);
		}
		
		/**
		 * 同时添加 2个按钮
		 * 先添加查看密码按钮，再添加清除按钮
		 */ 
		this.appendBothBtn = function(ele, callBack){
			ele = ele.indexOf("#") != 0 ? ele = (" #" + ele) : ele;
			addShowPwdBtn(ele);
			addCloseBtn(ele, callBack);
			ele = dftOpt.pageId + " " + ele;
			var pwdBtn = $(ele).siblings("." + dftOpt.showClass);
			var closeBtn = $(ele).siblings("." + dftOpt.closeClass);
			pwdBtn.css("width", "0.35rem");
			closeBtn.css("width", "0.35rem").css("margin-right", "0.35rem");
		}
		
		/**
		 * @param ele: 元素选择器
		 * @param callBack: 【清空】按钮click事件和文本框input事件执行的回调，一般用来是否灰掉操作按钮
		 */
		function addCloseBtn(ele, callBack){
			ele = dftOpt.pageId + " " + ele;
			if ($(ele).parent().find("." + dftOpt.closeClass).length == 0) {
				$(ele).after(dftOpt.closeHtml);
				var closeObj = $(ele).siblings("." + dftOpt.closeClass);
				// 绑定清除按钮事件    1、清空文本框值，2、隐藏【清除按钮】
				$.bindEvent(closeObj, function(){
					$(ele).val("");
					$(ele).siblings("." + dftOpt.closeClass).hide();
					
					if (typeof(callBack) == "function") {
						callBack();
					}
				}, "click");
				
				// 监控文本框输入值变化事件, 1、输入框值为空时 隐藏【清除】按钮，2、执行自定义函数
				$.bindEvent(ele, function(){
					if ($(this).val().length <= 0) {
						closeObj.hide();
					} else {
						closeObj.show();
					}
					
					window.setTimeout(function(){
						if (typeof(callBack) == "function") {
							callBack();
						}
					}, 200);
					
				}, "input");
				
				// 监控文本框输入值事件   如果文本框已存在数据，则执行自定义事件
				if($(ele).val()){
					closeObj.show();
					if (typeof(callBack) == "function") {
						callBack();
					}
				}
				
			}
		}
		
		/**
		 * 添加查看密码按钮
		 */ 
		function addShowPwdBtn(ele){
			ele = dftOpt.pageId + " " + ele;
			var $ele = $(ele);
			//初始化按钮
			if ($ele.parent().find("." + dftOpt.hideClass).length == 1) {
				var hideObj = $(ele).siblings("." + dftOpt.hideClass);
				$ele.attr("type", "password");
				hideObj.removeClass("icon_show").addClass("icon_hidden");
			}
			
			if ($ele.parent().find("." + dftOpt.showClass).length == 0) {
				$($ele).after(dftOpt.showPwdHtml);
				
				// 绑定查看密码按钮事件
				var showObj = $(ele).siblings("." + dftOpt.showClass);
				$.bindEvent(showObj, function(){
					if ($ele.attr("type") == "password") {
						$ele.attr("type", "text");
						showObj.removeClass("icon_hidden").addClass("icon_show");
					} else {
						$ele.attr("type", "password");
						showObj.removeClass("icon_show").addClass("icon_hidden");
					}
				});
			}
		}
		
		/**
		 * 描述：切换密码框隐藏/显示,支持绑定2个事件 【注：jquery改变input的type有兼容性问题】
		 * @author 汪卫中
		 * @param eleObj: 文本框对象
		 * @param eventName：当eventName有值时，绑定对应的事件
		 * @param eventFunc: 事件函数
		 * @param eventName2：当eventName2有值时，绑定对应的事件
		 * @param eventFunc2: 事件函数
		 */
		function viewAndHidePwd(eleObj, eventName, eventFunc, eventName2, eventFunc2){
			var obj = $(eleObj);
			// 保存输入框内容
			var val = obj.val();
			
			// 获取当前密码框对象的html内容
			var curHtml = $("<div></div>").append(obj.clone()).html();
			
			// 切换密码控件类型
			if (obj.attr("type") == "password") {
				curHtml = curHtml.replace('type="password"', 'type="text"');
			} else {
				curHtml = curHtml.replace('type="text"', 'type="password"');
			}
			
			// 生成新的密码控件，删除原来的密码控件
			obj.after(curHtml).remove(); 
			
			// 为新的密码控件赋值
			$(eleObj).val(val);
			
			// 绑定文本框事件
			if (eventName && typeof(eventFunc) == "function") {
				$.bindEvent(eleObj, function(e){
					eventFunc();
					e.stopPropagation();
				}, eventName);
			}
			
			// 绑定文本框事件
			if (eventName2 && typeof(eventFunc2) == "function") {
				$.bindEvent(eleObj, function(e){
					eventFunc2();
					e.stopPropagation();
				}, eventName2);
			}
		}
	}

	//暴露对外的接口
	module.exports = inputCtl;
});