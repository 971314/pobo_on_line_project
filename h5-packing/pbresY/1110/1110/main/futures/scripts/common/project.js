/**
 * 项目相关的公共方法定义在此处
 */
define(function(require, exports, module){ 
	
	/**
	 * 描述: 设置按钮不可用
	 * @author 汪卫中
	 * @param eleObj: 元素对象
	 */
	function setBtnDisable(eleObj){
		$(eleObj).addClass("gray");
		$(eleObj).unbind();
	}
	
	/**
	 * 描述: 设置按钮可用
	 * @author 汪卫中
	 * @param eleObj: 元素对象
	 */
	function setBtnUsable(eleObj, callBack){
		$(eleObj).removeClass("gray");
		$.bindEvent(eleObj, function(e){
			e.stopPropagation();
			if (typeof(callBack) == "function") {
				callBack();
			}
		});
	}
	
	var project = {
		"setBtnDisable" : setBtnDisable, // 设置按钮不可用
		"setBtnUsable" : setBtnUsable // 设置按钮可用
	};

	// 暴露对外的接口
	module.exports = project;
});