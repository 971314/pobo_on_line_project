/*作者：   Alt+  时间： 2016-08-24 19:10:20 PM */
define("2.0.0/js/plugins/iscroll/scripts/vIscroll.js", function(require, exports, module) {
	function a(a) {
		var b = this,
			d = null;
		a.oPullDownTips = $.extend({
				still: "下拉加载上一页",
				flip: "释放加载上一页",
				loading: "正在加载..."
			}, a.oPullDownTips || {}),
			a.oPullUpTips = $.extend({
				still: "上拉加载下一页",
				flip: "释放加载下一页",
				loading: "正在加载..."
			}, a.oPullUpTips || {}),
			a.wrapper.find(".visc_pullUp").length > 0 && a.wrapper.find(".visc_pullUp").show(),
			a.wrapper.find(".visc_pullDown").length > 0 && a.wrapper.find(".visc_pullDown").show(),
			0 == a.hasPullDown && a.wrapper.find(".visc_pullDown").length > 0 && a.wrapper.find(".visc_pullDown").hide(),
			this.getWrapperObj = function() {
				return d
			},
			this.setCssHW = function() {
				var b = 0;
				b = a.isPagingType ? a.rowNum * a.perRowHeight + (a.headRowHeight || 0) : a.visibleHeight,
					a.container.css({
						position: "relative",
						height: b + "px"
					})
			},
			this.refresh = function(b) {
				if(a.isPagingType && b) {
					var c = (b ? b : a.rowNum) * a.perRowHeight + (a.headRowHeight || 0);
					a.container.css({
						position: "relative",
						height: c + "px"
					})
				} else {
					b =  b.visibleHeight,
						a.container.css({
							position: "relative",
							height: b + "px"
						})
				}
				1 == a.isPagingType && a.wrapper.find(".visc_pullUp").hide(),
					d.refresh()
			},
			this.init = function() {
				function e(b) {
					"up" == b ? a.upHandle && a.upHandle() : a.downHandle && a.downHandle()
				}
				if(!a.wrapper[0])
					return console.log("请检查wrapper元素是否正确！"), !1;
				b.setCssHW(),
					a.wrapper.find(".visc_pullDown .visc_pullDownTime").html((new Date).format("HH:mm:ss")),
					a.wrapper.find(".visc_pullUp .visc_pullUpTime").html((new Date).format("HH:mm:ss"));
				var f = a.wrapper[0].querySelector(".visc_pullDown"),
					g = f.offsetHeight,
					h = a.wrapper[0].querySelector(".visc_pullUp");
				h.offsetHeight;
				setTimeout(function() {
						var b = {
							hScroll: !1,
							hScrollbar: !1,
							vScrollbar: !a.isPagingType,
							fadeScrollbar: !0,
							topOffset: g,
							onBeforeScrollStart: function(a) {
								var b = a.explicitOriginalTarget ? a.explicitOriginalTarget.nodeName.toLowerCase() : a.target ? a.target.nodeName.toLowerCase() : "";
								"select" != b && "option" != b && "input" != b && "textarea" != b && a.preventDefault()
							},
							onRefresh: function() {
								f.className.match("visc_pullDown visc_loading") ? (f.className = "visc_pullDown",
									f.querySelector(".visc_pullDownLabel").innerHTML = a.oPullDownTips.still,
									f.querySelector(".visc_pullDownTime").innerHTML = (new Date).format("HH:mm:ss")) : h.className.match("visc_pullUp visc_loading") && (h.className = "visc_pullUp",
									h.querySelector(".visc_pullUpLabel").innerHTML = a.oPullUpTips.still,
									h.querySelector(".visc_pullUpTime").innerHTML = (new Date).format("HH:mm:ss"))
							},
							onScrollMove: function() {
								a.isPagingType || !a.isPagingType && a.visibleHeight > a.wrapper.find(".visc_scroller").height() ? (this.distY > 50 && this.absDistY > this.absDistX + 5 ? (f.className = "visc_pullDown visc_flip",
										f.querySelector(".visc_pullDownLabel").innerHTML = a.oPullDownTips.flip,
										this.minScrollY = 0) : this.distY > 0 && this.distY < 50 && this.absDistY > this.absDistX + 5 ? (f.className = "visc_pullDown",
										f.querySelector(".visc_pullDownLabel").innerHTML = a.oPullDownTips.still,
										this.minScrollY = -g) : this.distY < -50 && this.absDistY > this.absDistX + 5 ? (h.className = "visc_pullUp visc_flip",
										h.querySelector(".visc_pullUpLabel").innerHTML = a.oPullUpTips.flip) : this.distY < 0 && this.distY > -50 && this.absDistY > this.absDistX + 5 && (h.className = "visc_pullUp",
										h.querySelector(".visc_pullUpLabel").innerHTML = a.oPullUpTips.still),
									a.isPagingType === !0 && "none" === a.wrapper.find(".visc_pullUp").css("display") && a.wrapper.find(".visc_pullUp").show()) : this.y > 10 && !f.className.match("visc_pullDown visc_flip") ? (f.className = "visc_pullDown visc_flip",
									f.querySelector(".visc_pullDownLabel").innerHTML = a.oPullDownTips.flip,
									this.minScrollY = 0) : this.y < 10 && f.className.match("visc_pullDown visc_flip") ? (f.className = "visc_pullDown",
									f.querySelector(".visc_pullDownLabel").innerHTML = a.oPullDownTips.still,
									this.minScrollY = -g) : this.y < this.maxScrollY - 10 && !h.className.match("visc_pullUp visc_flip") ? (h.className = "visc_pullUp visc_flip",
									h.querySelector(".visc_pullUpLabel").innerHTML = a.oPullUpTips.flip) : this.y > this.maxScrollY + 10 && h.className.match("visc_pullUp visc_flip") && (h.className = "visc_pullUp",
									h.querySelector(".visc_pullUpLabel").innerHTML = a.oPullUpTips.still)
							},
							onScrollEnd: function() {
								f.className.match("visc_pullDown visc_flip") ? (f.className = "visc_pullDown visc_loading",
									f.querySelector(".visc_pullDownLabel").innerHTML = a.oPullDownTips.loading,
									e("down", a.wrapper)) : h.className.match("visc_pullUp visc_flip") && (h.className = "visc_pullUp visc_loading",
									h.querySelector(".visc_pullUpLabel").innerHTML = a.oPullUpTips.loading,
									e("up", a.wrapper))
							}
						};
						$.device.android && (b.hideScrollbar = !0),
							require.async("2.0.0/js/plugins/iscroll/scripts/iscroll4.js", function(e) {
								c = e,
									d = new c(a.wrapper[0], b)
							})
					}, 0),
					setTimeout(function() {
						a.wrapper[0].style.left = "0"
					}, 200)
			},
			this.destroy = function() {
				null != d && (d.destroy(),
					d = null)
			},
			0 == $("head>link[href*='2.0.0/js/plugins/iscroll/css/iscroll4-custom.css']").length ? $.loadCss("2.0.0/js/plugins/iscroll/css/iscroll4-custom.css", b.init) : b.init()
	}
	var b = seajs.resolve("vIscroll");
	b = b.substring(0, b.lastIndexOf("/"));
	var c = null;
	module.exports = a
});
/*出品单位：深圳市思迪信息技术股份有限公司-前端Html5开发小组*/