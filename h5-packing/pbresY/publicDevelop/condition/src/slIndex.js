/**
 * Created by xiajing on 2017/2/16.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import  configSlRouter   from './util/configSlRouter.js';
Vue.use(VueRouter)
const router = new VueRouter({
    routes:configSlRouter
})
const app = new Vue({ router}).$mount('#stopOfFiled');
