/**
 * 字符串工具类
 */
define(function(require, exports, module) {
	var appValidatorUtil = require("validatorUtil"); // 底层框架校验类
	
	/**
	 * 描述：金额格式化显示，如：6123432.24 -> 6,123,432.24
	 * 
	 * @author 汪卫中
	 * @param money: 金额
	 * @param decimal: 保留的小数位
	 */
	function moneyFormat(money, decimal){
		// 小数位默认为2位，大于20位时强制改为2位。
		decimal = (typeof (decimal) == 'number') && decimal > 0 && decimal <= 20 ? decimal : 2;   
		
		// 去掉字符串中除数字、点号、负号外的其他字符
		if (money) {
			money = cusParseFloat((money + "").replace(/[^\d\.-E]/g, "")).toFixed(decimal) + ""; 
			
			var re = /^(-?\d+)(\d{3})(\.?\d*)/;  
			
			while(re.test(money)){  
				money = money.replace(re, "$1,$2$3");
		    } 
		}else{
			money = "--";
		}
		          
		return money; 
	}
	
	/**
	 * 描述：还原金额格式，如：6,123,432.24 -> 6123432.24
	 * 
	 * @author 汪卫中
	 * @param money: 待还原的金额字符串
	 */
	function restoreMoney(money){
		if (money) {
			return parseFloat(money.replace(/[^\d\.-]/g, ""));
		}
		return money;
	}
	
	/**
	 * 描述：保留指定位小数
	 * 
	 * @author 汪卫中
	 * @param numStr: 数字字符串
	 * @param digit: 需要保留的位数
	 */
	function numberDecimal(numStr, digit){
		if (appValidatorUtil.isNumeric(numStr)) {
			digit = digit ? digit : 0;
			return parseFloat(numStr).toFixed(digit);
		}
		
		return numStr;
	}
	
	/**
	 * 描述：手机号码隐藏中间4位 如：13212341234 -> 132****1234
	 * 
	 * @author 汪卫中
	 * @param mobile: 手机号码
	 * @returns 如果入参字符串长度小于11位时 返回原字符串。
	 */
	function hideMobilePos(mobile){
		// 校验是否为手机号码
		if (mobile) {
			mobile = mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
		}
		return mobile;
	}
	
	/**
	 * 描述：身份证号码隐藏后面8位 如：432524199003378776 -> 4325241990********
	 * 
	 * @author 汪卫中
	 * @param mobile: 身份证号码
	 * @returns 
	 */
	function hideIDCardPos(cardNum){
		if (cardNum) {
			cardNum = cardNum.replace(/(\d+)\d{8}/, '$1********');
		}
		
		return cardNum;
	}
	
	/**
	 * 描述：邮箱显示前2位+固定5个星号+@域名：kk*****@163.com。
	 * 
	 * @author 汪卫中
	 * @param mobile: 邮箱
	 * @returns 
	 */
	function hideEmailPos(email){
		if (email) {
			email = email.replace(/(.{2}).*(@{1}.*)/, "$1*****$2");
		}
		
		return email;
	}
	
	/**
	 * 描述：资金账号隐藏第4-7位 如：1040027011 -> 104****7011
	 * 
	 * @author 汪卫中
	 * @param fundAcct: 资金账号
	 * @returns 
	 */
	function hideFundAcctPos(fundAcct){
		if (fundAcct) {
			fundAcct = fundAcct.replace(/(\d{2})\d{4}(\d+)/, '$1 **** $2');
		}
		return fundAcct;
	}
	
	/**
	 * 描述：银行卡号显示前4位+固定8个星号+后4位：6226 ******** 2313
	 * 
	 * @author 汪卫中
	 * @param bankCard: 银行卡号
	 * @returns 
	 */
	function hideBankCardPos(bankCard){
		if (bankCard) {
			bankCard = bankCard.replace(/(\d{4})\d+(\d{4})/, '$1 ******** $2');
		}
		
		return bankCard;
	}
	
	/**
	 * 描述：只显示姓隐藏2位：张**
	 * 
	 * @author 汪卫中
	 * @param userName: 用户姓名
	 * @returns 
	 */
	function hideUserNamePos(userName){
		userName = userName ? $.trim(userName) : ""; 
		
		if (userName && userName.length > 1) {
			var nameTemp = userName.substring(0, 1);
			for (var i = 1; i < userName.length; i++) {
				nameTemp += "*";
			}
			return nameTemp;
		}
		
		return userName;
	}
	
	/**
	 * 描述：重写 javascript parseInt 方法
	 * 
	 * @author 汪卫中
	 * @param str: 待转换的字符串，
	 * @param dftVal: 如果str为空或者parseInt解析结果为NaN时 返回的默认值 ，不传默认返回0
	 * @returns 
	 */
	function cusParseInt(str, dftVal){
		dftVal = dftVal || 0;
		var result = dftVal;
		if (str) {
			result = parseInt(str, 10) || dftVal; // 使用十进制进行转换
		}
		return result;
	}
	
	/**
	 * 描述：重写 javascript parseInt 方法
	 * 
	 * @author 汪卫中
	 * @param str: 待转换的字符串，
	 * @param dftVal: 如果str为空或者parseFloat解析结果为NaN时 返回的默认值 ，不传默认返回0
	 * @returns 
	 */
	function cusParseFloat(str, dftVal){
		dftVal = dftVal || 0;
		var result = dftVal;
		if (str) {
			result = parseFloat(str, 10) || dftVal; // 使用十进制进行转换
		}
		return result;
	}
	
	/**
	 * 描述： 数字大于一万时，以万为单位显示 如： 12345623 -> 1,234.56万
	 * @author 汪卫中
	 * @param num: 数字字符串
	 * @param dft: 字符串为空时默认显示值
	 */
	function dealBigNumber(num, dft){
		if(appValidatorUtil.isEmpty(num)){
			num = dft || "--";
    	}else {
    		num = cusParseFloat(num);
        	if(num >= 1000 && num < 10000 ){
        		num = cusParseFloat(num).toLocaleString();
        	}else if( num >= 10000){
        		num = (num / 10000);
        		num = cusParseFloat(num).toLocaleString();
        		num = num + "万";
        	} else {
        		num = num.toLocaleString();
        	}
    	}
    	return num;
	}
	
	/**
	 * 描述：去掉字符串所有空格
	 * @author 汪卫中
	 * @param str: 字符串
	 */
	function trimAll(str){
		if (str) {
			return str.replaceAll(" ", "");
		}
		return str;
	}
	
	/**
	 * 描述：浮点数相除
	 * @author 牛胜伟
	 * @param float: 浮点数
	 */
    function accDiv(num1,num2){
       var t1,t2,r1,r2;
       try{
           t1 = num1.toString().split('.')[1].length;
       }catch(e){
           t1 = 0;
       }
       try{
           t2=num2.toString().split(".")[1].length;
       }catch(e){
           t2=0;
       }
       r1=Number(num1.toString().replace(".",""));
       r2=Number(num2.toString().replace(".",""));
       return (r1/r2)*Math.pow(10,t2-t1);
    };
    /**
	 * 描述：浮点数相乘
	 * @author 牛胜伟
	 * @param float: 浮点数
	 */
    function accMul(arg1,arg2){ 
        var m=0,s1=arg1.toString(),s2=arg2.toString(); 
        try{m+=s1.split(".")[1].length}catch(e){} 
        try{m+=s2.split(".")[1].length}catch(e){} 
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
    } ;
    /**
	 * 描述：浮点数相减
	 * @author 牛胜伟
	 * @param float: 浮点数
	 */
    function accSub(num1,num2){
       var r1,r2,m;
       try{
           r1 = num1.toString().split('.')[1].length;
       }catch(e){
           r1 = 0;
       }
       try{
           r2=num2.toString().split(".")[1].length;
       }catch(e){
           r2=0;
       }
       m=Math.pow(10,Math.max(r1,r2));
       n=(r1>=r2)?r1:r2;
       return (Math.round(num1*m-num2*m)/m).toFixed(n);
    };
    /**
	 * 描述：浮点数相加
	 * @author 牛胜伟
	 * @param float: 浮点数
	 */
    function accAdd(num1,num2){
       var r1,r2,m;
       try{
           r1 = num1.toString().split('.')[1].length;
       }catch(e){
           r1 = 0;
       }
       try{
           r2=num2.toString().split(".")[1].length;
       }catch(e){
           r2=0;
       }
       m=Math.pow(10,Math.max(r1,r2));
       // return (num1*m+num2*m)/m;
       return Math.round(num1*m+num2*m)/m;
    };
	
	var stringUtils = {
		"moneyFormat" : moneyFormat, // 金额格式化显示，如：6123432.24 -> 6,123,432.24
		"restoreMoney" : restoreMoney, // 还原金额格式，如：6,123,432.24 -> 6123432.24
		"numberDecimal" : numberDecimal, // 保留指定位小数
		"hideMobilePos" : hideMobilePos, // 手机号码隐藏中间4位 如：13212341234 -> 132****1234
		"hideIDCardPos" : hideIDCardPos, // 身份证号码隐藏后面8位 如：432524199003378776 -> 4325241990********
		"hideEmailPos" : hideEmailPos, // 邮箱显示前2位+固定5个星号+@域名：kk*****@163.com。
		"hideFundAcctPos" : hideFundAcctPos, // 资金账号隐藏第4-7位 如：1040027011 -> 104****7011
		"hideBankCardPos" : hideBankCardPos, // 银行卡号显示前4位+固定8个星号+后4位：6226 ******** 2313
		"hideUserNamePos" : hideUserNamePos, // 姓名只显示姓隐藏2位：张**
		"parseInt" : cusParseInt, // 重写parseInt 方法
		"parseFloat" : cusParseFloat, // 重写parseFloat 方法
		"trimAll" : trimAll, // 去掉字符串所有空格
		"accAdd"  :accAdd,//浮点数相加
		"accSub"  :accSub,//浮点数相加
		"accMul"  :accMul,//浮点数相加
		"accDiv"  :accDiv,//浮点数相加
		"dealBigNumber" : dealBigNumber // 数字大于一万时，以万为单位显示 如： 12345623 -> 1,234.562万
	};

	//暴露对外的接口
	module.exports = stringUtils;
});