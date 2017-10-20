<template>
  <div id="main">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
module.exports = {
  created () {
    this.getLoginInfo();
  },
  methods: {
    getLoginInfo () {
      var data = {
        uid: this.$store.state.UserId,
        sid: this.$store.state.Token,
        loginname: this.$store.state.LoginName,
        orgid: this.$store.state.jgid,
        data: []
      };
      $.ajax({
        method: 'POST',
        url: window.config.serverAdd + window.config.loginWS,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {withCredentials: true},
        crossDomain: true,
        async: false,
        timeout: 10 * 1000,
        success: function (data) {
          if (data.retHead == 1 && data.data[0]) {
            if (data.data[0].name && data.data[0].id && data.data[0].risklevel) {
              this.$store.commit('changeName', data.data[0].name);
              this.$store.commit('changeId', data.data[0].id);
              this.$store.commit('changeLevel', data.data[0].risklevel);
              this.$router.push('/private');
            } else {
              this.$router.push('/reg');
            }
          } else if (data.retHead == -103) {
            this.$router.push('/private');
          } else {
            this.$router.push('/');
          }
        }.bind(this),
        error: function (jqXHR, textStatus, errorThrown) {
          if (textStatus == 'timeout') {
            alert('网络超时，请检查网络后重试');
          }
          console.error(textStatus);
          this.$router.push('/');
        }.bind(this)
      });
    }
  }
}
</script>
