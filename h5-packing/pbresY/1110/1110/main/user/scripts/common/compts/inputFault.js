/**
 * 输入框断层显示
 * @author 汪卫中
 */
define(function(require, exports, module) {
	var inputFault = {};

	//暴露对外的接口
	module.exports = inputFault;
	
	/**
	 * 银行卡号断层 jquery扩展
	 */
	$.fn.bankInput = function(){
		var obj = $(this);
		if(obj.val() != ''){
			obj.val(obj.val().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ") );
		} 
		obj.bind('keyup', function(event){
			var startPos = getLocation($(this)[0]);
			// 只允許數字
			this.value = this.value.replace(/\D/g, '');
			
			var temp = this.value;
			this.value = this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
			/*var spaceNum = 0; 
			if(event.keyCode != 8){
				spaceNum = this.value.length - temp.length;
			}
			setLocation($(this)[0], startPos + spaceNum);*/
			
			var changePos = getLocation($(this)[0]);
			var flag2;
			if(this.value.length >= 5){
				if(((startPos+1) == changePos) && !(this.value[startPos+1])){
					flag2 = true;
				}
				
			}
			if((startPos == changePos) || flag2 ){
				setLocation($(this)[0], this.value.length);
				return false;
			}else{
				var spaceNum = 0; 
				if((startPos == 4)||(startPos == 9)||(startPos == 14)||(startPos == 19)){
					spaceNum = 1;
				}
				setLocation($(this)[0], startPos+ spaceNum);
				return false;
			}
		});
	}
		
	/**
	 * 列表显示格式化 jquery扩展
	 */ 
	$.fn.bankList = function(){
		return this.each(function(){
			$(this).text($(this).text().replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 "));
		})
	}
	
	/**
	 *  手机号断层 jquery扩展
	 */
	$.fn.mobileInput = function(){
		var obj = $(this);
		if(obj.val() != ''){
			if (obj.val().length <= 8) {
				obj.val(obj.val().replace(/\s/g, '').replace(/(\d{3})(?=\d)/, "$1 "));
			} else {
				obj.val(obj.val().replace(/\s/g, '').replace(/(\d{3})(?=\d)(\d{4})(?=\d)/, "$1 $2 "));
			}
		} 
		obj.bind('keyup', function(event){
			var startPos = getLocation($(this)[0]);
			// 只允許數字
			this.value = this.value.replace(/\D/g, '');
			var temp = this.value;
			if (this.value.length < 8) {
				this.value = this.value.replace(/\s/g, '').replace(/(\d{3})(?=\d)/, "$1 ");
			} else {
				this.value = this.value.replace(/\s/g, '').replace(/(\d{3})(?=\d)(\d{4})(?=\d)/, "$1 $2 ");
			}
			/*var spaceNum = 0; 
			if(event.keyCode != 8){
				spaceNum = this.value.length - temp.length;
			}
			setLocation($(this)[0], startPos + spaceNum);*/
			
			var changePos = getLocation($(this)[0]);
			var flag2;
			if(this.value.length >= 5){
				if(((startPos+1) == changePos) && !(this.value[startPos+1])){
					flag2 = true;
				}
				
			}
			if((startPos == changePos) || flag2 ){
				setLocation($(this)[0], this.value.length);
				return false;
			}else{
				var spaceNum = 0; 
				if((startPos == 4)||(startPos == 9)){
					spaceNum = 1;
				}
				setLocation($(this)[0], startPos+ spaceNum);
				return false;
			}
			
		})
	}
		
	/**
	 * 列表显示格式化 jquery扩展
	 */ 
	$.fn.mobileList = function(){
		return this.each(function(){
			$(this).text($(this).text().replace(/\s/g, '').replace(/(\d{3})(?=\d)(\d{4})(?=\d)/g, "$1 $2 "));
		})
	}
	
	/**
	 * 身份证号断层 jquery扩展
	 */
	$.fn.idCardInput = function(){
		var obj = $(this);
		if(obj.val() != ''){
			if (obj.val().length <= 15) {
				obj.val(obj.val().replace(/\s/g, '').replace(/(\d{6})(?=\d)/, "$1 "));
			} else {
				obj.val(obj.val().replace(/\s/g, '').replace(/(\d{6})(?=\d)(\d{8})(?=\d)/, "$1 $2 "));
			}
		} 
		obj.bind('keyup', function(event){
			var startPos = getLocation($(this)[0]);
			// 只允許數字
			this.value = this.value.replace(/[^0-9xX]/g, '');
			var temp = this.value;
			if (this.value.length <= 15) {
				this.value = this.value.replace(/\s/g, '').replace(/(\d{6})(?=\d)/, "$1 ");
			} else {
				this.value = this.value.replace(/\s/g, '').replace(/(\d{6})(?=\d)(\d{8})(?=\d)/, "$1 $2 ");
			}
			
			var spaceNum = 0; 
			if(event.keyCode != 8){
				spaceNum = this.value.length - temp.length;
			}
			setLocation($(this)[0], startPos + spaceNum);
		})
	}
		
	// 列表显示格式化
	$.fn.idCardList = function(){
		return this.each(function(){
			$(this).text($(this).text().replace(/\s/g, '').replace(/(\d{3})(?=\d)(\d{4})(?=\d)/g, "$1 $2 "));
		})
	}
	
	/**
	 * 只允许输入数字
	 * @param isDot : 是否允许点 默认不允许
	 */
	$.fn.numberInput = function(isDot){
		var obj = $(this);
		obj.bind('keyup', function(event){
			var startPos = getLocation($(this)[0]);
			// 只允許數字
			var beforVal = this.value;
			if (isDot) {
				this.value = this.value.replace(/[^\d\.]/g, "");
			} else {
				this.value = this.value.replace(/[^\d]/g, "");
			}
			
			var dLength = beforVal.length - this.value.length;
			startPos = startPos - dLength;
			setLocation($(this)[0], startPos);
		})
	}
	
	/**
	 * 只允许输入2位小数点的数字
	 * 
	 */
	$.fn.floatInput = function(){
		var obj = $(this);
		obj.bind('keyup', function(event){
			var startPos = getLocation($(this)[0]);
			// 只允許數字
			var beforVal = this.value;
			this.value = this.value.replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/^0+([1-9])/, "$1").replace(/^0+$/, "0");
			this.value = this.value.replace(/\.{2,}/g, ".").replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
			this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
			var dLength = beforVal.length - this.value.length;
			startPos = startPos - dLength;
			setLocation($(this)[0], startPos);
		})
	}
	
	/**
	 * 普通密码框 只允许输入数字、字母和特殊字符
	 */
	$.fn.pwdInput = function(){
		var obj = $(this);
		obj.bind('keyup', function(event){
			var startPos = getLocation($(this)[0]);
			var beforVal = this.value;
			this.value = this.value.replace(/[^0-9a-zA-Z_-]/g, "");
			var dLength = beforVal.length - this.value.length;
			startPos = startPos - dLength;
			setLocation($(this)[0], startPos);
		})
	}
	
	function getLocation(elm) {  
	    if(elm.createTextRange) { // IE               
	        var range = document.selection.createRange();                 
	        range.setEndPoint('StartToStart', elm.createTextRange());                 
	        return range.text.length;  
	    } else if(typeof elm.selectionStart == 'number') { // Firefox  
	        return elm.selectionStart;  
	    }  
	}  
	  
	function setLocation(elm, n) {  
	    if(n > elm.value.length)  
	        n = elm.value.length;  
	    if(elm.createTextRange) {   // IE  
	        var textRange = elm.createTextRange();  
	        textRange.moveStart('character', n);              
	        textRange.collapse();         
	        textRange.select();       
	    } else if(elm.setSelectionRange) { // Firefox  
	        elm.setSelectionRange(n, n);  
	        elm.focus();  
	    }  
	}  

	/**
	 * 手机号码断层显示 如： 136 1234 1235
	 */
	inputFault.mobile = function($input){
		init($input, 0);
	}
	
	/**
	 * 银行卡号断层显示 如： 6223 5466 3456 1234 123
	 */
	inputFault.bankCard = function($input){
		init($input, 1);
	}
	
	/**
	 * 身份证断层显示 如： 4325 2419 9004 2983 36
	 */
	inputFault.idCard = function($input){
		init($input, 2);
	}
	
	/**
	 * 根据类型初始化
	 * type: 0: 手机号码，1：银行卡号，2：身份证号码
	 */
	function init($input, type){
		var ele = $($input);
		$.bindEvent(ele, function(event){
			var val = ele.val();
			val = val.replace(/[^\d]/g, ""); // 去除非数字字符
			var keyCode = event.which;
			// 返回键不处理
			if (keyCode != 8) {
				type += "";
				switch (type) {
				case "0":
					ele.val(mobileFunc(val));
					break;
				case "1":
					ele.val(bankCardFunc(val));
					break;
				case "2":
					ele.val(idCardFunc(val));
					break;
				default:
					break;
				}
				
			}
		}, "keydown");
	}
	
	function mobileFunc(val){
		val = val.replace(/(\d{3})/, "$1 "); // 在字符串3位数字后插入空格空格
		val = val.replace(/(\d{4})/, "$1 "); // 经过上一步后，空格后面的4位数字后面插入空格
		return val;
	}
	
	function bankCardFunc(val){
		return val.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 "); // 每隔4位插入一个空格
	}
	
	function idCardFunc(val){
		val = val.replace(/(\d{6})/, "$1 "); 
		val = val.replace(/(\d{14})/g, "$1 "); 
		return val;
		
	}
});