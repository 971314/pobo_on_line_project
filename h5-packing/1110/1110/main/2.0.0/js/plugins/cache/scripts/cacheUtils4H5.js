+function(e){function t(t,n,a,r){var s={value:n,time:a,createDate:(new Date).getTime()},o=function(t){try{t=e.endecryptUtils.aesEncrypt("iloveyou",t)}catch(e){}return t};switch(r){case"h5_session":s=o(JSON.stringify(s)),window.sessionStorage.setItem(t,s);break;case"h5_local":s=o(JSON.stringify(s)),window.localStorage.setItem(t,s)}}function n(e,t){switch(t){case"h5_session":window.sessionStorage.removeItem(e);break;case"h5_local":window.localStorage.removeItem(e)}}function a(t,n){var a=function(t){if(null===t||"null"===t||""===t)return null;try{return JSON.parse(e.endecryptUtils.aesDecrypt("iloveyou",t))}catch(e){return{time:0,value:t}}},r=function(n){var a=null;return n&&(n.hasOwnProperty("time")&&n.hasOwnProperty("value")?a=n.value:e.alert("cacheUtils.getItem 取值失败，失败原因：存储时，未调用 cacheUtils.setItem 函数，当前 key："+t)),a},s=null;switch(n){case"h5_session":s=window.sessionStorage.getItem(t);break;case"h5_local":s=window.localStorage.getItem(t)}return s=a(s),s=r(s)}var r={setItem:t,removeItem:n,getItem:a};e.cacheUtils4H5=r}($);