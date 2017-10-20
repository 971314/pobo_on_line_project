webpackJsonp([3],{

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(13), __esModule: true };

/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(14)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },

/***/ 14:
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(25)

	/* template */
	var __vue_template__ = __webpack_require__(26)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "E:\\workSVN\\PbRes\\Develop\\public\\condition\\src\\component\\isConList.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-73f93b3a", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-73f93b3a", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] isConList.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(12);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var testUserId = "10023"; //云交易userId;
	exports.default = {
	    data: function data() {
	        return {
	            pageSize: 20, //一页20条
	            token: testToken, //t认证的oken
	            authId: testId, //认证的id
	            userId: testUserId, //云交易userId
	            orgCode: orgCode, //机构编号
	            isConTouchListObj: [], //存放已触发的列表数据
	            pullIsTouch: '点击加载更多',
	            CID: '',
	            pageIsNum: 0
	        };
	    },
	    created: function created() {
	        var option = {
	            callbacks: [{ fun: 102001, callback: function callback(msg) {
	                    if (testUserId == null) {
	                        if (msg) {
	                            if (102001 == msg.functionNo) {
	                                testUserId = pbE.WT().wtGetYunTradeUserId(pbE.WT().wtGetCurrentConnectionCID()); //获取云交易的userId
	                            }
	                        }
	                    }
	                } }],
	            reload: function reload() {},
	            refresh: function refresh() {},
	            fresh: function fresh() {},
	            doShow: function doShow(flag) {}
	        };
	        pbPage.initPage(option);
	        var _this = this;
	        //获取云交易的userID
	        if (window.pbE) {
	            _this.CID = pbE.WT().wtGetCurrentConnectionCID();
	            _this.userId = pbE.WT().wtGetYunTradeUserId(_this.CID); //获取云交易的userId
	            //这里会根据userId是否为空判断云条件单是否登录了交易，如果登录交易，可以直接进入条件单页面
	            if (!_this.userId) {
	                testUserId = null; //等于0代表未上传交易账号此时应该callback 102001
	            }
	        }
	        //已触发的列表
	        this.isTouchList(this.pageSize);
	    },
	    updated: function updated() {
	        //已触发滚动
	        Ps.initialize(document.getElementById('isList'), {
	            frozen: true,
	            wheelSpeed: 0.4
	        });
	    },
	    methods: {
	        //已触发的列表
	        isTouchList: function isTouchList(pageSize) {
	            var _this = this;
	            circleShowPass("正在加载"); //显示转圈
	            $.ajax({
	                url: conditionUrl,
	                method: 'post',
	                dataType: 'json',
	                contentType: 'application/json;charest=utf-8',
	                data: (0, _stringify2.default)({
	                    func: isConTouch,
	                    token: _this.token,
	                    id: _this.authId,
	                    userID: _this.userId,
	                    orgCode: _this.orgCode,
	                    begin: _this.pageIsNum + "",
	                    total: pageSize + "",
	                    type: contractType
	                }),
	                success: function success(data) {
	                    if (data.status == 0) {
	                        circleHidePass();
	                        //console.log(data)
	                        //  console.log(JSON.parse(data.data[0].conditionValue))
	                        $.each(data.data, function (key, value) {
	                            var type = JSON.parse(value.conditionValue).ConditionChoiced;
	                            var list;
	                            if (type == 2) {
	                                //时间
	                                list = JSON.parse(value.conditionValue).ConditionList[1].Time;
	                            }
	                            _this.isConTouchListObj.push({
	                                createTime: value.createTime,
	                                HYDM: value.HYMC,
	                                type: JSON.parse(value.conditionValue).TimeCondition,
	                                //type:value.ConditionChoiced,
	                                name: value.name, //条件单名称
	                                touchTime: value.triggerTime
	                            });
	                        });
	                        if (data.data.length) {
	                            //如果有记录就加载
	                            _this.pageIsNum = _this.pageIsNum + 1;
	                        } else {
	                            _this.pullIsTouch = '已经没有更多';
	                        }
	                    }
	                }, error: function error() {
	                    circleHidePass();
	                    console.log("服务器异常！");
	                }
	            });
	        },
	        //点击加载更多
	        btnIsMoreInfo: function btnIsMoreInfo() {
	            this.isTouchList(this.pageSize);
	        }
	    }
	};

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "warCon refreshContent"
	  }, [_vm._m(0), _vm._v(" "), _c('div', {
	    staticClass: "bottom",
	    attrs: {
	      "id": "isList"
	    }
	  }, [_c('div', {
	    staticClass: "TbodyInner"
	  }, [(_vm.isConTouchListObj) ? _c('table', {
	    staticClass: "brief static"
	  }, [_c('tbody', _vm._l((_vm.isConTouchListObj), function(data) {
	    return _c('tr', [_c('td', [_vm._v("\n                        " + _vm._s(data.HYDM ? data.HYDM : '----') + "\n                    ")])])
	  }))]) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "detailOuter"
	  }, [(_vm.isConTouchListObj) ? _c('table', {
	    staticClass: "detail"
	  }, [_c('tbody', _vm._l((_vm.isConTouchListObj), function(data) {
	    return _c('tr', [_c('td', [_vm._v(_vm._s(data.touchTime ? data.touchTime : '---'))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(data.type == 1 ? '价格' : '时间'))]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(data.name) + " ")]), _vm._v(" "), _c('td', [_vm._v(_vm._s(data.createTime))])])
	  }))]) : _vm._e()])])]), _vm._v(" "), _c('div', {
	    staticStyle: {
	      "clear": "both"
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "moreInfo",
	    class: {
	      hide: _vm.isConTouchListObj.length < 20
	    },
	    on: {
	      "click": _vm.btnIsMoreInfo
	    }
	  }, [_vm._v("\n    " + _vm._s(_vm.pullIsTouch) + "\n    ")])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "TheadWrap"
	  }, [_c('table', {
	    staticClass: "brief static"
	  }, [_c('tbody', [_c('tr', [_c('td', {
	    staticClass: "tdT"
	  }, [_vm._v("\n                    合约\n                ")])])])]), _vm._v(" "), _c('div', {
	    staticClass: "detailOuter"
	  }, [_c('table', {
	    staticClass: "detail"
	  }, [_c('thead', [_c('tr', [_c('th', [_vm._v("触发时间")]), _vm._v(" "), _c('th', [_vm._v("条件")]), _vm._v(" "), _c('th', [_vm._v("条件单名称")]), _vm._v(" "), _c('th', [_vm._v("创建时间")])])])])])])
	}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-73f93b3a", module.exports)
	  }
	}

/***/ }

});