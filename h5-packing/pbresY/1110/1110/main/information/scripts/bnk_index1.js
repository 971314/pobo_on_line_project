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
	var isInit = true;
	var totalRows; //总页数
	//	var config;
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
		var announcementParam = {
			"category_id": "noticeIndex",
			"token": "1111",
			"pageNum": pageNum,
			"pageSize": 10
		}
		queryAnnouncement(announcementParam);
	}

	//获取公告
	function queryAnnouncement(Announcementparam, isInit) {
		var param = Announcementparam;
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
					$(pageId + " .zx_list").html(htmls);
				} else {
					$(pageId + " .zx_list").append(htmls);
				}
				initVIscroll();
			} else {
				$.alert("公告获取异常:" + resultVo.error_info);
			}
		}); //, {"isShowWait": false}
	}

	function initVIscroll() {
		if(!myVIscroll) {
			var show_height = $(window).height() - $(pageId + " .header").height();
			console.log(show_height);
			var config = {
				"isPagingType": false,
				"visibleHeight": show_height, //要理解这个属性表示的含义，表示中间显示区域的高度。累加的数据内容高度不超过这个高度，超出部分可以滑动
				"container": $(pageId + " #container_yourname"),
				"wrapper": $(pageId + " #wrapper_yourname1"),
				"downHandle": function() {
					isInit = true;
					pageNum = 1;
					var announcementParam = {
						"category_id": "noticeIndex",
						"token": "1111",
						"pageNum": pageNum,
						"pageSize": 10
					}
					queryAnnouncement(announcementParam, isInit);
					//下拉回调处理
				},
				"upHandle": function() {

					isInit = false;
					if(pageNum < totalRows) {
						pageNum = pageNum + 1;
						var announcementParam = {
							"category_id": "noticeIndex",
							"token": "1111",
							"pageNum": pageNum,
							"pageSize": 10
						}
						queryAnnouncement(announcementParam, isInit);
					}else{
						$(pageId+'.visc_pullUp').hide();
					}

					//上拉回调处理

				}
			};
			myVIscroll = new VIscroll(config);
		} else {
			myVIscroll.refresh();
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
				queryNews(param);
				$(pageId + " .sub_tabnav").css("display", "none");
				$(pageId + " #FuturesNewsMenu").css("display", "block");
				$(pageId + "#FuturesNewsMenu li:eq(0)").addClass("active");

			} else if($(this).index() == "2") {
				param = {
					"Pcategory_id": "deposit",
					"category_id": "depositSun",
					"token": token,
					"pageNum": 1,
					"pageSize": 30
				}
				$(pageId + " .sub_tabnav").css("display", "none");
				$(pageId + " #depositMenu").css("display", "block");
				console.log($("#depositMenu").attr("id"));
				console.log($("#depositMenu ul li:eq(0)").attr("id"));
				$("#depositMenu li:eq(0)").addClass("active");
				queryAnnouncement(param);
			} else if($(this).index() == "4") {
				param = {
					"Pcategory_id": "futuresMReview",
					"category_id": "discMiddle",
					"token": token,
					"pageNum": 1,
					"pageSize": 30
				}
				$(pageId + " .sub_tabnav").css("display", "none");
				$(" #futuresMReviewMenu").css("display", "block");
				$(pageId + " .sub_tabnav li").removeClass("active");
				$("#futuresMReviewMenu li:eq(0)").addClass("active");
				queryAnnouncement(param);
			} else {
				param = {
					"Pcategory_id": $(this).attr("id"),
					"category_id": $(this).attr("id"),
					"token": token,
					"pageNum": 1,
					"pageSize": 30
				}
				$(pageId + " .sub_tabnav").css("display", "none");
				queryAnnouncement(param);
			}
			//			if($(this).index() == "3") {
			//				queryAnnouncement();
			//			} else {
			//				param = {
			//					"titleNo": titleNo[$(this).index()],
			//					"name": $(this).text()
			//				};
			//				queryNews(param);
			//			}

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
				var Pcategory_id = $(this).parent().parent().attr("id");
				Pcategory_id = Pcategory_id.substring(0, Pcategory_id.length - 4);
				console.log(Pcategory_id);
				announcementParam = {
					"Pcategory_id": Pcategory_id,
					"category_id": $(this).attr("id"),
					"token": token,
					"pageNum": 1,
					"pageSize": 30
				};
				queryAnnouncement(announcementParam);
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