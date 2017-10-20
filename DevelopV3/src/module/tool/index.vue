<template>
<div class="tool">
  <common-nav :goback="false" >
    <div slot="body">
      <span>工具</span>
    </div>
  </common-nav>
  <div class="toolO" style="padding-top: 44px">
    <div class="toolH">查询</div>
    <div class="toolB">
  <toast-btn  v-for="item in query" :addr="item.url">
    <img :src="item.img"/>
        <span>{{item.name}}</span>
  </toast-btn>
    </div>
  </div>
  <div class="toolO">
    <div class="toolH">计算</div>
    <div class="toolB">
      <toast-btn  v-for="item in calculation" :addr="item.url">
    <img :src="item.img"/>
        <span>{{item.name}}</span>
  </toast-btn>
    </div>
  </div>
  <div class="toolO">
    <div class="toolH">分析</div>
    <div class="toolB">
      <toast-btn  v-for="item in analysis" :addr="item.url">
    <img :src="item.img"/>
        <span>{{item.name}}</span>
  </toast-btn>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return {
      query:[],
      calculation:[],
      analysis:[]
    }
  },
  mounted(){
    var _this = this;
    if(pbE.isPoboApp){
      _this.readConfig(pbE.SYS().readConfig('conf/cfTool.json'));
    }else{
      _this.$axios.get('../conf/cfTool.json').then(function(conf){
        console.log(conf.data);
        var query = conf.data.query,
            calculation = conf.data.calculation,
            analysis = conf.data.analysis;
            for(var i = 0; i < query.length;i++){
              _this.query.push({
                url:query[i].url,
                img:query[i].img,
                name:query[i].name
              })
            }

            for(var i = 0; i < calculation.length;i++){
              _this.calculation.push({
                url:query[i].url,
                img:query[i].img,
                name:query[i].name
              })
            }

            for(var i = 0; i < analysis.length;i++){
              _this.analysis.push({
                url:query[i].url,
                img:query[i].img,
                name:query[i].name
              })
            }
      }).catch(function(err){
        console.log('服务器异常',err)
      })
    }
  },
  methods:{
    readConfig(conf){
      var _this = this,
          query = JSON.parse(conf).query,
          calculation = JSON.parse(conf).calculation,
          analysis = JSON.parse(conf).analysis;
            for(var i = 0; i < query.length;i++){
              _this.query.push({
                url:query[i].url,
                img:query[i].img,
                name:query[i].name
              })
            }

            for(var i = 0; i < calculation.length;i++){
              _this.calculation.push({
                url:calculation[i].url,
                img:calculation[i].img,
                name:calculation[i].name
              })
            }

            for(var i = 0; i < analysis.length;i++){
              _this.analysis.push({
                url:analysis[i].url,
                img:analysis[i].img,
                name:analysis[i].name
              })
            }
    }
  }
}
</script>
<style>
.tool{
}
.tool .toolO{
  background:#fff;
  border-bottom:1px solid #e4e7f0;
  margin-bottom:7.5px;
}
.tool .toolO .toolH {
  height:35px;
  line-height:35px;
  padding-left:12.5px;
  font-size: 14px;
  border-bottom:1px solid #e4e7f0;
}
.toolB a{
  display:inline-block;
  width:32.56%;
  height:76px;
  padding: 11px 0 13px 0;
  color:#1a1a1a;
}
.toolB a img{
  width:25px;
  margin:0 auto;
  display:block;
  margin-bottom: 10px;
}
.toolB a span{
  text-align: center;
  display:block;
  font-size:13px;
}
.toolO:nth-child(4){
  margin:0;
}
</style>