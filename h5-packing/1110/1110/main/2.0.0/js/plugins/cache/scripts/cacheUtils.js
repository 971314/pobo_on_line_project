+function(e){function s(s,c,a,t){switch(t=t||"h5_session",c=c||"",a="undefined"==typeof a||null===a?1:a,t){case"h5_session":case"h5_local":e.cacheUtils4H5.setItem(s,c,a,t);break;case"app_session":case"app_local":e.cacheUtils4App.setItem(s,c,a,t)}}function c(s,c){switch(c=c||"h5_session"){case"h5_session":case"h5_local":e.cacheUtils4H5.removeItem(s,c);break;case"app_session":case"app_local":e.cacheUtils4App.removeItem(s,c)}}function a(s,c){c=c||"h5_session";var a=null;switch(c){case"h5_session":case"h5_local":a=e.cacheUtils4H5.getItem(s,c);break;case"app_session":case"app_local":a=e.cacheUtils4App.getItem(s,c)}return a}var t={setItem:s,removeItem:c,getItem:a};e.cacheUtils=t}($);