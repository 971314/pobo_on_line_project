var HISTORY = 9;
var SELF = 100;
var HOT = 100;

//最新价保留到价格精度
function decimalDecPrice(decimal, price) {
    price = price + '';
    var decIndex = price.indexOf('.');
    var length = price.length;
    if (decIndex >= 0 && length - 1 - decIndex >= decimal) {
        return price.substr(0, price.indexOf('.') + decimal + 1);
    }
    return (price - 0).toFixed(decimal);
}

var CustButton = React.createClass({
    displayName: 'CustButton',
    render: function () {
        var item = this.props.button;
        var cols = Math.ceil((item.length + 1) / 8);
        var btnWraps = [];
        var creatContents = function (content) {
            var style = {backgroundImage: 'url(images/' + content['image1'] + ')'};
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'a',
                    {className: 'btn btn-default', style: style, href: content['url'], id: content['id']},
                    content['title']
                )
            );
        };
        var createBtns = function (contents) {
            if (contents.length < 8)
                contents.push({
                    image1: "gengduo.png",
                    url: "pobo:pageId=900005&url=main/view/index-add.html",
                    id: "",
                    title: "添加"
                });
            return contents.map(creatContents);
        }
        for (var i = 0; i < cols; i++)
            btnWraps.push(React.createElement(
                'div',
                {className: 'btn-wrap clearfix'},
                createBtns(item.slice(i * 8, i * 8 + 8))
            ));
        return React.createElement(
            'div',
            {className: 'area clearfix'},
            btnWraps
        );
    }
});

var InfoList = React.createClass({
    displayName: 'InfoList',

    getDefaultProps: function () {
        return {
            dir: ''
        };
    },
    render: function () {
        var creatContents = function (content) {
            var href = this.props.dir + 'info/view/info-de.html?newsId=' + content.ID;
            var time = content.Pubtime.split(' ');
            return React.createElement(
                'a',
                {className: 'list-group-item clearfix', href: href},
                React.createElement('span', {className: 'title', dangerouslySetInnerHTML: {__html: content.Title}}),
                React.createElement(
                    'span',
                    {className: 'time'},
                    time[0]
                )
            );
        };
        return React.createElement(
            'div',
            {className: 'list-group'},
            this.props.contents.map(creatContents, this)
        );
    }
});

function showCon() {
    var cfg = mainConfig.contracts, data = cfg.data;
    if (isPoboApp) {
        var cons;
        var type = cfg.showType;
        if (type == 1) {
            cons = pbHQ.getHQDetailRecentBrowe(HISTORY);
        }
        else if (type == 2) {
            cons = pbZX.getSelfStock(SELF);
            //pblog.info(cons);
        }
        else if (type == 3) {
            cons = pbHQ.getHQZLHY(HOT);//期货选择主力合约
        }
        if (cons) {
            cons = JSON.parse(cons);
            if (cons.length > 0 && cons.length < 3) {
                for (var i = data.length - 1; i >= 0; i--) {
                    var find = false;
                    for (var j = 0; j < cons.length; j++) {
                        if (data[i].code == cons[j].code) {
                            find = true;
                            break;
                        }
                    }
                    if (!find)
                        cons.unshift(data[i]);
                    if (cons.length == 3)
                        break;
                }
            }
            if (cons.length > 0)
                data = cons;
        }
    }


    if (!contract || contract.length != data.length) {
        var html = '<div class="area clearfix">';
        for (var i = 0; i < data.length; i++) {
            if (i % 3 == 0)
                html += '<div class="div-float clearfix">';

            html += '<div class="col-xs-4 market text-center">'
                + '<a id="market-href-' + i + '">'
                + '<p class="e1"><span id="market-name-' + i + '" class="market-name"></span></p>'
                + '<p class="a1 m" id="market-price-' + i + '"><img src=""> <span>--</span></p>'
                + '<p class="e1 m" id="market-chg-' + i + '"><span>--</span>&nbsp;&nbsp;<span>--</span></p>'
                + '</a></div>';
            if (i % 3 == 2 || i == data.length - 1)
                html += '</div>';
        }
        html += '</div>';
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
            var j = i % 3;
            if (j != 1) {
                $('#market-href-' + i).addClass(j < 1 ? "down" : "up");
                $('#market-price-' + i + " img").attr('src', '../images/' + (j < 1 ? 'low' : 'high') + '.png');
            }
            $('#market-price-' + i + ' span').html(decimalDecPrice(4, Math.random()));
            var changeSpan = $('#market-chg-' + i + ' span');
            changeSpan[0].innerHTML = decimalDecPrice(2, Math.random()) * (j - 1);
            changeSpan[1].innerHTML = (decimalDecPrice(2, Math.random()) * (j - 1)) + "%";
        }
    }

    contract = data;
    if (isPoboApp)
        pbHQ.hqSubscribe(0, JSON.stringify({"1": marketData}));

    /*if (data.length < 4 && contractInterval) {
     clearInterval(contractInterval);
     contractInterval = null;
     }
     if (data.length > 3 && !contractInterval) {
     contractInterval = setInterval(function () {
     var cs = $("#market .marketCon");
     var index = cs.filter(".active").removeClass("active").index();
     if (++index >= cs.length)
     index = 0;
     cs.eq(index).addClass("active");
     }, 10000);
     }*/
    var pages = data.length / 3 + (data.length % 3 ? 1 : 0);
    var width = document.documentElement.clientWidth;

    $('#market .area>div').css({width: width});
    if (pages < 2) {
        $('#market .area').attr('style', "");
    } else {
        $('#market .area').css('width', width * pages);
    }

    if (marketScroll)
        marketScroll.destroy();
    if (pages > 1) {
        marketScroll = new IScroll('#market', {
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
            preventDefault: false,
            snap: '.div-float',
            tap: true,
            mouseWheelSpeed: 10
        });
    }

    var curr = 0;
    timer = setInterval(
        function () { //每5秒滚动
            curr++;
            if (curr == pages) {
                curr = 0;
                marketScroll.goToPage(0, 0, 1000); //滚回第一页
            } else {
                marketScroll.next();
            }
        }, 3000);
}

