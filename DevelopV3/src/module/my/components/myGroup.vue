<template>
  <div class="groupDiv">
    <a :href="linkUrl" target="_blank" v-model="name" class="groupC" :style="interval ? 'border-bottom:0px' : ''">
      <img :src="groupImg" class="iconimg"/>
      {{name}}
    <img :src="youJianTou" class="groupimg"/>
    </a>
  </div>
</template>
<script type="es6">
  import youJianTou from '../images/yuoJianTou.png';
  export default {
      data(){
          return {
            youJianTou:youJianTou
          }
      },
    props:['linkUrl','groupImg','name','interval']
  }
</script>
<style>
  .groupDiv{
    background:#ffffff;
  }
  .groupC{
     display:inline-block;
     border-bottom: 1px solid #e4e7f0;
     font-size: 16px;
     height:43px;
     line-height:43px;
     width:96%;
     color:black;
     margin-left: 12.5px;
   }
  .groupC .groupimg{
    float: right;
    width: 0.7rem;
    margin-right: 1rem;
    margin-top: 1.2rem
  }
  .iconimg{
    width:1.5rem;
    /*height:1rem;*/
    margin:0 15px 0 0 ;
  }
</style>
