/**
 * 图片加载样式工具类
 * 2016年12月05日10:06:57
 */
define(function(require, exports, module) {
    require("validatorUtils"); // 底层框架校验类
    var param;
    /**
     *   eleImg 父加载节点
     *   width 宽度
     *   height 高度
     *   lodingtimeout 加载超时时间
     *   loadFailed 加载失败图片
     *   loading 加载中图片
     */


    function imgload(param1, callback) {
        param = param1;
        var index = 0;
        var loadingImg = param.eleImg.find("img");
        (function loadOneByOne() {
            //退出条件
            if (index > loadImg.length) {
                return callback;
            } else {
                index++;
            }
            if ($.validatorUtils.isNotEmpty(param.parantid)) {}
            //创建一个加载代理函数
            var loadImgProxy = createLoadImgProxy();
            //在当前图片加载或失败后，递归调用，加载下一张
            loadImgProxy(loadingImg[index - 1]).always(loadOneByOne);
        })();
    }

    function loadImg(img, src) {
        img.src = src;
    }

    function createLoadImgProxy() {
        var imgCache = new Image();
        var dfd = $.Deferred();
        var timeoutTimer;

        //开始加载超时监控，超时后进行reject操作
        function beginTimeoutWatcher() {
            timeoutTimer = setTimeout(function() {
                dfd.reject('timeout');
            }, param.lodingtimeout);
        }

        //结束加载超时监控
        function endTimeoutWatcher() {
            if (!timeoutTimer) {
                return;
            }

            clearTimeout(timeoutTimer);
        }

        //加载完成事件处理，加载完成后进行resolve操作
        imgCache.onload = function() {
            dfd.resolve(this.src);
        };

        //加载终止事件处理，终止后进行reject操作
        imgCache.onabort = function() {
            dfd.reject("aborted");
        };

        //加载异常事件处理，异常后进行reject操作
        imgCache.onerror = function() {
            dfd.reject("error");
        };

        return function(eleImg, src) {

            dfd.always(function() {
                //加载完成或加载失败都要终止加载超时监控
                endTimeoutWatcher();
            }).done(function(src) {
                //加载完成后，往图片元素上设置图片
                loadImg(eleImg, src);
            }).fail(function(msg) {
                //加载失败后，往图片元素上设置失败图片
                loadImg(eleImg, param.loadFailed);
            });
//          var loging_success = eleImg.src;
//          loadImg(eleImg, param.loading);
//          imgCache.src = loging_success;
//          if ($.validatorUtils.isNotEmpty(param.width)) {
//              imgCache.width = param.width;
//          }
//          if ($.validatorUtils.isNotEmpty(param.height)) {
//              imgCache.height = param.height;
//          }
//          if (param.bindOnclick) {
//              eleImg.onclick = function() {
//                  if ($(eleImg).attr("href")) {
//                      window.open($(eleImg).attr("href"));
//                  }
//              }
//          }
            //开始进行超时加载监控
            beginTimeoutWatcher();

            return dfd.promise();
        };
    }


    var imgloading = {
        "imgload": imgload
    };

    //暴露对外的接口
    module.exports = imgloading;
});
