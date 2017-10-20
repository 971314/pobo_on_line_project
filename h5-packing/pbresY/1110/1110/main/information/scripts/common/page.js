/**
 * @描述: 分页
 * @作者: 60
 */
define("information/scripts/common/page.js",function(require, exports, module) {
	var businessUtil = require("businessUtil"),
		_pageId = " ";


	//全局变量
	var cPage = 1,//当前页
		tPage = 1,//总页数
		VIscroll = require("vIscroll"),
		myVIscroll = null;

	var parmFunc = {},
		serviceFunc = "",
		results = "",
		templet = "",
		totalPage = "",
		curPage = "",
		visibleHeight = "",
		error_no = "",
		pro_main = "",
		allrows="",
		func="",
		showNotData="",
		msg = "",
		funcName = '',
		isFirstShowNotData=true;

	/**
	 * 初始化
	 */
	function initFunc(param) {
		_pageId = getPageId();
		dynamicName = getPageId().replace("#",'').trim();
		//eval('myVIscroll_' + dynamicName + '=null');
		try{
			eval('myVIscroll_' + dynamicName)
		}catch(e){
//			console.info("未定义");
			eval('myVIscroll_' + dynamicName + '=null');
		}
//		console.info(dynamicName);
		parmFunc = param.parmFunc;
		serviceFunc = param.serviceFunc;
		funcName = param.funcName;
		results = param.results;
		templet = param.templet;
		totalPage = param.totalPage;
		curPage = param.curPage;
		visibleHeight = param.visibleHeight;
		error_no = param.error_no;
		pro_main = param.pro_main ? param.pro_main : $(_pageId + "#pro_main");
		allrows = param.allrows;
		msg = param.msg;
		func = param.func || "";
		showNotData = param.showNotData || "";
		initVIscrol();
		bindTitleEvent();
	}

	/** *************************【service方法】******************************************** */
	/**
	 * 调查询分页接口的方法
	 */
	function queryFunc(insertType) {
		var funcBack = function(resultVo) {
			try{
				eval('myVIscroll_' + dynamicName).refresh();
			}catch(e){
				//TODO handle the exception
			}
//			$(_pageId+".visc_pullDown").css({"display":"none"});
//			$(_pageId + ".visc_scroller").css("margin-top","40px");
			if (showNotData) {
				showMsg();
				showNotData(resultVo);
				return false;
			}
			func && func(resultVo);
			if( resultVo.error_no && eval(error_no) == resultVo.error_no ){
				showMsg();
				return false;
			}
			if ( !resultVo.info && (!resultVo.results || resultVo.results.length ==0 ||!eval(results) || 0 == eval(results+".length")) ) {
				showMsg();
				return false;
			}
			if( resultVo.allrows == 0){
				if(allrows){
					$(allrows).html("("+resultVo.allrows+")");
				}
				businessUtil.getNotData(pro_main, "暂无评论", "html",eval('myVIscroll_' + dynamicName),_pageId);
				return false;
			}
			if ( !resultVo.error_no || vError_no(resultVo)) {
				if(allrows){
					$(allrows).html("("+resultVo.allrows+")");
				}
				fillFunc(resultVo, insertType);
			}
		};
		eval(curPage + "=cPage");
		serviceFunc[funcName](parmFunc, funcBack);
	}
	/** *************************【绑定事件方法】******************************************* */

	/** *************************【拼接HTML方法】****************************************** */
	function fillFunc(resultVo,insertType) {
		businessUtil.htmlIsEmpty(insertType, pro_main);
		var data = eval(results); //获取results的集合
		var html = "";
		for (var i = 0; i < data.length; i++) {
			var result = data[i];
			html += templet(result);
		}
		pro_main.append(html);
		tPage = Math.ceil(eval(totalPage)); //数据的总页数
		visc_pullUpShow();
	}
	/** *************************【其他方法：插件、初始化、销毁、功能函数】***************************** */
	function initVIscrol() {
		destroy();
		if (!eval('myVIscroll_' + dynamicName)) {
			var config = {
				"isPagingType": false,
				"visibleHeight": eval(visibleHeight),
				"container": $(_pageId + " #container_yourname"),
				"wrapper": $(_pageId + " #wrapper_yourname"),
				"downHandle": function() {
					//下拉回调处理
					cPage = 1;
					isFirstShowNotData=true;
					queryFunc("html");
				},
				"upHandle": function() {
					//上拉回调处理
					if (cPage < tPage) //判断当前页数是不是小于总页数
					{
						cPage++;
						queryFunc("append");
						isFirstShowNotData=true;
					}else if(cPage ==1){
						cPage++;
						showMsg();
					} else {
						showMsg();
					}
				}
			};
			eval('myVIscroll_' + dynamicName + '= new VIscroll(config)');
		} else {
			if (eval('myVIscroll_' + dynamicName)) {
				eval('myVIscroll_' + dynamicName).refresh();
			}
		}
		queryFunc("html");
	}


	/**
	 * 下拉刷新 隐藏|显示   并刷新滑动组件
	 */
	function visc_pullUpShow() {
		if (cPage < tPage) //判断当前页数是不是小于总页数
		{
			$(_pageId + ".visc_pullUp").show();
		} else {
			$(_pageId + ".visc_pullUp").hide();
		}
		eval('myVIscroll_' + dynamicName.trim()+'.refresh()');
	}

	function showMsg(){
		if (cPage == 1) {
			businessUtil.getNotData(pro_main, msg, "html",eval('myVIscroll_' + dynamicName),_pageId);
		} else {
			if (isFirstShowNotData) {
				pro_main.append("<p style='text-align: center;'>已加载到最后一页</p>");
				visc_pullUpShow();
				isFirstShowNotData=false;
			}
		}
		eval('myVIscroll_' + dynamicName).refresh();
	}

	function getVIscroll(){
		var dynamicName = getPageId().replace("#",'').trim();
		try{
			eval('myVIscroll_' + dynamicName)
		}catch(e){
//			console.info('myVIscroll_' + dynamicName + "未定义，开始初始化");
			eval('myVIscroll_' + dynamicName + '=null');
		}
		return eval('myVIscroll_' + dynamicName);
	}

	//点击标题栏回到顶部
	function bindTitleEvent(){
		$.bindEvent($(_pageId + "header .header_inner"),function(e){
			 var wrapperObj = getVIscroll().getWrapperObj();
				wrapperObj.scrollTo(0, 0, 100);
		},'click');
	}
	/** ******************************************************************************* */

	/**
	 * 销毁
	 */
	function destroy() {
		if (eval('myVIscroll_' + dynamicName)) {
			eval('myVIscroll_' + dynamicName).destroy();
			eval('myVIscroll_' + dynamicName + '=null');
		}

		cPage = 1;
		tPage = 1;
		isFirstShowNotData = true;
	}

	var page = {
		"initFunc": initFunc,
		"destroy": destroy,
		"myVIscroll":getVIscroll
	};

	module.exports = page;
});
