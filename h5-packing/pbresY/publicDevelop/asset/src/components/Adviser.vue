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
    <div class="form-group select">
      <label class="col-xs-6 control-label">资产管理规模</label>
      <div class="col-xs-6 modify" @click="selectSize">
          <span>{{sizeText}}</span>
          <img src="../images/arrow-down.png" alt="" />
      </div>
      <div class="my-modal" :class="{ hide: !sizeFlag }">
        <div class="my-modal-backdrop"></div>
        <div class="my-modal-dialog">
          <ul class="list-group center">
            <li class="list-group-item" @click="setSize('1', $event)">0-500万</li>
            <li class="list-group-item" @click="setSize('2', $event)">500万-2000万</li>
            <li class="list-group-item" @click="setSize('3', $event)">2000万以上</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="form-group select">
      <label class="col-xs-4 control-label">拟发时间</label>
      <div class="col-xs-8 modify" @click="selectTime">
          <span>{{timeText}}</span>
          <img src="../images/arrow-down.png" alt="" />
      </div>
      <div class="my-modal" :class="{ hide: !timeFlag }">
        <div class="my-modal-backdrop"></div>
        <div class="my-modal-dialog">
          <ul class="list-group center">
            <li class="list-group-item" @click="setTime('1', $event)">立刻发行</li>
            <li class="list-group-item" @click="setTime('2', $event)">3个月内</li>
            <li class="list-group-item" @click="setTime('3', $event)">3-6个月内</li>
            <li class="list-group-item" @click="setTime('4', $event)">无法确定</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="form-group select">
      <label class="col-xs-8 control-label">是否具备基金从业资格</label>
      <div class="col-xs-4 modify" @click="selectQual">
          <span>{{qualText}}</span>
          <img src="../images/arrow-down.png" alt="" />
      </div>
      <div class="my-modal" :class="{ hide: !qualFlag }">
        <div class="my-modal-backdrop"></div>
        <div class="my-modal-dialog">
          <ul class="list-group center">
            <li class="list-group-item" @click="setQual">是</li>
            <li class="list-group-item" @click="setQual">否</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="form-group select">
      <label class="col-xs-6 control-label">私募运行阶段</label>
      <div class="col-xs-6 modify" @click="selectStage">
          <span>{{stageText}}</span>
          <img src="../images/arrow-down.png" alt="" />
      </div>
      <div class="my-modal" :class="{ hide: !stageFlag }">
        <div class="my-modal-backdrop"></div>
        <div class="my-modal-dialog">
          <ul class="list-group center">
            <li class="list-group-item" @click="setStage('1', $event)">尚未成立公司</li>
            <li class="list-group-item" @click="setStage('2', $event)">初创型私募</li>
            <li class="list-group-item" @click="setStage('3', $event)">成长型私募</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="form-group select">
      <label class="col-xs-8 control-label">是否在基金业协会备案</label>
      <div class="col-xs-4 modify" @click="selectRec">
          <span>{{recText}}</span>
          <img src="../images/arrow-down.png" alt="" />
      </div>
      <div class="my-modal" :class="{ hide: !recFlag }">
        <div class="my-modal-backdrop"></div>
        <div class="my-modal-dialog">
          <ul class="list-group center">
            <li class="list-group-item" @click="setRec">是</li>
            <li class="list-group-item" @click="setRec">否</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="form-group select">
      <label class="col-xs-8 control-label">是否已发行产品</label>
      <div class="col-xs-4 modify" @click="selectIssue">
          <span>{{issueText}}</span>
          <img src="../images/arrow-down.png" alt="" />
      </div>
      <div class="my-modal" :class="{ hide: !issueFlag }">
        <div class="my-modal-backdrop"></div>
        <div class="my-modal-dialog">
          <ul class="list-group center">
            <li class="list-group-item" @click="setIssue">是</li>
            <li class="list-group-item" @click="setIssue">否</li>
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
    <input class="btn btn-blue btn-asset-block mt-30" :disabled="disabled" type="button" @click.prevent="submit" value="提交">
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
      sizeText: '0-500万',
      sizeValue: '1',
      sizeFlag: false,
      timeText: '立刻发行',
      timeValue: '1',
      timeFlag: false,
      qualText: '是',
      qualFlag: false,
      stageText: '尚未成立公司',
      stageValue: '1',
      stageFlag: false,
      recText: '是',
      recFlag: false,
      issueText: '是',
      issueFlag: false,
      remark: '',
      errMsg: ''
    }
  },
  components: {
    alert: Alert
  },
  computed: {
    disabled () {
      return !(this.name && this.phone && this.company && this.sizeText && this.timeText && this.qualText && this.stageText && this.recText && this.issueText);
    }
  },
  mounted () {
    this.$store.commit('changeTitle', window.config.title.adviser);
  },
  methods: {
    confirm () {
      $('body').removeClass('modal-open');
      this.errMsg = '';
    },
    selectTime () {
      this.timeFlag = true;
    },
    setTime (flag, event) {
      this.timeFlag = false;
      this.timeText = event.target.innerText;
      this.timeValue = flag;
    },
    selectSize () {
      this.sizeFlag = true;
    },
    setSize (flag, event) {
      this.sizeFlag = false;
      this.sizeText = event.target.innerText;
      this.sizeValue = flag;
    },
    selectQual () {
      this.qualFlag = true;
    },
    setQual (event) {
      this.qualFlag = false;
      this.qualText = event.target.innerText;
    },
    selectStage () {
      this.stageFlag = true;
    },
    setStage (flag, event) {
      this.stageFlag = false;
      this.stageText = event.target.innerText;
      this.stageValue = flag;
    },
    selectRec () {
      this.recFlag = true;
    },
    setRec (event) {
      this.recFlag = false;
      this.recText = event.target.innerText;
    },
    selectIssue () {
      this.issueFlag = true;
    },
    setIssue (event) {
      this.issueFlag = false;
      this.issueText = event.target.innerText;
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
              size: this.sizeValue,
              issuetime: this.timeValue,
              fundqualification: this.qualText,
              stage: this.stageValue,
              beian: this.recText,
              issueproduct: this.issueText,
              remark: this.remark,
            }
          ]
        };
        $.ajax({
          method: 'POST',
          url: window.config.serverAdd + window.config.infoAdviWS,
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
