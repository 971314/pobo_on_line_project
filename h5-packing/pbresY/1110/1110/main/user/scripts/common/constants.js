/**
 * @author 汪卫中
 *
 * 描述：商城业务常量配置
 * 命名规则：模块名 + key值，key值由大写字母和下划线组成。
 */
define(function(require, exports, module) {

	var serviceConstant = {
		// 校验类型
		"msgType" : {
			"SMSTYPE" : "1" //校验手机号
		},
		//加密连接符
		"rsaEncryptSign" : {
			"CONNECT" : "@@"
		},
		// 平台类型
		"platform" : {
			"PLATFORM_PC" : "0", // PC
			"PLATFORM_ANDROID" : "1", //android
			"PLATFORM_IOS" : "2" // ios
		},
		// 键盘类型 1：英文键盘，2：股票键盘，3：数字键盘，4：随机数字键盘，9：系统键盘
		"keyPanelType" : {
			"ENGLISH" : "1", // 英文键盘
			"STOCKCODE" : "2", // 股票键盘
			"NUMBER" : "3", // 数字键盘
			"RANDOMNUMBER" : "4", // 随机数字键盘
			"SYSTEM" : "9" // 系统键盘
		},
		//客户提交的姓名和详细地址等长度
		"lengthValid" : {
			"NAME" : "15",  //姓名
			"DETAIL_ADDRESS" : "40",  //详细地址
			"SIGN_BY" : "40",  //签发机关
			"USER_NATIVE_ADDRESS" : "40",  //证件地址
			"USER_ADDRESS" : "40"  //联系地址
		},
		//资讯类别
		"NewsType" : {
			"TODAY_ATTENTION" : "1",  //今日关注
			"INFORMATION_NEWS" : "0",  //资讯新闻
			"FUTURES_DAYLY" : "2",
			"FINANCE_NEWS" : "3",
			"FINANCE_FUTURE" : "4",
			"FINANCE_MARKET" : "5",
			"BOURSE" 	: "6",
			"PRODUCE" 	: "7",
			"ENERGY" 	:"8",
			"FERROUS_BOURSE" : "9",
			"RARE_METAL" : "10"
		},
		"NewsTypeName" : {
			"TODAY_ATTENTION" : "今日关注",  //今日关注
			"INFORMATION_NEWS" : "资讯新闻",  //资讯新闻
			"FUTURES_DAYLY" : "期货日报",
			"FINANCE_NEWS" : "金融财经",
			"FINANCE_FUTURE" : "股指期货",
			"FINANCE_MARKET" : "金融市场",
			"BOURSE" 	: "金属市场",
			"PRODUCE" 	: "农产品",
			"ENERGY" 	:"能源化工",
			"FERROUS_BOURSE" : "黑色金属",
			"RARE_METAL" : "稀有金属"

		},
		"DOMHEIGHT" : {
			"BAR_HEIGHT" : 49 //原生设置的底部bar高度
		},
		//首页快捷功能模块关键字
		"QuiChannel" : {
			"UPDATEIDCARD" : "0010" , //证件更新
			"OPENBROKER"   : "1003" , //居间申请
			"TRANSFER"	   : "1002" , //银期转账
			"ESTABLISHACCOUNT" : "1001", //期货开户
			"FZKAIHU" : "0001", //仿真开户
			"GZKAIHU"	: "0004",//股指开户
			"ZIXUN" 	: "0007", //资讯
			"RENMENACTI" : "0009", //热门活动

		},
		//图片
		"adGroupID" : {
			"BANNER"	: "1",//首页banner
			"ATTENTION" : "2" //今日关注
		}
	};

	//暴露对外的接口
	module.exports = serviceConstant;
});
