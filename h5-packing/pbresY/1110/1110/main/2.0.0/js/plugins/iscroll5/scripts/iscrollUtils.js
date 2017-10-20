/*作者：   Alt+  时间： 2016-08-24 19:10:20 PM */
define("2.0.0/js/plugins/iscroll5/scripts/iscrollUtils.js",function(require,exports,module){function a(a){var b={probeType:2,preventDefaultException:{tagName:/[INPUT|TEXTAREA|SELECT]/},click:!0,scrollbars:!0,fadeScrollbars:!0,tap:!1};if(!a)throw new Error("配置参数不能为空");if(!a.$wrapper||1!=a.$wrapper.length)throw new Error("wrapper 元素错误");if(a.$wrapper&&1!=a.$wrapper.find("[data-is-content='true']").length)throw new Error('滚动内容元素错误，请设置  data-is-content="true" 属性');a.hasPullDown="undefined"==typeof a.hasPullDown?!0:a.hasPullDown,a.hasPullUp="undefined"==typeof a.hasPullUp?!0:a.hasPullUp,a.isAlwaysShowPullUp="undefined"==typeof a.isAlwaysShowPullUp?!0:a.isAlwaysShowPullUp,a.pullThreshold="undefined"==typeof a.pullThreshold?5:a.pullThreshold,a.oPullDownTips=$.extend({still:"下拉刷新",flip:"释放立即刷新",loading:"正在刷新..."},a.oPullDownTips),a.oPullUpTips=$.extend({still:"上拉加载下一页",flip:"释放加载下一页",loading:"正在加载..."},a.oPullUpTips),a=$.extend(b,a);var d=a.$wrapper.find(".iscroll_pullDown"),e=a.$wrapper.find(".iscroll_pullUp"),f=d[0]&&d[0].offsetHeight||0,g=e[0]&&e[0].offsetHeight||0;a.$wrapper.css("height",a.scrollerHeight+"px").css("overflow","hidden");var h=function(){a.$wrapper.find("[data-is-content='true']").height()<=a.scrollerHeight?a.$wrapper.children().css("height",a.scrollerHeight+1+"px"):a.$wrapper.children().css("height","initial")};h(),a.isAlwaysShowPullUp&&a.hasPullUp||!(e.length>0)?e.length>0&&e.css("display","block"):e.css("display","none"),d.length>0&&d.css("display","none");var i=new c(a.$wrapper[0],a);d.length>0&&d.css("display","block"),i.on("scrollStart",function(){f=d[0]&&d[0].offsetHeight||0,a.onScrollStart&&a.onScrollStart()}),i.on("scroll",function(){d.length>0&&(i.y>f+a.pullThreshold&&!d.hasClass("flip")?(d.addClass("flip").removeClass("scrolledUp").find(".pullDownLabel").html(a.oPullDownTips.flip),i.scrollBy(0,-f,0)):i.y<0&&d.hasClass("flip")&&(d.removeClass("flip").addClass("scrolledUp").find(".pullDownLabel").html(a.oPullDownTips.still),i.scrollBy(0,f,0))),e.length>0&&(i.y<i.maxScrollY?(a.hasPullUp&&e.length>0&&"none"===e.css("display")&&e.css("display","block"),g=e[0]&&e[0].offsetHeight||0):i.y>i.maxScrollY&&!a.isAlwaysShowPullUp&&a.hasPullUp&&e.length>0&&"none"!==e.css("display")&&e.css("display","none"),a.isAlwaysShowPullUp||a.$wrapper.children().height()===a.scrollerHeight+10?i.y<i.maxScrollY-a.pullThreshold&&!e.hasClass("flip")?e.addClass("flip").find(".pullUpLabel").html(a.oPullUpTips.flip):i.y>i.maxScrollY+a.pullThreshold&&e.hasClass("flip")&&e.removeClass("flip").find(".pullUpLabel").html(a.oPullUpTips.still):i.y<i.maxScrollY-g&&!e.hasClass("flip")?(e.addClass("flip").find(".pullUpLabel").html(a.oPullUpTips.flip),a.$wrapper.find("[data-is-content='true']").height()+g>a.scrollerHeight&&(i.maxScrollY-=g)):i.y>i.maxScrollY+a.pullThreshold&&e.hasClass("flip")&&e.removeClass("flip").find(".pullUpLabel").html(a.oPullUpTips.still)),a.onScrollMove&&a.onScrollMove()});var j=function(){var b="";return d.length>0&&d.hasClass("flip")&&(d.removeClass("flip").addClass("loading").find(".pullDownLabel").html(a.oPullDownTips.loading),b="pullDown"),!a.isAlwaysShowPullUp&&!e.hasClass("flip")&&e.length>0&&"none"!==e.css("display")?e.css("display","none"):e.length>0&&e.hasClass("flip")&&(e.removeClass("flip").addClass("loading").find(".pullUpLabel").html(a.oPullUpTips.loading),b="pullUp"),b};i.on("scrollEnd",function(){var b=j();"pullDown"==b?a.pullDownHandler&&a.pullDownHandler():"pullUp"==b&&a.pullUpHandler&&a.pullUpHandler(),a.onScrollEnd&&a.onScrollEnd()}),i.on("refresh",function(){j(),d.length>0&&d.hasClass("loading")?d.removeClass("loading").addClass("scrolledUp").find(".pullDownLabel").html(a.oPullDownTips.still):e.length>0&&e.hasClass("loading")&&e.removeClass("loading").find(".pullUpLabel").html(a.oPullUpTips.still)});var k=i.refresh;i.refresh=function(){d.length>0&&d.css("display","none"),!a.isAlwaysShowPullUp&&e.length>0&&e.css("display","none"),h(),setTimeout(function(){k.call(i),d.length>0&&d.css("display","block")},20)};var l=i.destroy;return i.destroy=function(){d.length>0&&d.css("display","none").removeClass("loading").addClass("scrolledUp").find(".pullDownLabel").html(a.oPullDownTips.still),e.length>0&&e.css("display","none").removeClass("loading").find(".pullUpLabel").html(a.oPullUpTips.still),l.call(this),i=null},i}function b(a){var b={snap:!0,momentum:!1,scrollX:!0,probeType:2,click:!0,tap:!1};if(!a)throw new Error("配置参数不能为空");if(!a.$wrapper||1!=a.$wrapper.length)throw new Error("wrapper 元素错误");a.autoTime=a.autoScroll&&a.autoTime||2e3,a=$.extend(b,a);var e=0,f=(a.$wrapper.children(),new c(a.$wrapper[0],a));a.autoScroll&&(e=1,d=setInterval(function(){1==e?f.next():f.prev()},a.autoTime),f.on("scrollEnd",function(){(f.currentPage.pageX==f.pages.length-1&&1==e||0==f.currentPage.pageX&&1!=e)&&(e=-1*e),a.$tabNav&&a.$tabNav.length>0&&a.$tabNav.children().length&&a.$tabNav.children().eq(f.currentPage.pageX).addClass("current").siblings().removeClass("current"),a.scrollEndHandler&&a.scrollEndHandler()})),f.getCurPageIdx=function(){return f.currentPage.pageX},f.getCurScrollDirection=function(){return e};var g=f.destroy;return f.destroy=function(){f.pages&&f.goToPage(0,0),a.$tabNav&&a.$tabNav.length>0&&a.$tabNav.children().length&&a.$tabNav.children().eq(0).addClass("current").siblings().removeClass("current"),d&&(clearInterval(d),d=null),g.call(this),f=null},f}var c=require("iscroll5"),d=null;$.loadCss("2.0.0/js/plugins/iscroll5/css/iscroll.css"),module.exports={vScroller:a,hScroller:b}});
/*出品单位：深圳市思迪信息技术股份有限公司-前端Html5开发小组*/