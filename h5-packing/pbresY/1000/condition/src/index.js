/**
 * Created by xiajing on 2017/2/16.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import  configRouter   from './util/configRouter.js';
import './css/condition.css';
Vue.use(VueRouter)
const router = new VueRouter({
    routes:configRouter
})
const app = new Vue({ router}).$mount('#conditionList');
