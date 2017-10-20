<template>
  <div class="password">
    <navbar>
      <div class="header">
        <a class="back" href="goBack">
          <img src="../../../assets/images/title-back.png">
        </a>
      </div>
      <div slot="body" id="title">
        设置密码
      </div>
      <div slot="footer">
        <span @click="save">保存</span>
      </div>
    </navbar>
    <group>
      <cell :hasArrow="hasArrow">
        <flex class="row">
          <flex-item class="disable">用户名</flex-item>
          <flex-item flex="3" class="disable"><input type="text" v-model="userAutInfo.cLoginname" readOnly></flex-item>
        </flex>
      </cell>
      <cell :hasArrow="hasArrow">
        <flex class="row">
          <flex-item class="">密码</flex-item>
          <flex-item flex="3" class="">
            <input type="password" v-model="newPwd" placeholder="填写密码">
            <img v-show="newPwd" @click="clearNewPwd" src="../images/delete.png">
          </flex-item>
        </flex>
      </cell>
      <cell :hasArrow="hasArrow">
        <flex class="row">
          <flex-item class="">确认密码</flex-item>
          <flex-item flex="3" class="">
            <input type="password" v-model="cfmPwd" placeholder="再次填写确认">
            <img v-show="cfmPwd" @click="clearCfmPwd" src="../images/delete.png">
          </flex-item>
        </flex>
      </cell>
    </group>
  </div>
</template>

<script>
export default {
  props: ['ws', 'userAutInfo', 'userInfo'],
  data () {
    return {
      regWS: 'http://192.168.6.49:8080/pobocertification_WebService/changePwd',
      hasArrow: false,
      newPwd: '',
      cfmPwd: ''
    }
  },
  mounted () {
    document.getElementById('userinfoNavbar').style.display = 'none';
  },
  methods: {
    clearNewPwd () {
      this.newPwd = '';
    },
    clearCfmPwd () {
      this.cfmPwd = '';
    },
    isRightPwd (val) {
      var pwdReg = !!val.match(/^(?!\D+$)(?!\d+$)[a-zA-Z0-9]{6,16}$/);
      return pwdReg;
    },
    changePwd () {
      var _this = this;
      var poboNumber = '123';
      var DeviceJsonInfo = JSON.parse(pbE.SYS().getDeviceJsonInfo());
      var deviceId = DeviceJsonInfo['71'] ? DeviceJsonInfo['71'] : '127.0.0.1';
      var OS = 'iOS';
      if (DeviceJsonInfo['255']) {  //平台
          var platNum = DeviceJsonInfo['255'];
          if (platNum == '2') {
              OS = 'iOS';
          } else if (platNum == '3') {
              OS = 'Android';
          }
      }
      var version = DeviceJsonInfo['73'] ? DeviceJsonInfo['73'] : '1.0.0.0';
      var orgNumber = DeviceJsonInfo['jgid'] ? DeviceJsonInfo['jgid'] : '1000';
      _this.$axios.post(_this.regWS, {
        poboNumber: poboNumber,
        loginName: _this.userAutInfo.cLoginname,
        uid: _this.userAutInfo.cUserid,
        token: _this.userAutInfo.token,
        pwdOld: _this.userInfo.password,
        pwdNew: _this.newPwd,
        deviceId: deviceId,
        OS: OS,
        version: version,
        orgNumber: orgNumber
      }).then(function (axiosData) {
        var data = axiosData.data;
        if (data.loginUser.returnFlag == 0) {
          _this.userInfo.password = _this.newPwd;
          delete(data.loginUser.returnFlag);
          data.loginUser.pwd = _this.newPwd;
          data.loginUser.loginType = '1';
          pbE.SYS().sendMessageToNative('PbKey_H5_Home_Auth_Data', JSON.stringify(data.loginUser));
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    save () {
      var _this = this;
      if (_this.newPwd) {
        if (_this.isRightPwd(_this.newPwd)) {
          if (_this.cfmPwd) {
            if (_this.cfmPwd == _this.newPwd) {
              if (pbE.isPoboApp) {
                // _this.changePwd();
              }
              _this.$router.replace('/userinfo');
            } else {
              alert('两次填写密码不一致');
            }
          } else {
            alert('请填写确认密码');
          }
        } else {
          alert('密码是6-16位字母和数字的组合');
        }
      } else {
        alert('请填写密码');
      }
    }
  }
}
</script>

<style>
.password .navbar .navbar-footer {
  font-size: 14px;
}
.password .group,
.password .cell {
  background-image: -webkit-gradient(linear,left top,left bottom,from(#e4e7f0),color-stop(50%,#e4e7f0),color-stop(0,transparent)),-webkit-gradient(linear,left bottom,left top,from(#e4e7f0),color-stop(50%,#e4e7f0),color-stop(0,transparent));
  background-image: -webkit-linear-gradient(top,#e4e7f0,#e4e7f0 50%,transparent 0),-webkit-linear-gradient(bottom,#e4e7f0,#e4e7f0 50%,transparent 0);
  background-image: -o-linear-gradient(top,#e4e7f0,#e4e7f0 50%,transparent 0),-o-linear-gradient(bottom,#e4e7f0,#e4e7f0 50%,transparent 0);
  background-image: linear-gradient(to bottom,#e4e7f0,#e4e7f0 50%,transparent 0),linear-gradient(to top,#e4e7f0,#e4e7f0 50%,transparent 0);
}
.password .group {
  margin-top: 10px;
}
.password .cell {
  padding-top: 0;
  padding-bottom: 0;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}
.password .flex-item {
  position: relative;
}
.password .flex-item input {
  display: block;
  border: none;
  width: 100%;
  height: 38px;
  font-size: 14px;
}
.password .flex-item input:focus {
  outline: 0;
}
.password .flex-item img {
  position: absolute;
  top: 11px;
  right: 12px;
  height: 16px;
}
.password .flex-item.disable,
.password .flex-item.disable input {
  color: #b6bbc2;
}
</style>
