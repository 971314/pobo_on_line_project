<template>
  <a :href="functionalUrl" class="noviceFunctional">
    <img :src="functionalIcon"/>
    <span v-model="name">{{name}}</span>
  </a>
</template>
<script type="es6">
  export default {
      props:['functionalUrl','functionalIcon','name']
  }
</script>
<style>
  .noviceFunctional{
    display: inline-block;
    width: 23.5%;
    padding: 17px 6px 12px;
    border: 1px solid #e4e7f0;
    background: #fff;
    font-size: 13px;
    border-radius: 5px;
    color: #1a1a1a;
  }
  .noviceFunctional>img{
    width: 2rem;
    height: 2.5rem;
    display: block;
    padding-bottom: 0.5rem;
    margin: 0 auto;
  }
  .noviceFunctional>span{
    display: inline-block;
    width:100%;
    text-align: center;
  }
</style>
