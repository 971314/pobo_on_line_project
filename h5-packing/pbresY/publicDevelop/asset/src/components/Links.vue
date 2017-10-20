<template>
  <div class="links">
    <div class="list-group">
      <router-link v-if="showQuery" class="list-group-item" to="/query">
        <img class="left" src="../images/order.png" alt="" />
        <span>{{ titleMyorder }}</span>
        <img class="right" src="../images/arrow-right.png" alt="" />
      </router-link>
      <router-link v-if="showCustom" class="list-group-item" to="/custom">
        <img class="left" src="../images/custom.png" alt="" />
        <span>{{ titleCustom }}</span>
        <img class="right" src="../images/arrow-right.png" alt="" />
      </router-link>
      <router-link v-if="showAdviser" class="list-group-item" to="/adviser">
        <img class="left" src="../images/adviser.png" alt="" />
        <span>{{ titleAdviser }}</span>
        <img class="right" src="../images/arrow-right.png" alt="" />
      </router-link>
    </div>
  </div>
</template>

<script>
module.exports = {
  data () {
    return {
      showQuery: window.config.service.query.show,
      showCustom: window.config.service.custom.show,
      showAdviser: window.config.service.adviser.show,
      titleMyorder: window.config.title.myorder,
      titleCustom: window.config.title.custom,
      titleAdviser: window.config.title.adviser
    }
  },
  mounted () {
    this.$store.commit('changeGoBack', 'goBack');
    this.$store.commit('changeTitle', window.config.title.links);
  }
}
</script>
