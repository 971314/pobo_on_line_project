!function(){function e(e){return e<10?"0"+e:e}function t(t){return i.setTime(Date.now()),i.getFullYear()+"-"+e(i.getMonth()+1)+"-"+e(i.getDate())+" "+e(i.getHours())+":"+e(i.getMinutes())+":"+e(i.getSeconds())+" "+("object"==typeof t?JSON.stringify(t):t)}function n(e){a.push(e),o||(o=setInterval(function(){var e=a.length;r<e&&(r=e)},1e3))}var o,l,i=new Date,a=[],r=0,c=localStorage.localIndex||-1;"undefined"!=typeof pbE&&(l=pbE.SYS(),!l.writeH5Log&&(l=null)),window.pblog={local:!0,remote:!1,file:!0,info:function(e){var o=t(e);return this.file&&l&&l.writeH5Log(o+"\n"),this.local&&(localStorage.setItem(++c,o),localStorage.setItem("localIndex",c)),this.remote&&n(o),this},clear:function(){for(;c>=0;)localStorage.removeItem(c),--c;localStorage.removeItem("localIndex")},readFile:function(){return l?l.readH5Log()||"":""},readLocal:function(){for(var e=-1,t="";++e in localStorage;)t+=localStorage[e]+"\n";return t}};var s=document.createElement("div");s.innerHTML="<div id='_pblogs' style='position:fixed;top:0;left:0;color:#000;background:#fff;width:100%;height:100%;z-index:9999;overflow-y:auto;margin:0;display:none;'><span style='text-decoration:underline'>file</span> <span>localStorage</span>  <span>clear</span><pre></pre><pre style='display:none'></pre></div><div style='position:fixed;right:5px;bottom:5px;color:#000;background:yellow;z-index:9999'>logs</div>",document.body.appendChild(s);var d=document.getElementById("_pblogs"),g=d.getElementsByTagName("span"),p=d.getElementsByTagName("pre");d.nextSibling.onclick=function(){"none"==d.style.display?(p[0].innerHTML=pblog.readFile(),p[1].innerHTML=pblog.readLocal(),d.style.display="block"):d.style.display="none"};for(var u=0;u<2;u++)g[u].onclick=function(){if("underline"!=this.style.textDecoration){var e=g[0]==this?1:0;this.style.textDecoration="underline",g[e].style.textDecoration="none",p[e].style.display="none",p[++e%2].style.display="block"}};g[2].onclick=function(){pblog.clear(),p[1].innerHTML=""}}();