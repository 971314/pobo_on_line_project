<template>

  <toast-btn :addr="areaUrl" class="jump">
    <img :src="areaImg" :style="{ width: areaWidth}"/>
  </toast-btn>
</template>
<script type="es6">
  export default {
      props:['areaUrl','areaImg','areaWidth'],
      methods:{
        Tip(){
          this.$emit('Tip')
        }
      }
  }
</script>
<style>
  .jump{
    display:inline-block;
  }
</style>
