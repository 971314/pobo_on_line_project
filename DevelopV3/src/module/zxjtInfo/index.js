/**
 * Created by pobo on 2017/3/31.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import pbUI from '../../components';
import Impression from 'vue-impression';

import hedging from './view/hedginArbirage.vue';
import novece from './view/noviceMarket.vue';

Vue.use(pbUI);
Vue.use(VueRouter);
Vue.use(Impression);

const router = new VueRouter({
  routes: [
    {path: '/', component: hedging},
    {path: '/novece', component: novece}
  ]
});

new Vue({
  el:'#app',
  router
});
