<template>
  <div class="error">
    <img src="../images/err.png" alt="" />
  </div>
</template>

<script>
module.exports = {
  name: 'error',
  mounted () {
    this.$store.commit('changeTitle', '错误');
  },
}
</script>
