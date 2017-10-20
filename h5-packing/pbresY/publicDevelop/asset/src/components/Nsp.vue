<template>
  <div class="nsp">
    <div class="content" v-html="content"></div>
    <router-link class="btn btn-blue btn-asset-block" to="/qii">同意网络服务协议</router-link>
  </div>
</template>

<script>
module.exports = {
  data () {
    return {
      content: window.config.NSPContent
    }
  },
  mounted () {
    this.$store.commit('changeTitle', window.config.title.nsp);
    $('body').addClass('bgc-white');
  }
}
</script>
