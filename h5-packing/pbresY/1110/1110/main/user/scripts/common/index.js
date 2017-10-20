//2016-3-30 16:35:55

define('user/scripts/index.js', function(require, exports, module) {
    var pageId = '#index ';
    var loading_img = require("user/scripts/common/imgloading"); //图片加载插件
    var otherData = require("comOtherData"); //其他业务服务类
    var commService = require("commService").getInstance(); //用户服务接口类
    var HIscroll = require("hIscroll");
    var common = require("common");
    var bannerHIscroll = null;
    var myHIscrolls = null;
    var mainConfig, contract, news;
    var pbHQ, pbSYS, pbINFO, pbZX;
    var isPoboApp = typeof pbE != "undefined";
    var HISTORY = 9;
    var SELF = 100;
    var HOT = 100;
    /**
     * 初始化方法
     */
    function init() {

        window.callback = function(message) {
            return callbackMsg(message);
        }

        if (bannerHIscroll) {
            bannerHIscroll.destroy();
            bannerHIscroll = null;
        }
        if (myHIscrolls) {
            myHIscrolls.destroy();
            myHIscrolls = null;
        }
        if (isPoboApp) {
            pbHQ = pbE.HQ();
            pbSYS = pbE.SYS();
            pbINFO = pbE.INFO();
            pbZX = pbE.ZX();
            processConfig(JSON.parse(pbSYS.readConfig("main/conf/main.json")));
        } else {
            $.get("conf/main.json?" + Date.now(), processConfig);
        }
        //获取自选行情
        getOptional();

        //获取今日要闻
        getNew();

        //获取首页banner
        getBannerAdvertise();

        var user_id = null;
        //查询用户自定义的快捷功能
        getQuickChannel(user_id);

        //加载公司公告
        getAnnouncement();
    }

    /**
     * 查询用户自定义的快捷功能 1109320
     */
    function getQuickChannel(userId) {
        var eleObject = {
            "eleLead": pageId + "#quick_em", //导航点集合
            "eleWrapper": pageId + "#quick_wrapper", // 滑动容器
            "eleScroll": pageId + "#quick_scroller", // 滑动内容列表
            "perCount": 1, // 每个可视区域显示的子元素
            "auto": false,
            "isScroll": true //是否使用滑动组件
        };
        //获取数据
        otherData.getQuickChannel(userId, eleObject);
    }

    /**
     * 显示自选行情
     */
    function getOptional() {
        var cfg = mainConfig.contracts;
        data = cfg.data;
        news = mainConfig.news;
        var cons = "";
        if (isPoboApp) {
            var cons_ZX = pbZX.getSelfStock(SELF);
            var cons_ZLHY = pbHQ.getHQZLHY(HOT); //期货选择主力合约
            var bool = true;
            if (typeof cons_ZX == "undefined") {
                bool = false;
            }
            cons = cons_ZX.concat(cons_ZLHY);
            $.bindEvent($(pageId + " #selfstock"), function() {
                if (bool) {
                    window.open("pobo:uncheck=1&pageId=803000");
                } else {
                    window.open("pobo:uncheck=1&pageId=801000");
                }
            })
            if (cons) {
                cons = JSON.parse(cons);
                if (cons.length > 0 && cons.length < 3) {
                    data = cons;
                } else {
                    for (var i = 0; i < cons.length; i++) {
                        data[i] = cons[i]
                        if (i == 6) {
                            break;
                        }
                    }
                }
            }
        }

        if (!contract || contract.length != data.length) {
            var html = "";
            for (var i = 0; i < 3; i++) {
                html += '<tr class="tit" id="market-href-' + i + '">' +
                    '<td class="tit"><strong id="market-name-' + i + '" class="market-name"></strong></td>' +
                    '<td id="market-price-' + i + '"><span>--</span></td>' +
                    '<td id="market-chg-' + i + '"><span>--</span></td>' +
                    '<td id="market-chg1-' + i + '"><span>--</span></td>';
                html += '</tr>';
            }
            $("#market").html(html);
        }

        //symbolData存放订阅行情（最新价）所需的参数
        //marketData存放symbolData的1字段，即合约的market和code
        //column存放symbolData的5字段，即需要订阅的最新价
        /*var column = [{'6': '29'}];*/
        /*symbolData['5'] = column;*/
        var marketData = [];
        for (var i = 0; i < data.length; i++) {
            //存入市场合约代码集合
            marketData.push({
                '2': data[i].market,
                '3': data[i].code
            });
            if (!isPoboApp) {
                $("#market-name-" + i).html(data[i].name);
                $('#market-price-' + i + ' span').html(decimalDecPrice(4, Math.random()));
                var changeSpan = $('#market-chg-' + i + ' span');
                var changeSpan1 = $('#market-chg1-' + i + ' span');
                changeSpan.html(decimalDecPrice(2, Math.random()) * (j - 1));
                changeSpan1.html((decimalDecPrice(2, Math.random()) * (j - 1)) + "%");
            }
        }

        /**
         * 彭博订阅主力合约
         * @type {[type]}
         */
        contract = data;
        if (isPoboApp)
            pbHQ.hqSubscribe(0, JSON.stringify({
                "1": marketData
            }));
    }

    /**
     * 获取今日要闻
     * @return {[type]} [description]
     */
    function getNew() {
        if (news.isShow) {
            pbINFO.infoQueryListWithJson(JSON.stringify({
                type: 'mu',
                groupIDs: news.data[0].ids,
                doc: 'json',
                count: news.data[0].count
            }));
        } else {
            $(pageId + " #information").parent().parent().hide();
        }
    }

    /**
     * 获取首页bannher
     * @return {[type]} [description]
     */
    function getBannerAdvertise() {
        var ctrlParam = {
            "isShowWait": false
        };
        commService.getBannerAdvertise(null, function(resultVo) {
            var banner_html = "";
            var banner_tDiv = "";
            if (resultVo.error_no == 0) {
                var data = resultVo.results;
                $.each(data, function(e) {
                	
                	banner_html += "<li><img src=" + $.config.global.pictureUrl + data[e].picture + " href='pobo:uncheck=1&pageId=900005&url=" + data[e].url + "' /></li>";
//                  banner_html += "<li><img src=" + $.config.global.pictureUrl + data[e].picture + " href='pobo:uncheck=1&pageId=900005&url=" + data[e].url + "' /></li>";
                    banner_tDiv += (e == 1) ? "<em class='active'></em>" : "<em></em>";
                });
                $(pageId + " #home_scroller").html(banner_html);
                $(pageId + " #home_tabDiv").html(banner_tDiv);
                var param = {
                    "eleImg": $(pageId + " #home_scroller"),
                    "width": "100%",
                    "height": "125px",
                    "lodingtimeout": 13000,
                    "loadFailed": "../images/logo_img01.png",
                    "loading": "../images/banner01.jpg",
                    "bindOnclick": true
                }
                loading_img.imgload(param, swiper_banner());
                swiper_banner();
            } else {
                $.alert("广告图片获取异常:" + resultVo.error_info);
            }
        }, ctrlParam);
    }

    /*
     * 首页图片轮转组件
     */

    function swiper_banner() {
        if (!bannerHIscroll) {
            var config = {
                wrapper: $(pageId + " #home_wrapper"), //wrapper对象
                scroller: $(pageId + " #home_scroller"), //scroller对象
                perCount: 1, //每个可视区域显示的子元素，就是每个滑块区域显示几个子元素
                showTab: true, //是否有导航点
                tabDiv: $(pageId + " #home_tabDiv"), //导航点集合对象
                auto: true //是否自动播放
            };
            bannerHIscroll = new HIscroll(config);
        }
    }

    function decimalDecPrice(decimal, price) {
        price = price + '';
        var decIndex = price.indexOf('.');
        var length = price.length;
        if (decIndex >= 0 && length - 1 - decIndex >= decimal) {
            return price.substr(0, price.indexOf('.') + decimal + 1);
        }
        return (price - 0).toFixed(decimal);
    }

    /**
     * 澎博原生回调H5
     */
    function callbackMsg(message) {
        var msg = JSON.parse(message);
        if (msg.moduleId == 90004) {
            var news_date = $(pageId + " #news_date .cont");
            $.each(news_date, function(e) {
                var news_date_info = "<h5>" + msg.jData.Indexes[e].Title.substring(6, msg.jData.Indexes[e].Title.length) + "</h5><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                    "</p><span class='time'>" + common.timeBucket(msg.jData.Indexes[e].Pubtime) + "</span>";
                $(this).html(news_date_info);
                $.bindEvent($(this), function() {
                	window.open("pobo:uncheck=1&pageId=900005&url=main/information/views/details.html?newsid=" + msg.jData.Indexes[e].ID + "&url_ids=" + news.data[0].ids);
//                  window.open("pobo:uncheck=1&pageId=900005&url=main/information/views/details.html?newsid=" + msg.jData.Indexes[e].ID + "&url_ids=" + news.data[0].ids);
                });
            });
        } else if (msg.moduleId == 90000) {
            var data = msg.jData.Data;
            for (var i = 0; i < contract.length; i++) {
                var lastPrice = 0;
                //放大倍数
                var rate = pbHQ.hqGetPriceRate(contract[i].code, contract[i].market);
                var zdInfo = JSON.parse(pbHQ.hqGetZDInfo(contract[i].code, contract[i].market));
                //涨跌
                contract[i]['zd'] = zdInfo.HQZD;
                //涨跌幅
                contract[i]['zdf'] = zdInfo.HQZDF;
                //groupflag
                contract[i]['groupflag'] = pbHQ.hqGetGroupFlag(contract[i].code, contract[i].market);
                //商品价格小数位
                contract[i]['decimal'] = pbHQ.hqGetPriceDecimal(contract[i].code, contract[i].market);
                for (var j = 0; j < data.length; j++) {
                    if (contract[i]['code'] == data[j]['10']) {
                        if (data[j]['29']) {
                            lastPrice = (data[j]['29'] - 0) / rate; //获取最新价
                            contract[i]['price'] = decimalDecPrice(contract[i]['decimal'], lastPrice);
                        } else
                            contract[i]['price'] = '--';
                        break;
                    }
                }
                if (contract[i]['price'] == undefined)
                    contract[i]['price'] = "--";
            }
            for (var i = 0; i < contract.length; i++) {
                var ma = $('#market-href-' + i).attr('href', 'pobo:uncheck=1&pageId=801001&market=' + contract[i]['market'] + '&code=' + contract[i]['code'] + '&groupflag=' + contract[i]['groupflag'] + '&hideflag=1'),
                    mp = $('#market-price-' + i),
                    changeSpan = $('#market-chg-' + i + ' span'),
                    changeSpan1 = $('#market-chg1-' + i + ' span');
                //监听自定义事件
                $.bindEvent(ma, function() {
                    window.open($(this).attr("href"));
                }, 'click');
                if (!isNaN(contract[i]['zd'])) {
                    if (contract[i]['zd'] > 0) {
                        changeSpan.addClass("ared");
                        changeSpan1.addClass("ared");
                    } else if (contract[i]['zd'] < 0) {
                        changeSpan.addClass("agreen");
                        changeSpan1.addClass("agreen");
                    } else {
                        contract[i]['zdf'] = '0%';
                    }
                }
                changeSpan.html(contract[i]['zd']);
                changeSpan1.html(contract[i]['zdf']);
                mp.find('span').html(contract[i]['price']);
                $("#market-name-" + i).html(contract[i].name);
            }
        }
    }

    /**
     * 获取公司公告
     */
    function getAnnouncement() {
        var devoceInfo = JSON.parse(pbSYS.getDeviceJsonInfo());
        var token;
        for (var key in devoceInfo) {
            if (key == 72) {
                token = devoceInfo[key];
            }
        }
        var param = {
            "category_id": "notice_index",
            "token": token,
            "pageNum": 1,
            "pageSize": 10
        };
        var ctrlParam = {
            "isShowWait": false
        };
        commService.getAnnouncement(param, function(resultVo) {
            if (resultVo.error_no == 0) {
                var notice_list = $(pageId + ".notice_list");
                var notice_html = "";
                var data = resultVo.results[0].data;
                var notice_index = 0;
                $.each(data, function() {
                    if (notice_index++ > 5) {
                        return;
                    } else {
                    	
                    	notice_html += "<li href='pobo:uncheck=1&pageId=900005&url=main/information/views/details.html?url_ids=10401&newsid=" + this.id + "'><p>" + this.news_title + "</p><span class='time'>" + common.timeBucket(this.news_date) + "</span></li>";
//                      notice_html += "<li href='pobo:uncheck=1&pageId=900005&url=main/information/views/details.html?url_ids=10401&newsid=" + this.id + "'><p>" + this.news_title + "</p><span class='time'>" + common.timeBucket(this.news_date) + "</span></li>";
                    }
                });
                notice_list.html(notice_html);
                $.each(notice_list.find("li"), function() {
                    $.bindEvent($(this), function() {
                        window.open($(this).attr("href"));
                    }, 'click');
                });
            } else {
                $.alert("公告获取异常:" + resultVo.error_info);
            }
        }, ctrlParam);
    }

    /**
     * 读取彭博数据
     */
    function processConfig(config) {
        mainConfig = config;
    }

    /**
     *资讯页面跳转
     */
    /*
     * 页面事件绑定
     */
    function bindPageEvent() {
        $.bindEvent($(pageId + " #information"), function() {
        	
        	window.open("pobo:uncheck=1&pageId=900005&url=main/information/index.html");
//          window.open("pobo:uncheck=1&pageId=900005&url=main/information/index.html");
        });
        $.bindEvent($(pageId + " #opinoin"), function() {
           window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/userInfo/opinoinFeedback.html");
//window.open("pobo:uncheck=1&pageId=900005&url=main/futures/views/userInfo/opinoinFeedback.html");
        });
        $.bindEvent($(pageId + " #announcement"), function() {
        	
        window.open("pobo:uncheck=1&pageId=900005&url=main/information/views/index.html&url_ids=10401");
//window.open("pobo:uncheck=1&pageId=900005&url=main/information/views/index.html&url_ids=10401");
        })
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
