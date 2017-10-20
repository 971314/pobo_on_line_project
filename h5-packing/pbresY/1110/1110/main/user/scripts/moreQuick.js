//2016-3-30 16:35:55

define('user/scripts/moreQuick.js', function(require, exports, module) {
    var pageId = '#moreQuick ';
    var commService = require("commService").getInstance(); //用户服务接口类
    var loading_img = require("user/scripts/common/imgloading"); //图片加载插件
    var commonExt = require("commonExt");

    /**
     * 初始化方法
     */
    function init() {
        var ctrlParam = {
            "isShowWait": false
        };
				var param = {

				}
        var callBack = function(data) {
            var result = commonExt.getReqResultList(data);
            if (data.error_no == "0") {
                var li_html = "";
                $.each(result, function() {
                    li_html += "<li>"
                    li_html += "<a><img href='" + this.url_address + "' src='" + ($.config.global.pictureUrl + this.icon_url) + "'><span>"+this.name+"</span></a>";
                    li_html += "</li>";
                });
                $(pageId + " #more_quick").html(li_html);
                var param = {
                    "eleImg": $(pageId + " #more_quick"),
                    "lodingtimeout": 13000,
                    "loadFailed": "",
                    "loading": "",
                    "bindOnclick": false
                }
                loading_img.imgload(param, null);
                $.each($(pageId + " #more_quick").find("img"), function() {
        					$.bindEvent($(this).parent(), function() {
        						window.open($(this).find("img").attr("href"));
        					}, 'click');
        				});
            } else {
                alert("快捷功能查询失败!");
            }
        }
        commService.getQuickChannel(param, callBack, ctrlParam);
    }


    /*
     * 页面事件绑定
     */
    function bindPageEvent() {
			//绑定登录关闭按钮
			$.bindEvent($(pageId + " .icon_back"), function() {
				window.location.href = 'goBack';
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
