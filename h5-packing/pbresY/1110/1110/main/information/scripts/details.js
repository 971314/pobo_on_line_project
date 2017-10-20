//2016年11月24日14:43:36

define('information/scripts/details.js', function(require, exports, module) {
	var pageId = '#details ';
	require('validatorUtils');
	var commonExt = require('commonExt');
	var common = require('common');
	var informationService = require("information/services/informationService").getInstance();
	var newsid;
	var url_ids;
	var contract, contractInterval, prevCustom, navScroll, newsData, newsCurrent, prevConfig;

	var mainConfig;
	var pbHQ, pbSYS, pbINFO, pbZX;
	var isPoboApp = typeof pbE != "undefined";
	var HISTORY = 9;
	var SELF = 100;
	var HOT = 100;

	/**
	 * 初始化方法
	 */
	function init() {
		$(pageId + " .article_tit").css("border-bottom", "1px dashed #e2e2e2");
		//接收资讯编号
		url_ids = $.getPageParam("url_ids");
		newsid = $.getPageParam("newsid");

		window.callback = function(message) {
			message = message.replace(/\n/g, "<br>"), message = message.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"), message = message.replace(/\s/g, "&nbsp;");
			return callbackMsg(message);
		}
		if(isPoboApp) {
			pbHQ = pbE.HQ();
			pbSYS = pbE.SYS();
			pbZX = pbE.ZX();
			pbINFO = pbE.INFO();
		} else {}

		if(url_ids == "10401") {
			//公司公告
			queryAnnouncementDetail();
			queryAnnouncement();
		} else {
			queryNews();
			queryNewsList();
		}
	}

	//	给彭博发消息，模拟查询数据
	function queryNews() {
		var count = "3";
		var ids = url_ids;
		var paramnewsid = newsid;

		if(isPoboApp) {
			//查询资讯详情
			pbINFO.infoQueryDetailWithJson(JSON.stringify({
				doc: 'json',
				newsId: paramnewsid,
				type: 'mu'
			}));
		} else {}
	}

	function queryNewsList() {
		var count = "10";
		var ids = new Array()
		ids[0] = url_ids;

		if(isPoboApp) {
			//查询相关资讯
			pbINFO.infoQueryListWithJson(JSON.stringify({
				type: 'mu',
				groupIDs: ids,
				doc: 'json',
				count: count
			}));
		} else {}
	}

	function callbackMsg(data) {
		eval("newsData=" + data);
		if(newsData.moduleId == "90004") {
			console.log(newsData);
			var RelevantNews = "";
			if($.validatorUtils.isNotEmpty(newsData.jData.Indexes)) {
				var newsLists = newsData.jData.Indexes;
				console.log(newsLists);
				var num = 0;
				for(var i=0;i<newsLists.length;i++){
					var v=newsLists[i];
//				$.each(newsLists, function(i, v) {
					if(v.ID != newsid){
						if(num < 3) {
							var Pubtime = v.Pubtime.replace("&nbsp;"," ");
							var chageData = common.timeBucket(Pubtime);
							RelevantNews += "<li id='" + v.ID + "' href='pobo:uncheck=1&pageId=900005&url=main/information/views/details.html?newsid=" + v.ID + "&url_ids=" + url_ids + "'><p>" + v.Title.replace("&nbsp;"," ") + "</p><span class='time'>" + chageData + "</span></li>";
							num++;
						}else{
							console.log("2");
						}
					} 
					}
//				});
				$(pageId + ".zx_list").html(RelevantNews);
			} else if($.validatorUtils.isNotEmpty(newsData.jData.News)) {
				var NewResult = newsData.jData.News;
				var Pubtime =common.timeBucket(NewResult.Pubtime.replace("&nbsp;"," "));
				var chageText = "<pre>" + NewResult.Text + "</pre>";
				$(pageId + "#newTitle").text(NewResult.Title.replace("&nbsp;"," "));
				$(pageId + "#newDate").text(Pubtime);
				$(pageId + "#newSource").text(NewResult.Source.replace("&nbsp;"," "));
				$(pageId + "#newText").html(chageText);
			}
		}
	}

	function queryAnnouncementDetail() {
		var param = {
			"news_id": newsid
		}
		informationService.getAnnouncementDetail(param, function(resultVo) {
			if(resultVo.error_no == 0) {
				var results = resultVo.results[0];
				var chageText = "<pre>" + results.news_content + "</pre>";
				var Pubtime =common.timeBucket(results.news_date);
				$(pageId + "#newTitle").text(results.news_title);
				$(pageId + "#newDate").text(Pubtime);
				$(pageId + "#newSource").text(results.news_source);
				$(pageId + "#newText").html(chageText);
			} else {
				$.alert("公告获取异常:" + resultVo.error_info);
			}
		}, {
			"isShowWait": false
		});
	}

	function queryAnnouncement() {
		var token;
		//取token值
		var devoceInfo = JSON.parse(pbSYS.getDeviceJsonInfo());
		for(var key in devoceInfo) {
			if(key == 72) {
				token = devoceInfo[key];
			}
		}
		var param = {
			"category_id": $.getPageParam("category_id"),
			"token": token,
			"pageNum": 1,
			"pageSize": 4
		};
		informationService.getAnnouncement(param, function(resultVo) {
			if(resultVo.error_no == 0) {
				var list = resultVo.results[0].data;
				var htmls = "";
				var num = 0;
				if(list.length > 0) {
					$.each(list, function() {
						if(num < 3) {
							if(list.length == 1 && this.id == newsid) {
								$(pageId + " .zx_tabcont").hide();
							} else {
								if(this.id != newsid) {
									var chageDate = common.timeBucket(this.news_date);
									htmls += "<li id='" + this.id + "' href='pobo:uncheck=1&pageId=900005&url=main/information/views/details.html?newsid=" + this.id + "&url_ids=" + url_ids + "'><p>" + this.news_title + "</p><span class='time'>" + chageDate + "</span></li>";
									num++;
								}
							}
						}
					});
				} else {
					$(pageId + " .zx_tabcont").hide();
				}

				$(pageId + ".zx_list").html(htmls);
			} else {
				$.alert("公告获取异常:" + resultVo.error_info);
			}
		}, {
			"isShowWait": false
		});
	}

	/*
	 * 页面事件绑定
	 */
	function bindPageEvent() {
		//绑定返回按钮
		$.bindEvent($(pageId + " .icon_back"), function() {
			window.location.href = 'goBack';
		});
		//更多资讯
		$.bindEvent($(pageId + " .more_btn"), function() {
			window.open("pobo:uncheck=1&pageId=900005&url=main/information/views/index.html?ids=" +$.getPageParam("url_ids")+"&category_id="+$.getPageParam("category_id")+"&Pcategory_id="+$.getPageParam("Pcategory_id"));
		});
		//资讯详情
		$.preBindEvent($(pageId + " .zx_list"), " li", function() {
			window.open($(this).attr("href"));
		});

		$.bindEvent($(pageId + " article,h1"), function() {
			$(pageId + " .info_nav").attr("style", "display:none;");
		});
		//设置按钮
		$.bindEvent($(pageId + " #set_btn"), function() {
			if($(pageId + " .info_nav").attr("style") == "display:none;") {
				$(pageId + " .info_nav").attr("style", "display:block;");
			} else {
				$(pageId + " .info_nav").attr("style", "display:none;");
			}
		});

		//收藏
		$.bindEvent($(pageId + " #collection_btn"), function() {});

		//调节字体大小
		$.bindEvent($(pageId + " #font_size"), function() {
			$(pageId + " .shade_bg").show();
			$(pageId + " .font_layer").show();
			$(pageId + " .info_nav").attr("style", "display:none;");
		});

		//调大字体
		$.bindEvent($(pageId + " .font_ctbox .font_big"), function() {
			$(pageId + " .font_ctbox li a").removeClass("active");
			$(this).find("a").addClass("active");
			//重写样式表
			$(pageId + " pre").css("font-size", "18px");
			$(pageId + " .zx_tabcont .title").css("font-size", "20px");
			$(pageId + " #newTitle").css("font-size", "20px");
			$(pageId + " .article_tit p").css("font-size", "16px");
			$(pageId + " .more_btn a").css("font-size", "16px");
			$(pageId + " .zx_list li").css("font-size", "19px");
			return false;
		});

		//调适中字体
		$.bindEvent($(pageId + " .font_ctbox .font_normal"), function() {
			$(pageId + " .font_ctbox li a").removeClass("active");
			$(this).find("a").addClass("active");
			//重写样式表
			$(pageId + "pre").css("font-size", "16px");

			$(pageId + " .zx_tabcont .title, #newTitle").css("font-size", "18px");
			$(pageId + " .more_btn a , .article_tit p").css("font-size", "14px");
			$(pageId + " .zx_list li").css("font-size", "17px");

			return false;
		});

		//调小字体
		$.bindEvent($(pageId + " .font_ctbox .font_small"), function() {
			$(pageId + " .font_ctbox li a").removeClass("active");
			$(this).find("a").addClass("active");
			//重写样式表
			$(pageId + "pre").css("font-size", "14px");

			$(pageId + " .zx_tabcont .title, #newTitle").css("font-size", "16px");
			$(pageId + " .more_btn a , .article_tit p").css("font-size", "12px");
			$(pageId + " .zx_list li").css("font-size", "15px");
			return false;
		});

		//隐藏调节字体
		$.bindEvent($(pageId + " .shade_bg, .close"), function() {
			$(pageId + " .shade_bg").hide();
			$(pageId + " .font_layer").hide();
		})
	}

	/**
	 * 页面跳转后销毁方法
	 */
	function destroy() {
		$(pageId + " .info_nav").attr("style", "display:none;");
	}

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

	var details = {
		init: init,
		bindPageEvent: bindPageEvent,
		destroy: destroy,
		pageBack: pageBack,
		load: load
	};

	module.exports = details;
});