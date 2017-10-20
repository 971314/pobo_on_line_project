<template>
  <div class="user-info">
    <navbar id="userinfoNavbar">
      <div class="header">
        <a class="back" href="goBack">
          <img src="../../../assets/images/title-back.png">
        </a><a class="search" href="pobo:uncheck=1&pageId=800013">
          <img src="../../../assets/images/title-search.png">
        </a>
      </div>
      <div slot="body" id="title">
        资料管理
      </div>
      <div slot="footer">
        <message-icon></message-icon>
        <a class="service" href="javascript:void(0)">
          <img src="../../../assets/images/service.png">
        </a>
      </div>
    </navbar>
    <div>
      <router-view :ws="ws" :userAutInfo="userAutInfo" :userInfo="userInfo"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ws: 'http://61.172.197.204:8890/PB_apply/WebService',
      userAutInfo: {
        cOrgid: '',
        cUserid: '',
        token: '',
        cLoginname: ''
      },
      userInfo: {
        id: '',
        avatar: '',
        nickname: '',
        sexFlag: '',
        birthday: '',
        jobFlag: '',
        job: '',
        mail: ''
      }
    }
  },
  created () {
    if (pbE.isPoboApp) {
      var _this = this;
      var DeviceJsonInfo = JSON.parse(pbE.SYS().getDeviceJsonInfo());
      _this.userAutInfo.cOrgid = DeviceJsonInfo.jgid;
      _this.userAutInfo.cUserid = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId');
      _this.userAutInfo.token = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token');
      _this.userAutInfo.cLoginname = pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName');
      var localUserInfo = JSON.parse(pbE.SYS().getPrivateData('H5_Local_User_Info'));
      _this.userInfo.id = localUserInfo.cId;
      _this.userInfo.avatar = localUserInfo.cIcon;
      _this.userInfo.nickname = localUserInfo.cPetname;
      _this.userInfo.sexFlag = localUserInfo.cSex;
      _this.userInfo.birthday = localUserInfo.cBirthday;
      _this.userInfo.jobFlag = localUserInfo.cProfession;
      _this.userInfo.job = localUserInfo.cProname;
      _this.userInfo.mail = localUserInfo.cMail;
    }
  }
}
</script>

<style>
body {
  background-color: #f7f7fa;
}
.user-info {
  padding-top: 44px;
}
.user-info .navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  font-size: 17px;
  color: #fff;
  background-color: #eb1212;
  z-index: 1030;
}
.user-info .navbar-header, .user-info .navbar-footer {
  -webkit-box-flex: .4;
  -ms-flex: .4;
  flex: .4;
}
.user-info .navbar-header {
  padding-right: 0;
}
.user-info .navbar-header a {
  display: block;
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 23px;
  line-height: 21px;
}
.user-info .navbar-header .back {
  margin-right: 15px;
}
.user-info .navbar-header .back img {
  height: 18px;
}
.user-info .navbar-header .search img {
  height: 17px;
}
.user-info .navbar-body {
  position: relative;
  padding: 0;
  -webkit-box-flex: 1.2;
  -ms-flex: 1.2;
  flex: 1.2;
  line-height: 42px;
}
.user-info .navbar-footer {
  padding-left: 0;
}
.user-info .navbar-footer a {
  display: block;
  float: right;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 23px;
  line-height: 21px;
}
.user-info .navbar-footer .service {
  margin-right: 15px;
}
.user-info .navbar-footer .service img {
  height: 18px;
}
.user-info .navbar-footer .message img {
  height: 14px;
}
</style>
