//2016年11月24日14:43:36

define('futures/scripts/aboutUser/index.js', function(require, exports, module) {
    var pageId = '#aboutUser_index';
    require('validatorUtils');
    /**
     * 全局变量声明
     */
    var user;
    /**
     * 初始化方法
     */
    function init() {
		$(pageId + " #kf").attr("href","pobo:uncheck=1&pageId=800007&"+$.config.global.kf);
    }

    /*
     * 页面事件绑定
     */
    function bindPageEvent() {
        //绑定返回事件
        $.bindEvent($(pageId + " .icon_back"), function() {
            window.location.href='goBack';
        });
        //绑定检查更新
        $.bindEvent($(pageId+" #check_update_app"),function(){
        	window.open("pobo:uncheck=1&pageId=805009");
//      	window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/userInfo/updateApp.html");
        });
        //绑定更新app按钮
        $.bindEvent($(pageId+" #yes_update_app"),function(){no_thanks
            alert("开发中...")
        });
        //绑定不更新app按钮
        $.bindEvent($(pageId+" #no_thanks"),function(){
          $(pageId+" .shade_bg").hide();
          $(pageId+" .update_layer").hide();
        });
         //客服热线
        $.bindEvent($(pageId + " #kf"),function() {
        	window.open('pobo:uncheck=1&pageId=800007&tel=400-888-7868');
        });
    }
    /**
     * 检查app更新
     */
    function check_app_update(){
      $(pageId+" .shade_bg").show();
      $(pageId+" .update_layer").show();
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
