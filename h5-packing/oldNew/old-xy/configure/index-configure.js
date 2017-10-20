var iconInit = {}, content = [], ver = "", verCheck = "", time = "";  //iconInit是写入配置文件的对象，content、ver、verCheck、time分别对应contents, version, checkedVer, updateDate字段的内容
ver = "0.03", verCheck = "0.01", time = "2016-09-27";
content = [
    {
        "title": "开户",
        "checked": "1", //区分已添加和未添加
        "image1": "kaihu.png",
        "image2": "kaihu1.png",
        "url": "pobo:pageId=800006",
        "id": "kaihu"
    },
    {
        "title": "公司公告",
        "checked": "1",
        "image1": "xiadan.png",
        "image2": "xiadan1.png",
        "url": "pobo:info/index-news.html?name=公司公告&groupID=511601&pageId=900005",
        "id": "gonggao"
    },
    {
        "title": "交易提示",
        "checked": "1",
        "image1": "zhangting.png",
        "image2": "zhangting1.png",
        "url": "pobo:info/index-news.html?name=交易提示&groupID=511603&pageId=900005",
        "id": "tishi"
    },
    {
        "title": "今日要闻",
        "checked": "1",
        "image1": "caijing.png",
        "image2": "caijing1.png",
        "url": "pobo:pageId=904000",
        "id": "xinwen"
    },
    {
        "title": "财经日历",
        "checked": "1",
        "image1": "gmcaijing.png",
        "image2": "gmcaijing1.png",
        "url": "pobo:pageId=904001",
        "id": "caijing"
    },
    {
        "title": "交易所公告",
        "checked": "1",
        "image1": "t.png",
        "image2": "t1.png",
        "url": "pobo:info/index-news.html?name=交易所公告&groupID=511602&pageId=900005",
        "id": "gonggao"
    },
    {
        "title": "投资者园地",
        "checked": "1",
        "image1": "jiaoyu.png",
        "image2": "jiaoyu1.png",
        "url": "pobo:info/index-news.html?name=投资者园地&groupID=511604&pageId=900005",
        "id": "yuandi"
    },
    {
        "title": "常见问题",
        "checked": "1",
        "image1": "wenda.png",
        "image2": "wenda1.png",
        "url": "pobo:info/index-news.html?name=常见问题&groupID=511605&pageId=900005",
        "id": "wenti"
    },
    {
        "title": "客服热线",
        "checked": "1",
        "image1": "kefu.png",
        "image2": "kefu1.png",
        "url": "pobo:pageId=800007&tel=4008885515",
        "id": "kefu"
    },
    {
        "title": "中金所",
        "checked": "0",
        "image1": "zhong.png",
        "image2": "zhong1.png",
        "url": "pobo:pageId=801302",
        "id": "zhong"
    },
    {
        "title": "上期所",
        "checked": "0",
        "image1": "shang.png",
        "image2": "shang1.png",
        "url": "pobo:pageId=801303",
        "id": "shang"
    },
    {
        "title": "郑商所",
        "checked": "0",
        "image1": "zheng.png",
        "image2": "zheng1.png",
        "url": "pobo:pageId=801304",
        "id": "zheng"
    },
    {
        "title": "大商所",
        "checked": "0",
        "image1": "da.png",
        "image2": "da1.png",
        "url": "pobo:pageId=801305",
        "id": "da"
    },
    {
        "title": "外盘行情",  //功能模块的名称
        "checked": "0",  //是否添加
        "image1": "wai.png",
        "image2": "wai1.png",
        "url": "pobo:pageId=801700",
        "id": "wai"
    }
];

iconInit['contents'] = content;
iconInit['version'] = ver;  //大版本号，图标改动很多、增添模块、删减模块
iconInit['checkedVer'] = verCheck;  //小版本号，图标数目不变，每个模块id不变
iconInit['updateDate'] = time;  //改动日期，作为参考