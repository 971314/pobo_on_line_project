import Vue from 'vue';
import pbUI from '../../components';
import tool from './index.vue';
import Axios from 'axios';
import Impression from 'vue-impression';


Vue.prototype.$axios = Axios;
Vue.use(pbUI);
Vue.use(Impression);

new Vue({
  el:'#app',
  render:h => h(tool)
});