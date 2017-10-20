function fresh() {
    close = 0, plFlag = 0, pbEngine.queryMoney(CID, JSON.stringify({})), tradePart(CID)
}
function refresh() {
    close = 0, plFlag = 0, pbEngine.startLoading(), refreshFlag = 0, pbEngine.queryMoney(CID, JSON.stringify({})), pbEngine.synFlash(CID)
}
function tradePart(o) {
    var t = pbEngine.queryStockRe(o);
    if (t) {
        var e = JSON.parse(t).data;
        if (e.length > 0) {
            symbolData = {}, marketData = [], unique = [], stockInfo = [], marketInfo = [];
            for (var a = 0; a < e.length; a++) {
                var n = e[a][54], s = e[a][63], l = {}, r = 0;
                if (marketInfo = JSON.parse(pbEngine.getHQInfo(s, n)), s.indexOf("&") >= 0 && (r = 1), marketInfo.HQCode && marketInfo.HQMarket && !isNaN(parseFloat(e[a][136])) && !r) {
                    var c = pbEngine.getHQPriceRate(marketInfo.HQCode, marketInfo.HQMarket), f = pbEngine.getTradeMSSL(s, n);
                    base = pbEngine.getHQLastBasePrice(marketInfo.HQCode, marketInfo.HQMarket), l[1] = marketInfo.HQCode, l[2] = e[a][136] - 0, l[3] = e[a][135] - 0, l[4] = c, l[5] = f, l[6] = e[a][112], l[8] = base, l[9] = marketInfo.HQMarket, l[10] = e[a][503], l[11] = e[a][1101], l[12] = e[a][1102], stockInfo.push(l), unique.indexOf(marketInfo.HQCode) < 0 && (unique.push(marketInfo.HQCode), marketData.push({
                        2: marketInfo.HQMarket,
                        3: marketInfo.HQCode
                    }))
                }
            }
            symbolData[1] = marketData, symbolData[7] = "1", pbEngine.hqSubscribe(0, JSON.stringify(symbolData))
        } else if (e.length <= 0 && (pbEngine.stopLoading(), stockInfo = [], plFlag = 1, totalPL = 0, close)) {
            var i = closePl - charge - 0;
            i > 0 ? ($("#total-PL").removeClass(), $("#total-PL").addClass("c3"), $("#total-PL").html("+" + i + "元")) : i < 0 ? ($("#total-PL").removeClass(), $("#total-PL").addClass("c4"), $("#total-PL").html(i + "元")) : ($("#total-PL").removeClass(), $("#total-PL").addClass("c1 bolder"), $("#total-PL").html("0元"))
        }
    }
}
function hqPart(o) {
    for (var t = o.jData.Data, e = 0, a = stockInfo.length; e < a; e++)for (var n = 0, s = t.length; n < s; n++)if (stockInfo[e][1] == t[n][10]) {
        t[n][29] && !isNaN(t[n][29]) ? (stockInfo[e].price = (t[n][29] - 0) / stockInfo[e][4], stockInfo[e][8] = pbEngine.getHQLastBasePrice(stockInfo[e][1], stockInfo[e][9]), "1" == stockInfo[e][10] ? stockInfo[e].price && !isNaN(stockInfo[e].price) && (stockInfo[e].dayPl = ((stockInfo[e].price - stockInfo[e][2] - 0).toFixed(4) - 0) * stockInfo[e][3] * stockInfo[e][5], "1" == stockInfo[e][6] && (stockInfo[e].dayPl = 0 - stockInfo[e].dayPl)) : "2" == stockInfo[e][10] ? stockInfo[e].price && !isNaN(stockInfo[e].price) && stockInfo[e][8] && !isNaN(stockInfo[e][8]) && (stockInfo[e].dayPl = ((stockInfo[e].price - stockInfo[e][8] - 0).toFixed(4) - 0) * stockInfo[e][3] * stockInfo[e][5], "1" == stockInfo[e][6] && (stockInfo[e].dayPl = 0 - stockInfo[e].dayPl)) : "0" == stockInfo[e][10] && (stockInfo[e][11] == stockInfo[e][3] ? stockInfo[e].price && !isNaN(stockInfo[e].price) && (stockInfo[e].dayPl = ((stockInfo[e].price - stockInfo[e][12] - 0).toFixed(4) - 0) * stockInfo[e][11] * stockInfo[e][5], "1" == stockInfo[e][6] && (stockInfo[e].dayPl = 0 - stockInfo[e].dayPl)) : stockInfo[e][11] < stockInfo[e][3] && stockInfo[e].price && !isNaN(stockInfo[e].price) && stockInfo[e][8] && !isNaN(stockInfo[e][8]) && (stockInfo[e].dayPl = ((stockInfo[e].price - stockInfo[e][12] - 0).toFixed(4) - 0) * stockInfo[e][11] * stockInfo[e][5] + ((stockInfo[e].price - stockInfo[e][8] - 0).toFixed(4) - 0) * (stockInfo[e][3] - stockInfo[e][11] - 0) * stockInfo[e][5], "1" == stockInfo[e][6] && (stockInfo[e].dayPl = 0 - stockInfo[e].dayPl)))) : stockInfo[e].dayPl = 0, stockInfo[e][7] = stockInfo[e].dayPl;
        break
    }
    var l = !1;
    totalPL = 0, sumPl = 0;
    for (var e = 0, a = stockInfo.length; e < a; e++) {
        if ("undefined" == typeof stockInfo[e][7] || isNaN(stockInfo[e][7])) {
            l = !1;
            break
        }
        totalPL += stockInfo[e][7], l = !0
    }
    l && (plFlag = 1, close && (sumPl = (totalPL - 0 + (closePl - 0) - charge - 0).toFixed(2), sumPl > 0 ? ($("#total-PL").removeClass(), $("#total-PL").addClass("c3"), $("#total-PL").html("+" + sumPl + "元")) : sumPl < 0 ? ($("#total-PL").removeClass(), $("#total-PL").addClass("c4"), $("#total-PL").html(sumPl + "元")) : ($("#total-PL").removeClass(), $("#total-PL").addClass("c1 bolder"), $("#total-PL").html("0元"))))
}
function callback(o) {
    var t = JSON.parse(o);
    if (90002 == t.moduleId)if (6012 == t.functionNO) {
        pbEngine.stopLoading();
        var e = t.jData.data[0];
        close = 1, charge = e[182] - 0, closePl = e[102] - 0, plFlag && (sumPl = (totalPL - 0 + (closePl - 0) - charge - 0).toFixed(2), sumPl > 0 ? ($("#total-PL").removeClass(), $("#total-PL").addClass("c3"), $("#total-PL").html("+" + sumPl + "元")) : sumPl < 0 ? ($("#total-PL").removeClass(), $("#total-PL").addClass("c4"), $("#total-PL").html(sumPl + "元")) : ($("#total-PL").removeClass(), $("#total-PL").addClass("c1 bolder"), $("#total-PL").html("0元"))), unit = getUnit(e[56]), e[97] = (e[97] - 0).toFixed(2), e[152] = (e[152] - 0).toFixed(2), e[111] = (e[111] - 0).toFixed(2), $("#total-asset").html(e[97] + unit), $("#guarantee").html(e[152] + unit), (e[345] + "").indexOf("%") >= 0 ? $("#risk").html(e[345]) : $("#risk").html((e[345] - 0).toPercent(2)), $("#available").html(e[111] + unit)
    } else 56004 == t.functionNO && t.reservId == CID ? 5 == t.jData[223] && (refreshFlag || (pbEngine.stopLoading(), refreshFlag = 1), fresh()) : 56005 == t.functionNO && t.reservId == CID ? fresh() : 56006 == t.functionNO && t.reservId == CID ? fresh() : 56014 == t.functionNO && t.reservId == CID && fresh(); else 9e4 == t.moduleId && (totalPL = 0, hqPart(t))
}
function reload() {
    close = 0, plFlag = 0, $("#name").removeClass("hide"), pbEngine.startLoading(), CID = pbEngine.getTradeCurrentConnectionCID(), loginInfo = JSON.parse(pbEngine.loginRe(CID)), $("#accnum").html(loginInfo.data[0][51]), reg.test(loginInfo.data[0][74].substr(0, 1)) ? $("#name").addClass("hide") : ($("#name").removeClass("hide"), $("#name").html(loginInfo.data[0][74].substr(0, 1) + "先生/女士")), pbEngine.queryMoney(CID, JSON.stringify({})), tradePart(CID)
}
function isShow(o) {
    o || pbEngine.stopLoading()
}
Number.prototype.toPercent = function (o) {
    return o = o || 2, (Math.round(this * Math.pow(10, o + 2)) / Math.pow(10, o)).toFixed(o) + "%"
};
var toUN = {
    on: function (o) {
        for (var t = [], e = 0; e < o.length;)t[e] = ("00" + o.charCodeAt(e++).toString(16)).slice(-4);
        return "\\u" + t.join("\\u")
    }, un: function (o) {
        return unescape(o.replace(/\\/g, "%"))
    }
}, symbolData = {}, marketData = [], stockInfo = [], unique = [], unit, marketInfo, totalPL = 0, refreshFlag = 1, CID = pbEngine.getTradeCurrentConnectionCID(), closePl, charge;
$("#name").removeClass("hide");
var close = 0, plFlag = 0, sumPl = 0;
pbEngine.startLoading();
var loginInfo = JSON.parse(pbEngine.loginRe(CID));
$("#accnum").html(loginInfo.data[0][51]);
var reg = new RegExp("^[A-Za-z]+$");
reg.test(loginInfo.data[0][74].substr(0, 1)) ? $("#name").addClass("hide") : ($("#name").removeClass("hide"), $("#name").html(loginInfo.data[0][74].substr(0, 1) + "先生/女士")), pbEngine.queryMoney(CID, JSON.stringify({})), tradePart(CID);