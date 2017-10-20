define("2.0.0/js/plugins/iscroll5/scripts/iscrollUtils.js",function(l,s,e){function n(l){var s={probeType:2,preventDefaultException:{tagName:/[INPUT|TEXTAREA|SELECT]/},click:!0,scrollbars:!0,fadeScrollbars:!0,tap:!1};if(!l)throw new Error("配置参数不能为空");if(!l.$wrapper||1!=l.$wrapper.length)throw new Error("wrapper 元素错误");if(l.$wrapper&&1!=l.$wrapper.find("[data-is-content='true']").length)throw new Error('滚动内容元素错误，请设置  data-is-content="true" 属性');l.hasPullDown="undefined"==typeof l.hasPullDown||l.hasPullDown,l.hasPullUp="undefined"==typeof l.hasPullUp||l.hasPullUp,l.isAlwaysShowPullUp="undefined"==typeof l.isAlwaysShowPullUp||l.isAlwaysShowPullUp,l.pullThreshold="undefined"==typeof l.pullThreshold?5:l.pullThreshold,l.oPullDownTips=$.extend({still:"下拉刷新",flip:"释放立即刷新",loading:"正在刷新..."},l.oPullDownTips),l.oPullUpTips=$.extend({still:"上拉加载下一页",flip:"释放加载下一页",loading:"正在加载..."},l.oPullUpTips),l=$.extend(s,l);var e=l.$wrapper.find(".iscroll_pullDown"),n=l.$wrapper.find(".iscroll_pullUp"),a=e[0]&&e[0].offsetHeight||0,o=n[0]&&n[0].offsetHeight||0;l.$wrapper.css("height",l.scrollerHeight+"px").css("overflow","hidden");var p=function(){l.$wrapper.find("[data-is-content='true']").height()<=l.scrollerHeight?l.$wrapper.children().css("height",l.scrollerHeight+1+"px"):l.$wrapper.children().css("height","initial")};p(),l.isAlwaysShowPullUp&&l.hasPullUp||!(n.length>0)?n.length>0&&n.css("display","block"):n.css("display","none"),e.length>0&&e.css("display","none");var i=new r(l.$wrapper[0],l);e.length>0&&e.css("display","block"),i.on("scrollStart",function(){a=e[0]&&e[0].offsetHeight||0,l.onScrollStart&&l.onScrollStart()}),i.on("scroll",function(){e.length>0&&(i.y>a+l.pullThreshold&&!e.hasClass("flip")?(e.addClass("flip").removeClass("scrolledUp").find(".pullDownLabel").html(l.oPullDownTips.flip),i.scrollBy(0,-a,0)):i.y<0&&e.hasClass("flip")&&(e.removeClass("flip").addClass("scrolledUp").find(".pullDownLabel").html(l.oPullDownTips.still),i.scrollBy(0,a,0))),n.length>0&&(i.y<i.maxScrollY?(l.hasPullUp&&n.length>0&&"none"===n.css("display")&&n.css("display","block"),o=n[0]&&n[0].offsetHeight||0):i.y>i.maxScrollY&&!l.isAlwaysShowPullUp&&l.hasPullUp&&n.length>0&&"none"!==n.css("display")&&n.css("display","none"),l.isAlwaysShowPullUp||l.$wrapper.children().height()===l.scrollerHeight+10?i.y<i.maxScrollY-l.pullThreshold&&!n.hasClass("flip")?n.addClass("flip").find(".pullUpLabel").html(l.oPullUpTips.flip):i.y>i.maxScrollY+l.pullThreshold&&n.hasClass("flip")&&n.removeClass("flip").find(".pullUpLabel").html(l.oPullUpTips.still):i.y<i.maxScrollY-o&&!n.hasClass("flip")?(n.addClass("flip").find(".pullUpLabel").html(l.oPullUpTips.flip),l.$wrapper.find("[data-is-content='true']").height()+o>l.scrollerHeight&&(i.maxScrollY-=o)):i.y>i.maxScrollY+l.pullThreshold&&n.hasClass("flip")&&n.removeClass("flip").find(".pullUpLabel").html(l.oPullUpTips.still)),l.onScrollMove&&l.onScrollMove()});var t=function(){var s="";return e.length>0&&e.hasClass("flip")&&(e.removeClass("flip").addClass("loading").find(".pullDownLabel").html(l.oPullDownTips.loading),s="pullDown"),!l.isAlwaysShowPullUp&&!n.hasClass("flip")&&n.length>0&&"none"!==n.css("display")?n.css("display","none"):n.length>0&&n.hasClass("flip")&&(n.removeClass("flip").addClass("loading").find(".pullUpLabel").html(l.oPullUpTips.loading),s="pullUp"),s};i.on("scrollEnd",function(){var s=t();"pullDown"==s?l.pullDownHandler&&l.pullDownHandler():"pullUp"==s&&l.pullUpHandler&&l.pullUpHandler(),l.onScrollEnd&&l.onScrollEnd()}),i.on("refresh",function(){t(),e.length>0&&e.hasClass("loading")?e.removeClass("loading").addClass("scrolledUp").find(".pullDownLabel").html(l.oPullDownTips.still):n.length>0&&n.hasClass("loading")&&n.removeClass("loading").find(".pullUpLabel").html(l.oPullUpTips.still)});var d=i.refresh;i.refresh=function(){e.length>0&&e.css("display","none"),!l.isAlwaysShowPullUp&&n.length>0&&n.css("display","none"),p(),setTimeout(function(){d.call(i),e.length>0&&e.css("display","block")},20)};var h=i.destroy;return i.destroy=function(){e.length>0&&e.css("display","none").removeClass("loading").addClass("scrolledUp").find(".pullDownLabel").html(l.oPullDownTips.still),n.length>0&&n.css("display","none").removeClass("loading").find(".pullUpLabel").html(l.oPullUpTips.still),h.call(this),i=null},i}function a(l){var s={snap:!0,momentum:!1,scrollX:!0,probeType:2,click:!0,tap:!1};if(!l)throw new Error("配置参数不能为空");if(!l.$wrapper||1!=l.$wrapper.length)throw new Error("wrapper 元素错误");l.autoTime=l.autoScroll&&l.autoTime||2e3,l=$.extend(s,l);var e=0,n=(l.$wrapper.children(),new r(l.$wrapper[0],l));l.autoScroll&&(e=1,o=setInterval(function(){1==e?n.next():n.prev()},l.autoTime),n.on("scrollEnd",function(){(n.currentPage.pageX==n.pages.length-1&&1==e||0==n.currentPage.pageX&&1!=e)&&(e=-1*e),l.$tabNav&&l.$tabNav.length>0&&l.$tabNav.children().length&&l.$tabNav.children().eq(n.currentPage.pageX).addClass("current").siblings().removeClass("current"),l.scrollEndHandler&&l.scrollEndHandler()})),n.getCurPageIdx=function(){return n.currentPage.pageX},n.getCurScrollDirection=function(){return e};var a=n.destroy;return n.destroy=function(){n.pages&&n.goToPage(0,0),l.$tabNav&&l.$tabNav.length>0&&l.$tabNav.children().length&&l.$tabNav.children().eq(0).addClass("current").siblings().removeClass("current"),o&&(clearInterval(o),o=null),a.call(this),n=null},n}var r=l("iscroll5"),o=null;$.loadCss("2.0.0/js/plugins/iscroll5/css/iscroll.css"),e.exports={vScroller:n,hScroller:a}});