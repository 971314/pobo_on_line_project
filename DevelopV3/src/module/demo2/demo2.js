/**
 * Created by xiajing on 2017/3/8.
 */
import Vue from 'vue';
import '../../assets/style/impression.css';
import Impression from 'vue-impression';
import App from './index.vue';
import pbUI from '../../components';
Vue.use(Impression);
Vue.use(pbUI);

new Vue({
    el:'#app',
    components:{App}
})
