/**
 * @author 汪卫中
 *
 * 描述：常用公共方法
 */
define(function(require, exports, module) {
    var commService = require("commService").getInstance(); //用户服务接口类
    var commonExt = require("commonExt");
    var constants = require("constants"); //常量类
    var HIscroll = require("hIscroll"); //hIscroll别名已经配置到hSea中
    var loading_img = require("user/scripts/common/imgloading"); //图片加载插件
    /**
     * 查询用户自定义的快捷功能 1109320
     * @author fangdm
     * @param  param 请求接口入参
     * @param  ctrlParam 调用接口控制参数
     * @param  callBack 回调函数
     * @param  eleObj 	eleLead  导航点集合
     * 					eleWrapper 滑动容器
     * 					eleScroll 滑动内容列表
     * 					perCount  每个可视区域显示的子元素
     * 					showTab 是否有导航点
     * 					auto 是否自动播放
     *  				isScroll 是否使用滑动组件
     */
    function getQuickChannel(userId, eleObj) {
        var curPageId = $.getCurrentPageObj().pageId; //当前页 pageId
        var param = {
            "module_type": 1
        };
        var ctrlParam = {
            "isShowWait": false
        };
        var callBack = function(data) {
            var result = commonExt.getReqResultList(data);
            if (data.error_no == "0") {
                if (result) {
                    //清空数据
                    $(eleObj.eleLead).html("");
                    $(eleObj.eleScroll).html("");
                    $(eleObj.eleScroll).attr("style", "");

                    var home_html = "<div><ul class='quc_channel_ul'>";
                    $.each(result, function(i, v) {
                        home_html += '<li id="opt_' + v.module_mark + '" style="width: 25%;" href="' + v.url_address + '"><a><i><img src="' + ($.config.global.pictureUrl + v.icon_url) + '" /></i><span>' + v.name + '</span></a></li>';
                        if (i == 3) {
                            home_html += '</ul><ul>';
                        }
                    });
                    home_html += '<li id="0000" style="width: 25%;" href="pobo:uncheck=1&pageId=900005&url=main/user/views/moreQuick.html"><a><i><img src="../images/nav_more.png" /></i><span>更多</span></a></li>'
                    home_html += '</ul></div>';

                    $(eleObj.eleScroll).html(home_html);

                    $.each($(eleObj.eleScroll).find("li"), function() {
                        $.bindEvent($(this), function() {
                            window.open($(this).attr("href"));
                        });
                    });

                    var scrolldiv_height = 2 * $("#" + curPageId + " .quc_channel_ul").height();

                    eleObj.eleShow = eleObj.eleScroll + " div";
                    var param = {
                        "eleImg": $(eleObj.eleScroll),
                        "lodingtimeout": 13000,
                        "loadFailed": "",
                        "loading": "",
                        "bindOnclick": false
                    }
                    loading_img.imgload(param, initBannerScroller(scrolldiv_height, eleObj));
                }
            }
        };
        commService.getQuickChannel(param, callBack, ctrlParam);
    }



    /**
     * 初始化滑动组件
     *
     */
    function initBannerScroller(imgheight, eleObj) {
        var myHIscroll = null;
        $(eleObj.eleWrapper).fadeIn("slow");
        if (!myHIscroll) {
            var config = {
                wrapper: $(eleObj.eleWrapper), //wrapper对象
                scroller: $(eleObj.eleScroll), //scroller对象
                perCount: eleObj.perCount, //每个可视区域显示的子元素，就是每个滑块区域显示几个子元素
                showTab: true, //是否有导航点
                tabDiv: $(eleObj.eleLead), //导航点集合对象
                auto: eleObj.auto //是否自动播放
            };
            myHIscroll = new HIscroll(config);
            if (eleObj.perCount == 1) {
                $(eleObj.eleShow).show().height(imgheight);
            } else {
                $(eleObj.eleScroll).show();
            }
            $(eleObj.eleScroll).css("height", imgheight);
        }
    }



    var comOtherData = {
        "getQuickChannel": getQuickChannel //查询用户自定义的快捷功能
    };

    // 暴露对外的接口
    module.exports = comOtherData;
});
