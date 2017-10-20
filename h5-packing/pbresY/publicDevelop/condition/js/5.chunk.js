webpackJsonp([5],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(13), __esModule: true };

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(14)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(21)

	/* template */
	var __vue_template__ = __webpack_require__(22)
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
	__vue_options__.__file = "E:\\workSVN\\PbRes\\Develop\\public\\condition\\src\\component\\dialog\\tipMsg.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-0600e327", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-0600e327", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] tipMsg.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
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

	exports.default = {
	    props: ['msgTip']
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "modal dialog-info",
	    attrs: {
	      "id": "msgTipDialog"
	    }
	  }, [_c('div', {
	    staticClass: "modal-dialog"
	  }, [_c('div', {
	    staticClass: "modal-content"
	  }, [_c('p', {
	    staticClass: "tipP"
	  }, [_vm._v("提示")]), _vm._v(" "), _c('div', {
	    staticClass: "modal-header dialog-bottom"
	  }, [_vm._v("\n                " + _vm._s(_vm.msgTip) + "\n            ")]), _vm._v(" "), _c('div', {
	    staticClass: "modal-body",
	    attrs: {
	      "data-dismiss": "modal"
	    }
	  }, [_vm._v("\n                确认\n            ")])])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-0600e327", module.exports)
	  }
	}

/***/ },
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(30)


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(31)

	/* script */
	__vue_exports__ = __webpack_require__(36)

	/* template */
	var __vue_template__ = __webpack_require__(71)
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
	__vue_options__.__file = "E:\\workSVN\\PbRes\\Develop\\public\\condition\\node_modules\\vue2-timepicker\\src\\vue-timepicker.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-923702e0", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-923702e0", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] vue-timepicker.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(32);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(35)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./../../vue-loader/lib/style-rewriter.js?id=data-v-923702e0!./../../vue-loader/lib/selector.js?type=styles&index=0!./vue-timepicker.vue", function() {
				var newContent = require("!!./../../css-loader/index.js!./../../vue-loader/lib/style-rewriter.js?id=data-v-923702e0!./../../vue-loader/lib/selector.js?type=styles&index=0!./vue-timepicker.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(33)();
	// imports
	exports.i(__webpack_require__(34), "");

	// module
	exports.push([module.id, "\n", ""]);

	// exports


/***/ },
/* 33 */,
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(33)();
	// imports


	// module
	exports.push([module.id, ".time-picker {\n  display: inline-block;\n  position: relative;\n  font-size: 1em;\n  width: 10em;\n  font-family: sans-serif;\n  vertical-align: middle;\n}\n\n.time-picker * {\n  box-sizing: border-box;\n}\n\n.time-picker input.display-time {\n  border: 1px solid #d2d2d2;\n  width: 10em;\n  height: 2.2em;\n  padding: 0.3em 0.5em;\n  font-size: 1em;\n}\n\n.time-picker .clear-btn {\n  position: absolute;\n  display: flex;\n  flex-flow: column nowrap;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  margin-top: -0.15em;\n  z-index: 3;\n  font-size: 1.1em;\n  line-height: 1em;\n  vertical-align: middle;\n  width: 1.3em;\n  color: #d2d2d2;\n  background: rgba(255,255,255,0);\n  text-align: center;\n  font-style: normal;\n\n  -webkit-transition: color .2s;\n  transition: color .2s;\n}\n\n.time-picker .clear-btn:hover {\n  color: #797979;\n  cursor: pointer;\n}\n\n.time-picker .time-picker-overlay {\n  z-index: 2;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\n.time-picker .dropdown {\n  position: absolute;\n  z-index: 5;\n  top: calc(2.2em + 2px);\n  left: 0;\n  background: #fff;\n  box-shadow: 0 1px 6px rgba(0,0,0,0.15);\n  width: 10em;\n  height: 10em;\n  font-weight: normal;\n}\n\n.time-picker .dropdown .select-list {\n  width: 10em;\n  height: 10em;\n  overflow: hidden;\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: stretch;\n  justify-content: space-between;\n}\n\n.time-picker .dropdown ul {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n\n  flex: 1;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\n.time-picker .dropdown ul.minutes,\n.time-picker .dropdown ul.seconds,\n.time-picker .dropdown ul.apms{\n  border-left: 1px solid #fff;\n}\n\n.time-picker .dropdown ul li {\n  text-align: center;\n  padding: 0.3em 0;\n  color: #161616;\n}\n\n.time-picker .dropdown ul li:not(.hint):hover {\n  background: rgba(0,0,0,.08);\n  color: #161616;\n  cursor: pointer;\n}\n\n.time-picker .dropdown ul li.active,\n.time-picker .dropdown ul li.active:hover {\n  background: #41B883;\n  color: #fff;\n}\n\n.time-picker .dropdown .hint {\n  color: #a5a5a5;\n  cursor: default;\n  font-size: 0.8em;\n}\n", ""]);

	// exports


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(37);

	var _keys2 = _interopRequireDefault(_keys);

	var _stringify = __webpack_require__(12);

	var _stringify2 = _interopRequireDefault(_stringify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CONFIG = {
	  HOUR_TOKENS: ['HH', 'H', 'hh', 'h', 'kk', 'k'],
	  MINUTE_TOKENS: ['mm', 'm'],
	  SECOND_TOKENS: ['ss', 's'],
	  APM_TOKENS: ['A', 'a']
	};

	exports.default = {
	  name: 'VueTimepicker',

	  props: {
	    value: { type: Object },
	    hideClearButton: { type: Boolean },
	    format: { type: String },
	    minuteInterval: { type: Number },
	    secondInterval: { type: Number },
	    id: { type: String }
	  },

	  data: function data() {
	    return {
	      hours: [],
	      minutes: [],
	      seconds: [],
	      apms: [],
	      showDropdown: false,
	      muteWatch: false,
	      hourType: 'HH',
	      minuteType: 'mm',
	      secondType: '',
	      apmType: '',
	      hour: '',
	      minute: '',
	      second: '',
	      apm: '',
	      fullValues: undefined
	    };
	  },


	  computed: {
	    displayTime: function displayTime() {
	      var formatString = String(this.format || 'HH:mm');
	      if (this.hour) {
	        formatString = formatString.replace(new RegExp(this.hourType, 'g'), this.hour);
	      }
	      if (this.minute) {
	        formatString = formatString.replace(new RegExp(this.minuteType, 'g'), this.minute);
	      }
	      if (this.second && this.secondType) {
	        formatString = formatString.replace(new RegExp(this.secondType, 'g'), this.second);
	      }
	      if (this.apm && this.apmType) {
	        formatString = formatString.replace(new RegExp(this.apmType, 'g'), this.apm);
	      }
	      return formatString;
	    },
	    showClearBtn: function showClearBtn() {
	      if (this.hour && this.hour !== '' || this.minute && this.minute !== '') {
	        return true;
	      }
	      return false;
	    }
	  },

	  watch: {
	    'format': 'renderFormat',
	    minuteInterval: function minuteInterval(newInteval) {
	      this.renderList('minute', newInteval);
	    },
	    secondInterval: function secondInterval(newInteval) {
	      this.renderList('second', newInteval);
	    },

	    'value': 'readValues',
	    'displayTime': 'fillValues'
	  },

	  methods: {
	    formatValue: function formatValue(type, i) {
	      switch (type) {
	        case 'H':
	        case 'm':
	        case 's':
	          return String(i);
	        case 'HH':
	        case 'mm':
	        case 'ss':
	          return i < 10 ? '0' + i : String(i);
	        case 'h':
	        case 'k':
	          return String(i + 1);
	        case 'hh':
	        case 'kk':
	          return i + 1 < 10 ? '0' + (i + 1) : String(i + 1);
	        default:
	          return '';
	      }
	    },
	    checkAcceptingType: function checkAcceptingType(validValues, formatString, fallbackValue) {
	      if (!validValues || !formatString || !formatString.length) {
	        return '';
	      }
	      for (var i = 0; i < validValues.length; i++) {
	        if (formatString.indexOf(validValues[i]) > -1) {
	          return validValues[i];
	        }
	      }
	      return fallbackValue || '';
	    },
	    renderFormat: function renderFormat(newFormat) {
	      newFormat = newFormat || this.format;
	      if (!newFormat || !newFormat.length) {
	        newFormat = 'HH:mm';
	      }

	      this.hourType = this.checkAcceptingType(CONFIG.HOUR_TOKENS, newFormat, 'HH');
	      this.minuteType = this.checkAcceptingType(CONFIG.MINUTE_TOKENS, newFormat, 'mm');
	      this.secondType = this.checkAcceptingType(CONFIG.SECOND_TOKENS, newFormat);
	      this.apmType = this.checkAcceptingType(CONFIG.APM_TOKENS, newFormat);

	      this.renderHoursList();
	      this.renderList('minute');

	      if (this.secondType) {
	        this.renderList('second');
	      }

	      if (this.apmType) {
	        this.renderApmList();
	      }

	      var self = this;
	      this.$nextTick(function () {
	        self.readValues();
	      });
	    },
	    renderHoursList: function renderHoursList() {
	      var hoursCount = this.hourType === 'h' || this.hourType === 'hh' ? 12 : 24;
	      this.hours = [];
	      for (var i = 0; i < hoursCount; i++) {
	        this.hours.push(this.formatValue(this.hourType, i));
	      }
	    },
	    renderList: function renderList(listType, interval) {
	      if (listType === 'second') {
	        interval = interval || this.secondInterval;
	      } else if (listType === 'minute') {
	        interval = interval || this.minuteInterval;
	      } else {
	        return;
	      }

	      if (interval === 0) {
	        interval = 60;
	      } else if (interval > 60) {
	        window.console.warn('`' + listType + '-interval` should be less than 60. Current value is', interval);
	        interval = 1;
	      } else if (interval < 1) {
	        window.console.warn('`' + listType + '-interval` should be NO less than 1. Current value is', interval);
	        interval = 1;
	      } else if (!interval) {
	        interval = 1;
	      }

	      if (listType === 'minute') {
	        this.minutes = [];
	      } else {
	        this.seconds = [];
	      }

	      for (var i = 0; i < 60; i += interval) {
	        if (listType === 'minute') {
	          this.minutes.push(this.formatValue(this.minuteType, i));
	        } else {
	          this.seconds.push(this.formatValue(this.secondType, i));
	        }
	      }
	    },
	    renderApmList: function renderApmList() {
	      this.apms = [];
	      if (!this.apmType) {
	        return;
	      }
	      this.apms = this.apmType === 'A' ? ['AM', 'PM'] : ['am', 'pm'];
	    },
	    readValues: function readValues() {
	      if (!this.value || this.muteWatch) {
	        return;
	      }

	      var timeValue = JSON.parse((0, _stringify2.default)(this.value || {}));

	      var values = (0, _keys2.default)(timeValue);
	      if (values.length === 0) {
	        return;
	      }

	      if (values.indexOf(this.hourType) > -1) {
	        this.hour = timeValue[this.hourType];
	      }

	      if (values.indexOf(this.minuteType) > -1) {
	        this.minute = timeValue[this.minuteType];
	      }

	      if (values.indexOf(this.secondType) > -1) {
	        this.second = timeValue[this.secondType];
	      } else {
	        this.second = 0;
	      }

	      if (values.indexOf(this.apmType) > -1) {
	        this.apm = timeValue[this.apmType];
	      }

	      this.fillValues();
	    },
	    fillValues: function fillValues() {
	      var fullValues = {};

	      var baseHour = this.hour;
	      var baseHourType = this.hourType;

	      var hourValue = baseHour || baseHour === 0 ? Number(baseHour) : '';
	      var baseOnTwelveHours = this.isTwelveHours(baseHourType);
	      var apmValue = baseOnTwelveHours && this.apm ? String(this.apm).toLowerCase() : false;

	      CONFIG.HOUR_TOKENS.forEach(function (token) {
	        if (token === baseHourType) {
	          fullValues[token] = baseHour;
	          return;
	        }

	        var value = void 0;
	        var apm = void 0;
	        switch (token) {
	          case 'H':
	          case 'HH':
	            if (!String(hourValue).length) {
	              fullValues[token] = '';
	              return;
	            } else if (baseOnTwelveHours) {
	              if (apmValue === 'pm') {
	                value = hourValue < 12 ? hourValue + 12 : hourValue;
	              } else {
	                value = hourValue % 12;
	              }
	            } else {
	              value = hourValue % 24;
	            }
	            fullValues[token] = token === 'HH' && value < 10 ? '0' + value : String(value);
	            break;
	          case 'k':
	          case 'kk':
	            if (!String(hourValue).length) {
	              fullValues[token] = '';
	              return;
	            } else if (baseOnTwelveHours) {
	              if (apmValue === 'pm') {
	                value = hourValue < 12 ? hourValue + 12 : hourValue;
	              } else {
	                value = hourValue === 12 ? 24 : hourValue;
	              }
	            } else {
	              value = hourValue === 0 ? 24 : hourValue;
	            }
	            fullValues[token] = token === 'kk' && value < 10 ? '0' + value : String(value);
	            break;
	          case 'h':
	          case 'hh':
	            if (apmValue) {
	              value = hourValue;
	              apm = apmValue || 'am';
	            } else {
	              if (!String(hourValue).length) {
	                fullValues[token] = '';
	                fullValues.a = '';
	                fullValues.A = '';
	                return;
	              } else if (hourValue > 11) {
	                apm = 'pm';
	                value = hourValue === 12 ? 12 : hourValue % 12;
	              } else {
	                if (baseOnTwelveHours) {
	                  apm = '';
	                } else {
	                  apm = 'am';
	                }
	                value = hourValue % 12 === 0 ? 12 : hourValue;
	              }
	            }
	            fullValues[token] = token === 'hh' && value < 10 ? '0' + value : String(value);
	            fullValues.a = apm;
	            fullValues.A = apm.toUpperCase();
	            break;
	        }
	      });

	      if (this.minute || this.minute === 0) {
	        var minuteValue = Number(this.minute);
	        fullValues.m = String(minuteValue);
	        fullValues.mm = minuteValue < 10 ? '0' + minuteValue : String(minuteValue);
	      } else {
	        fullValues.m = '';
	        fullValues.mm = '';
	      }

	      if (this.second || this.second === 0) {
	        var secondValue = Number(this.second);
	        fullValues.s = String(secondValue);
	        fullValues.ss = secondValue < 10 ? '0' + secondValue : String(secondValue);
	      } else {
	        fullValues.s = '';
	        fullValues.ss = '';
	      }

	      this.fullValues = fullValues;
	      this.updateTimeValue(fullValues);
	      this.$emit('change', { data: fullValues });
	    },
	    updateTimeValue: function updateTimeValue(fullValues) {
	      this.muteWatch = true;

	      var self = this;

	      var baseTimeValue = JSON.parse((0, _stringify2.default)(this.value || {}));
	      var timeValue = {};

	      (0, _keys2.default)(baseTimeValue).forEach(function (key) {
	        timeValue[key] = fullValues[key];
	      });

	      this.$emit('input', timeValue);

	      this.$nextTick(function () {
	        self.muteWatch = false;
	      });
	    },
	    isTwelveHours: function isTwelveHours(token) {
	      return token === 'h' || token === 'hh';
	    },
	    toggleDropdown: function toggleDropdown() {
	      this.showDropdown = !this.showDropdown;
	    },
	    select: function select(type, value) {
	      if (type === 'hour') {
	        this.hour = value;
	      } else if (type === 'minute') {
	        this.minute = value;
	      } else if (type === 'second') {
	        this.second = value;
	      } else if (type === 'apm') {
	        this.apm = value;
	      }
	    },
	    clearTime: function clearTime() {
	      this.hour = '';
	      this.minute = '';
	      this.second = '';
	      this.apm = '';
	    }
	  },

	  mounted: function mounted() {
	    this.renderFormat();
	  }
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(38), __esModule: true };

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(39);
	module.exports = __webpack_require__(14).Object.keys;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(40)
	  , $keys    = __webpack_require__(42);

	__webpack_require__(57)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(41);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(43)
	  , enumBugKeys = __webpack_require__(56);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(44)
	  , toIObject    = __webpack_require__(45)
	  , arrayIndexOf = __webpack_require__(48)(false)
	  , IE_PROTO     = __webpack_require__(52)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(46)
	  , defined = __webpack_require__(41);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(47);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(45)
	  , toLength  = __webpack_require__(49)
	  , toIndex   = __webpack_require__(51);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(50)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(50)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(53)('keys')
	  , uid    = __webpack_require__(55);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(54)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 55 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(58)
	  , core    = __webpack_require__(14)
	  , fails   = __webpack_require__(67);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(54)
	  , core      = __webpack_require__(14)
	  , ctx       = __webpack_require__(59)
	  , hide      = __webpack_require__(61)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(60);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(62)
	  , createDesc = __webpack_require__(70);
	module.exports = __webpack_require__(66) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(63)
	  , IE8_DOM_DEFINE = __webpack_require__(65)
	  , toPrimitive    = __webpack_require__(69)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(66) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(64);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(66) && !__webpack_require__(67)(function(){
	  return Object.defineProperty(__webpack_require__(68)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(67)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(64)
	  , document = __webpack_require__(54).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(64);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('span', {
	    staticClass: "time-picker"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.displayTime),
	      expression: "displayTime"
	    }],
	    staticClass: "display-time",
	    attrs: {
	      "id": _vm.id,
	      "type": "text",
	      "readonly": ""
	    },
	    domProps: {
	      "value": _vm._s(_vm.displayTime)
	    },
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.toggleDropdown($event)
	      },
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.displayTime = $event.target.value
	      }
	    }
	  }), _vm._v(" "), (!_vm.hideClearButton) ? _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (!_vm.showDropdown && _vm.showClearBtn),
	      expression: "!showDropdown && showClearBtn"
	    }],
	    staticClass: "clear-btn",
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.clearTime($event)
	      }
	    }
	  }, [_vm._v("×")]) : _vm._e(), _vm._v(" "), (_vm.showDropdown) ? _c('div', {
	    staticClass: "time-picker-overlay",
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.toggleDropdown($event)
	      }
	    }
	  }) : _vm._e(), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.showDropdown),
	      expression: "showDropdown"
	    }],
	    staticClass: "dropdown"
	  }, [_c('div', {
	    staticClass: "select-list"
	  }, [_c('ul', {
	    staticClass: "hours"
	  }, [_c('li', {
	    staticClass: "hint",
	    domProps: {
	      "textContent": _vm._s(_vm.hourType)
	    }
	  }), _vm._v(" "), _vm._l((_vm.hours), function(hr) {
	    return _c('li', {
	      class: {
	        active: _vm.hour === hr
	      },
	      domProps: {
	        "textContent": _vm._s(hr)
	      },
	      on: {
	        "click": function($event) {
	          $event.stopPropagation();
	          _vm.select('hour', hr)
	        }
	      }
	    })
	  })], 2), _vm._v(" "), _c('ul', {
	    staticClass: "minutes"
	  }, [_c('li', {
	    staticClass: "hint",
	    domProps: {
	      "textContent": _vm._s(_vm.minuteType)
	    }
	  }), _vm._v(" "), _vm._l((_vm.minutes), function(m) {
	    return _c('li', {
	      class: {
	        active: _vm.minute === m
	      },
	      domProps: {
	        "textContent": _vm._s(m)
	      },
	      on: {
	        "click": function($event) {
	          $event.stopPropagation();
	          _vm.select('minute', m)
	        }
	      }
	    })
	  })], 2), _vm._v(" "), (_vm.secondType) ? _c('ul', {
	    staticClass: "seconds"
	  }, [_c('li', {
	    staticClass: "hint",
	    domProps: {
	      "textContent": _vm._s(_vm.secondType)
	    }
	  }), _vm._v(" "), _vm._l((_vm.seconds), function(s) {
	    return _c('li', {
	      class: {
	        active: _vm.second === s
	      },
	      domProps: {
	        "textContent": _vm._s(s)
	      },
	      on: {
	        "click": function($event) {
	          $event.stopPropagation();
	          _vm.select('second', s)
	        }
	      }
	    })
	  })], 2) : _vm._e(), _vm._v(" "), (_vm.apmType) ? _c('ul', {
	    staticClass: "apms"
	  }, [_c('li', {
	    staticClass: "hint",
	    domProps: {
	      "textContent": _vm._s(_vm.apmType)
	    }
	  }), _vm._v(" "), _vm._l((_vm.apms), function(a) {
	    return _c('li', {
	      class: {
	        active: _vm.apm === a
	      },
	      domProps: {
	        "textContent": _vm._s(a)
	      },
	      on: {
	        "click": function($event) {
	          $event.stopPropagation();
	          _vm.select('apm', a)
	        }
	      }
	    })
	  })], 2) : _vm._e()])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-923702e0", module.exports)
	  }
	}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(73)

	/* template */
	var __vue_template__ = __webpack_require__(74)
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
	__vue_options__.__file = "E:\\workSVN\\PbRes\\Develop\\public\\condition\\src\\component\\dialog\\selectConDialog.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-0c0a3a46", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-0c0a3a46", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] selectConDialog.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 73 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
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

	exports.default = {
	    props: ['selectContract'],
	    created: function created() {
	        console.log(this.selectContract);
	    },
	    methods: {
	        selectContractClick: function selectContractClick(name, market, code) {
	            //                console.log(name+":"+market+":"+code)
	            this.$emit('selectContractClick', name, market, code);
	        }
	    }
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "modal  dialog-info",
	    attrs: {
	      "id": "selectContractDialog",
	      "tabindex": "-1",
	      "role": "dialog",
	      "aria-hidden": "true"
	    }
	  }, [_c('div', {
	    staticClass: "modal-dialog"
	  }, [(_vm.selectContract) ? _c('div', {
	    staticClass: "modal-content selectCon"
	  }, _vm._l((_vm.selectContract), function(data) {
	    return _c('div', {
	      staticClass: "modal-body dialog-bottom",
	      attrs: {
	        "data-dismiss": "modal"
	      },
	      on: {
	        "click": function($event) {
	          _vm.selectContractClick(data.name, data.market, data.code)
	        }
	      }
	    }, [_vm._v("\n                " + _vm._s(data.name ? data.name : '----') + "\n            ")])
	  })) : _c('div', {
	    staticClass: "modal-content selectCon"
	  }, [_c('div', {
	    staticClass: "modal-body",
	    staticStyle: {
	      "height": "100px",
	      "padding-top": "41px"
	    },
	    attrs: {
	      "data-dismiss": "modal"
	    }
	  }, [_vm._v("\n                请先添加自选！\n            ")])])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-0c0a3a46", module.exports)
	  }
	}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(76)

	/* template */
	var __vue_template__ = __webpack_require__(77)
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
	__vue_options__.__file = "E:\\workSVN\\PbRes\\Develop\\public\\condition\\src\\component\\dialog\\priceDialog.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5c2aa500", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5c2aa500", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] priceDialog.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 76 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
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

	exports.default = {
	    methods: {
	        priceInfoClick: function priceInfoClick(flag) {
	            this.$emit('priceInfoClick', flag);
	        }
	    }
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "modal  dialog-info",
	    attrs: {
	      "id": "priceInfoDialog",
	      "tabindex": "-1",
	      "role": "dialog",
	      "aria-hidden": "true"
	    }
	  }, [_c('div', {
	    staticClass: "modal-dialog"
	  }, [_c('div', {
	    staticClass: "modal-content",
	    staticStyle: {
	      "border-radius": "10px"
	    }
	  }, [_c('div', {
	    staticClass: "modal-body dialog-bottom",
	    attrs: {
	      "data-dismiss": "modal"
	    },
	    on: {
	      "click": function($event) {
	        _vm.priceInfoClick(1)
	      }
	    }
	  }, [_vm._v("\n                涨停价\n            ")]), _vm._v(" "), _c('div', {
	    staticClass: "modal-body dialog-bottom",
	    attrs: {
	      "data-dismiss": "modal"
	    },
	    on: {
	      "click": function($event) {
	        _vm.priceInfoClick(2)
	      }
	    }
	  }, [_vm._v("\n                跌停价\n            ")]), _vm._v(" "), _c('div', {
	    staticClass: "modal-body dialog-bottom",
	    attrs: {
	      "data-dismiss": "modal"
	    },
	    on: {
	      "click": function($event) {
	        _vm.priceInfoClick(3)
	      }
	    }
	  }, [_vm._v("\n                对手价\n            ")]), _vm._v(" "), _c('div', {
	    staticClass: "modal-body dialog-bottom",
	    staticStyle: {
	      "border-bottom": "none"
	    },
	    attrs: {
	      "data-dismiss": "modal"
	    },
	    on: {
	      "click": function($event) {
	        _vm.priceInfoClick(4)
	      }
	    }
	  }, [_vm._v("\n                最新价\n            ")])])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5c2aa500", module.exports)
	  }
	}

/***/ },
/* 78 */,
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(80)

	/* template */
	var __vue_template__ = __webpack_require__(81)
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
	__vue_options__.__file = "E:\\workSVN\\PbRes\\Develop\\public\\condition\\src\\component\\editCon.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2b3eed05", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-2b3eed05", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] editCon.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(12);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _vue2Timepicker = __webpack_require__(29);

	var _vue2Timepicker2 = _interopRequireDefault(_vue2Timepicker);

	var _selectConDialog = __webpack_require__(72);

	var _selectConDialog2 = _interopRequireDefault(_selectConDialog);

	var _priceDialog = __webpack_require__(75);

	var _priceDialog2 = _interopRequireDefault(_priceDialog);

	var _tipMsg = __webpack_require__(20);

	var _tipMsg2 = _interopRequireDefault(_tipMsg);

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

	//价格倍数
	var priceMulriple;
	var lastPrice; //最新价
	var opponentPriceBuy; //对手价买
	var opponentPriceSell; //对手价卖
	var upPrice; //涨停价
	var downPrice; //跌停价
	var nameCode = '';
	exports.default = {
	    data: function data() {
	        return {
	            editQueryInfo: { //编辑条件单设置时获取的参数
	                HYDM: '', //合约市场
	                contractEditCode: '', //合约品种
	                TimeCondition: '', //有效期 1-当日有效，2-永久有效
	                ConditionChoicedEdit: '', //当前选择条件：1-价格，2-时间
	                OperatorEdit: '', //操作 >= <=
	                valueEdit: '', //条件里面的 输入价格值
	                dealOpenEdit: '', //买卖方向
	                OffsetFlagEdit: '', //开平标识
	                VolumeEdit: '', //委托数量
	                LimitPriceTypeEdit: '', //限价类型: 仅PriceType为“限价”时有本字段
	                LimitPriceEdit: '', //仅PriceType为“限价”时有本字段，仅LimitPriceType为“指定价格”时有意义
	                priceNameEdit: '',
	                conditionEditName: '', //条件单名称
	                selectContractName: '',
	                conditionID: '', //条件单id
	                TradeDate: '' },
	            //有效期 当日、永久
	            validPrice: true,
	            validTime: true,
	            //条件：价格、时间
	            conPrice: true,
	            conTime: true,
	            //买卖方向
	            buyPrice: true,
	            buyTime: true,
	            //开仓、平仓、平今
	            openCang: true,
	            pingCang: true,
	            pingDay: true,
	            pingCangBlue: false,
	            openCangFFF: false,
	            pingDayBlue: false,

	            tjTimeEdit: { //条件里面的时分秒
	                HH: "",
	                mm: "",
	                ss: ""
	            },

	            trustPriceType: 1, //默认给1表示是输入  的委托价格
	            selectContract: '', //选择合约

	            token: testToken, //t认证的oken
	            authId: testId, //认证的id
	            orgCode: orgCode, //机构编号

	            msgTip: "",
	            loginClass: loginClass, //登录类别
	            accountClass: accountClass, //账号类别
	            loginAccount: loginAccount, //登录账号

	            CID: '',
	            pingDayShow: true,
	            destroyMarket: '' };
	    },
	    components: {
	        VueTimepicker: _vue2Timepicker2.default,
	        selectConDialog: _selectConDialog2.default,
	        priceDialog: _priceDialog2.default,
	        tipMsg: _tipMsg2.default
	    },
	    created: function created() {
	        // 根据market 和 code 查出单个条件单的合约
	        var option = {
	            callbacks: [{ module: 90000, callback: function callback(msg) {
	                    var data = msg.jData.Data;
	                    console.log(data);
	                    for (var i = 0; i < data.length; i++) {
	                        //最新价
	                        if (data[i][10] == nameCode) {
	                            if (data[i][29]) {
	                                lastPrice = data[i][29] / priceMulriple; //最新价
	                                $("#newPrice").html(data[i][29] / priceMulriple); //最新价
	                            } else {
	                                $("#newPrice").html("--"); //最新价
	                            }
	                            if (data[i][30]) {
	                                upPrice = data[i][30] / priceMulriple; //涨停价
	                            }
	                            if (data[i][31]) {
	                                downPrice = data[i][31] / priceMulriple; //跌停价
	                            }
	                            if (data[i].BidSize[0][40]) {
	                                opponentPriceSell = data[i].BidSize[0][40] / priceMulriple; //卖
	                            }
	                            if (data[i].AskSize[0][42]) {
	                                opponentPriceBuy = data[i].AskSize[0][42] / priceMulriple; //买
	                            }
	                        }
	                    }
	                } }, { fun: 6044, callback: function callback(msg) {
	                    //查询可开 可买数量
	                    console.log(msg);
	                    var data = msg.jData.data;
	                    if (data) {
	                        if (data[0]) {
	                            $("#openBuy").html(data[0][250]);
	                            console.log(data[0][250]);
	                        } else {
	                            $("#openBuy").html(0); //如果没值就显示0
	                        }
	                    }
	                } }, { fun: 102001, callback: function callback(msg) {
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
	        //取出条件单单条详情
	        var data = getStorageInfo("conNoneListObj");
	        if (data) {
	            var list = JSON.parse(data);
	            console.log(JSON.parse(list[0].conditionValue));
	            var dataValue = JSON.parse(list[0].conditionValue);
	            //当前选择条件：1-价格，2-时间
	            var priceValue;
	            var priceOper;
	            var priceTime;
	            if (dataValue.ConditionChoiced == 1) {
	                //取价格里面的值
	                priceValue = dataValue.ConditionList[0].Price.Value;
	                priceOper = dataValue.ConditionList[0].Price.Operator;
	            } else if (dataValue.ConditionChoiced == 2) {
	                //取时间的值
	                priceTime = dataValue.ConditionList[1].Time;
	            }
	            //委托价格如果是输入的就将文本框的值CustomPrice赋给LimitPriceType，类型为double类型或者string，如果是通过类型选择的就将选的值赋给LimitPriceType
	            var trustPriceType;
	            if (_this.trustPriceType == 2) {
	                //表示选择
	                trustPriceType = dataValue.OrderAction.SmartOrder.Order.LimitPriceType;
	            } else if (_this.trustPriceType == 1) {
	                //表示输入
	                trustPriceType = dataValue.OrderAction.SmartOrder.Order.LimitPrice;
	            }
	            _this.editQueryInfo = {
	                conditionID: list[0].conditionID,
	                conditionEditName: list[0].name,
	                selectContractName: list[0].HYMC,
	                HYDM: dataValue.Contracts[0].ExchangeCode,
	                contractEditCode: dataValue.Contracts[0].ContractCode, //合约品种
	                TimeCondition: dataValue.imeCondition, //有效期 1-当日有效，2-永久有效
	                TradeDate: dataValue.TradeDate, //交易日，用于指明TimeCondition中的“当日有效”到底是指哪一日
	                ConditionChoicedEdit: dataValue.ConditionChoiced, //当前选择条件：1-价格，2-时间
	                OperatorEdit: priceOper, //操作 >= <=
	                valueEdit: priceValue, //条件里面的 输入价格值
	                tjTimeEdit: priceTime, //条件里面的时分秒
	                dealOpenEdit: dataValue.OrderAction.SmartOrder.Order.Direction, //买卖方向
	                OffsetFlagEdit: dataValue.OrderAction.SmartOrder.Order.OffsetFlag, //开平标识
	                VolumeEdit: dataValue.OrderAction.SmartOrder.Order.Volume, //委托数量
	                LimitPriceTypeEdit: dataValue.OrderAction.SmartOrder.Order.LimitPriceType, //限价类型: 仅PriceType为“限价”时有本字段
	                LimitPriceEdit: dataValue.OrderAction.SmartOrder.Order.LimitPrice, //仅PriceType为“限价”时有本字段，仅LimitPriceType为“指定价格”时有意义
	                priceNameEdit: trustPriceType
	            };
	            //以下是根据类型来判断当前选中的样式
	            // 有效期 1-当日有效，2-永久有效
	            if (dataValue.TimeCondition == 1) {
	                _this.validPrice = true;
	                _this.validTime = true;
	            } else if (dataValue.TimeCondition == 2) {
	                _this.validPrice = false;
	                _this.validTime = false;
	            }
	            //当前选择条件：1-价格，2-时间
	            if (dataValue.ConditionChoiced == 1) {
	                //价格
	                _this.conPrice = true;
	                _this.conTime = true;
	                _this.initPrice = true;
	                _this.initFooter = false;
	            }
	            if (dataValue.ConditionChoiced == 2) {
	                //时间
	                _this.conPrice = false;
	                _this.conTime = false;
	                _this.initPrice = false;
	                _this.initFooter = false;
	            }
	            //买卖方向
	            if (dataValue.OrderAction.SmartOrder.Order.Direction == 0) {
	                //买
	                _this.buyPrice = true;
	                _this.buyTime = true;
	                //根据当前合约和买卖方向从持仓里面再次查下可平
	                _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode, 0, null);
	            }
	            if (dataValue.OrderAction.SmartOrder.Order.Direction == 1) {
	                //卖
	                _this.buyPrice = false;
	                _this.buyTime = false;

	                //根据当前合约和买卖方向从持仓里面再次查下可平
	                _this.getCanBuy(_this.setDataObj.contractMarket, _this.setDataObj.contractCode, 1, null);
	            }
	            //开平标识
	            //开仓
	            if (dataValue.OrderAction.SmartOrder.Order.OffsetFlag == 0) {
	                _this.openCang = true;
	                _this.openCangFFF = false;
	                _this.pingCangBlue = false;
	                _this.pingDayBlue = false;

	                //buyWay字段要根据买卖类别的反方向取值
	                var buyWay;
	                if (_this.editQueryInfo.dealOpenEdit == 0) {
	                    //买
	                    buyWay = 1;
	                } else if (_this.editQueryInfo.dealOpenEdit == 1) {
	                    //卖
	                    buyWay = 0;
	                }
	                if (_this.pingDayShow = true) {
	                    //支持平今 今昨仓标志 == 2
	                    _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode, buyWay, 2);
	                } else {
	                    _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode, buyWay, null);
	                }
	            }
	            //平仓
	            if (dataValue.OrderAction.SmartOrder.Order.OffsetFlag == 1) {
	                _this.pingCangBlue = true;
	                _this.openCang = false;
	                _this.openCangFFF = true;
	                _this.pingDayBlue = false;

	                //buyWay字段要根据买卖类别的反方向取值
	                var buyWay;
	                if (_this.editQueryInfo.dealOpenEdit == 0) {
	                    //买
	                    buyWay = 1;
	                } else if (_this.editQueryInfo.dealOpenEdit == 1) {
	                    //卖
	                    buyWay = 0;
	                }
	                //503 == 1 平今
	                _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode, buyWay, 1);
	            }
	            //平今
	            if (dataValue.OrderAction.SmartOrder.Order.OffsetFlag == 2) {
	                _this.pingDayBlue = true;
	                _this.pingCangBlue = false;
	                _this.openCang = false;
	                _this.openCangFFF = true;
	            }
	            if (dataValue.ConditionChoiced == 1) {
	                //当前选择条件：1-价格，2-时间
	                _this.conPrice = true;
	                _this.conTime = true;
	                _this.initPrice = true;
	                _this.initFooter = false;
	                _this.pingDayShow = true; //将平今置为可点击
	            } else if (dataValue.ConditionChoiced == 2) {
	                _this.conPrice = false;
	                _this.conTime = false;
	                _this.initPrice = false;
	                _this.initFooter = false;
	                _this.pingDayShow = false; //将平今置为不可点击
	            }
	        };
	        //获取合约信息
	        if (window.pbE) {
	            var selectContractName = pbE.ZX().getSelfStock(0); //0代表全部合约信息
	            if (selectContractName) {
	                _this.selectContract = JSON.parse(selectContractName);
	            }
	        } else {
	            _this.selectContract = [{ "name": "沪铜1702", "market": "2001", "code": "010002" }, { "name": "沪铝1702", "market": "2001", "code": "010102" }, { "name": "沪锌1702", "market": "2001", "code": "010302" }, { "name": "沪铅1702", "market": "2001", "code": "010902" }, { "name": "黄金1706", "market": "2001", "code": "010506" }];
	        }
	        //从原生接口读取
	        if (window.pbE) {
	            //                    _this.CID = pbE.WT().wtGetCurrentConnectionCID();
	            //                    var allData = pbE.WT().wtLoginRe(_this.CID);
	            //                    if(allData){
	            //                        var data = JSON.parse(allData).data;
	            //                        _this.editQueryInfo.TradeDate = data[0]['75']
	            //                    }
	        }
	    },
	    destroyed: function destroyed() {
	        pbE.HQ().hqUnSubscribe(0, (0, _stringify2.default)({ "1": [{ 2: this.destroyMarket, 3: nameCode }] })); //订阅最新价
	    },
	    methods: {
	        selectContractDialog: function selectContractDialog() {
	            $('#selectContractDialog').modal('show');
	        },
	        //条件
	        conditionClick: function conditionClick(flag) {
	            var _this = this;
	            if (flag == 0) {
	                //价格
	                _this.conPrice = true;
	                _this.conTime = true;
	                _this.initPrice = true;
	                _this.initFooter = false;
	                _this.editQueryInfo.ConditionChoicedEdit = 1; //编辑时条件类型赋值
	            }
	            if (flag == 1) {
	                //时间
	                _this.conPrice = false;
	                _this.conTime = false;
	                _this.initPrice = false;
	                _this.initFooter = false;

	                _this.editQueryInfo.ConditionChoicedEdit = 2; //编辑时条件类型赋值
	            }
	        },
	        //条件单设置中有效期  切换样式
	        validDateClick: function validDateClick(flag) {
	            var _this = this;
	            //  1-当日有效，2-永久有效
	            if (flag == 0) {
	                //当日
	                _this.validPrice = true;
	                _this.validTime = true;
	                _this.editQueryInfo.TimeCondition = 1; //编辑时有效期类型赋值

	                _this.pingDayShow = true; //将平今置为可点击
	            }
	            if (flag == 1) {
	                //永久
	                _this.validPrice = false;
	                _this.validTime = false;
	                _this.editQueryInfo.TimeCondition = 2; //编辑时有效期类型赋值

	                _this.pingDayShow = false; //将平今置为不可点击
	            }
	        },
	        //条件单设置中买卖方向 切换样式
	        buyClick: function buyClick(flag) {
	            var _this = this;
	            if (flag == 0) {
	                //买
	                _this.buyPrice = true;
	                _this.buyTime = true;
	                _this.editQueryInfo.dealOpenEdit = 0; //编辑时入库
	                //根据当前合约和买卖方向从持仓里面再次查下可平
	                _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode, 0, null);
	            }
	            if (flag == 1) {
	                //卖
	                _this.buyPrice = false;
	                _this.buyTime = false;
	                _this.editQueryInfo.dealOpenEdit = 1; //编辑时入库
	                //根据当前合约和买卖方向从持仓里面再次查下可平
	                _this.getCanBuy(_this.setDataObj.contractMarket, _this.setDataObj.contractCode, 1, null);
	            }
	        },
	        //条件单设置中类型 切换样式
	        storehouseTypeClick: function storehouseTypeClick(flag) {
	            var _this = this;
	            //开仓
	            if (flag == 0) {
	                _this.openCang = true;

	                _this.openCangFFF = false;
	                _this.pingCangBlue = false;
	                _this.pingDayBlue = false;
	                _this.editQueryInfo.OffsetFlagEdit = 0; //编辑时入库
	            }
	            //平仓
	            if (flag == 1) {
	                _this.pingCangBlue = true;
	                _this.openCang = false;
	                _this.openCangFFF = true;
	                _this.pingDayBlue = false;
	                _this.editQueryInfo.OffsetFlagEdit = 1; //编辑时入库
	                //buyWay字段要根据买卖类别的反方向取值
	                var buyWay;
	                if (_this.editQueryInfo.dealOpenEdit == 0) {
	                    //买
	                    buyWay = 1;
	                } else if (_this.editQueryInfo.dealOpenEdit == 1) {
	                    //卖
	                    buyWay = 0;
	                }
	                if (_this.pingDayShow = true) {
	                    //支持平今 今昨仓标志 == 2
	                    _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode, buyWay, 2);
	                } else {
	                    _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode, buyWay, null);
	                }
	            }
	            //平今
	            if (flag == 2) {
	                _this.pingDayBlue = true;

	                _this.pingCangBlue = false;
	                _this.openCang = false;
	                _this.openCangFFF = true;
	                _this.editQueryInfo.OffsetFlagEdit = 2; //编辑时入库
	                //buyWay字段要根据买卖类别的反方向取值
	                var buyWay;
	                if (_this.editQueryInfo.dealOpenEdit == 0) {
	                    //买
	                    buyWay = 1;
	                } else if (_this.editQueryInfo.dealOpenEdit == 1) {
	                    //卖
	                    buyWay = 0;
	                }
	                //503 == 1 平今
	                _this.getCanBuy(_this.editQueryInfo.HYDM, _this.editQueryInfo.contractEditCode, buyWay, 1);
	            }
	        },
	        priceTypeClick: function priceTypeClick() {
	            if (this.editQueryInfo.OperatorEdit == ">=") {
	                this.editQueryInfo.OperatorEdit = "<=";
	            } else {
	                this.editQueryInfo.OperatorEdit = ">=";
	            }
	        },
	        //修改保存条件单的信息
	        editConClick: function editConClick() {
	            var _this = this;
	            var data = new setConData();
	            data.Contracts[0] = {
	                ExchangeCode: _this.editQueryInfo.HYDM, //合约名称
	                ContractCode: _this.editQueryInfo.contractEditCode //合约品种
	            };
	            data.TimeCondition = _this.editQueryInfo.TimeCondition; //有效期 1-当日有效，2-永久有效
	            data.TradeDate = _this.editQueryInfo.TradeDate; ////交易日，用于指明TimeCondition中的“当日有效”到底是指哪一日
	            data.ConditionChoiced = _this.editQueryInfo.ConditionChoicedEdit; //当前选择条件：1-价格，2-时间
	            if (_this.editQueryInfo.ConditionChoicedEdit == 1) {
	                //代表价格
	                data.ConditionList[0].Price.Operator = _this.editQueryInfo.OperatorEdit; //操作
	                if (!numRex.test(_this.editQueryInfo.valueEdit)) {
	                    data.ConditionList[0].Price.Value = parseInt(_this.editQueryInfo.valueEdit); //条件里面的输入价格
	                } else {
	                    data.ConditionList[0].Price.Value = _this.editQueryInfo.valueEdit * 1; //条件里面的输入价格
	                }
	            }
	            if (_this.editQueryInfo.ConditionChoicedEdit == 2) {
	                //代表时间
	                data.Contracts[0].Time = _this.tjTimeEdit.HH + ":" + _this.tjTimeEdit.mm + ":" + _this.tjTimeEdit.ss;
	            }
	            //下单
	            data.OrderAction.SmartOrder.Order.Contract = {
	                ExchangeCode: _this.editQueryInfo.HYDM, //合约  市场
	                ContractCode: _this.editQueryInfo.contractEditCode //合约品种    合约
	            };
	            //委托数
	            data.OrderAction.SmartOrder.Order.Direction = _this.editQueryInfo.dealOpenEdit; //买卖方向
	            data.OrderAction.SmartOrder.Order.OffsetFlag = _this.editQueryInfo.OffsetFlagEdit; //开平标识
	            data.OrderAction.SmartOrder.Order.Volume = parseInt(_this.editQueryInfo.VolumeEdit); //委托数量
	            //委托价格如果是输入的就将文本框的值CustomPrice赋给LimitPriceType，类型为double类型或者string，如果是通过类型选择的就将选的值赋给LimitPriceType
	            if (_this.trustPriceType == 2) {
	                //表示选择
	                data.OrderAction.SmartOrder.Order.LimitPriceType = _this.editQueryInfo.priceNameEdit; //选择的委托价格
	            } else if (_this.trustPriceType == 1) {
	                //表示输入
	                data.OrderAction.SmartOrder.Order.LimitPrice = _this.editQueryInfo.priceNameEdit + ""; //输入的委托价格
	                data.OrderAction.SmartOrder.Order.LimitPriceType = 'CustomPrice'; //如果是输入的价格就将CustomPrice赋给LimitPriceType
	            }
	            //登录账号类别   从原生读取
	            data.OrderAction.SmartOrder.Order.EAccountId['67'] = _this.loginClass; //登录类别
	            data.OrderAction.SmartOrder.Order.EAccountId['53'] = _this.accountClass; //账号类别
	            data.OrderAction.SmartOrder.Order.EAccountId['249'] = _this.loginAccount; //登录账号
	            console.log(data);
	            //console.log(_this.conNoneTouchObj.conditionID)
	            $.ajax({
	                url: conditionUrl,
	                method: 'post',
	                dataType: 'json',
	                contentType: 'application/json;charest=utf-8',
	                data: (0, _stringify2.default)({
	                    func: editCon,
	                    token: _this.token,
	                    id: _this.authId,
	                    orgCode: _this.orgCode,
	                    conditionID: _this.editQueryInfo.conditionID,
	                    data: data
	                }),
	                success: function success(data) {
	                    if (data.status == 0) {
	                        _this.$router.push('/noneConList/1');
	                    } else {
	                        _this.msgTip = data.msg;
	                        $('#msgTipDialog').modal('show');
	                        return;
	                    }
	                }, error: function error() {
	                    console.log("服务器异常！");
	                }
	            });
	        },
	        //选择合约
	        selectContractClick: function selectContractClick(name, market, code) {
	            var _this = this;
	            _this.editQueryInfo.selectContractName = name;
	            _this.destroyMarket = market;
	            if (window.pbE) {
	                //修改时保存的值
	                _this.editQueryInfo.contractEditCode = code;
	                _this.editQueryInfo.HYDM = market;
	                //订阅行情
	                nameCode = code;
	                pbE.HQ().hqSubscribe(0, (0, _stringify2.default)({ "1": [{ 2: market, 3: code }] })); //订阅最新价
	                //获取行情商品价格倍数
	                priceMulriple = pbE.HQ().hqGetPriceRate(code, market);

	                var cid = pbE.WT().wtGetCurrentConnectionCID();
	                var tradeWT = pbE.HQ().hqGetWTInfo(code, market, cid); //行情信息转换交易信息
	                if (tradeWT) {
	                    //添加时保存的值
	                    var data = JSON.parse(tradeWT);
	                    _this.editQueryInfo.contractMarket = data.WTMarket; //合约市场
	                    _this.editQueryInfo.contractCode = data.WTCode; //合约品种

	                    //通过查持仓，获取该合约可平数量
	                    var CID = pbE.WT().wtGetCurrentConnectionCID();
	                    var allData = pbE.WT().wtQueryStockRe(CID);
	                    if (allData) {
	                        var stocks = JSON.parse(allData).data;
	                        //只有这几个市场支持平今
	                        if (data.WTMarket == marketSHFE || marketBOCE || marketHXCE || marketWXBXG || marketQDGCXH) {
	                            _this.pingDayShow = true; //将平今置为可点击
	                            for (var i = 0; i < stocks.length; i++) {
	                                if (data.WTMarket == stocks[i]['54'] && data.WTCode == stocks[i]['63']) {
	                                    if (stocks[i][137]) {
	                                        $("#openNum").html(stocks[i][137]);
	                                    } else {
	                                        $("#openNum").html(0);
	                                    }
	                                }
	                            }
	                        } else {
	                            //将平今置为不可点击
	                            _this.pingDayShow = false; //将平今置为不可点击
	                        }
	                    }
	                }
	                //查询可开
	                _this.getStockBuyNum();
	            }
	        },
	        //设置条件单的类型
	        priceInfoClick: function priceInfoClick(flag) {
	            this.trustPriceType = 2;
	            var _this = this;
	            if (flag == 1) {
	                //涨停价
	                this.editQueryInfo.priceNameEdit = '涨停价';
	                this.editQueryInfo.selectPriceName = upPrice;
	            }
	            if (flag == 2) {
	                //跌停价
	                this.editQueryInfo.priceNameEdit = '跌停价';
	                this.editQueryInfo.selectPriceName = downPrice;
	            }
	            if (flag == 3) {
	                //对手价
	                this.editQueryInfo.priceNameEdit = '对手价';
	                //根据选择的类型买还是卖   //买卖方向  0 买 1 卖     注：默认给 0 买
	                if (_this.editQueryInfo.dealOpen == 0) {
	                    _this.editQueryInfo.selectPriceName = opponentPriceSell;
	                } else if (_this.editQueryInfo.dealOpen == 1) {
	                    _this.editQueryInfo.selectPriceName = opponentPriceBuy;
	                }
	            }
	            if (flag == 4) {
	                //最新价
	                this.editQueryInfo.priceNameEdit = '最新价';
	                this.editQueryInfo.selectPriceName = lastPrice;
	            }
	            //查询可开
	            _this.getStockBuyNum();
	        },
	        //查可平
	        getCanBuy: function getCanBuy(market, code, buyWay, todayFlag) {
	            //通过查持仓，获取该合约可平数量
	            var CID = pbE.WT().wtGetCurrentConnectionCID();
	            var allData = pbE.WT().wtQueryStockRe(CID);
	            if (allData) {
	                var stocks = JSON.parse(allData).data;
	                for (var i = 0; i < stocks.length; i++) {
	                    if (market == stocks[i]['54'] && code == stocks[i]['63'] || buyWay == stocks[i]['112'] || todayFlag == stocks[i]['503']) {
	                        //112  == 0
	                        if (stocks[i][137]) {
	                            $("#openNum").html(stocks[i][137]);
	                        } else {
	                            $("#openNum").html(0);
	                        }
	                    }
	                }
	            }
	        },
	        //查可开
	        getStockBuyNum: function getStockBuyNum() {
	            var _this = this;
	            if (_this.editQueryInfo.selectContractName && _this.editQueryInfo.priceName) {
	                if (window.pbE) {
	                    var priceValue;
	                    if (_this.trustPriceType == 2) {
	                        //表示选择
	                        priceValue = _this.editQueryInfo.selectPriceName + ''; //选择的委托价格
	                    } else if (_this.trustPriceType == 1) {
	                        //表示输入
	                        priceValue = _this.editQueryInfo.priceName + '';
	                    }
	                    var gdZH = pbE.WT().wtGetGDZH(_this.editQueryInfo.contractMarket);
	                    var xwh = pbE.WT().wtGetXWH(_this.editQueryInfo.contractMarket);
	                    var data = {
	                        63: _this.editQueryInfo.contractCode, //合约代码
	                        54: _this.editQueryInfo.contractMarket, //市场代码
	                        129: priceValue, //委托价格
	                        112: _this.editQueryInfo.dealOpen + '', //买卖类别
	                        117: _this.editQueryInfo.OffsetFlag + '', //开平仓标志
	                        119: '1', //投保标志
	                        52: gdZH, //股东账号
	                        125: '0', //期权备兑标志
	                        161: xwh, //席位号
	                        40: '2', //价格类别、
	                        41: '3', //有效期类别
	                        42: '1' //成交数量
	                    };
	                    console.log((0, _stringify2.default)(data));
	                    pbE.WT().wtQueryStockBuy(_this.CID, (0, _stringify2.default)(data)); //可开
	                }
	            }
	        }
	    }
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticStyle: {
	      "padding-top": "39px"
	    }
	  }, [_c('div', {
	    staticClass: "setDiv"
	  }, [_c('div', {
	    staticClass: "setOut"
	  }, [_c('ul', [_c('li', [_c('div', {
	    staticClass: "setDivOne"
	  }, [_c('span', {
	    staticClass: "inputText",
	    staticStyle: {
	      "display": "inline-block"
	    },
	    on: {
	      "click": _vm.selectContractDialog
	    }
	  }, [_vm._v(_vm._s(_vm.editQueryInfo.selectContractName ? _vm.editQueryInfo.selectContractName : '---'))])]), _vm._v(" "), _c('div', {
	    staticClass: "setDivTwo"
	  }, [_vm._v("最新：")]), _vm._v(" "), _c('div', {
	    staticClass: "setDivThree",
	    attrs: {
	      "id": "newPrice"
	    }
	  }, [_vm._v("--")])]), _vm._v(" "), _c('li', [_c('div', {
	    staticClass: "priceOne"
	  }, [_vm._v("\n                        条件单名称\n                    ")]), _vm._v(" "), _c('div', {
	    staticClass: "priceTwo"
	  }), _vm._v(" "), _c('div', {
	    staticClass: "priceThree"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.editQueryInfo.conditionEditName),
	      expression: "editQueryInfo.conditionEditName"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": "条件单名称"
	    },
	    domProps: {
	      "value": _vm._s(_vm.editQueryInfo.conditionEditName)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.editQueryInfo.conditionEditName = $event.target.value
	      }
	    }
	  })])]), _vm._v(" "), _c('li', [_c('div', {
	    staticClass: "conOne"
	  }, [_vm._v("有效期")]), _vm._v(" "), _c('div', {
	    staticClass: "conTwo"
	  }, [_c('span', {
	    class: [_vm.validPrice ? 'conSpanOne' : 'conSpanThree'],
	    on: {
	      "click": function($event) {
	        _vm.validDateClick(0)
	      }
	    }
	  }, [_vm._v("当日")]), _vm._v(" "), _c('span', {
	    class: [_vm.validTime ? 'conSpanTwo' : 'conSpanFour'],
	    on: {
	      "click": function($event) {
	        _vm.validDateClick(1)
	      }
	    }
	  }, [_vm._v("永久")])])]), _vm._v(" "), _c('li', [_c('div', {
	    staticClass: "conOne"
	  }, [_vm._v("条件")]), _vm._v(" "), _c('div', {
	    staticClass: "conTwo"
	  }, [_c('span', {
	    class: [_vm.conPrice ? 'conSpanOne' : 'conSpanThree'],
	    on: {
	      "click": function($event) {
	        _vm.conditionClick(0)
	      }
	    }
	  }, [_vm._v("价格")]), _vm._v(" "), _c('span', {
	    class: [_vm.conTime ? 'conSpanTwo' : 'conSpanFour'],
	    on: {
	      "click": function($event) {
	        _vm.conditionClick(1)
	      }
	    }
	  }, [_vm._v("时间")])])]), _vm._v(" "), (_vm.initPrice) ? _c('li', [_c('div', {
	    staticClass: "priceOne"
	  }, [_c('span', {
	    staticClass: "priceStyle",
	    domProps: {
	      "textContent": _vm._s(_vm.editQueryInfo.OperatorEdit ? _vm.editQueryInfo.OperatorEdit : '---')
	    },
	    on: {
	      "click": _vm.priceTypeClick
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "priceTwo"
	  }), _vm._v(" "), _c('div', {
	    staticClass: "priceThree"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.editQueryInfo.valueEdit),
	      expression: "editQueryInfo.valueEdit"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": "价格"
	    },
	    domProps: {
	      "value": _vm._s(_vm.editQueryInfo.valueEdit)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.editQueryInfo.valueEdit = $event.target.value
	      }
	    }
	  })])]) : _c('li', [_c('div', {
	    staticClass: "timeConOne"
	  }, [_vm._v("时间到达")]), _vm._v(" "), _c('div', {
	    staticClass: "timeConTwo"
	  }, [_c('vue-timepicker', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.editQueryInfo.tjTimeEdit),
	      expression: "editQueryInfo.tjTimeEdit"
	    }],
	    attrs: {
	      "format": "HH:mm:ss"
	    },
	    domProps: {
	      "value": (_vm.editQueryInfo.tjTimeEdit)
	    },
	    on: {
	      "input": function($event) {
	        _vm.editQueryInfo.tjTimeEdit = $event
	      }
	    }
	  })], 1)]), _vm._v(" "), _c('li', [_c('div', {
	    staticClass: "conOne"
	  }, [_vm._v("买卖方向")]), _vm._v(" "), _c('div', {
	    staticClass: "conTwo"
	  }, [_c('span', {
	    class: [_vm.buyPrice ? 'conSpanOne' : 'conSpanThree'],
	    on: {
	      "click": function($event) {
	        _vm.buyClick(0)
	      }
	    }
	  }, [_vm._v("买")]), _vm._v(" "), _c('span', {
	    class: [_vm.buyTime ? 'conSpanTwo' : 'conSpanFour'],
	    on: {
	      "click": function($event) {
	        _vm.buyClick(1)
	      }
	    }
	  }, [_vm._v("卖")])])]), _vm._v(" "), _c('li', [_c('div', {
	    staticClass: "conTypeOne"
	  }, [_vm._v("类型")]), _vm._v(" "), _c('div', {
	    staticClass: "conTypeTwo"
	  }, [_c('span', {
	    class: {
	      conSpanTyeOne: _vm.openCang, conSpanTyeOneBlue: _vm.openCangFFF
	    },
	    on: {
	      "click": function($event) {
	        _vm.storehouseTypeClick(0)
	      }
	    }
	  }, [_vm._v("开仓")]), _vm._v(" "), _c('span', {
	    class: {
	      conSpanTyeTwo: _vm.pingCang, conSpanTyeTwoBlue: _vm.pingCangBlue
	    },
	    on: {
	      "click": function($event) {
	        _vm.storehouseTypeClick(1)
	      }
	    }
	  }, [_vm._v("平仓")]), _vm._v(" "), (_vm.pingDayShow) ? [_c('span', {
	    class: {
	      conSpanTyeThree: _vm.pingDay, conSpanTyeThreeBlue: _vm.pingDayBlue
	    },
	    on: {
	      "click": function($event) {
	        _vm.storehouseTypeClick(2)
	      }
	    }
	  }, [_vm._v("平今")])] : [_c('span', {
	    class: {
	      pingDayB: _vm.pingDay, conSpanTyeThreeBlue: _vm.pingDayBlue
	    }
	  }, [_vm._v("平今")])]], 2)]), _vm._v(" "), _c('li', [_c('div', {
	    staticClass: "entrustOne"
	  }, [_vm._v("委托价格")]), _vm._v(" "), _c('div', {
	    staticClass: "entrustTwo"
	  }, [_c('span', {
	    staticClass: "trustSpan"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.editQueryInfo.priceNameEdit),
	      expression: "editQueryInfo.priceNameEdit"
	    }],
	    staticClass: "inputText",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.editQueryInfo.priceNameEdit)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.editQueryInfo.priceNameEdit = $event.target.value
	      }
	    }
	  })]), _vm._v(" "), _c('span', {
	    staticClass: "trustSpanOne",
	    attrs: {
	      "data-toggle": "modal",
	      "data-target": "#priceInfoDialog"
	    }
	  }, [_vm._v("\n                        类型\n                    ")])])]), _vm._v(" "), _c('li', [_c('div', {
	    staticClass: "conOne"
	  }, [_vm._v("委托数量")]), _vm._v(" "), _c('div', {
	    staticClass: "conTwo"
	  }, [_c('span', {
	    staticClass: "market"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.editQueryInfo.VolumeEdit),
	      expression: "editQueryInfo.VolumeEdit"
	    }],
	    staticClass: "inputText",
	    attrs: {
	      "type": "text"
	    },
	    domProps: {
	      "value": _vm._s(_vm.editQueryInfo.VolumeEdit)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.editQueryInfo.VolumeEdit = $event.target.value
	      }
	    }
	  })])])])])])]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
	    staticClass: "btnDiv conBtn",
	    staticStyle: {
	      "display": "block"
	    }
	  }, [_c('button', {
	    staticClass: "btnSubmit",
	    attrs: {
	      "type": "button",
	      "data-toggle": "button"
	    },
	    on: {
	      "click": _vm.editConClick
	    }
	  }, [_vm._v("\n            编辑\n        ")])]), _vm._v(" "), _c('select-con-dialog', {
	    attrs: {
	      "selectContract": _vm.selectContract
	    },
	    on: {
	      "selectContractClick": _vm.selectContractClick
	    }
	  }), _vm._v(" "), _c('price-dialog', {
	    on: {
	      "priceInfoClick": _vm.priceInfoClick
	    }
	  }), _vm._v(" "), _c('tip-msg', {
	    attrs: {
	      "msgTip": _vm.msgTip
	    }
	  })], 1)
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "conDivInfo"
	  }, [_c('span', {
	    staticClass: "spanRed"
	  }, [_vm._v("\n       可开：  "), _c('span', {
	    attrs: {
	      "id": "openBuy"
	    }
	  }, [_vm._v("--")])]), _vm._v(" "), _c('span', {
	    staticClass: "spanBlue"
	  }, [_vm._v("\n       可平： "), _c('span', {
	    attrs: {
	      "id": "openNum"
	    }
	  }, [_vm._v("--")])])])
	}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-2b3eed05", module.exports)
	  }
	}

/***/ }
]);