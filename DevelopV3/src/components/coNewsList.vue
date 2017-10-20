<template>
 <div>
   <tabbar class="no-margin" activeKey="tabs[0].name" @change="getNews" style="height: 35px; border-top: 1px solid #e4e7f0;">
      <tabbar-item v-for="item in tabs" :eventKey="item.name">{{item.name}}</tabbar-item>
  </tabbar>
  <group>
      <cell v-for="item in newsList">
         <a v-bind:href="'pobo:pageId=900005&url=http://static.yunyesoft.com/static/consult/#/detail?cId='+item.detailId">
          <media>
              <media-body>
                  <p :style="{fontSize: '14px', color: '#1a1a1a'}">{{item.infotitle}}</p>
                  <p :style="{fontSize: '10px', color: '#808086'}">{{item.authordep}} {{item.time}}</p>
              </media-body>
              <media-object>
                  <img :style="{width: '92px', height: '63px'}" v-bind:src="'http://static.yunyesoft.com/static/img/'+item.thumbid +'.png'" onerror="this.src='../images/default.png'">
              </media-object>
          </media>
        </a>
      </cell>
  </group>
 </div>
</template>

<script>
  import axios from 'axios';
    export default{
      props: ['newsPar', 'tabs', 'tags'],
      data: function () {
        return {
                newsList: [],  //新闻列表
                parArr: {}  //以tabs中name为key的参数对象
                /*data1: [],
                data2: [],
                data3: []*/
              }
      },
      watch: {
        'newsPar': function () {  //首页使用时newsPar一直为空，watch不会调用
          if (this.tags) {
            /*if (!this.data1.length) {  //第一次发查新闻请求
              this.getNews(this.tabs[0].name);
              console.log("第一次渲染");
            }*/
            this.getNews(this.tabs[0].name);
          }
          //console.log(this.newsPar);
        }
      },

      mounted() {
        for (var i = 0, j= this.tabs.length; i < j; i++) {
          this.parArr[this.tabs[i].name] = this.tabs[i].par;
        }

        console.log(this.parArr);

        if (!this.tags) {  //首页使用
          this.newsPar = []; //首页使用时tags需传null
          this.getNews(this.tabs[0].name);
        }
      },
      /*{"pageNo": 1, "pageSize": 10, "tags": this.newsPar, "part": ""}*/
      methods: {
        getNews: function (val) {
          var news = [], _this = this, tag;
          if (this.newsPar.length == 0) {
            tag = null;
          } else {
            tag = this.newsPar.split(',');
          }
          console.log(this.parArr[val]);
          console.log(this.newsPar);
          axios.post('http://static.yunyesoft.com/consult/newsBase/api',
            {"func":"7001", "data":[{
                    "pageNo":1,"pageSize":10, "tags": tag, "part": _this.parArr[val]
                    /*"pageNo":1,"pageSize":10, "tags": ["黄金"], "part": _this.parArr[val]*/
                }]
            }
          )
          .then(function(res){
            //_this.newsList = res.data.data[0].results;
            var news = res.data.data[0].results;
            for (var i = 0, j = news.length; i < j; i++) {
              var date = new Date(news[i].updatetime);
              var Y = date.getFullYear() + '-',
                  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
                  /*D = date.getDate() + ' ',
                  h = date.getHours() + ':',
                  m = date.getMinutes() + ':',
                  s = date.getSeconds();*/
                  D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ',
                  h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':',
                  m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':',
                  s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
              news[i].time = Y+M+D+h+m+s;
            }
            _this.newsList = news;
            console.log(news);
          })
          .catch(function(err){
              console.log(err);
          })
        }
      }
    }
</script>