function callback(message) {

    var msg = JSON.parse(message);
    if (msg.moduleId == 90004) {
        newsData[newsCurrent] = msg.jData.Indexes.slice(0, mainConfig.news.data[newsCurrent].count);
        ReactDOM.render(React.createElement(InfoList, {
            contents: newsData[newsCurrent],
            dir: dirStr
        }), document.getElementById('info-list'));
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
            var ma = $('#market-href-' + i).attr('href', 'pobo:pageId=801001&market=' + contract[i]['market'] + '&code=' + contract[i]['code'] + '&groupflag=' + contract[i]['groupflag'] + '&hideflag=1')
                    .removeClass(),
                mp = $('#market-price-' + i),
                img = mp.find("img"),
                changeSpan = $('#market-chg-' + i + ' span');
            if (!isNaN(contract[i]['zd'])) {
                if (contract[i]['zd'] > 0) {
                    ma.addClass("up");
                    img.attr('src', '../images/high.png');
                } else if (contract[i]['zd'] < 0) {
                    ma.addClass('down');
                    img.attr('src', '../images/low.png');
                } else {
                    contract[i]['zdf'] = '0%';
                }
            }
            changeSpan[0].innerHTML = contract[i]['zd'];
            changeSpan[1].innerHTML = contract[i]['zdf'];
            mp.find('span').html(contract[i]['price']);
            $("#market-name-" + i).html(contract[i].name);
        }
    }
}

function processCustom() {
    var cfg = mainConfig.customs, data = cfg;
    if (isPoboApp) {
        if (pbSYS.isHasLocalFile('main', 1)) {
            data = pbSYS.readLocalFile('main', 1);
//大版本号变动的情况：contents字段长度变化；长度不变，但是模块发生较大变化即id变化；直接覆盖本地文件
//小版本号变动的情况：contents字段长度不变，所有模块id不变
            if (data) {
                data = JSON.parse(data); //本地配置文件保存的
                if (!data.version || !data.checkedVer || data.version < cfg.version) {
                    //没有版本号字段，或大版本号发生变化，直接覆盖本地配置文件的内容
                    prevCustom = null;
                    pbSYS.writeLocalFile('main', 1, JSON.stringify(data = cfg));
                } else if (data.version == cfg.version && data.checkedVer < cfg.checkedVer) {
                    //大版本号不变，小版本号发生变化，替换某些模块
                    for (var i = 0; i < data.contents.length; i++) {
                        for (var j = 0; j < cfg.contents.length; j++) {
                            var d = data.contents[i], d2 = cfg.contents[j];
                            if (d.id == d2.id) {
                                if (d.title != d2.title || d.image1 != d2.image1 || d.image2 != d2.image2 || d.url != d2.url) {
                                    d2.checked = "0";
                                    data.contents[i] = d2;
                                }
                                break;
                            }
                        }
                    }
                    pbSYS.writeLocalFile('main', 1, JSON.stringify(data));
                }
            } else {
                pbSYS.writeLocalFile('main', 1, JSON.stringify(data = cfg));
            }
        } else {
            pbSYS.writeLocalFile('main', 1, JSON.stringify(data = cfg));
        }
    }

    var custom = [];
    for (var i = 0; i < data.contents.length; i++) {
        if (data.contents[i].checked == '1') {
            custom.push(data.contents[i]);
        }
    }

    var length = custom.length,
        num = Math.ceil((length + 1) / 8),
        reactEle;

    if (prevCustom && prevCustom.length == length) {
        for (var i = 0; i < length; i++) {
            if (prevCustom[i].id != custom[i].id)
                break;
        }
        if (i == length)
            return;
    }
    prevCustom = custom;

    ReactDOM.render(React.createElement(CustButton, {button: custom}), document.getElementById('customized'));

    //图标滑动
    var inds = $("#indicator"), s = "";
    if (num > 1)
        for (var i = 0; i < num; i++)
            s += '<li' + (!i ? ' class="ind"' : '') + '></li> ';
    inds.html(s);

    var width = document.documentElement.clientWidth;
    $('#customized .area>div').css({width: width});
    if (num < 2) {
        $('#customized .area').attr('style', "");
    } else {
        $('#customized .area').css('width', width * num);
    }

    if (navScroll)
        navScroll.destroy();
    if (num > 1) {
        inds = inds.find("li");
        navScroll = new IScroll('#customized', {
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
            preventDefault: false,
            snap: '.btn-wrap',
            tap: true,
            mouseWheelSpeed: 10
        });
        navScroll.on('scrollEnd', function () {
            inds.removeClass().eq(Math.floor(-this.x / width)).addClass("ind");
        });
    }
}

