//2016年11月24日14:43:36

define('information/scripts/index.js', function(require, exports, module) {
	var pageId = '#index';
	require('validatorUtils');
	var commonExt = require('commonExt');
	var common = require('common');
	var informationService = require("information/services/informationService").getInstance();
	var VIscroll = require("vIscroll"); //vIscroll别名已经配置到hSea中
	var myVIscroll = null;

	var contract, contractInterval, prevCustom, navScroll, newsData, newsCurrent, prevConfig;

	var mainConfig;
	var pbHQ, pbSYS, pbINFO, pbZX;
	var isPoboApp = typeof pbE != "undefined";
	var HISTORY = 9;
	var SELF = 100;
	var HOT = 100;
	var url_ids;
	var token;

	var pageNum = 1;
	var pageSize = 15;
	var isInit = true;
	var totalRows; //总页数
	var show_height ;

	var Pcategory_id;
	var category_id;

	//栏目编号
	var titleNo = new Array();
	titleNo[0] = ["10101"]; //今日要闻
	titleNo[1] = ["10301"]; //金融财经
	titleNo[2] = ["40102", "40202"]; //稀贵金属
	titleNo[3] = ["10401"]; //公司公告
	/**
	 * 初始化方法
	 */
	function init() {
		window.callback = function(message) {
			return callbackMsg(message);
		}
		if(isPoboApp) {
			pbHQ = pbE.HQ();
			pbSYS = pbE.SYS();
			pbZX = pbE.ZX();
			pbINFO = pbE.INFO();
		}

		//取token值
		var devoceInfo = JSON.parse(pbSYS.getDeviceJsonInfo());
		for(var key in devoceInfo) {
			if(key == 72) {
				token = devoceInfo[key];
			}
		}

		if($.validatorUtils.isNotEmpty($.getPageParam("ids")) && $.getPageParam("ids") == "10401") {
			$(" #pobo_zx").css("display", "none");
			$(pageId + " #container_yourname").css("display", "block");
			//公司公告
			Pcategory_id = $.getPageParam("Pcategory_id");
			category_id = $.getPageParam("category_id");
			$(pageId + " .parentMenu li").removeClass("active");
			$(pageId + " .sub_tabnav li").removeClass("active");
			//没子栏目
			if(Pcategory_id == "noticeIndex" || Pcategory_id == "researchReport" || Pcategory_id == "outerDiscPrice") {
				$(pageId + " .sub_tabnav").css("display", "none");
				$(pageId + " #" + Pcategory_id).addClass("active");
			} else {
				//控制子栏目样式
				$(pageId + " #" + Pcategory_id).addClass("active");
				$(pageId + " #" + category_id).parents().parent().css("display", "block");
				$(pageId + " #" + category_id).addClass("active");
			}

			var announcementParam = {
				"category_id": category_id,
				"token": token,
				"pageNum": pageNum,
				"pageSize": pageSize
			}
			queryAnnouncement(announcementParam, true);
		} else {

			$(" #pobo_zx").css("display", "none");
			$(pageId + " #container_yourname").css("display", "block");
			$(pageId + " .sub_tabnav li").removeClass("active");
			$(pageId + " .parentMenu li").removeClass("active");
			$(pageId + " #FuturesNews").addClass("active");
			$(pageId + " #FuturesNewsMenu").css("display", "block");

			if($.getPageParam("ids") == "10101" || $.getPageParam("ids") == null) {
				$(pageId + " #FuturesNewsMenu ul li:eq(0)").addClass("active");
			} else if($.getPageParam("ids") == "10301") {
				$(pageId + " #FuturesNewsMenu ul li:eq(1)").addClass("active");
			} else {
				$(pageId + " #FuturesNewsMenu ul li:eq(2)").addClass("active");
			}
			queryNews();
		}

	}

	//根据资讯编号查询数据列表
	function queryNews(data) {
		$(" #pobo_zx").css("display", "block");
		$(pageId + " #container_yourname").css("display", "none");

		var param = {
			"count": 10,
			"ids": "",
			"name": ""
		};
		if($.validatorUtils.isNotEmpty(data)) {
			param = data;
		} else {
			if($.validatorUtils.isNotEmpty($.getPageParam("ids")) && $.getPageParam("ids") != "10401") {
				if($.getPageParam("ids") == "10101") {
					$(pageId + " .parentMenu li").removeClass("active");
					$(pageId + " .parentMenu").find('li').eq(0).addClass("active");
					param = {
						"count": 10,
						"ids": titleNo[0],
						"name": "今日要闻"
					}
				} else if($.getPageParam("ids") == "10301") {
					$(pageId + " .parentMenu li").removeClass("active");
					$(pageId + " .parentMenu").find('li').eq(1).addClass("active");
					param = {
						"count": 10,
						"ids": titleNo[1],
						"name": "金融财经"
					}
				} else if($.getPageParam("ids") == "10401") {
					//公司公告
					$(pageId + " .parentMenu li").removeClass("active");
					$(pageId + " .parentMenu").find('li').eq(3).addClass("active");
					queryAnnouncement();
				} else {
					$(pageId + " .parentMenu li").removeClass("active");
					$(pageId + " .parentMenu").find('li').eq(2).addClass("active");
					param = {
						"count": 10,
						"ids": titleNo[2],
						"name": "稀贵金属"
					}
				}
			} else {
				param = {
					"count": 10,
					"ids": titleNo[0],
					"name": "今日要闻"
				}
			}
		}

		url_ids = param.ids;
		if(isPoboApp)
			pbINFO.infoQueryListWithJson(JSON.stringify({
				type: 'mu',
				groupIDs: param.ids,
				doc: 'json',
				count: param.count
			}));
		else {
			var gp = {
				gcount: param.ids.length,
				count: param.count
			};
			for(var i = 0; i < gp.gcount; i++) {
				gp["group" + (i + 1)] = param.ids[i];
			}
			$.get(mainConfig.news.webservice, gp, function(result) {
				newsData[newsCurrent] = JSON.parse(result).Indexes.slice(0, param.count);
			});
		}
	}
	//接收资讯数据遍历展示
	function callbackMsg(message) {
		eval("newsList=" + message);
		htmls = "";
		if(newsList.moduleId == "90004") {
			var newsLists = newsList.jData.Indexes;
			$.each(newsLists, function(i, v) {
				var chageData = common.timeBucket(v.Pubtime);
				htmls += "<li id='" + v.ID + "' href='pobo:uncheck=1&pageId=900005&url=main/information/views/details.html?newsid=" + v.ID + "&url_ids=" + url_ids[0] + "'><p>" + v.Title + "</p><span class='time'>" + chageData + "</span></li>";
			});
			$(pageId + " #pobo_zx").html(htmls);
			initVIscroll();
			$('.visc_pullDown').hide();
			$('.visc_pullUp').hide();
		}
	}
	//获取公告
	function queryAnnouncement(announcementparam, isInit) {
		$(" #pobo_zx").css("display", "none");
		$(pageId + " #container_yourname").css("display", "block");
		$('.visc_pullDown').css("display", "none;");
		$('.visc_pullUp').css("display", "none;");
		var param = announcementparam;
		informationService.getAnnouncement(param, function(resultVo) {
			if(resultVo.error_no == 0) {
				totalRows = resultVo.results[0].totalRows;
				var htmls = "";
				var data = resultVo.results[0].data;
				$.each(data, function() {
					var news_short_date = common.timeBucket(this.news_date);
					htmls += "<li id='" + this.id + "' href='pobo:uncheck=1&pageId=900005&url=main/information/views/details.html?newsid=" + this.id + "&url_ids=" + titleNo[3] + "&Pcategory_id=" + param.Pcategory_id + "&category_id=" + param.category_id + "'><p>" + this.news_title + "</p><span class='time'>" + news_short_date + "</span></li>";
				});
				if(isInit) {
					$(pageId + " #container_yourname #zx").html(htmls);
				} else {
					$(pageId + " #container_yourname #zx").append(htmls);
				}
				initVIscroll();
				$('.visc_pullDown').hide();
				$('.visc_pullUp').hide();
			} else {
				$.alert("公告获取异常:" + resultVo.error_info);
			}
		}, {
			"isShowWait": false
		});
	}

	function initVIscroll() {
		show_height = $(window).height() - $(pageId + " .header").height();
		console.log(show_height);
		if(!myVIscroll) {
			var config = {
				"isPagingType": false,
				"visibleHeight": show_height, //要理解这个属性表示的含义，表示中间显示区域的高度。累加的数据内容高度不超过这个高度，超出部分可以滑动
				"container": $(pageId + " #container_yourname"),
				"wrapper": $(pageId + " #wrapper_yourname1"),
				"downHandle": function() {
					isInit = true;
					pageNum = 1;
					var announcementParam = {
						"category_id": category_id,
						"token": "1111",
						"pageNum": pageNum,
						"pageSize": pageSize
					}
					queryAnnouncement(announcementParam, isInit);
					//下拉回调处理
				},
				"upHandle": function() {
					isInit = false;
					if(pageNum < totalRows) {
						pageNum = pageNum + 1;
						var announcementParam = {
							"category_id": category_id,
							"token": "1111",
							"pageNum": pageNum,
							"pageSize": pageSize
						}
						queryAnnouncement(announcementParam, isInit);
					} else {
						$(pageId + '.visc_pullUp').hide();
					}
					//上拉回调处理
				}
			};
			myVIscroll = new VIscroll(config);
		} else {
				show_height = $(window).height() - $(pageId + " .header").height();
			var config = {
				"isPagingType": false,
				"visibleHeight": show_height, //要理解这个属性表示的含义，表示中间显示区域的高度。累加的数据内容高度不超过这个高度，超出部分可以滑动
			}
			myVIscroll.refresh(config);
		}
	}

	/*
	 * 页面事件绑定
	 */
	function bindPageEvent() {
		//绑定返回键
		$.bindEvent($(pageId + " .icon_back"), function() {
			window.location.href = 'goBack';
		});
		//绑定登录关闭按钮
		$.bindEvent($(pageId + " #search_btn"), function() {
			alert("搜索");
		});
		//切换父级栏目
		$.bindEvent($(pageId + " .parentMenu li"), function() {
			$(pageId + " .parentMenu li").removeClass("active");
			$(this).addClass("active");
			var param;
			if($(this).index() == "0") {
				$(pageId + " .sub_tabnav").css("display", "none");
				$(pageId + " #FuturesNewsMenu").css("display", "block");
				$("#FuturesNewsMenu li:eq(0)").addClass("active");
				queryNews(param);
			} else if($(this).index() == "2") {
				Pcategory_id = "deposit";
				category_id = "depositSun";
				param = {
					"Pcategory_id": "deposit",
					"category_id": "depositSun",
					"token": token,
					"pageNum": 1,
					"pageSize": pageSize
				}
				$(pageId + " .sub_tabnav").css("display", "none");
				$(pageId + " #depositMenu").css("display", "block");
				console.log($("#depositMenu").attr("id"));
				console.log($("#depositMenu ul li:eq(0)").attr("id"));
				$("#depositMenu li:eq(0)").addClass("active");
				queryAnnouncement(param, true);
			} else if($(this).index() == "4") {
				Pcategory_id = "futuresMReview";
				category_id = "discMiddle";
				param = {
					"Pcategory_id": "futuresMReview",
					"category_id": "discMiddle",
					"token": token,
					"pageNum": 1,
					"pageSize": pageSize
				}
				$(pageId + " .sub_tabnav").css("display", "none");
				$(" #futuresMReviewMenu").css("display", "block");
				$(pageId + " .sub_tabnav li").removeClass("active");
				$("#futuresMReviewMenu li:eq(0)").addClass("active");
				queryAnnouncement(param, true);
			} else {
				Pcategory_id = $(this).attr("id");
				category_id = $(this).attr("id");
				param = {
					"Pcategory_id": $(this).attr("id"),
					"category_id": $(this).attr("id"),
					"token": token,
					"pageNum": 1,
					"pageSize": pageSize
				}
				$(pageId + " .sub_tabnav").css("display", "none");
				queryAnnouncement(param, true);
			}
		});
		//切换子级栏目
		$.bindEvent($(pageId + " .sub_tabnav li"), function() {
			$(pageId + " .sub_tabnav li").removeClass("active");
			$(this).addClass("active");
			var announcementParam;
			if($(this).parent().parent().attr("id") == "FuturesNewsMenu") {
				if($(this).attr("id") == "finance") {
					//金融财经
					announcementParam = {
						"count": 10,
						"ids": titleNo[1],
						"name": "金融财经"
					}
				} else if($(this).attr("id") == "preciousMetals") {
					//稀贵金属
					announcementParam = {
						"count": 10,
						"ids": titleNo[2],
						"name": "稀贵金属"
					}
				} else {
					//今日要闻
					announcementParam = {
						"count": 10,
						"ids": titleNo[0],
						"name": "今日要闻"
					}
				}
				queryNews(announcementParam);
				//彭博数据
			} else {
				announcementParam = {
					"Pcategory_id": $(this).parent().parent().attr("id").substring(0, $(this).parent().parent().attr("id").length - 4),
					"category_id": $(this).attr("id"),
					"token": token,
					"pageNum": 1,
					"pageSize": pageSize
				};
				queryAnnouncement(announcementParam, true);
			}

			//			var param;
			//			if($(this).index() == "0") {
			//				queryNews(param);
			//				$(pageId + " .sub_tabnav").css("display", "none");
			//				$(pageId + " #FuturesNewsMenu").css("display", "block");
			//			} else if($(this).index() == "2") {
			//				queryAnnouncement();
			//				$(pageId + " .sub_tabnav").css("display", "none");
			//				$(pageId + " #BondMenu").css("display", "block");
			//			} else if($(this).index() == "4") {
			//				queryAnnouncement();
			//				$(pageId + " .sub_tabnav").css("display", "none");
			//				$(pageId + " #FuturesReviewMenu").css("display", "block");
			//			} else {
			//				queryAnnouncement();
			//				$(pageId + " .sub_tabnav").css("display", "none");
			//			}
		});

		//进入详情
		$.preBindEvent($(pageId + " .zx_list"), " li ", function() {
			window.open($(this).attr("href"));
		});
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