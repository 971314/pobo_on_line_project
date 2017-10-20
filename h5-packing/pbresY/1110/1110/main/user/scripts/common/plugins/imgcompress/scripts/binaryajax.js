define(function(require, exports, module) {
	var a = function(a, b, c) {
			var d = a,
				e = b || 0,
				f = 0;
			this.getRawData = function() {
				return d
			}, "string" == typeof a ? (f = c || d.length, this.getByteAt = function(a) {
				return 255 & d.charCodeAt(a + e)
			}, this.getBytesAt = function(a, b) {
				for(var c = [], f = 0; b > f; f++) c[f] = 255 & d.charCodeAt(a + f + e);
				return c
			}) : "unknown" == typeof a && (f = c || IEBinary_getLength(d), this.getByteAt = function(a) {
				return IEBinary_getByteAt(d, a + e)
			}, this.getBytesAt = function(a, b) {
				return new VBArray(IEBinary_getBytesAt(d, a + e, b)).toArray()
			}), this.getLength = function() {
				return f
			}, this.getSByteAt = function(a) {
				var b = this.getByteAt(a);
				return b > 127 ? b - 256 : b
			}, this.getShortAt = function(a, b) {
				var c = b ? (this.getByteAt(a) << 8) + this.getByteAt(a + 1) : (this.getByteAt(a + 1) << 8) + this.getByteAt(a);
				return 0 > c && (c += 65536), c
			}, this.getSShortAt = function(a, b) {
				var c = this.getShortAt(a, b);
				return c > 32767 ? c - 65536 : c
			}, this.getLongAt = function(a, b) {
				var c = this.getByteAt(a),
					d = this.getByteAt(a + 1),
					e = this.getByteAt(a + 2),
					f = this.getByteAt(a + 3),
					g = b ? (((c << 8) + d << 8) + e << 8) + f : (((f << 8) + e << 8) + d << 8) + c;
				return 0 > g && (g += 4294967296), g
			}, this.getSLongAt = function(a, b) {
				var c = this.getLongAt(a, b);
				return c > 2147483647 ? c - 4294967296 : c
			}, this.getStringAt = function(a, b) {
				for(var c = [], d = this.getBytesAt(a, b), e = 0; b > e; e++) c[e] = String.fromCharCode(d[e]);
				return c.join("")
			}, this.getCharAt = function(a) {
				return String.fromCharCode(this.getByteAt(a))
			}, this.toBase64 = function() {
				return window.btoa(d)
			}, this.fromBase64 = function(a) {
				d = window.atob(a)
			}
		},
		b = function() {
			function b() {
				var a = null;
				return window.ActiveXObject ? a = new ActiveXObject("Microsoft.XMLHTTP") : window.XMLHttpRequest && (a = new XMLHttpRequest), a
			}

			function c(a, c, d) {
				var e = b();
				e ? (c && ("undefined" != typeof e.onload ? e.onload = function() {
					"200" == e.status ? c(this) : d && d(), e = null
				} : e.onreadystatechange = function() {
					4 == e.readyState && ("200" == e.status ? c(this) : d && d(), e = null)
				}), e.open("HEAD", a, !0), e.send(null)) : d && d()
			}

			function d(c, d, e, f, g, h) {
				var i = b();
				if(i) {
					var j = 0;
					f && !g && (j = f[0]);
					var k = 0;
					f && (k = f[1] - f[0] + 1), d && ("undefined" != typeof i.onload ? i.onload = function() {
						"200" == i.status || "206" == i.status || "0" == i.status ? (i.binaryResponse = new a(i.responseText, j, k), i.fileSize = h || i.getResponseHeader("Content-Length"), d(i)) : e && e(), i = null
					} : i.onreadystatechange = function() {
						if(4 == i.readyState) {
							if("200" == i.status || "206" == i.status || "0" == i.status) {
								var b = {
									status: i.status,
									binaryResponse: new a("unknown" == typeof i.responseBody ? i.responseBody : i.responseText, j, k),
									fileSize: h || i.getResponseHeader("Content-Length")
								};
								d(b)
							} else e && e();
							i = null
						}
					}), i.open("GET", c, !0), i.overrideMimeType && i.overrideMimeType("text/plain; charset=x-user-defined"), f && g && i.setRequestHeader("Range", "bytes=" + f[0] + "-" + f[1]), i.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 1970 00:00:00 GMT"), i.send(null)
				} else e && e()
			}
			return function(a, b, e, f) {
				f ? c(a, function(c) {
					var g, h, i = parseInt(c.getResponseHeader("Content-Length"), 10),
						j = c.getResponseHeader("Accept-Ranges");
					g = f[0], f[0] < 0 && (g += i), h = g + f[1] - 1, d(a, b, e, [g, h], "bytes" == j, i)
				}) : d(a, b, e)
			}
		}();
	window.BinaryFile = a, window.BinaryAjax = b
});