/**
 * 程序入口配置读取
 * 项目开发时需要的自定义配置
 */
/**
 * 存放对 hsea 的 config，需在 zepto 之后 hsea 之前加载
 *
 * 2016-4-12 10:15:09
 */
define(function(require, exports, module) {
    $.config = {
        /***
         * 扩展全局配置
         * */
        globalExtend: function() {
            //弹出框架不关闭前一个，默认是关闭
            $.modal.prototype.defaults.closePrevious = false;
            $.modal.prototype.defaults.modalCloseByOutside = true;
            //弹出提示插件默认是ok和cancel，这里可以自定义
            $.modal.prototype.defaults.modalButtonOk = '确定';
            $.modal.prototype.defaults.modalButtonCancel = '取消';
            //重写框架自带效果

            $.showIndicatorHtml = function() {}; //加载页面等待菊花
            $.hideIndicatorHtml = function() {}; //加载页面隐藏菊花
        },

        /*
         * 配置默认document.title标题
         */
        documentTitle: "申银万国期货",
        /**
         * hSea根路径，项目中的文件uri最终会在项目访问的web路径后添加
         */
        //		"seaBaseUrl": "/src/",
        seaBaseUrl: "/1110/main/",
        //项目名，默认为project
        projName: "user", //一般为“project”，对应的项目目录名字
        //项目的css目录
        cssPathName: "css",
        //项目的images目录
        imagesPathName: "images",
        //项目的scripts目录
        scriptsPathName: "scripts",
        //项目的views目录
        viewsPathName: "views",
        //壳子文件scripts文件路径
        shellScriptPath: "user/shellFunction/msgFunction.js",
        /**
         * 后端接口返回过滤
         */
        executeFilter: {
            executeFilterFunc: function(data) {
                if (data.errorNo === '-999') //未登录
                {
                    return false;
                } else {
                    return true;
                }

            }
        },
        //引导页
        guidePage: {
            "pageCode": "",
            "jsonParam": {}
        },
        //项目中公用模块的别名配置(根目录为seaBaseUrl)
        pAlias: {
            "common": "user/scripts/common/common.js", //框架公共JS
            "constants": "user/scripts/common/constants", //常量
            "hIscroll": "2.0.0/js/plugins/iscroll/scripts/hIscroll.js", //iscroll
            "nativePluginService": "user/shellFunction/nativePluginService.js", //和壳子通讯service
            "validatorUtils": "2.0.0/js/plugins/validator/scripts/validatorUtils.js", //校验插件
            "stringUtils": "user/scripts/common/stringUtils.js", //公用方法
            "comOtherData": "user/scripts/common/comOtherData.js", //其他数据服务接口类
            "commonExt": "user/scripts/common/commonExt.js", //公用方法
            "commService": "user/services/commService.js"
        },
        //登录检测(一个模块里面登录只要一个)
        loginCheck: {
            isAsynch: false, //是否异步,默认同步(区别在于如果设置为true，需要等当前异步操作完毕后才会执行后续操作(比如页面跳转))
            //可以是页面pagecode，也可以是页面路径 如果是某个目录下面所有页面都不需要校验
            "pageFilters": [
                ['user/views/index.html', 'user/views/index'],
                ['user/*']
            ], //过滤的pageCode,可以绕过登录
            "checkFunc": function(url, noAnimation, replace, reload, param, pagecode, prePageCode, _callback, direct) {
                return true;
                //常规登录判断
            }
        },
        /**
         * 跳转页面时做的权限校验，提供在外面的方法,每次跳转页面都会先执行此方法
         * moduleAlias为项目通用模块配置的别名，moduleFuncName方法里面写校验规则，返回true或者false，避免写异步的代码
         * 不配默认为：{}
         */
        checkPermission: {
            "moduleAlias": "common",
            "moduleFuncName": "checkPermission"
        },
        /**
         * 第一次加载第一个业务模块前所需要的处理，即启动之后提供给外界初始化的接口，
         * 这个方法中避免写异步操作，或者保证异步影响其他代码逻辑
         * moduleAlias为项目通用模块配置的别名，moduleFuncName为执行的方法
         * 这个配置可以做很多事情，当你从业务模块逻辑上不好实现时，可以考虑这里！！
         * 是否异步，默认为true,为异步,设置为同步后，会先执行这个初始化方法后才会执行后续模块方法
         */
        firstLoadIntf: {
            "moduleAlias": "common",
            "moduleFuncName": "firstLoadFunc",
            "isAsynch": true
        },
        /**
         * 项目中需要调用到的常量、变量这里配置，调用方式，通过require("gconfig").global.*来调用
         * 不配默认为：{}
         */
        global: {
            //主cookie名字--sso统一相关配置
            "cookieName": "sso_client_info",
            "ssoSignKey": "BDmmrGbedzrcRHI4e2Ri7NEV7W9ETGV8++T+Ba6DuzKfkq9sMVgDpHj/tOr0/1JJY3gzNnCzzDCvKWLInZYHKNT/CkAwfLFl",
            //sso统一登录数据加密方式,des或者aes
            "encryMode": "aes",
			 "propUrl": "../../user/scripts/common/plugins/i18n/bundle/", // 资源文件地址
			/*********************测试环境 begin*******************************/
            // "serverPath": "http://222.66.235.70:41402/servlet/json", //开发后台接口地址
            // "pictureUrl": "http://222.66.235.70:41402",
            // "imagePath": "http://222.66.235.70:41402/servlet/Image", //生成图片验证码
			/*********************测试环境 end*******************************/
			/*********************生产环境 begin**************************************/
			"serverPath": "http://124.74.247.149:18080/servlet/json", //开发后台接口地址
            "pictureUrl": "http://124.74.247.149:18080",
            "imagePath": "http://124.74.247.149:18080/servlet/Image", //生成图片验证码
			/*********************生产环境 end**************************************/
			
        },
        /**
         * Android手机返回键处理，退出应用还是返回上级页面，true-退出应用，false-返回页面，默认为true
         * 如果需要返回上一级页面，并最终提示退出应用，需要改为false，并且在一级页面的html上设置“data-pageLevel="1"”
         * 不配默认为：true
         */
        isDirectExit: false,
        /**
         * ajax请求超时时间设置，默认为30秒之后超时
         * 不配默认为：30秒
         *
         */
        ajaxTimeout: {
            time: 30,
            //请求超时处理方法
            ajaxTimeoutFunc: function(xhr, textStatus, errorMessage) {
                $.alert('网络超时');

            },
            //断网，跨域或者网络请求错误等
            execErrorFunc: function(xhr, textStatus, errorMessage) {
                if (textStatus === 'abort') //跨域或者被主动阻断
                {
                    $.alert('服务器错误，或者网络异常!');
                } else {
                    //$.alert('无网络连接!');
                }
            }
        },
        /**
         * 缓存扫描器的扫描间隔时间，单位秒
         * @time 缓存扫描时间
         * @cacheFuncNoKey用于缓存功能号保存的key--缓存数据接口会用到
         * @cacheFuncCallbackKey用于返回参数成功标志位的key--缓存数据接口会用到
         */
        cacheScanInterval: {
            time: 10,
            cacheFuncNoKey: ['funcno', 'funcNo'],
            cacheFuncCallbackKey: ['errorNo', 'error_no']
        },
        /*
         * 是否启用调试模式，1启用，0不启用
         * */
        isDebug: 0,
        /*
         * 是否将http请求转发给原生去发送,0是否，1是，默认为否,如果为是需要原生支持
         *
         **/
        isFordHttpReq: 0,
        /**
         * 是否通过mainfest文件管理版本号
         * */
        isMainfest: "0"
    };
    module.exports = $.config;
});
