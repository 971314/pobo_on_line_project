webpackJsonp([5],{0:function(t,o,e){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}var s=e(62),a=n(s),i=e(58),r=n(i),c=e(74),d=n(c);a.default.use(r.default);var l=new r.default({routes:d.default});new a.default({router:l}).$mount("#stopOfFiled")},1:function(t,o){var e=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=e)},2:function(t,o,e){t.exports={default:e(3),__esModule:!0}},3:function(t,o,e){var n=e(1),s=n.JSON||(n.JSON={stringify:JSON.stringify});t.exports=function(t){return s.stringify.apply(s,arguments)}},4:function(t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default={props:["msgTip"]}},9:function(t,o,e){var n,s;n=e(4);var a=e(10);s=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(s=n=n.default),"function"==typeof s&&(s=s.options),s.render=a.render,s.staticRenderFns=a.staticRenderFns,t.exports=n},10:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"modal dialog-info",attrs:{id:"msgTipDialog"}},[e("div",{staticClass:"modal-dialog"},[e("div",{staticClass:"modal-content"},[e("p",{staticClass:"tipP"},[t._v("提示")]),t._v(" "),e("div",{staticClass:"modal-header dialog-bottom"},[t._v("\n                "+t._s(t.msgTip)+"\n            ")]),t._v(" "),e("div",{staticClass:"modal-body",attrs:{"data-dismiss":"modal"}},[t._v("\n                确认\n            ")])])])])},staticRenderFns:[]}},16:function(t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default={props:["conNoneTouchObj","msg"],created:function(){console.log(this.conNoneTouchObj)},methods:{conStopOrOnClick:function(t){this.$emit("conStopOrOnClick",t)}}}},49:function(t,o,e){var n,s;n=e(16);var a=e(56);s=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(s=n=n.default),"function"==typeof s&&(s=s.options),s.render=a.render,s.staticRenderFns=a.staticRenderFns,t.exports=n},52:function(t,o,e){var n,s,a=e(54);s=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(s=n=n.default),"function"==typeof s&&(s=s.options),s.render=a.render,s.staticRenderFns=a.staticRenderFns,t.exports=n},54:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement;t._self._c||o;return t._m(0)},staticRenderFns:[function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"navbar-fixed-bottom"},[e("p",[t._v("提示： 1：长按可修改和删除条件单")]),t._v(" "),e("p",{staticClass:"footerP"},[t._v("2：只有暂停的时候才可以进行修改")]),t._v(" "),e("p",{staticClass:"footerP p1"},[t._v("3：云端服务器只保证触发不保证成交")])])}]}},56:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"modal  dialog-info",attrs:{id:"noneTuchDialog",tabindex:"-1",role:"dialog","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog"},[e("div",{staticClass:"modal-content",staticStyle:{"border-radius":"10px"}},[1==t.conNoneTouchObj.clientFlag&&21==t.conNoneTouchObj.serverFlag||4==t.conNoneTouchObj.clientFlag&&22==t.conNoneTouchObj.serverFlag||1==t.conNoneTouchObj.clientFlag&&22==t.conNoneTouchObj.serverFlag||2==t.conNoneTouchObj.clientFlag&&22==t.conNoneTouchObj.serverFlag?[e("div",{staticClass:"modal-body dialog-bottom",attrs:{"data-dismiss":"modal"},on:{click:function(o){t.conStopOrOnClick(1)}}},[t._v("\n                    暂停\n                ")])]:3==t.conNoneTouchObj.clientFlag&&23==t.conNoneTouchObj.serverFlag?[e("div",{staticClass:"modal-body dialog-bottom",attrs:{"data-dismiss":"modal"},on:{click:function(o){t.conStopOrOnClick(3)}}},[e("a",{attrs:{href:"#setTuch","data-toggle":"tab","data-dismiss":"modal"}},[t._v("修改")])]),t._v(" "),e("div",{staticClass:"modal-body dialog-bottom",attrs:{"data-dismiss":"modal"},on:{click:function(o){t.conStopOrOnClick(2)}}},[t._v("\n                    运行\n                ")])]:t._e(),t._v(" "),e("div",{staticClass:"modal-body dialog-bottom",attrs:{"data-dismiss":"modal"},on:{click:function(o){t.conStopOrOnClick(4)}}},[t._v("\n                删除\n            ")]),t._v(" "),e("div",{staticClass:"modal-body dialog-bottom",staticStyle:{"border-bottom":"none"},attrs:{"data-dismiss":"modal"},on:{click:function(o){t.conStopOrOnClick(5)}}},[t._v("\n                全部删除\n            ")])],2)])])},staticRenderFns:[]}},67:function(t,o,e){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(o,"__esModule",{value:!0});var s=e(2),a=n(s),i="10025";o.default={data:function(){return{initImg:!0,stopFiledNoTuch:!0,stopFiledIsTuch:!0,stopIsTouchArray:[],isTouchArray:[],conNoneTouchObj:{conditionID:"",clientFlag:"",serverFlag:""},stopNoneTouchShow:!0,stopIsTouchShow:!1,pageSize:20,pageIsNum:0,pullIsTouch:"点击加载更多",orgCode:orgCode,userId:i}},created:function(){var t={callbacks:[{fun:102001,callback:function(t){null==i&&t&&102001==t.functionNo&&(i=pbE.WT().wtGetYunTradeUserId(pbE.WT().wtGetCurrentConnectionCID()))}}],reload:function(){},refresh:function(){},fresh:function(){},doShow:function(t){}};pbPage.initPage(t);var o=this;if(window.pbE){var e=pbE.WT().wtGetCurrentConnectionCID();o.userId=pbE.WT().wtGetYunTradeUserId(e),o.userId||(i=null)}o.isTouchList(o.pageSize)},updated:function(){Ps.initialize(document.getElementById("isList"),{frozen:!0,wheelSpeed:.2})},methods:{btnIsMoreInfo:function(){this.isTouchList(this.pageSize)},isTouchList:function(t){var o=this;$.ajax({url:conditionUrl,method:"post",dataType:"json",contentType:"application/json;charest=utf-8",data:(0,a.default)({func:isConTouch,token:testToken,id:id,userID:o.userId,orgCode:o.orgCode,begin:o.pageIsNum+"",total:t+"",type:stopFiledType}),success:function(t){0==t.status&&($.each(t.data,function(t,e){var n=JSON.parse(e.conditionValue);o.isTouchArray.push({hyName:e.HYMC,createTime:e.createTime,StopLossCheckPriceType:n.ConditionList[0].PositionStop.StopLossPrice,StopProfitCheckPriceType:n.ConditionList[0].PositionStop.StopProfitPrice,Volume:n.AttachObject[0].Volume})}),t.data.length?o.pageIsNum=o.pageIsNum+1:o.pullIsTouch="已经没有更多")},error:function(){console.log("服务器异常！")}})}}}},70:function(t,o,e){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(o,"__esModule",{value:!0});var s=e(2),a=n(s),i=e(49),r=n(i),c=e(9),d=n(c),l=e(52),u=n(l),f="10023";o.default={data:function(){return{initImg:!0,stopFiledNoTuch:!0,stopFiledIsTuch:!0,stopIsTouchArray:[],isTouchArray:[],conNoneTouchObj:{conditionID:"",clientFlag:"",serverFlag:""},stopNoneTouchShow:!0,stopIsTouchShow:!1,pageSize:20,pageNoneNum:1,pageIsNum:1,pullIsTouch:"点击加载更多",orgCode:orgCode,userId:f,authId:testId,token:testToken,msgTip:"",msg:""}},components:{operateTip:r.default,tipMsg:d.default,footerInfo:u.default},created:function(){var t={callbacks:[{fun:102001,callback:function(t){null==f&&t&&102001==t.functionNo&&(f=pbE.WT().wtGetYunTradeUserId(pbE.WT().wtGetCurrentConnectionCID()))}}],reload:function(){},refresh:function(){},fresh:function(){},doShow:function(t){}};pbPage.initPage(t);var o=this;if(window.pbE){var e=pbE.WT().wtGetCurrentConnectionCID();o.userId=pbE.WT().wtGetYunTradeUserId(e),o.userId||(f=null)}o.noneTouchList(o.pageSize)},updated:function(){Ps.initialize(document.getElementById("noneList"),{frozen:!0,wheelSpeed:.2})},methods:{conNoneClick:function(t,o,e){this.conNoneTouchObj={conditionID:t,clientFlag:o,serverFlag:e},console.log(this.conNoneTouchObj)},noneTouchList:function(t){var o=this;$.ajax({url:conditionUrl,method:"post",dataType:"json",async:!0,contentType:"application/json;charest=utf-8",data:(0,a.default)({func:noneConTouch,token:o.token,id:o.authId,userID:o.userId,orgCode:o.orgCode,begin:"0",total:"10000",type:stopFiledType}),success:function(t){return 0!=t.status?(o.msgTip=t.msg,void $("#msgTipDialog").modal("show")):(console.log(t.data.length),void $.each(t.data,function(t,e){var n=JSON.parse(e.conditionValue);o.stopIsTouchArray.push({conditionID:e.conditionID,flag1:e.flag1,flag3:e.flag3,hyName:e.HYMC,market:n.Contracts[0].ExchangeCode,code:n.Contracts[0].ContractCode,StopLossCheckPriceType:n.ConditionList[0].PositionStop.StopLossPrice,StopProfitCheckPriceType:n.ConditionList[0].PositionStop.StopProfitPrice,Volume:n.AttachObject[0].Volume})}))},error:function(){console.log("服务器异常！")}})},conStopOrOnClick:function(t){var o=this;1!=t&&2!=t||$.ajax({url:conditionUrl,method:"post",dataType:"json",contentType:"application/json;charest=utf-8",data:(0,a.default)({func:conStopOrOn,token:testToken,id:id,type:t+"",orgCode:o.orgCode,conditionID:o.conNoneTouchObj.conditionID}),success:function(e){return 0!=e.status?(o.msgTip=e.msg,void $("#msgTipDialog").modal("show")):(o.stopIsTouchArray=[],o.noneTouchList(o.pageSize),1==t&&(console.log("暂停成功！"),$("#stopInfo").attr("href","goBack")),2==t&&console.log("运行成功！"),void 0)},error:function(){console.log("服务器异常！")}}),3==t&&$.ajax({url:conditionUrl,method:"post",dataType:"json",contentType:"application/json;charest=utf-8",data:(0,a.default)({func:conIdQuery,token:testToken,id:id,orgCode:o.orgCode,userID:o.userId,type:stopFiledType,data:[o.conNoneTouchObj.conditionID]}),success:function(t){return 0!=t.status?(o.msgTip=t.msg,void $("#msgTipDialog").modal("show")):(saveStorageInfo("stopOfFiledObj",t.data),void(window.location.href="condition-set-sl?type=1"))},error:function(){}}),4==t&&$.ajax({url:conditionUrl,method:"post",dataType:"json",contentType:"application/json;charest=utf-8",data:(0,a.default)({func:delCon,token:testToken,id:id,orgCode:o.orgCode,type:stopFiledType,data:[o.conNoneTouchObj.conditionID]}),success:function(t){return 0!=t.status?(o.msgTip=t.msg,void $("#msgTipDialog").modal("show")):(o.stopIsTouchArray=[],o.noneTouchList(o.pageSize),console.log("删除成功！"),void 0)},error:function(){console.log("服务器异常！")}}),5==t&&(console.log(o.noneTouchConID),$.ajax({url:conditionUrl,method:"post",dataType:"json",contentType:"application/json;charest=utf-8",data:(0,a.default)({func:delCon,token:testToken,id:id,orgCode:o.orgCode,type:stopFiledType,data:[o.conNoneTouchObj.conditionID]}),success:function(t){return 0!=t.status?(o.msgTip=t.msg,void $("#msgTipDialog").modal("show")):(o.stopIsTouchArray=[],o.noneTouchList(o.pageSize),console.log("删除成功！"),void 0)},error:function(){console.log("服务器异常！")}}))}}}},72:function(t,o,e){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(o,"__esModule",{value:!0});var s=e(63),a=n(s);o.default={data:function(){return{goBackImg:"../../images/goback.png",refreshImg:"../../images/refresh.png",title:"止损止盈"}},components:{navBar:a.default},methods:{refresh:function(){window.location.reload()}}}},74:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default=[{path:"/",component:e(83),children:[{path:"slNoneList/:id",component:e(81)},{path:"slIsList/:id",component:e(79)}]}]},79:function(t,o,e){var n,s;n=e(67);var a=e(88);s=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(s=n=n.default),"function"==typeof s&&(s=s.options),s.render=a.render,s.staticRenderFns=a.staticRenderFns,t.exports=n},81:function(t,o,e){var n,s;n=e(70);var a=e(84);s=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(s=n=n.default),"function"==typeof s&&(s=s.options),s.render=a.render,s.staticRenderFns=a.staticRenderFns,t.exports=n},83:function(t,o,e){var n,s;n=e(72);var a=e(90);s=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(s=n=n.default),"function"==typeof s&&(s=s.options),s.render=a.render,s.staticRenderFns=a.staticRenderFns,t.exports=n},84:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[e("div",{staticClass:"warCon refreshContent",attrs:{id:"refreshContent"}},[t._m(0),t._v(" "),e("div",{staticClass:"bottom",attrs:{id:"noneList"}},[e("div",{staticClass:"TbodyInner"},[t.stopIsTouchArray?e("table",{staticClass:"brief static"},[e("tbody",t._l(t.stopIsTouchArray,function(o){return e("tr",[e("td",[t._v("\n                            "+t._s(o.hyName?o.hyName:"----")+"\n                        ")])])}))]):t._e(),t._v(" "),e("div",{staticClass:"detailOuter"},[t.stopIsTouchArray?e("table",{staticClass:"detail"},[e("tbody",t._l(t.stopIsTouchArray,function(o){return e("tr",{on:{click:function(e){t.conNoneClick(o.conditionID,o.flag1,o.flag3)}}},[1!=o.flag1||o.flag3?1==o.flag1&&21==o.flag3?[e("td",[t._v(" 正在申报 ")])]:1==o.flag1&&22==o.flag3?[e("td",{staticClass:"greenTd"},[t._v(" 运行 ")])]:2==o.flag1&&22==o.flag3?[e("td",{staticClass:"greenTd"},[t._v(" 运行 ")])]:4==o.flag1&&23==o.flag3?[e("td",[t._v(" 正在申报 ")])]:4==o.flag1&&22==o.flag3?[e("td",{staticClass:"greenTd"},[t._v(" 运行 ")])]:3==o.flag1&&22==o.flag3?[e("td",[t._v(" 正在申报 ")])]:3==o.flag1&&23==o.flag3?[e("td",{staticClass:"blueTd"},[t._v(" 暂停 ")])]:2==o.flag1&&21==o.flag3?[e("td",[t._v(" 正在申报 ")])]:1==o.flag1||2==o.flag1||3==o.flag1||4==o.flag1||5==o.flag1&&27==o.flag3||28==o.flag3?[e("td",{staticClass:"redTd"},[t._v(" 异常 ")])]:5==o.flag1&&26!=o.flag3?[e("td",[t._v("正在删除 ")])]:5==o.flag1&&26==o.flag3?[e("td",[t._v("已删除 ")])]:[e("td",[t._v(" ---- ")])]:[e("td",[t._v(" 正在申报 ")])],t._v(" "),e("td",[t._v(t._s(o.Volume))]),t._v(" "),e("td",[t._v(t._s(o.StopLossCheckPriceType))]),t._v(" "),e("td",[t._v(t._s(o.StopProfitCheckPriceType))])],2)}))]):t._e()])])])]),t._v(" "),e("operate-tip",{attrs:{conNoneTouchObj:t.conNoneTouchObj,msg:t.msg},on:{conStopOrOnClick:t.conStopOrOnClick}}),t._v(" "),e("tip-msg",{attrs:{msgTip:t.msgTip}}),t._v(" "),e("footer-info"),t._v(" "),e("a",{attrs:{id:"stopInfo"}})],1)},staticRenderFns:[function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"TheadWrap"},[e("table",{staticClass:"brief static"},[e("tbody",[e("tr",[e("td",{staticClass:"tdT"},[t._v("\n                        合约\n                    ")])])])]),t._v(" "),e("div",{staticClass:"detailOuter"},[e("table",{staticClass:"detail"},[e("thead",[e("tr",[e("th",[t._v("状态")]),t._v(" "),e("th",[t._v("数量")]),t._v(" "),e("th",[t._v("止损价")]),t._v(" "),e("th",[t._v("止盈价")])])])])])])}]}},88:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"warCon refreshContent",attrs:{id:"refreshIsContent"}},[t._m(0),t._v(" "),e("div",{staticClass:"bottom",attrs:{id:"isList"}},[e("div",{staticClass:"TbodyInner"},[t.isTouchArray?e("table",{staticClass:"brief static"},[e("tbody",t._l(t.isTouchArray,function(o){return e("tr",{attrs:{"data-toggle":"modal"}},[e("td",[t._v("\n                        "+t._s(o.hyName?o.hyName:"----")+"\n                    ")])])}))]):t._e(),t._v(" "),e("div",{staticClass:"detailOuter"},[t.isTouchArray?e("table",{staticClass:"detail"},[e("tbody",t._l(t.isTouchArray,function(o){return e("tr",[e("td",[t._v(t._s(o.createTime))]),t._v(" "),e("td",[t._v(t._s(o.Volume))]),t._v(" "),e("td",[t._v(t._s(o.StopLossCheckPriceType))]),t._v(" "),e("td",[t._v(t._s(o.StopProfitCheckPriceType))])])}))]):t._e()])])]),t._v(" "),e("div",{staticStyle:{clear:"both"}}),t._v(" "),e("div",{staticClass:"moreInfo",class:{hide:t.isTouchArray.length<20},on:{click:t.btnIsMoreInfo}},[t._v("\n        "+t._s(t.pullIsTouch)+"\n    ")])])},staticRenderFns:[function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"TheadWrap"},[e("table",{staticClass:"brief static"},[e("tbody",[e("tr",[e("td",{staticClass:"tdT"},[t._v("\n                    合约\n                ")])])])]),t._v(" "),e("div",{staticClass:"detailOuter"},[e("table",{staticClass:"detail"},[e("thead",[e("tr",[e("th",[t._v("触发时间")]),t._v(" "),e("th",[t._v("数量")]),t._v(" "),e("th",[t._v("止损价")]),t._v(" "),e("th",[t._v("止盈价")])])])])])])}]}},90:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",[e("nav-bar",{attrs:{id:this.$route.params.id,goBackImg:t.goBackImg,refreshImg:t.refreshImg,title:t.title},on:{refresh:t.refresh}}),t._v(" "),e("div",{staticClass:"divFixed"},[e("router-link",{attrs:{to:"/slNoneList/1"}},[e("div",{class:1==this.$route.params.id?"stopNoTuchBlue":"stopNoTuch"},[t._v("\n                未触发列\n            ")])]),t._v(" "),e("router-link",{attrs:{to:"/slIsList/2"}},[e("div",{class:2==this.$route.params.id?"stopNoTuchBlue":"stopNoTuch"},[t._v("\n                已触发列表\n            ")])])],1),t._v(" "),e("router-view")],1)},staticRenderFns:[]}}});