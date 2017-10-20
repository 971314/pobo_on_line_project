<template>
  <form role="form" class="form-horizontal order reg">
    <div class="form-group">
      <div class="col-xs-12">
        <input class="form-control" type="text" v-model.trim="name" placeholder="请输入姓名">
      </div>
    </div>
    <div class="form-group">
      <div class="col-xs-12">
        <input class="form-control uppercase" type="text" v-model.trim="id" maxlength="18" placeholder="请输入身份证号码">
      </div>
    </div>
    <alert :msg="errMsg" @confirm="confirm"></alert>
    <input class="btn btn-blue btn-asset-block" :disabled="disabled" type="button" @click.prevent="submit" value="提交">
  </form>
</template>

<script>
var Alert = require('./Alert.vue');
module.exports = {
  data () {
    return {
      name: '',
      id: '',
      errMsg: ''
    }
  },
  components: {
    alert: Alert
  },
  computed: {
    disabled () {
      return !(this.name && this.id.length == window.config.IDNoLength);
    }
  },
  mounted () {
    this.$store.commit('changeTitle', window.config.title.reg);
  },
  methods: {
    confirm () {
      $('body').removeClass('modal-open');
      this.errMsg = '';
    },
    submit () {
      if (util.isIDNo(this.id)) {
        this.$store.commit('changeName', this.name);
        this.$store.commit('changeId', this.id);
        this.$router.push('/nsp');
      } else {
        this.errMsg = '请输入正确的身份证号码';
        $('body').addClass('modal-open');
      }
    },
  }
}
</script>
