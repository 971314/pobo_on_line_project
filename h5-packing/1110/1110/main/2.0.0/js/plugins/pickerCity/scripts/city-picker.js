+function(e){"use strict";e.fn.cityPicker=function(a){return this.each(function(){if(this){var s=function(e){for(var a=[],s=0;s<e.length;s++){var u=e[s];"请选择"!==u.name&&a.push(u.name)}return a.length?a:[""]},u=function(e){return e.sub?s(e.sub):[""]},l=function(e){for(var a=0;a<n.length;a++)if(n[a].name===e)return u(n[a]);return[""]},t=function(e,a){for(var s=0;s<n.length;s++)if(n[s].name===e)for(var l=0;l<n[s].sub.length;l++)if(n[s].sub[l].name===a)return u(n[s].sub[l]);return[""]},n=a.rawCitiesData||e.smConfig.rawCitiesData,r=n.map(function(e){return e.name}),c=u(n[0]),i=[""],o=r[0],v=c[0],f=i[0],h={cssClass:"city-picker",rotateEffect:!1,onChange:function(e,a,s){var u,n=a[0];if(n!==o){var r=l(n);u=r[0];var c=t(n,u);return e.cols[1].replaceValues(r),e.cols[2].replaceValues(c),o=n,v=u,void e.updateValue()}u=e.cols[1].value,u!==v&&(e.cols[2].replaceValues(t(n,u)),v=u,e.updateValue())},cols:[{values:r,cssClass:"col-province"},{values:c,cssClass:"col-city"},{values:i,cssClass:"col-district"}]},p=e.extend(h,a),m=e(this).val();m&&(p.value=m.split(" "),p.value[0]&&(o=p.value[0],p.cols[1].values=l(p.value[0])),p.value[1]?(v=p.value[1],p.cols[2].values=t(p.value[0],p.value[1])):(f=p.value[2],p.cols[2].values=t(p.value[0],p.cols[1].values[0]))),e(this).picker(p)}})}}($);