function queryNews(data) {
    if (isPoboApp)
        pbINFO.infoQueryListWithJson(JSON.stringify({type: 'mu', groupIDs: data.ids, doc: 'json', count: data.count}));
    else {
        var gp = {gcount: data.ids.length, count: data.count};
        for (var i = 0; i < gp.gcount; i++) {
            gp["group" + (i + 1)] = data.ids[i];
        }
        $.get(mainConfig.news.webservice, gp, function (result) {
            newsData[newsCurrent] = JSON.parse(result).Indexes.slice(0, data.count);
            ReactDOM.render(React.createElement(InfoList, {contents: newsData[newsCurrent]}), document.getElementById('info-list'));
        });
    }
}

function processConfig(config) {
    if (mainConfig)
        prevConfig = mainConfig;
    mainConfig = config;

    if (prevConfig && prevConfig.version != config.version) {
        //页面，css，js有改动
        location.reload();
        return;
    }

    //banners
    var cfg = config.banners, container = $("#carousel-example-generic");
    if (!prevConfig || prevConfig.banners.version != cfg.version) {
        if (cfg.isShow) {
            container.show();
            var s = "", s2 = "";
            cfg.data.forEach(function (d, i) {
                s += "<a class='item" + (!i ? " active" : "") + "'" + (d.url ? " href='" + d.url + "'" : "") + ">"
                    + "<img src='" + d.img + "'/></a>";
                s2 += "<li data-target='#carousel-example-generic' data-slide-to='" + i + "'"
                    + (!i ? " class='active'" : "") + "></li> ";
            });
            if (window.bannersInit) {
                container.carousel('pause');
                setTimeout(function () {
                    container.find(".carousel-inner").html(s);
                    container.find(".carousel-indicators").html(s2);
                    container.carousel('cycle');
                }, 1000);
            } else {
                container.find(".carousel-inner").html(s);
                container.find(".carousel-indicators").html(s2);
                bannersInit = true;
            }
        } else
            container.hide();
    }

    //contracts
    if (config.contracts.isShow) {
        $("#market").show();
        showCon();
    } else {
        $("#market").hide();
        if (contractInterval) {
            clearInterval(contractInterval);
            contractInterval = null;
        }
    }

    //custom
    if (config.customs.isShow) {
        $("#customContainer").show();
        processCustom();
    } else
        $("#customContainer").hide();

    //news
    cfg = config.news, container = $("#info");
    if (!prevConfig || prevConfig.news.version != cfg.version) {
        if (cfg.isShow) {
            container.show();
            var s = "";
            cfg.data.forEach(function (d) {
                s += "<i>" + d.name + "</i>";
            });
            container.find(".area-title span").html(s);
            newsCurrent = 0;
            if (cfg.data.length > 1) {
                container.find(".area-title i").on("click", function () {
                    var t = $(this), index = t.index();
                    t.addClass("active").siblings().removeClass();
                    newsCurrent = index;
                    if (newsData[index])
                        ReactDOM.render(React.createElement(InfoList, {
                            contents: newsData[index],
                            dir: 'pobo:info/'
                        }), document.getElementById('info-list'));
                    else
                        queryNews(cfg.data[index]);
                }).eq(0).addClass("active");
            }
        } else
            container.hide();
    }
    if (cfg.isShow && cfg.data.length > 0) {
        newsData = [];
        queryNews(cfg.data[newsCurrent]);
    }
}


var isPoboApp = typeof pbE != "undefined";
var contract, contractInterval, prevCustom, navScroll, newsData, newsCurrent, mainConfig, prevConfig, marketScroll;
var dirStr = 'pobo:pageId=904002&url=';
if (isPoboApp) {
    var pbHQ = pbE.HQ(), pbSYS = pbE.SYS(), pbINFO = pbE.INFO(),
        pbZX = pbE.ZX();
}

function reload() {
    if (isPoboApp) {
        processConfig(JSON.parse(pbSYS.readConfig("main/conf/main.json")));
    } else {
        $.get("conf/main.json?" + Date.now(), processConfig);
    }
}

reload();


