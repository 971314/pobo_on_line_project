define(function(require, exports, module) {
	! function() {
		function a(a) {
			var b = a.naturalWidth,
				c = a.naturalHeight;
			if(b * c > 1048576) {
				var d = document.createElement("canvas");
				d.width = d.height = 1;
				var e = d.getContext("2d");
				return e.drawImage(a, -b + 1, 0), 0 === e.getImageData(0, 0, 1, 1).data[3]
			}
			return !1
		}

		function b(a, b, c) {
			var d = document.createElement("canvas");
			d.width = 1, d.height = c;
			var e = d.getContext("2d");
			e.drawImage(a, 0, 0);
			for(var f = e.getImageData(0, 0, 1, c).data, g = 0, h = c, i = c; i > g;) {
				var j = f[4 * (i - 1) + 3];
				0 === j ? h = i : g = i, i = h + g >> 1
			}
			var k = i / c;
			return 0 === k ? 1 : k
		}

		function c(a, b, c) {
			var e = document.createElement("canvas");
			return d(a, e, b, c), e.toDataURL("image/jpeg", b.quality || .8)
		}

		function d(c, d, f, g) {
			var h = c.naturalWidth,
				i = c.naturalHeight,
				j = f.width,
				k = f.height;
			f.isDebug && alert("img width:" + h + ",img height:" + i + ";canvas width:" + j + ",canvas height:" + k);
			var l = d.getContext("2d");
			l.save(), e(d, j, k, f.orientation);
			var m = a(c);
			f.isDebug && alert("orientation:" + f.orientation + ",subsampled:" + m), m && (h /= 2, i /= 2);
			var n = 1024,
				o = document.createElement("canvas");
			o.width = o.height = n;
			var p = o.getContext("2d"),
				q = g ? b(c, h, i) : 1,
				r = Math.ceil(n * j / h),
				s = Math.ceil(n * k / i / q),
				t = 0,
				u = 0;
			for(f.isDebug && alert("d:" + n + ",dw:" + r + ",dh" + s + ",vertSquashRatio" + q); i > t;) {
				for(var v = 0, w = 0; h > v;) p.clearRect(0, 0, n, n), p.drawImage(c, -v, -t), l.drawImage(o, 0, 0, n, n, w, u, r, s), v += n, w += r;
				t += n, u += s
			}
			if(l.restore(), f.isDebug) {
				var x = d.toDataURL(f.type);
				alert("画板的大小4：" + x.length + "B")
			}
			o = p = null
		}

		function e(a, b, c, d) {
			switch(d) {
				case 5:
				case 6:
				case 7:
				case 8:
					a.width = c, a.height = b;
					break;
				default:
					a.width = b, a.height = c
			}
			var e = a.getContext("2d");
			switch(d) {
				case 2:
					e.translate(b, 0), e.scale(-1, 1);
					break;
				case 3:
					e.translate(b, c), e.rotate(Math.PI);
					break;
				case 4:
					e.translate(0, c), e.scale(1, -1);
					break;
				case 5:
					e.rotate(.5 * Math.PI), e.scale(1, -1);
					break;
				case 6:
					e.rotate(.5 * Math.PI), e.translate(0, -c);
					break;
				case 7:
					e.rotate(.5 * Math.PI), e.translate(b, -c), e.scale(-1, 1);
					break;
				case 8:
					e.rotate(-.5 * Math.PI), e.translate(-b, 0)
			}
		}

		function f(a) {
			if(a instanceof Blob) {
				var b = new Image,
					c = window.URL && window.URL.createObjectURL ? window.URL : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null;
				if(!c) throw Error("No createObjectURL function found to create blob url");
				b.src = c.createObjectURL(a), this.blob = a, a = b
			}
			if(!a.naturalWidth && !a.naturalHeight) {
				var d = this;
				a.onload = function() {
					var a = d.imageLoadListeners;
					if(a) {
						d.imageLoadListeners = null;
						for(var b = 0, c = a.length; c > b; b++) a[b]()
					}
				}, this.imageLoadListeners = []
			}
			this.srcImage = a
		}
		f.prototype.render = function(a, b) {
			if(this.imageLoadListeners) {
				var e = this;
				return void this.imageLoadListeners.push(function() {
					e.render(a, b)
				})
			}
			b = b || {};
			var f = this.srcImage.naturalWidth,
				g = this.srcImage.naturalHeight,
				h = b.width,
				i = b.height,
				j = b.maxWidth,
				k = b.maxHeight,
				l = !this.blob || "image/jpeg" === this.blob.type;
			h && !i ? i = g * h / f << 0 : i && !h ? h = f * i / g << 0 : (h = f, i = g), j && h > j && (h = j, i = g * h / f << 0), k && i > k && (i = k, h = f * i / g << 0);
			var m = {
				width: h,
				height: i
			};
			for(var n in b) m[n] = b[n];
			if(m.isDebug) {
				var o = a.toDataURL(m.type);
				alert("画板的大小3：" + o.length + "B")
			}
			var p = a.tagName.toLowerCase();
			"img" === p ? a.src = c(this.srcImage, m, l) : "canvas" === p && d(this.srcImage, a, m, l), "function" == typeof this.onrender && this.onrender(a)
		}, window.MegaPixImage = f, module.exports = {
			renderImageToDataURL: c
		}
	}()
});