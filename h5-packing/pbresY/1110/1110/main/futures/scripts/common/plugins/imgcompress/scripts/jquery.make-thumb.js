/*!
 * @hSea v3.1
 * @author ruansr
 * @datetime 2015-08-10 10:05:15 AM
 * @Copyright thinkive
 */
define(function(require, exports, module) {
    var a = (require("./binaryajax"), require("./exif"), require("./megapix-image"));!
    function(b, c, d) {
        "use strict";
        c.support.filereader = !!(b.File && b.FileReader && b.FileList && b.Blob);
        var e = {
            width: 0,
            height: 0,
            isDebug: !1,
            fill: !1,
            background: "#fff",
            type: "image/jpeg",
            size: "contain",
            mark: {},
            origin: {},
            immediate: !1,
            stretch: !1,
            success: null,
            error: null
        },
        f = (c("body"), /image.*/);
        c.fn.makeThumb = function(d) {
            var g = {};
            c.extend(g, e, d);
            var h = this;
            if (g.isDebug && alert("您的浏览器支持上传功能?" + (c.support.filereader ? "是": "否")), !c.support.filereader && c.isFunction(g.error)) return g.error.apply(self, [{},
            1, "系统检测到您手机暂不支持图片上传功能"]),
            !1;
            g.size;
            h.change(function() {
                var d = this,
                e = d.files;
                if (!e.length) return void(c.isFunction(g.error) && g.error.apply(d, [{},
                -2, ""]));
                var h = e[0];
                if (g.isDebug && alert("当前文件类型为：" + h.type + ",文件大小：" + h.size + "B"), g.immediate && h.lastModifiedDate && (g.isDebug && alert("文件最后修改时间：" + h.lastModifiedDate.toLocaleDateString()), "object" == typeof h.lastModifiedDate && h.lastModifiedDate instanceof Date)) {
                    var i = (new Date).getTime(),
                    j = h.lastModifiedDate.getTime();
                    if (i > j + 2e4 && c.isFunction(g.error)) return g.error.apply(d, [{},
                    10, "不能选择相册文件"]),
                    !1
                }
                c.isFunction(g.before) ? g.before.apply(d, [{}]) : $.showIndicator = function(){};
                var k, l, m, n, o, p = new FileReader,
                q = c('<canvas id="myCanvas"></canvas>'),
                r = q[0],
                s = (r.getContext("2d"), {
                    png: "image/png",
                    jpg: "image/jpeg",
                    jpeg: "image/jpeg",
                    bmp: "image/bmp"
                }),
                t = h.type;
                if (!t) try {
                    t = s[h.name.match(/\.([^\.]+)$/i)[1]]
                } catch(u) {
                    t = ""
                }
                f.test(t) ? (p.onerror = function(a) {
                    c.isFunction(g.error) && g.error.apply(d, [h, a])
                },
                p.onload = function(e) {
                    var f = e.target,
                    i = f.result;
                    h.type || (i = i.replace("data:", "data:" + t + ";")),
                    k = new Image;
                    var j, p = i.replace(/^.*?,/, ""),
                    q = atob(p),
                    r = new BinaryFile(q);
                    j = EXIF.readFromBinaryFile(r);
                    var s = j.Orientation,
                    u = new Image,
                    v = b.URL && b.URL.createObjectURL ? b.URL: b.webkitURL && b.webkitURL.createObjectURL ? b.webkitURL: null;
                    u.src = v.createObjectURL(h),
                    u.onload = function() {
                        var b, f, i = u.width,
                        j = u.height;
                        g.origin.iPhone && g.immediate;
                        var k = g.maxLength || 800;
                        i > k || j > k ? i > j ? (f = k, b = j * (k / i)) : (b = k, f = i * (k / j)) : (f = i, b = j);
                        var p = a.renderImageToDataURL(u, {
                            width: f,
                            height: b,
                            orientation: s
                        });
                        g.isDebug && alert("文件最后大小：" + p.length),
                        c.isFunction(g.success) && (m = {
                            width: o,
                            height: n
                        },
                        g.success.apply(d, [p, m, h, l, e]))
                    }
                },
                p.readAsDataURL(h)) : c.isFunction(g.error) && g.error.apply(d, [{},
                8, "上传文件格式不正确"])
            })
        }
    } (window, jQuery)
});