define("2.0.0/js/plugins/iscroll/scripts/svIscroll.js",function(i,n,s){function t(n){var s=this,t=null;this.setCssHW=function(){var i=n.wrapper,s=i.children(),t=n.container,e=n.containerHeight,o=n.containerWidth;e?i.height(e):i.height($(window).height()),o?i.width(o):i.width($(window).width()),i.css({position:"absolute"}),s.css({position:"absolute",width:"100%",padding:"0px"}),t.css({padding:"0px",margin:"0px",width:"100%"})},this.refresh=function(i){t.refresh()},this.init=function(){this.setCssHW(),i.async("2.0.0/js/plugins/iscroll/scripts/iscroll4.js",function(i){t=new i(n.wrapper[0],{onScrollMove:function(){n.wrapper.children("div").eq(1).show()},onScrollEnd:function(){n.wrapper.children("div").eq(1).hide()}}),setTimeout(function(){n.wrapper.children("div").eq(1).hide()},200)})},this.destroy=function(){null!=t&&(t.destroy(),t=null)},s.init()}s.exports=t});