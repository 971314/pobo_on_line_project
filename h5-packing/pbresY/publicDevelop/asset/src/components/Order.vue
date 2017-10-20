<template>
  <form role="form" class="form-horizontal order">
    <div class="form-group">
      <label class="col-xs-3 control-label">姓名</label>
      <div class="col-xs-9">
        <input class="form-control" type="text" v-model.trim="name" readonly placeholder="请输入姓名">
      </div>
    </div>
    <div class="form-group">
      <label class="col-xs-4 control-label">身份证号</label>
      <div class="col-xs-8">
        <input class="form-control uppercase" type="text" v-model.trim="id" readonly maxlength="18" placeholder="请输入身份证号码">
      </div>
    </div>
    <div class="form-group select">
      <label class="col-xs-5 control-label">预计预约额度</label>
      <div class="col-xs-7 modify" @click="selectLine">
          <span>{{lineText}}</span>
          <img src="../images/arrow-down.png" alt="" />
      </div>
      <div class="my-modal" :class="{ hide: !select }">
        <div class="my-modal-backdrop"></div>
        <div class="my-modal-dialog">
          <ul class="list-group center">
            <li class="list-group-item" @click="setLine('1', $event)">0-100万</li>
            <li class="list-group-item" @click="setLine('2', $event)">100-300万</li>
            <li class="list-group-item" @click="setLine('3', $event)">300万-500万</li>
            <li class="list-group-item" @click="setLine('4', $event)">500万以上</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="form-group phone">
      <label class="col-xs-5 control-label">手机号码</label>
      <div class="col-xs-7 modify">
        <router-link to="/phone">
          <span>{{ phoneNum }}</span>
          <img src="../images/arrow-right.png" alt="" />
        </router-link>
      </div>
    </div>
    <alert :msg="errMsg" @confirm="confirm"></alert>
    <input class="btn btn-blue btn-asset-block" :disabled="disabled" type="button" @click.prevent="submit" value="提交预约">
  </form>
</template>

<script>
var Alert = require('./Alert.vue');
module.exports = {
  name: 'order',
  data () {
    return {
      name: this.$store.state.name,
      id: this.$store.state.id,
      phoneNum: this.$store.state.orderPhoneNum || this.$store.state.LoginName,
      lineText: '0-100万',
      lineValue: '1',
      select: false,
      errMsg: ''
    }
  },
  components: {
    alert: Alert
  },
  computed: {
    disabled () {
      return !(this.name && this.id.length == window.config.IDNoLength && this.lineText);
    }
  },
  mounted () {
    this.$store.commit('changeTitle', window.config.title.order);
  },
  methods: {
    confirm () {
      $('body').removeClass('modal-open');
      this.errMsg = '';
    },
    selectLine () {
      this.select = true;
    },
    setLine (flag, event) {
      this.select = false;
      this.lineText = event.target.innerText;
      this.lineValue = flag;
    },
    submit () {
      if (util.isIDNo(this.id)) {
        var data = {
          uid: this.$store.state.UserId,
          sid: this.$store.state.Token,
          loginname: this.$store.state.LoginName,
          orgid: this.$store.state.jgid,
          data: [
            {
              productid: this.$store.state.detlProd.productid + '',
              phone: this.phoneNum,
              amount: this.lineValue
            }
          ]
        };
        $.ajax({
          method: 'POST',
          url: window.config.serverAdd + window.config.bookSbmtWS,
          data: JSON.stringify(data),
          dataType: 'json',
          contentType: 'application/json',
          xhrFields: {withCredentials: true},
          crossDomain: true,
          success: function (data) {
            if (data.retHead == 1) {
              alert('预约成功');
              this.$router.push('/private');
            } else {
              alert('预约失败，请稍后重试');
            }
          }.bind(this),
          error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus);
          }
        });
      } else {
        this.errMsg = '请输入正确的身份证号码';
        $('body').addClass('modal-open');
      }
    },
  }
}
</script>
