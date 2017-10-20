<template>
  <form role="form" class="form-horizontal order">
    <div class="form-group">
      <label class="col-xs-3 control-label">姓名</label>
      <div class="col-xs-9">
        <input class="form-control" type="text" v-model.trim="name" placeholder="请输入姓名">
      </div>
    </div>
    <div class="form-group">
      <label class="col-xs-4 control-label">联系方式</label>
      <div class="col-xs-8">
        <input class="form-control uppercase" type="text" v-model.trim="phone" maxlength="11" placeholder="请输入联系方式">
      </div>
    </div>
    <div class="form-group">
      <label class="col-xs-3 control-label">公司</label>
      <div class="col-xs-9">
        <input class="form-control" type="text" v-model.trim="company" placeholder="请输入公司">
      </div>
    </div>
    <div class="form-group">
      <label class="col-xs-3 control-label">职业</label>
      <div class="col-xs-9">
        <input class="form-control" type="text" v-model.trim="job" placeholder="请输入职业">
      </div>
    </div>
    <div class="form-group select">
      <label class="col-xs-6 control-label">感兴趣产品类型</label>
      <div class="col-xs-6 modify" @click="selectType">
          <span>{{typeText}}</span>
          <img src="../images/arrow-down.png" alt="" />
      </div>
      <div class="my-modal" :class="{ hide: !typeFlag }">
        <div class="my-modal-backdrop"></div>
        <div class="my-modal-dialog">
          <ul class="list-group center">
            <li class="list-group-item" @click="setType('1', $event)">期货管理类</li>
            <li class="list-group-item" @click="setType('2', $event)">股票管理类</li>
            <li class="list-group-item" @click="setType('3', $event)">混合管理类</li>
            <li class="list-group-item" @click="setType('4', $event)">固定收益</li>
            <li class="list-group-item" @click="setType('5', $event)">固定收益增强</li>
            <li class="list-group-item" @click="setType('6', $event)">股权并购类</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="form-group select">
      <label class="col-xs-4 control-label">产品规模</label>
      <div class="col-xs-8 modify" @click="selectSize">
          <span>{{sizeText}}</span>
          <img src="../images/arrow-down.png" alt="" />
      </div>
      <div class="my-modal" :class="{ hide: !sizeFlag }">
        <div class="my-modal-backdrop"></div>
        <div class="my-modal-dialog">
          <ul class="list-group center">
            <li class="list-group-item" @click="setSize('1', $event)">500-2000万</li>
            <li class="list-group-item" @click="setSize('2', $event)">2000万-5000万</li>
            <li class="list-group-item" @click="setSize('3', $event)">5000万以上</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-xs-4 control-label">收益预期</label>
      <div class="col-xs-8">
        <input class="form-control" type="text" v-model.trim="profit" placeholder="请输入收益预期">
      </div>
    </div>
    <div class="form-group select">
      <label class="col-xs-4 control-label">风险偏好</label>
      <div class="col-xs-8 modify" @click="selectRisk">
          <span>{{riskText}}</span>
          <img src="../images/arrow-down.png" alt="" />
      </div>
      <div class="my-modal" :class="{ hide: !riskFlag }">
        <div class="my-modal-backdrop"></div>
        <div class="my-modal-dialog">
          <ul class="list-group center">
            <li class="list-group-item" @click="setRisk('1', $event)">高</li>
            <li class="list-group-item" @click="setRisk('2', $event)">中</li>
            <li class="list-group-item" @click="setRisk('3', $event)">低</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="col-xs-3 control-label">备注</label>
      <div class="col-xs-9">
        <input class="form-control" type="text" v-model.trim="remark" placeholder="请输入备注">
      </div>
    </div>
    <alert :msg="errMsg" @confirm="confirm"></alert>
    <input class="btn btn-blue btn-asset-block mt-50" :disabled="disabled" type="button" @click.prevent="submit" value="提交">
  </form>
</template>

<script>
var Alert = require('./Alert.vue');
module.exports = {
  name: 'order',
  data () {
    return {
      name: '',
      phone: '',
      company: '',
      job: '',
      typeText: '期货管理类',
      typeValue: '1',
      typeFlag: false,
      sizeText: '500-2000万',
      sizeValue: '1',
      sizeFlag: false,
      profit: '',
      riskText: '高',
      riskValue: '1',
      riskFlag: false,
      remark: '',
      errMsg: ''
    }
  },
  components: {
    alert: Alert
  },
  computed: {
    disabled () {
      return !(this.name && this.phone && this.company && this.job && this.typeText && this.sizeText && this.profit && this.riskText);
    }
  },
  mounted () {
    this.$store.commit('changeTitle', window.config.title.custom);
  },
  methods: {
    confirm () {
      $('body').removeClass('modal-open');
      this.errMsg = '';
    },
    selectType () {
      this.typeFlag = true;
    },
    setType (flag, event) {
      this.typeFlag = false;
      this.typeText = event.target.innerText;
      this.typeValue = flag;
    },
    selectSize () {
      this.sizeFlag = true;
    },
    setSize (flag, event) {
      this.sizeFlag = false;
      this.sizeText = event.target.innerText;
      this.sizeValue = flag;
    },
    selectRisk () {
      this.riskFlag = true;
    },
    setRisk (flag, event) {
      this.riskFlag = false;
      this.riskText = event.target.innerText;
      this.riskValue = flag;
    },
    submit () {
      if (util.isPhoneNum(this.phone)) {
        var data = {
          uid: this.$store.state.UserId,
          sid: this.$store.state.Token,
          loginname: this.$store.state.LoginName,
          orgid: this.$store.state.jgid,
          data: [
            {
              name: this.name,
              phone: this.phone,
              company: this.company,
              job: this.job,
              interested: this.typeValue,
              size: this.sizeValue,
              profit: this.profit,
              risk: this.riskValue,
              remark: this.remark,
            }
          ]
        };
        $.ajax({
          method: 'POST',
          url: window.config.serverAdd + window.config.infoProdWS,
          data: JSON.stringify(data),
          dataType: 'json',
          contentType: 'application/json',
          xhrFields: {withCredentials: true},
          crossDomain: true,
          success: function (data) {
            if (data.retHead == 1) {
              alert('提交成功');
              this.$router.push('/private');
            } else {
              alert('提交失败，请稍后重试');
            }
          }.bind(this),
          error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus);
          }
        });
      } else {
        this.errMsg = '请输入正确的联系方式';
        $('body').addClass('modal-open');
      }
    },
  }
}
</script>
