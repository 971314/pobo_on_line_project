/*作者：   Alt+  时间： 2016-08-24 19:10:20 PM */
+function(a){function b(b,c){var g={};g.bizcode=b;var h=JSON.stringify(c);if("des"==d.encryMode){var i=a.endecryptUtils.desEncrypt(e,h);g.data=i,g.encry_mode="des"}else if("aes"==d.encryMode){var j=e.substring(0,16),k=a.endecryptUtils.aesEncrypt(j,h);g.data=k,g.encry_mode="aes"}else{var l=a.endecryptUtils.encoderBase64(h);g.data=l}g.merchant_id=f,g.signKey=e,g.request_id=a.getUuid();for(var m=["bizcode","data","encry_mode","merchant_id","request_id","signKey"],n="",o=0,p=m.length;p>o;o++)n+=m[o]+"="+g[m[o]]+"&";n=n.substring(0,n.length-1);var q=a.endecryptUtils.md5Encrypt(n).toUpperCase(),r=n.substring(0,n.indexOf("signKey")-1);return r=r+"&sign="+q}function c(){var b=d.ssoSignKey;if(b){var c="";try{c=a.endecryptUtils.desDecrypt(g+h,b)}catch(i){}c&&(c=JSON.parse(c),e=c.signKey,f=c.merchant_id)}}var d=a.config.global,e="",f="",g="",h="";+function(){g="thin"}(),+function(){h="func"}();var i={checkCookieValidity:c,ssoSignFunc:b,test:g,func:h};a.ssoUtils=i}($);
/*出品单位：深圳市思迪信息技术股份有限公司-前端Html5开发小组*/