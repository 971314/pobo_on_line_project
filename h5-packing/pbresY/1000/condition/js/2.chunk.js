webpackJsonp([2],{1:function(o,t){var e=o.exports={version:"2.4.0"};"number"==typeof __e&&(__e=e)},2:function(o,t,e){o.exports={default:e(3),__esModule:!0}},3:function(o,t,e){var n=e(1),a=n.JSON||(n.JSON={stringify:JSON.stringify});o.exports=function(o){return a.stringify.apply(a,arguments)}},4:function(o,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["msgTip"]}},9:function(o,t,e){var n,a;n=e(4);var s=e(10);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=s.render,a.staticRenderFns=s.staticRenderFns,o.exports=n},10:function(o,t){o.exports={render:function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"modal dialog-info",attrs:{id:"msgTipDialog"}},[e("div",{staticClass:"modal-dialog"},[e("div",{staticClass:"modal-content"},[e("p",{staticClass:"tipP"},[o._v("提示")]),o._v(" "),e("div",{staticClass:"modal-header dialog-bottom"},[o._v("\n                "+o._s(o.msgTip)+"\n            ")]),o._v(" "),e("div",{staticClass:"modal-body",attrs:{"data-dismiss":"modal"}},[o._v("\n                确认\n            ")])])])])},staticRenderFns:[]}},16:function(o,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["conNoneTouchObj","msg"],created:function(){console.log(this.conNoneTouchObj)},methods:{conStopOrOnClick:function(o){this.$emit("conStopOrOnClick",o)}}}},49:function(o,t,e){var n,a;n=e(16);var s=e(54);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=s.render,a.staticRenderFns=s.staticRenderFns,o.exports=n},52:function(o,t,e){var n,a,s=e(56);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=s.render,a.staticRenderFns=s.staticRenderFns,o.exports=n},54:function(o,t){o.exports={render:function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"modal  dialog-info",attrs:{id:"noneTuchDialog",tabindex:"-1",role:"dialog","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog"},[e("div",{staticClass:"modal-content",staticStyle:{"border-radius":"10px"}},[1==o.conNoneTouchObj.clientFlag&&21==o.conNoneTouchObj.serverFlag||4==o.conNoneTouchObj.clientFlag&&22==o.conNoneTouchObj.serverFlag||1==o.conNoneTouchObj.clientFlag&&22==o.conNoneTouchObj.serverFlag||2==o.conNoneTouchObj.clientFlag&&22==o.conNoneTouchObj.serverFlag?[e("div",{staticClass:"modal-body dialog-bottom",attrs:{"data-dismiss":"modal"},on:{click:function(t){o.conStopOrOnClick(1)}}},[o._v("\n                    暂停\n                ")])]:3==o.conNoneTouchObj.clientFlag&&23==o.conNoneTouchObj.serverFlag?[e("div",{staticClass:"modal-body dialog-bottom",attrs:{"data-dismiss":"modal"},on:{click:function(t){o.conStopOrOnClick(3)}}},[e("a",{attrs:{href:"#setTuch","data-toggle":"tab","data-dismiss":"modal"}},[o._v("修改")])]),o._v(" "),e("div",{staticClass:"modal-body dialog-bottom",attrs:{"data-dismiss":"modal"},on:{click:function(t){o.conStopOrOnClick(2)}}},[o._v("\n                    运行\n                ")])]:o._e(),o._v(" "),e("div",{staticClass:"modal-body dialog-bottom",attrs:{"data-dismiss":"modal"},on:{click:function(t){o.conStopOrOnClick(4)}}},[o._v("\n                删除\n            ")]),o._v(" "),e("div",{staticClass:"modal-body dialog-bottom",staticStyle:{"border-bottom":"none"},attrs:{"data-dismiss":"modal"},on:{click:function(t){o.conStopOrOnClick(5)}}},[o._v("\n                全部删除\n            ")])],2)])])},staticRenderFns:[]}},56:function(o,t){o.exports={render:function(){var o=this,t=o.$createElement;o._self._c||t;return o._m(0)},staticRenderFns:[function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"navbar-fixed-bottom"},[e("p",[e("span",{staticStyle:{color:"red"}},[o._v("提示：")]),o._v(" 1.长按可修改和删除条件单")]),o._v(" "),e("p",{staticClass:"footerP"},[o._v("2.只有暂停的时候才可以进行修改")]),o._v(" "),e("p",{staticClass:"footerP"},[o._v("3.云端服务器只保证触发不保证成交")])])}]}},69:function(o,t,e){"use strict";function n(o){return o&&o.__esModule?o:{default:o}}Object.defineProperty(t,"__esModule",{value:!0});var a=e(2),s=n(a),i=e(49),c=n(i),l=e(52),r=n(l),d=e(9),u=n(d);t.default={data:function(){return{noneTouchConID:[],noneTouchLen:[],token:testToken,authId:testId,userId:null,orgCode:orgCode,CID:"",conNoneTouchObj:{conditionID:"",clientFlag:"",serverFlag:""},refreshImg:"../images/refresh.png",refreshing:!1,msgTip:""}},components:{operateTip:c.default,footerInfo:r.default,tipMsg:u.default},created:function(){$(".modal-backdrop").remove();var o=this,t={callbacks:[{fun:102001,callback:function(t){null==o.userId&&t&&102001==t.functionNo&&(o.userId=pbE.WT().wtGetYunTradeUserId(pbE.WT().wtGetCurrentConnectionCID()))}}],reload:function(){},refresh:function(){},fresh:function(){},doShow:function(o){}};pbPage.initPage(t),$("#noneTuchDialog").modal("show");var o=this;window.pbE&&(o.CID=pbE.WT().wtGetCurrentConnectionCID(),o.CID<=0?location.href="pobo:uncheck=1&pageId=802005":(o.userId=pbE.WT().wtGetYunTradeUserId(o.CID),this.noneTouchClick(),o.userId||(o.userId=null))),console.log(o.CID)},updated:function(){Ps.initialize(document.getElementById("noneList"),{frozen:!0,wheelSpeed:.4})},methods:{conNoneClick:function(o,t,e){this.conNoneTouchObj={conditionID:o,clientFlag:t,serverFlag:e},$("#noneTuchDialog").modal("show")},noneTouchClick:function(){circleShowPass("正在加载");var o=this;$.ajax({url:conditionUrl,method:"post",dataType:"json",contentType:"application/json;charest=utf-8",data:(0,s.default)({func:noneConTouch,token:o.token,id:o.authId,userID:o.userId,orgCode:o.orgCode,begin:"0",total:"10000",type:contractType,os:os}),success:function(t){if(0!=t.status)return circleHidePass(),o.msgTip=t.msg,void $("#msgTipDialog").modal("show");circleHidePass(),o.noneTouchConID=[],console.log(t.data,t.data.length);var e=[];if(t.data.length>0)if(console.log(o.noneTouchLen.length,t.data.length,"length"),o.noneTouchLen.length>t.data.length){console.log(">");for(var n=0;n<o.noneTouchLen.length;n++){for(var a=o.noneTouchLen[n],s=a.HYMC,i=!1,c=0;c<t.data.length;c++){var l=t.data[c],r=l.HYMC;if(r==s){i=!0;break}}if(!i&&(e.push(a),console.log(e),e.length>0))for(var d=0;d<e.length;d++)s===e[d].HYMC&&(o.noneTouchLen.splice(n,1),console.log(o.noneTouchLen,o.noneTouchLen.lenght,"删除"))}}else console.log("else"),$.each(t.data,function(t,e){o.noneTouchConID.push(e.conditionID),o.$set(o.noneTouchLen,t,{conditionID:e.conditionID,flag1:e.flag1,flag3:e.flag3,createTime:e.createTime,HYMC:e.HYMC,name:e.name,subType:JSON.parse(e.conditionValue).TimeCondition})});else 0===t.data.length&&o.noneTouchLen.splice(0,o.noneTouchLen.length)},error:function(){circleHidePass(),console.log("服务器异常！"),o.msgTip="服务器异常",$("#msgTipDialog").modal("show")}})},conStopOrOnClick:function(o){var t=this;if(1!=o&&2!=o||$.ajax({url:conditionUrl,method:"post",dataType:"json",contentType:"application/json;charest=utf-8",data:(0,s.default)({func:conStopOrOn,token:t.token,id:t.authId,orgCode:t.orgCode,operType:o+"",conditionID:t.conNoneTouchObj.conditionID,type:contractType,userID:t.userId}),success:function(e){return 0!=e.status?(t.msgTip=e.msg,void $("#msgTipDialog").modal("show")):(t.dataOrFlag=1,t.noneTouchClick(),1==o&&console.log("暂停成功！"),2==o&&console.log("运行成功！"),void 0)},error:function(){t.msgTip="服务器异常",$("#msgTipDialog").modal("show")}}),3==o){var t=this;$.ajax({url:conditionUrl,method:"post",dataType:"json",contentType:"application/json;charest=utf-8",data:(0,s.default)({func:conIdQuery,token:t.token,id:t.authId,userID:t.userId,orgCode:t.orgCode,type:contractType+"",data:[t.conNoneTouchObj.conditionID]}),success:function(o){return 0!=o.status?(t.msgTip=o.msg,void $("#msgTipDialog").modal("show")):(console.log(o.data),saveStorageInfo("conNoneListObj",o.data),t.$router.push("/editCon/4"),void 0)},error:function(){console.log("服务器异常！"),t.msgTip="服务器异常",$("#msgTipDialog").modal("show")}})}4==o&&$.ajax({url:conditionUrl,method:"post",dataType:"json",contentType:"application/json;charest=utf-8",data:(0,s.default)({func:delCon,token:t.token,id:t.authId,orgCode:t.orgCode,type:contractType,data:[t.conNoneTouchObj.conditionID],userID:t.userId}),success:function(o){return 0!=o.status?(t.msgTip=o.msg,void $("#msgTipDialog").modal("show")):(t.dataOrFlag=1,t.noneTouchClick(),console.log("删除成功！"),void 0)},error:function(){console.log("服务器异常！"),t.msgTip="服务器异常",$("#msgTipDialog").modal("show")}}),5==o&&(console.log(t.noneTouchConID),$.ajax({url:conditionUrl,method:"post",dataType:"json",contentType:"application/json;charest=utf-8",data:(0,s.default)({func:delCon,token:t.token,id:t.authId,orgCode:t.orgCode,type:contractType,data:t.noneTouchConID,userID:t.userId}),success:function(o){return 0!=o.status?(t.msgTip=o.msg,void $("#msgTipDialog").modal("show")):(t.dataOrFlag=1,t.noneTouchClick(),console.log("删除成功！"),void 0)},error:function(){console.log("服务器异常！"),t.msgTip="服务器异常",$("#msgTipDialog").modal("show")}}))},refresh:function(){var o=this;o.refreshing?alert("刷新过于频繁，两次查询间隔至少5秒"):(o.refreshing=!0,setTimeout(function(){o.refreshing=!1},5e3),o.noneTouchClick())}}}},80:function(o,t,e){var n,a;n=e(69);var s=e(85);a=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(a=n=n.default),"function"==typeof a&&(a=a.options),a.render=s.render,a.staticRenderFns=s.staticRenderFns,o.exports=n},85:function(o,t){o.exports={render:function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",[e("img",{staticStyle:{position:"fixed",top:"15px",right:"17px",width:"18px",height:"18px","z-index":"1030"},attrs:{src:o.refreshImg},on:{click:o.refresh}}),o._v(" "),e("div",{staticClass:"warCon refreshContent"},[o._m(0),o._v(" "),e("div",{staticClass:"bottom",attrs:{id:"noneList"}},[e("div",{staticClass:"TbodyInner"},[o.noneTouchLen?e("table",{staticClass:"brief static"},[e("tbody",o._l(o.noneTouchLen,function(t,n){return e("tr",{key:n,class:{clickTrTd:0x5ba5e84b99469==t.conditionID}},[e("td",[o._v("\n                            "+o._s(t.HYMC?t.HYMC:"----")+"\n                        ")])])}))]):o._e(),o._v(" "),e("div",{staticClass:"detailOuter"},[o.noneTouchLen?e("table",{staticClass:"detail"},[e("tbody",o._l(o.noneTouchLen,function(t,n){return e("tr",{key:n,class:{clickTrTd:0x5ba5e84b99469==t.conditionID},on:{click:function(e){o.conNoneClick(t.conditionID,t.flag1,t.flag3)}}},[1!=t.flag1||t.flag3?1==t.flag1&&21==t.flag3?[e("td",[o._v(" 正在申报 ")])]:1==t.flag1&&22==t.flag3?[e("td",{staticClass:"greenTd"},[o._v(" 运行 ")])]:2==t.flag1&&22==t.flag3?[e("td",{staticClass:"greenTd"},[o._v(" 运行 ")])]:2==t.flag1&&23==t.flag3?[e("td",{staticClass:"blueTd"},[o._v(" 暂停 ")])]:4==t.flag1&&23==t.flag3?[e("td",[o._v(" 正在申报 ")])]:4==t.flag1&&22==t.flag3?[e("td",{staticClass:"greenTd"},[o._v(" 运行 ")])]:3==t.flag1&&21==t.flag3?[e("td",[o._v(" 正在申报 ")])]:3==t.flag1&&22==t.flag3?[e("td",[o._v(" 正在申报 ")])]:3==t.flag1&&23==t.flag3?[e("td",{staticClass:"blueTd"},[o._v(" 暂停 ")])]:2==t.flag1&&21==t.flag3?[e("td",[o._v(" 正在申报 ")])]:1==t.flag1||2==t.flag1||3==t.flag1||4==t.flag1||5==t.flag1&&27==t.flag3||28==t.flag3?[e("td",{staticClass:"redTd"},[o._v(" 异常 ")])]:5==t.flag1&&26!=t.flag3?[e("td",[o._v("正在删除 ")])]:5==t.flag1&&26==t.flag3?[e("td",[o._v("已删除 ")])]:[e("td",[o._v(" ---- ")])]:[e("td",[o._v(" 正在申报 ")])],o._v(" "),e("td",[o._v("\n                                "+o._s(1==t.subType?"价格":"时间")+"\n                            ")]),o._v(" "),e("td",[o._v(o._s(t.name))]),o._v(" "),e("td",[o._v(o._s(t.createTime))])],2)}))]):o._e()])])])]),o._v(" "),e("footer-info"),o._v(" "),e("operate-tip",{attrs:{conNoneTouchObj:o.conNoneTouchObj,msg:o.msg},on:{conStopOrOnClick:o.conStopOrOnClick}}),o._v(" "),e("tip-msg",{attrs:{msgTip:o.msgTip}})],1)},staticRenderFns:[function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"TheadWrap"},[e("table",{staticClass:"brief static"},[e("tbody",[e("tr",[e("td",{staticClass:"tdT"},[o._v("\n                        合约\n                    ")])])])]),o._v(" "),e("div",{staticClass:"detailOuter"},[e("table",{staticClass:"detail"},[e("thead",[e("tr",[e("th",[o._v("状态")]),o._v(" "),e("th",[o._v("条件")]),o._v(" "),e("th",[o._v("条件单名称")]),o._v(" "),e("th",[o._v("创建时间")])])])])])])}]}}});