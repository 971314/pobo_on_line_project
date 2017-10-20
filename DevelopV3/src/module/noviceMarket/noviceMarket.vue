<template>
  <div class="novice">
    <novice-nav style="background:red;"></novice-nav>
    <a :href="noviceHead.url" class="noviceHeadUrl">
   <img :src="noviceHead.imgUrl"/>
    </a>
    <div id="functional">
      <div class="novicebody">
        <novice-functional v-for="noviceFunctional in noviceFunctional" :functionalIcon.sync="noviceFunctional.iconUrl" :name.sycn="noviceFunctional.name" :functionalUrl.sync="noviceFunctional.url"></novice-functional>
      </div>
      <div class="novicebody">
        <div class="noviceTitle">专门热线</div>
        <novice-jump v-for="(hotAre,i) in hotArea" :areaUrl.sync="hotAre.url" :areaImg.sync="hotAre.imgUrl" :areaWidth.sync="style.width1" :areaHeight.sync="style.height1" class="mr036"></novice-jump>
      </div>
      <div class="novicebody">
        <div class="noviceTitle">模拟游戏</div>
        <novice-jump :areaUrl.sync="simulation.url" :areaImg.sync="simulation.imgUrl" :areaWidth.sync="style.width2" :areaHeight.sync="style.height2"></novice-jump>
      </div>
      <div class="novicebody">
        <div class="noviceTitle">进阶必备</div>
        <novice-jump v-for="hotAre in advanced" :areaUrl.sync="hotAre.url" :areaImg.sync="hotAre.imgUrl" :areaWidth.sync="style.width1" :areaHeight.sync="style.height1" class="mr036"></novice-jump>
      </div>
    </div>
  </div>
</template>
<script>
  import noviceJump from './components/noviceJump.vue';
  import noviceFunctional from './components/noviceFunctional.vue';
  import noviceNav from './components/noviceNav.vue';
  import Axios from 'axios';
  export default {
      data(){
          return {
              noviceHead:{},
              noviceFunctional:[],
              hotArea:[],
              simulation:{},
              advanced:[],
              style:{
                width1:'100%',
                height1:'4rem',
                width2:'200%',
                height2:'6.5rem'
              }
          }
      },
    created(){
          var _this = this;
      Axios.get('../conf/cfZxjtInfo.json').then(function (data) {
          console.log(data.data.noviceMarket);
          var advertising = data.data.noviceMarket.advertising,
              functional = data.data.noviceMarket.functional,
              hotArea = data.data.noviceMarket.hotArea,
              game = data.data.noviceMarket.game,
              essential = data.data.noviceMarket.essential;
          _this.noviceHead.imgUrl = advertising.img;
          _this.noviceHead.url = advertising.url;
        for(var i = 0; i < functional.length; i++){//功能区
          _this.noviceFunctional.push({
            iconUrl:functional[i].img,
            name:functional[i].name,
            url:functional[i].url
          })
        }
        for(var i = 0; i < hotArea.length; i++){//热门专区
          _this.hotArea.push({
            imgUrl:hotArea[i].img,
            url:hotArea[i].url
          })
        }
        _this.simulation.url = game.url;
        _this.simulation.imgUrl = game.img;
        for(var i = 0; i < essential.length; i++){//进阶必备
          _this.advanced.push({
            imgUrl:essential[i].img,
            url:essential[i].url
          })
        }
      }).catch(function (err) {
          console.log(err)
      })
    },
    components:{
      noviceJump:noviceJump,
      noviceFunctional:noviceFunctional,
      noviceNav:noviceNav
    }
  }
</script>
<style>
  html, body{font-family:Helvetica,"Microsoft YaHei",Arial,sans-serif;background:#ffffff;margin:0}
  .noviceHeadUrl{
    display: inline;
    height:11rem;
  }
  .noviceHeadUrl img{
    width:100%;
    height:100%;
  }
  .noviceFunctional:nth-child(1),.noviceFunctional:nth-child(2),.noviceFunctional:nth-child(3){
    margin-right:2%;
  }
  .noviceTitle{
    margin: 0.7rem 0 0.4rem 0;
  }
  #functional{
    width:90%;
    margin:0 auto;
    margin-top: 0.4rem;
  }
  .mr036:nth-child(2){
    margin-right:0.36rem;
  }
</style>
