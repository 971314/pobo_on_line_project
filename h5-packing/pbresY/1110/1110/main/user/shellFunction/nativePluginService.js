/**
 * 调用壳子插件的业务 JS，封装与壳子之间的交互，包含接口文档中所有公用插件的调用方法
 * 接口说明：
 * 入参：{Key:Value,Key:Value,…}
 * 出参：{error_no:0,error_info:,results:[{Key:Value,Key:Value,...},{Key:Value,Key:Value,...},…]}
 * 功能号：funcNo
 */
define('user/shellFunction/nativePluginService.js', function(require, exports, module) {

    var nativePluginService = {
        "getInstance": getInstance,
        "destroy": destroy
    };

    /**
     * 销毁当前 service，一般不需要调用
     */
    function destroy() {
        nativePluginService = {};
    }

    /**
     * 获取 service 实例
     */
    function getInstance() {
        return nativePluginService;
    }

    /**
     * 请求参数的构造器，方便添加公用参数
     */
    function InvokeParam() {

    }

    /**
     * 公用
     * 获取应用配置
     * @param funcNo 50000
     * @param storeKey String 一级标签名称 Y
     * @param innerKey String 二级标签名称 Y
     * @return result String 返回值
     */
    nativePluginService.function50000 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param.funcNo = "50000";
        param["storeKey"] = paramMap.storeKey;
        param["innerKey"] = paramMap.innerKey;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 获取应用版本号
     * @param funcNo 50010
     * @return version String 应用版本号（展示版本号）
     * @return versionSn String 应用内部版本序号（系统升级用）
     */
    nativePluginService.function50010 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50010";
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 获取应用名称
     * @param funcNo 50011
     * @return appName String 应用名称
     */
    nativePluginService.function50011 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50011";
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 获取设备型号
     * @param funcNo 50020
     * @return deviceType String 设备型号
     */
    nativePluginService.function50020 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50020";
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 获取设备SDK版本号
     * @param funcNo 50021
     * @return systemVersion String 设备版本号
     */
    nativePluginService.function50021 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50021";
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 获取设备唯一码
     * @param funcNo 50022
     * @return deviceToken String 设备唯一码
     */
    nativePluginService.function50022 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50022";
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 获取设备IP地址
     * @param funcNo 50023
     * @return ip String 设备IP地址
     */
    nativePluginService.function50023 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50023";
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 获取设备MAC地址
     * @param funcNo 50024
     * @return mac String 设备MAC地址
     */
    nativePluginService.function50024 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50024";
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 获取设备网络环境
     * @param funcNo 50030
     * @return network String 设备网络环境(见数据字典)
     */
    nativePluginService.function50030 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50030";
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 获取设备网络运营商
     * @param funcNo 50031
     * @return phoneOperator String 设备网络运营商(见数据字典)
     */
    nativePluginService.function50031 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50031";
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 保存数据到内存缓存
     * @param funcNo 50040
     * @param key String 字段名 Y
     * @param value String 字段值 N
     * @param time	int	缓存时间，单位秒，0代表永久缓存	N	默认0
     */
    nativePluginService.function50040 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50040";
        param["key"] = paramMap.key;
        param["value"] = paramMap.value;
        param["time"] = paramMap.time;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 从内存缓存获取数据
     * @param funcNo 50041
     * @param key String 字段名 Y
     * @return value String 字段值
     */
    nativePluginService.function50041 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50041";
        param["key"] = paramMap.key;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 保存数据到用户Cache缓存目录
     * @param funcNo 50042
     * @param key String 字段名 Y
     * @param value String 字段值 Y
     * @param time	int	缓存时间，单位秒，0代表永久缓存	N	默认0
     */
    nativePluginService.function50042 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50042";
        param["key"] = paramMap.key;
        param["value"] = paramMap.value;
        param["time"] = paramMap.time;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 从用户Cache缓存目录获取数据
     * @param funcNo 50043
     * @param key String 字段名 Y
     * @return value String 字段值
     */
    nativePluginService.function50043 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50043";
        param["key"] = paramMap.key;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 通知原生H5框架加载完毕
     * @param funcNo 50100
     * @param moduleName String H5对应的模块名称
     */
    nativePluginService.function50100 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50100";
        param["moduleName"] = paramMap.moduleName;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 通知原生打开对应的模块
     * @param funcNo 50101
     * @param moduleName String H5对应的模块名称
     * @param params String 参数，用JSON格式 N
     */
    nativePluginService.function50101 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50101";
        param["moduleName"] = paramMap.moduleName;
        param["params"] = paramMap.params;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 通知原生打开/关闭左右菜单
     * @param funcNo 50102
     * @param moduleName String 模块名（android使用，ios可以不传） N left-menu
     * @param menuType String 菜单类型（0：左，1：右） N 默认0
     * @param openType String 打开类型（0：关闭，1：打开) N 默认1
     */
    nativePluginService.function50102 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50102";
        param["moduleName"] = paramMap.moduleName;
        param["menuType"] = paramMap.menuType;
        param["openType"] = paramMap.openType;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 设置左右抽屉不生效的区域范围(此范围内滑动不触发)
     * @param funcNo 50103
     * @param left float 矩形左上角点的x坐标 Y
     * @param top float 矩形左上角点的y坐标 Y
     * @param right float 矩形右下角点的x坐标 Y
     * @param bottom float 矩形右下角点的y坐标 Y
     */
    nativePluginService.function50103 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50103";
        param["left"] = paramMap.left;
        param["top"] = paramMap.top;
        param["right"] = paramMap.right;
        param["bottom"] = paramMap.bottom;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 通知原生退出应用
     * @param funcNo 50105
     */
    nativePluginService.function50105 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50105";
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 通知原生进行Toast提示
     * @param funcNo 50106
     * @param content String 提示内容 Y
     */
    nativePluginService.function50106 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50106";
        param["content"] = paramMap.content;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 隐藏/显示系统底部TabBar
     * @param funcNo 50108
     * @param moduleName String 模块名 N 默认传"main"
     * @param flag String 0：隐藏，1：显示 N 默认是1
     */
    nativePluginService.function50108 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50108";
        param["moduleName"] = paramMap.moduleName;
        param["flag"] = paramMap.flag;
        result = $.callMessage(param);
        return result;
    };
    /**
     * 公用
     * 通知原生打开系统浏览器的一个网页
     * @param funcNo 50109
     * @param url String 网页地址 Y
     */
    nativePluginService.function50109 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50109";
        param["url"] = paramMap.url;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 获取软件是否安装
     * @param funcNo 50200
     * @param scheme String APP的URL唯一标志 Y
     * @return isInstall String 是否安装(0：否，1：是）
     */
    nativePluginService.function50200 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50200";
        param["scheme"] = paramMap.scheme;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 进行软件的版本升级或者安装
     * @param funcNo 50201
     * @param url String APP地址 Y
     * @param type String 下载类型(0：原生，1：H5） Y
     * @param version String APP展示版本 Y
     * @param versionSn String APP内部升级版本序号 Y
     * @param tip	String	下载更新提示语	N
     */
    nativePluginService.function50201 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50201";
        param["url"] = paramMap.url;
        param["type"] = paramMap.type;
        param["version"] = paramMap.version;
        param["versionSn"] = paramMap.versionSn;
        param["tip"] = paramMap.tip;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 打开软件
     * @param funcNo 50202
     * @param scheme String APP的URL唯一标志 Y
     */
    nativePluginService.function50202 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50202";
        param["scheme"] = paramMap.scheme;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 打开原生键盘
     * @param funcNo 50210
     * @param pageId String 页面Id Y
     * @param eleId String 元素Id Y
     * @param doneLable String 完成按钮显示字符 N
     * @param keyboardType String 键盘类型(见数据字典) Y 1：英文键盘，2：股票键盘，3：有序数字键盘，4：随机数字键盘，
     * 									5：随机数字键盘加强版，6：交易买卖键盘，7：有序数字键盘加强版 9：系统键盘
     * @param moduleName String H5对应的模块名称
     */
    nativePluginService.function50210 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50210";
        param["moduleName"] = paramMap.moduleName;
        param["pageId"] = paramMap.pageId;
        param["eleId"] = paramMap.eleId;
        param["doneLable"] = paramMap.doneLable;
        param["keyboardType"] = paramMap.keyboardType;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 关闭原生键盘
     * @param funcNo 50211
     */
    nativePluginService.function50211 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50211";
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 拨打电话
     * @param funcNo 50220
     * @param telNo String 电话号码 Y
     * @param callType String 拨打类型(0：进入拨打界面，1：直接拨打) Y 默认0
     */
    nativePluginService.function50220 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50220";
        param["telNo"] = paramMap.telNo;
        param["callType"] = paramMap.callType;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 发送短信内容
     * @param funcNo 50221
     */
    nativePluginService.function50221 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50221";
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 弹出通讯录，用于选择联系人的信息
     * @param funcNo 50222
     * @param moduleName String 模块名称 N H5对应的模块名称
     */
    nativePluginService.function50222 = function() {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50222";
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 获取手机号码
     * @param funcNo 50224
     * @return phone String 手机号码
     */
    nativePluginService.function50224 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50224";
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 弹出原生分享菜单
     * @param funcNo 50230
     * @param shareTypeList String 分享平台的类型，多个用，分割（数据字典） Y 值参照数据字典  shareType 1：新浪微博，2：腾讯微博，
     							3：搜狐微博，4：网易微博，6：QQ空间，7：人人网，8：开心网，9：朋友网
     							19：短信分享，22：微信好友，23：微信朋友圈，24：QQ
     * @param title String	标题	Y
     * @param link String	链接	Y
     * @param content String	内容	Y
     * @param imgUrl String	图片	Y
     * @param moduleName String 模块名称	Y	"H5的模块名称，Android必传 (商城:mall;开户:open;交易:trade;小贷:loan)"
     */
    nativePluginService.function50230 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50230";
        param["moduleName"] = paramMap.moduleName;
        param["shareTypeList"] = paramMap.shareTypeList;
        param["title"] = paramMap.title;
        param["link"] = paramMap.link;
        param["content"] = paramMap.content;
        param["imgUrl"] = paramMap.imgUrl;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 发布分享内容，直接调用指定平台的分享功能
     * @param funcNo 50231
     * @param shareType String 分享平台（数据字典） Y  shareType 1：新浪微博，2：腾讯微博，
     							3：搜狐微博，4：网易微博，6：QQ空间，7：人人网，8：开心网，9：朋友网
     							19：短信分享，22：微信好友，23：微信朋友圈，24：QQ
     * @param title String	标题	Y
     * @param link String	链接	Y
     * @param content String 内容 Y
     * @param imgUrl String	图片	Y
     * @param moduleName String 模块名称	Y	"H5的模块名称，Android必传 (商城:mall;开户:open;交易:trade;小贷:loan)"
     */
    nativePluginService.function50231 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50231";
        param["moduleName"] = paramMap.moduleName;
        param["shareType"] = paramMap.shareType;
        param["title"] = paramMap.title;
        param["link"] = paramMap.link;
        param["content"] = paramMap.content;
        param["imgUrl"] = paramMap.imgUrl;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 查看PDF文件
     * @param funcNo 50240
     * @param url String pdf文件链接 Y
     * @param title String pdf文件标题 Y
     */
    nativePluginService.function50240 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50240";
        param["url"] = paramMap.url;
        param["title"] = paramMap.title;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 弹出日期控件
     * @param funcNo 50250
     * @param moduleName String 模块名称 N
     * @param year String 年 格式：YYYY Y
     * @param month String 月 格式：MM Y
     * @param day String 日 格式DD Y
     * @param selector String H5的元素选择器 N
     */
    nativePluginService.function50250 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50250";
        param["moduleName"] = paramMap.moduleName;
        param["year"] = paramMap.year;
        param["month"] = paramMap.month;
        param["day"] = paramMap.day;
        param["selector"] = paramMap.selector;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 设置手势密码
     * @param funcNo 50260
     * @param style String 手势密码的样式类型(0：不显示中心小圆，1：显示） N 默认0
     * @param account String 用户账号或者手机号 N
     */
    nativePluginService.function50260 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50260";
        param["style"] = paramMap.style;
        param["account"] = paramMap.account;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 验证手势密码
     * @param funcNo 50261
     * @param moduleName String 模块名称 N H5对应的模块名称
     * @param style String 手势密码的样式类型(0：不显示中心小圆，1：显示） N 默认0
     * @param userImage String 用户头像图片地址 N
     * @param errorNum String 允许输入错误的次数 N
     * @param lockSenconds String 后台锁屏时间 N
     */
    nativePluginService.function50261 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50261";
        param["moduleName"] = paramMap.moduleName;
        param["style"] = paramMap.style;
        param["userImage"] = paramMap.userImage;
        param["errorNum"] = paramMap.errorNum;
        param["lockSenconds"] = paramMap.lockSenconds;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 获取手势密码的设置状态
     * @param funcNo 50263
     * @return flag	String	状态（0：未设置，1：已设置）
     */
    nativePluginService.function50263 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50263";
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 设置手势密码的设置状态
     * @param funcNo 50264
     * @param flag	String	状态（0：取消手势，1：设置手势）	N	默认1
     * @param style	String	手势密码的样式类型(0：不显示中心小圆，1：显示）	N	默认0
     * @param account	String	用户账号或者手机号	N
     */
    nativePluginService.function50264 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50264";
        param["flag"] = paramMap.flag;
        param["style"] = paramMap.style;
        param["account"] = paramMap.account;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 打开原生的信息提示框
     * @param funcNo 50110
     * @param title	String	标题	N
     * @param content	String	内容	Y
     * @param type	String	类型（0：提示，1：确认）	N	默认0
     * @param flag	String	业务标志	N，原生的信息提示框点击确认按钮后回调H5功能号50111，并把flag业务标志传过去
     * @param width	Float	宽度	N
     * @param height	Float	高度	N
     * @param moduleName String H5对应的模块名称
     */
    nativePluginService.function50110 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50110";
        param["title"] = paramMap.title;
        param["moduleName"] = paramMap.moduleName;
        param["content"] = paramMap.content;
        param["type"] = paramMap.type;
        param["flag"] = paramMap.flag;
        param["width"] = paramMap.width;
        param["height"] = paramMap.height;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 弹出生成图片二维码组件
     * @param funcNo 50270
     * @param title	String	标题	N
     * @param content	String	内容	Y
     */
    nativePluginService.function50270 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50270";
        param["title"] = paramMap.title;
        param["content"] = paramMap.content;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 弹出扫描图片二维码组件
     * 说明：弹出扫描图片二维码组件获取数据后调用50272接口回调H5
     * @param funcNo 50271
     * @param title	String	标题	N
     * @return content	String	内容
     * @param moduleName String H5对应的模块名称
     */
    nativePluginService.function50271 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50271";
        param["moduleName"] = paramMap.moduleName;
        param["title"] = paramMap.title;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 选择照片或者拍照，经过裁剪实现图片上传
     * 说明：上传图片完成后调用50274功能号进行H5回调
     * @param funcNo 50273
     * @param serverAddr String	服务器地址	Y
     * @param fileName String 文件标示名称	Y
     * @return paramExt String	参数(json格式字符串)
     * @param moduleName String 模块名称	Y	"H5的模块名称，Android必传(商城:mall;开户:open;交易:trade;小贷:loan)"
     */
    nativePluginService.function50273 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50273";
        param["serverAddr"] = paramMap.serverAddr;
        param["moduleName"] = paramMap.moduleName;
        param["fileName"] = paramMap.fileName;
        param["paramExt"] = paramMap.paramExt;
        param["compress"] = paramMap.compress;
        param["width"] = paramMap.width;
        param["height"] = paramMap.height;
        param["source"] = paramMap.source; //照片来源  camera phone
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 进行软件版本检测，并自动更新最新版本
     * @param funcNo 50203
     * @param url String	获取版本的服务器地址	N	默认取原生配置文件里面的地址
     */
    nativePluginService.function50203 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50203";
        param["url"] = paramMap.url;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 进行视频文件的播放
     * @param funcNo 50275
     * @param title String	视频文件的标题	N
     * @param mediaUrl String	视频文件的地址	Y
     * 说明：error_no -5027501	视频文件地址不能为空
     */
    nativePluginService.function50275 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50275";
        param["title"] = paramMap.title;
        param["mediaUrl"] = paramMap.mediaUrl;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 获取应用设备的详细信息
     * @param funcNo 50001
     */
    nativePluginService.function50001 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50001";
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 通知原生关闭模块(一般H5返回键会用)
     * @param funcNo 50114
     * @param moduleName	String	模块名	Y	关闭目标模块名
     * @param params	String	参数，用JSON格式	N
     * 说明：-5011401	模块名不能为空
     */
    nativePluginService.function50114 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50114";
        param["moduleName"] = paramMap.moduleName;
        param["params"] = paramMap.params;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 通知原生打开一个WebView,加载url地址
     * @param funcNo 50115
     * @param moduleName	String	模块名	Y	自定义模块名
     * @param url	String	链接地址	Y
     * @param statusColor	String	状态栏颜色	N	默认是#188ACF
     * @param title	String	标题	N	不为空代表标题是原生来实现的
     * 说明：1、-5011501	模块名称不能为空
     		2、-5011502	链接地址不能为空
     */
    nativePluginService.function50115 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50115";
        param["moduleName"] = paramMap.moduleName;
        param["url"] = paramMap.url;
        param["statusColor"] = paramMap.statusColor;
        param["title"] = paramMap.title;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 通知原生机器设备震动
     * @param funcNo 50116
     */
    nativePluginService.function50116 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50116";
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 弹出滚动选择器（选择完选项，自动调用H5的50253接口	）
     * @param funcNo 50252
     * @param moduleName	String	模块名称	Y	"H5的模块名称，Android必传 (商城:mall;开户:open;交易:trade;小贷:loan)"
     * @param data	JSONArray	数据(JSONArray格式,label:标签，value：值，children:子节点)	Y
     				[{label:xxxx,value:xxxx},{label:xxxx,value:xxxx},…...]或者
     				[{label:xxxx,value:xxxx,children:[{label:xxx,value:xxxx},{label:xxx,value:xxxx}]},
     				{label:xxxx,value:xxxx,children:[{label:xxx,value:xxxx},{label:xxx,value:xxxx}]},...]
     * @param column	int	列数	Y
     * @param selector	String	H5的元素选择器	N
     * 说明：1、-5025201	数据不能为空
    		2、-5025202	列数不能为空
     */
    nativePluginService.function50252 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50252";
        param["moduleName"] = paramMap.moduleName;
        param["data"] = paramMap.data;
        param["column"] = paramMap.column;
        param["selector"] = paramMap.selector;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 自动识别二维码图片（一般用于长按图片触发）
     * @param funcNo 50276
     * @param data	String	二维码图片(支持二维码图片url地址或者二维码图片的Base64编码)	Y
     * 说明：-5027601	二维码图片不能为空
     */
    nativePluginService.function50276 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50276";
        param["data"] = paramMap.data;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 原生替代H5发送https请求
     * @param funcNo 50118 Y
     * @param param  ajax传递的参 Y
     * @param url    ajax发送的URL地址 Y
     * @param flowNo    H5和壳子交互的流水号 Y
     */
    nativePluginService.function50118 = function(url, paramMap, flowNo, isPost, timeOut) {
        var result = null;
        var param = {};
        param['funcNo'] = "50118";
        param['url'] = url + "?";
        param['paramMap'] = paramMap;
        param['flowNo'] = flowNo;
        param['isPost'] = isPost ? isPost : 1;
        param['timeOut'] = timeOut ? timeOut : 30;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 设置webView状态栏的颜色
     * @param funcNo 50119
     */
    nativePluginService.function50119 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50119";
        param["color"] = paramMap.color;
        param["moduleName"] = paramMap.moduleName;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 首页状态栏控制
     * @param funcNo 50678
     * @param scrollY 滑动
     */
    nativePluginService.function50678 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50678";
        param["scrollY"] = paramMap.scrollY;
        param["moduleName"] = paramMap.moduleName;
        result = $.callMessage(param);
        return result;
    };

    /**
     * 公用
     * 传递消息给原生
     * @param funcNo 50679
     */
    nativePluginService.function50679 = function(paramMap) {
        var result = null;
        var param = new InvokeParam();
        param["funcNo"] = "50679";
        param["flag"] = paramMap.flag;
        param["moduleName"] = paramMap.moduleName;
        result = $.callMessage(param);
        return result;
    };

    module.exports = nativePluginService;
});
