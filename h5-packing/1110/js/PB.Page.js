!function(a){function l(a){var l=a.replace(/\r\n/g,"").replace(/\n/g,"");return JSON.parse(l)}function o(a){var o=l(a),e="M_"+o.moduleId,c="F_"+o.functionNO,n="M_"+o.moduleId+"F_"+o.functionNO;o.moduleId&&o.functionNO&&f.pCallbacks[n]?f.pCallbacks[n](o):o.functionNO&&f.pCallbacks[c]?f.pCallbacks[c](o):o.moduleId&&f.pCallbacks[e]&&f.pCallbacks[e](o)}function e(){f.reload&&f.reload()}function c(){f.refresh&&f.refresh()}function n(){f.fresh&&f.fresh()}function s(a){f.doShow&&f.doShow(a)}var r=function(){};r.prototype={initPage:function(a){this.reload=a.reload,this.refresh=a.refresh,this.fresh=a.fresh,this.doShow=a.doShow;var l=a.callbacks;this.pCallbacks={};for(var o=0,e=l.length;o<e;o++)l[o].fun&&l[o].module?this.pCallbacks["M_"+l[o].module+"F_"+l[o].fun]=l[o].callback:l[o].fun&&!l[o].module?this.pCallbacks["F_"+l[o].fun]=l[o].callback:!l[o].fun&&l[o].module&&(this.pCallbacks["M_"+l[o].module]=l[o].callback)},addFunCallback:function(a,l){this.pCallbacks["F_"+a]||(this.pCallbacks["F_"+a]=l)},addModuleCallback:function(a,l){this.pCallbacks["M_"+a]||(this.pCallbacks["M_"+a]=l)}};var f=new r;!a.callback&&(a.callback=o),!a.reload&&(a.reload=e),!a.refresh&&(a.refresh=c),!a.fresh&&(a.fresh=n),!a.doShow&&(a.doShow=s),!a.pbPage&&(a.pbPage=f)}(window);