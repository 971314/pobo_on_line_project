/**
 * Created by xiajing on 2017/3/8.
 */
import Vue from 'vue'
/*import App from './App'*/
import VueRouter from 'vue-router';
//import  configRouter   from './routerConfig.js';
import '../../assets/style/common.css';
import '../../assets/style/impression.css';
import Impression from 'vue-impression';
import pbUI from '../../components';
Vue.use(Impression);
Vue.use(VueRouter);
Vue.use(pbUI);
const router = new VueRouter({
  routes:[
    { path:'/',component: require('./index.vue')},
    { path:'/message',component: require('./view/message.vue'),
      children:[
        {path:'/test',component:require('./components/test.vue')},
      ]
    },
    {path:'/list',component:require('./components/list.vue'),
      children:[
      {path:'/main',component:require('./view/main.vue')},
        /*{path:'/main',component:r=> require.ensure([],()=>r(require('./components/main.vue')),'index')},*/
        {path:'/marketHot',component:require('./components/marketHot.vue')},
        {path:'/orgWay',component:require('./components/orgWay.vue')}
      ]
    },
  ]
})
const app = new Vue({ router}).$mount('#app');

