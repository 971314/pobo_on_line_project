import City from "./coCity.vue";
import CommonNav from "./coCommonNav.vue";
import MessageIcon from "./coMessageIcon.vue";
import NewsList from "./coNewsList.vue";
import VerticalSwipe from "./coVerticalSwipe.vue";
import WithStatusBar from "./coWithStatusBar.vue";
import ToastBtn from "./coToastBtn.vue";

const pbUI = {
  City,
  CommonNav,
  MessageIcon,
  NewsList,
  VerticalSwipe,
  WithStatusBar,
  ToastBtn
}

const install = Vue => {
  if(install.installed) return;

  // components
  Object.keys(pbUI).forEach(key => {
    Vue.component(pbUI[key].name, pbUI[key]);
  });

};

if(typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...pbUI,
};

