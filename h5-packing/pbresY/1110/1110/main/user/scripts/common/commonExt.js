/**
 * @author 汪卫中
 * 
 * 描述：常用公共方法
 */
define(function(require, exports, module){ 
	var commService = require("commService").getInstance();//用户服务接口类
	var constants = require("constants");//常量类
	//require("endecryptUtils");
	/**
	 * @author 汪卫中
	 * 
	 * 描述：密码加密
	 */
	function rsaEncrypt(param, backCall){
		commService.getRSAKey({}, function(data){
			var results = getReqResultList(data, false, true);
			if (results && results.length > 0) {
				var result = results[0];
				var modulus = result.modulus;
			    var publicExponent = result.publicExponent;
			    var pwdParam = {};
			    for (items in param){
			    	var fieldName = param[items] ;
			    	if(fieldName){
			    		//密码加密，添加时间戳
						var rsa_latest_time = result["@rsa_latest_time"];
						var rsastring = param[items] + constants.rsaEncryptSign.CONNECT + rsa_latest_time;
						var pwd = $.endecryptUtils.rsaEncrypt(modulus, publicExponent, rsastring);

						// 把入参对象的key值作为返回对象的key值
				    	pwdParam[items] = pwd;
			    	}
				}
				if(backCall){
					backCall(pwdParam);
				}
			}
		}, {"isLastReq" : false});
	}
	
	/**
	 * 功能： 根据data返回数据集list，查询出错则提示
	 * @author 汪卫中
	 * @param data: 后台返回数据集
	 * @param notShowError 是否显示错误信息，默认显示
	 * @param closeLoad 是否需要手动关闭加载层 默认不需要 false
	 * @returns result: 1、如果是分页请求时返回的结果里面包含数据集【dataList】和总页数【totalPages】
	 * 					2、非分页请求直接返回结果集
	 */
	function getReqResultList(data, notShowError, closeLoad, errorCallBack) { 
		var result = {};
		if(data){
			var error_no = data.error_no;
			var error_info = data.error_info;
			if(error_no == 0){
				var results = data.results;
				if (results && results.length > 0) {
					var resultsOne = results[0];
					if (resultsOne.data) { 
						// 分页数据需要返回结果列表和总页数
						result.dataList = resultsOne.data; // 数据结果列表
						result.totalPages = resultsOne.totalPages; // 总页数
					} else { 
						// 非分页数据直接返回结果列表
						result = results;
					}
				}
			}else{
				// 执行错误回调
				if (errorCallBack) {
					errorCallBack();
				}
				// 显示错误信息
				if (!notShowError) {
					// 更改系统提示
					$.alert(error_info);

					//errorTip(error_info);
				}
			}
		}else{
			if(!notShowError){
				$.alert("网络异常， 请重新尝试");
			}
		}
		
		return result;
	}
	
	/**
	 * 功能： 根据data返回数据集list，查询出错则提示
	 * @author 汪卫中
	 * @param data: 后台返回数据集
	 * @param notShowError 是否显示错误信息，默认显示
	 * @param closeLoad 是否需要手动关闭加载层 默认不需要 false
	 * @returns result: 1、如果是分页请求时返回的结果里面包含数据集【dataList】和总页数【totalPages】
	 * 					2、非分页请求直接返回结果集
	 */
	function getReqDataList(data, notShowError, closeLoad, errorCallBack) { 
		var result = {};
		if(data){
			var error_no = data.error_no;
			var error_info = data.error_info;
			if(error_no == 0){
				var results = data.results[0].data;
				if (results && results.length > 0) {
						// 分页数据需要返回结果列表和总页数
					if(results){
						result.dataList = results; // 数据结果列表
						result.totalPages = data.results[0].totalPages; // 总页数
					} else { 
						// 非分页数据直接返回结果列表
						result = results;
					}
				}
			}else{
				// 执行错误回调
				if (errorCallBack) {
					errorCallBack();
				}
				// 显示错误信息
				if (!notShowError) {
					// 更改系统提示
					$.alert(error_info);
					//errorTip(error_info);
				}
			}
		}else{
			if(!notShowError){
				$.alert("网络异常， 请重新尝试");
			}
		}
		
		return result;
	}
	
	
	/**
	 * 判断用户是否登录【仅前台校验】
	 */
	function getNewsList(param,callBackFuc){
		var newshtml = "";//新闻列表DOM拼接
		var callback = function(data){  
	    	var results = getReqDataList(data);
	    	var datalist = results.dataList;//新闻信息数组
	    	var totalPage = results.totalPages; //总页码数
//	    	if (datalist && datalist.length > 0) //成功回调
//	        {
	            if (callBackFuc) {
		    		callBackFuc(datalist,totalPage);
				}
//	        }
	    	
	    };
	    var ctrlParam = {};
	    commService.getNewsList(param,callback,ctrlParam);
	    
	}
	

	/**
	 * 将数组倒序
	 */
	function resetReverse(oldArrayObj){
		var newArray = [];
		if (oldArrayObj instanceof Array) {
			if (oldArrayObj.length) {
				newArray = oldArrayObj.reverse();
			}
		}
		return newArray;
	}
	
	var commonUtils = {
		"rsaEncrypt": rsaEncrypt, // 密码加密
		"getReqResultList": getReqResultList, // 所有请求返回值统一处理。返回结果集
		"getReqDataList": getReqDataList, // 所有请求返回值统一处理。返回结果集
		"resetReverse":resetReverse, //将数组倒序
		"getNewsList":getNewsList  // 查询资讯，今日关注等列表
	
	};

	// 暴露对外的接口
	module.exports = commonUtils;
});