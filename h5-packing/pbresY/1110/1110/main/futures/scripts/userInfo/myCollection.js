//2016年11月24日14:43:36

define('futures/scripts/userInfo/myCollection.js', function(require, exports, module) {
    var pageId = '#userInfo_myCollection';
    require('validatorUtils');
    /**
     * 全局变量声明
     */

    /**
     * 初始化方法
     */
    function init() {}

    /*
     * 页面事件绑定
     */
    function bindPageEvent() {
        //返回按钮
        $.bindEvent($(pageId + " .icon_back"), function() {
            window.location.href='goBack';
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
