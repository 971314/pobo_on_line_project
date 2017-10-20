import Vue from 'vue';
import Impression from 'vue-impression';
import Axios from 'axios';
import Index from './Index.vue';
import pbUI from '../../components';
Vue.use(Impression);
Vue.use(pbUI);
Vue.prototype.$axios = Axios;

const index = new Vue({
  el: '#app',
  render: h => h(Index)
});
