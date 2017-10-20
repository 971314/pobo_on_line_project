//2016年11月24日14:43:36

define('futures/scripts/userInfo/updateApp.js', function(require, exports, module) {
    var pageId = '#userInfo_updateApp ';
    var commService=require("commService").getInstance();
    require('validatorUtils');
    /**
     * 初始化方法
     */
    function init() {
      //查询是否有版本需要更新
      IsUpdate();
    }

    /*
     * 页面事件绑定
     */
    function bindPageEvent() {
        //返回按钮
        $.bindEvent($(pageId + " .icon_back"), function() {
            window.location.href='goBack';
        });

        //提交按钮
        $.bindEvent($(pageId + " #opinion_btn"),function(){
          var param={
            "opinion":$(pageId + " #opinion").val(),
            "contact":$(pageId + " #contact").val()
          }
          console.log(param);
        });
    }

    function IsUpdate(){
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
