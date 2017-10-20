/**
 * 发送短信验证码倒计时组件
 * 
 * 使用方法： 1、加载smsTimer：require("smsTimer");
 * 			 2、定义参数创建对象：opt={"element":"#eleId","callBack":function(){}}, var timer = new smsTimer(opt);
 * 			 3、启动定时器： timer.start();
 * 			 4、销毁定时器： timer.clear(); 此处在destroy方法中执行， 倒计时完成后组件也会自动销毁。
 */
define(function(require, exports, module) {

	/**
	 * 描述: 发送短信后按钮进入倒计时状态。
	 * @author 汪卫中
	 * @param selector: 按钮选择器
	 * @param callBack: 倒计时结束后执行的函数，如：重新绑定发送验证码按钮事件函数
	 * @param times: 倒计时时间
	 * @param disClass: 按钮不可用样式
	 * @returns 返回清空定时器方法，可扩展
	 */
	function smsTimer(opt){
		var dftOpt = {
			"element" : "", 
			"callBack" : null, 
			"times" : 60,
			"disClass" : ""
		};
		
		// 合并外部入参
		$.extend(dftOpt, opt);
		
		var eleObj = $(dftOpt.element);
		var count = dftOpt.times;
		var timer = null;
		var reSend = "重新发送";
		// 启动倒计时
		function start(){
			// 禁用按钮状态
			if (dftOpt.disClass) {
				eleObj.addClass(dftOpt.disClass);
			}
			
			if (typeof(dftOpt.callBack) == "function") {
				// 解绑按钮事件
				eleObj.unbind();
			}
			// 开始执行一次
			run(); 
			// 启动一个定时任务执行run方法
			/*if (!timer) {
				timer = window.setInterval(function(){
					run(); 
				}, 1000);
			}*/
		}
		
		// 读秒
		function run(){
			if(count >= 1){
				eleObj.html("剩余"+count + "秒");
				count -= 1;
				
				timer = window.setTimeout(run,1000);
			}else{
				clear();
				eleObj.html(reSend);
				if (typeof(dftOpt.callBack) == "function") {
					// 重新绑定按钮事件
					$.bindEvent(eleObj, dftOpt.callBack);
				}
			}
		}
		
		// 清空定时器
		function clear(){
			// 恢复按钮状态
			if (dftOpt.disClass) {
				eleObj.removeClass(dftOpt.disClass);
			}
			count = dftOpt.times;
			if (timer) {
				//window.clearInterval(timer);
				window.clearTimeout(timer);
				timer = null;
			}
		}
		
		// 提供外部调用方法
		return {"start": start, "clear": clear};
	}

	//暴露对外的接口
	module.exports = smsTimer;
});