/**
 * Created by xiajing on 2017/2/16.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import  configRouter   from './configRouter.js';
Vue.use(Vuex);
Vue.use(VueRouter);
const router = new VueRouter({
    routes:configRouter
});
/*const store = new Vuex({
    state: {
        count: 1
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
});*/
const app = new Vue({ router}).$mount('#alerted');
