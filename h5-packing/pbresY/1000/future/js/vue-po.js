/**
 * Created by pobo on 2016/12/22.
 */
Vue.component('my-deal', {
    created:function () {
        var _this = this;
        console.log(position);
        for(var i = 0;i < position.length;i++){
            if (isNaN(position[i]['profit'])) {
              _this.a1 = true;
            } else {
                if (position[i]['profit'] > 0) {
                    _this.a3 = true;
                    _this.path = '../images/redBar.png';
                } else if (position[i]['profit'] < 0) {
                    _this.a4 = true;
                    _this.path = '../images/greenBar.png';
                } else if (position[i]['profit'] == 0) {
                    _this.a1 = true;
                }
                if (_this.path == null) {
                    _this.path = '';
                }
                if (position[i]['112'] == '0') {
                    if (position[i]['503'] == '1') {
                        _this.status = '../images/duojin.png';
                        _this.alt = '多今';
                    } else if (position[i]['503'] == '2') {
                        _this.status = '../images/duozuo.png';
                        _this.alt = '多昨';
                    } else {
                        _this.status = '../images/duocang.png';
                        _this.alt = '多仓';
                    }
                } else if (position[i]['112'] == '1') {
                    if (position[i]['503'] == '1') {
                        _this.status = '../images/kongjin.png';
                        _this.alt = '空今';
                    } else if (position[i]['503'] == '2') {
                        _this.status = '../images/kongzuo.png';
                        _this.alt = '空昨';
                    } else {
                        _this.status = '../images/kongcang.png';
                        _this.alt = '空仓';
                    }
                }
                if (position[i]['64']) {
                    _this.contract = position[i]['64'];
                } else {
                    _this.contract = position[i]['63'];
                }
            }
        }
    },
    methods:{
        jump:function (content) {
            pbEngine.sendMessageToNative('Pbkey_H5_Position_XD_Data', JSON.stringify(content));
        }
    },
    template: '<div v-for="(key val) in position">'+
    '<div class="nav-blank"></div>'+
    '<div class="position-row" @click="jump(content)">'+
    '<div class="imageBar pull-left"><img :src="path" alt="盈利条" /></div>'+
    '<div class="details">'+
    '<div class="details-title">'+
    '<p class="a1">{{contract}}</p>'+
    '<p class="lh35"><span class="b2">浮盈&nbsp;&nbsp;<span :class="{a1:a1,a3:a3,a4:a4}">{{key.profit}}</span></span></p>'+
    '</div>'+
    '<div class="details-content row">'+
    '<div class="pull-left pd7t pd3zy"><img :src="status" :alt="alt" width="21px" height="42px" /></div>'+
    '<div class="col-my-10 details-top">'+
    '<p class="c2">开仓均价&nbsp;<span class="c1">{{key.136}}</span></p>'+
    '<p class="c2">持仓数量&nbsp;<span class="c1">{{key.135}</span></p>'+
    '</div>'+
        '<div class="pull-left col-my-6 details-top">'+
    '<p class="c2">现价&nbsp;<span class="c1">{{key.price}}</span></p>'+
    '<p class="c2">可用&nbsp;<span class="c1">{{key.available}}</span></p>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'
});