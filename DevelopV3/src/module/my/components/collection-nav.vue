<template>
  <nav>
    <a href="goBack" :class="{placeholder:navIsShow}" >
      <img src="../../../assets/images/title-back.png"/>
    </a>
    <span class="tipp">{{captionText}}</span>
    <span @click="edit" class="right">{{rigthText}}</span>
  </nav>
</template>
<script type="es6">
  export default {
      props:['captionText','rigthText','navIsShow'],
    methods:{
      edit(){
          this.$emit('edit')
      }
    }
  }
</script>
<style>
  nav{
    position:fixed;
    top:0;
    background:#eb1212;
    width:100%;
    height:4rem;
    line-height:4rem;
    color:#ffffff;
    z-index:999;
  }
  .tipp,.right{
    display: inline-block;
  }
  .tipp{
    font-size: 20px;
    width: 70%;
    text-align: center;
  }
  .right{
    font-size: 18px;
  }
  nav a {
    display:inline-block;
    padding-left: 1rem;
    width: 11%;
    vertical-align: top;
  }
  nav a img{
    width: 17px;
  }
  .placeholder{
    visibility:hidden;
  }
</style>
