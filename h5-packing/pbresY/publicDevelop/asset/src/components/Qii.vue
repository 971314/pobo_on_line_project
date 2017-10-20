<template>
  <div class="qii">
    <div class="content" v-html="content"></div>
    <router-link class="btn btn-blue btn-asset-block" to="/risk/0">我是合格投资者</router-link>
  </div>
</template>

<script>
module.exports = {
  data () {
    return {
      content: window.config.QIIContent
    }
  },
  mounted () {
    this.$store.commit('changeTitle', window.config.title.qii);
    $('body').addClass('bgc-white');
  }
}
</script>
