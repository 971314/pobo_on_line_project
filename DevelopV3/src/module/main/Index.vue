<template>
  <div class="index">
    <with-status-bar>
      <navbar id="indexNav" theme="transparent">
        <city />
        <div slot="body">
          <img class="search" src="./images/search.png">
          <img class="search-box" src="./images/search-box.png">
          <img class="speak" src="./images/speak.png">
        </div>
        <div slot="footer">
          <message-icon></message-icon>
          <a class="service" href="#">
            <img src="../../assets/images/service.png">
          </a>
        </div>
      </navbar>
    </with-status-bar>
    <div>
      <swipe :interval="advDelay" :dots="advList.length > 1 ? true : false">
        <swipe-item v-for="adv in advList">
          <a href="#"><img src="./images/hm_bg01.png"></a>
        </swipe-item>
        <swipe-item v-if="advList.length == 0">
          <a href="#"><img src="./images/hm_bg01.png"></a>
        </swipe-item>
      </swipe>
      <div class="notice clearfix">
        <div>
          <img src="./images/notice.png">
        </div>
        <vertical-swipe />
        <div>
          <img src="../../assets/images/arrow-right.png">
        </div>
      </div>
      <div class="main-func">
        <flex class="first-row">
          <flex-item>
            <a href="#">
              <img src="./images/main-func-first-1.png">
            </a>
          </flex-item>
          <flex-item>
            <a href="#">
              <img src="./images/main-func-first-2.png">
            </a>
          </flex-item>
        </flex>
        <flex class="second-row">
          <flex-item>
            <a href="#">
              <img src="./images/main-func-second-1.png">
            </a>
          </flex-item>
          <flex-item>
            <a href="#">
              <img src="./images/main-func-second-2.png">
            </a>
          </flex-item>
          <flex-item>
            <a href="#">
              <img src="./images/main-func-second-3.png">
            </a>
          </flex-item>
        </flex>
      </div>
      <div class="common-func">
        <flex>
          <flex-item>
            <a href="#">
              <img src="./images/common-func-1.png">
              <p>开户</p>
            </a>
          </flex-item>
          <flex-item>
            <a href="#">
              <img src="./images/common-func-2.png">
              <p>业务办理</p>
            </a>
          </flex-item>
          <flex-item>
            <a href="#">
              <img src="./images/common-func-3.png">
              <p>场外报价</p>
            </a>
          </flex-item>
          <flex-item>
            <a href="#">
              <img src="./images/common-func-4.png">
              <p>交易日记</p>
            </a>
          </flex-item>
          <flex-item>
            <a href="#">
              <img src="./images/common-func-5.png">
              <p>热点话题</p>
            </a>
          </flex-item>
        </flex>
      </div>
      <div class="news">
        <news-list :newsPar="newsPar" :tabs="newsTabs" :tags="tags"></news-list>
      </div>
    </div>
  </div>
</template>

<script>
import NewsList from '../../components/coNewsList.vue';
export default {
  data () {
    return {
      localUserInfoWS: 'http://61.172.197.204:8890/PB_apply/WebService',
      YYWS: 'http://static.yunyesoft.com/consult/newsBase/api',
      advList: [],
      advDelay: 3000,
      newsPar: [],
      newsTabs: [{
                  name: '财经新闻',
                  par: 'PBCJXW'
              }, {
                  name: '热点解读',
                  par: 'PBSYRDJD'
              }, {
                  name: '市场公告',
                  par: 'PBSCGG'
              }],
      tags: false
    }
  },
  components: {
    NewsList
  },
  created () {
    var _this = this;
    _this.getLocalUserInfo();
    // _this.$axios.post(_this.YYWS, {
    //   func: '7001',
    //   data:[{
    //     pageNo: 1,
    //     pageSize: 5,
    //     tags: null,
    //     part: 'PBSYGG'
    //   }]
    // }).then(function (axiosData) {
    //   var data = axiosData.data;
    //   console.dir(data);
    // }).catch(function (error) {
    //   console.error(error);
    // });
    // _this.$axios.post(_this.YYWS, {
    //   func: '7001',
    //   data:[{
    //     pageNo: 1,
    //     pageSize: 5,
    //     tags: null,
    //     part: 'PBQHGSGG'
    //   }]
    // }).then(function (axiosData) {
    //   var data = axiosData.data;
    //   console.dir(data);
    // }).catch(function (error) {
    //   console.error(error);
    // });
  },
  mounted () {
  },
  methods: {
    getLocalUserInfo () {
      if (pbE.isPoboApp && pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token')) {
        var _this = this;
        var DeviceJsonInfo = JSON.parse(pbE.SYS().getDeviceJsonInfo());
        _this.$axios.post(_this.localUserInfoWS, {
          func: 611,
          cOrgid: DeviceJsonInfo.jgid,
          cUserid: pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId'),
          token: pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token'),
          data: {
            cLoginname: pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName')
          }
        }).then(function (axiosData) {
          var localUserInfo = axiosData.data.data;
          console.dir(localUserInfo);
          pbE.SYS().storePrivateData('H5_Local_User_Info', JSON.stringify(localUserInfo));
        }).catch(function (error) {
          console.error(error);
        });
      }
    }
  }
}
</script>

<style>
body {
  background-color: #f7f7fa;
}
.index .navbar {
  color: #fff;
}
.index .navbar-header, .index .navbar-footer {
  -webkit-box-flex: .4;
  -ms-flex: .4;
  flex: .4;
}
.index .navbar-header {
  padding-right: 0;
}
.index .navbar-body {
  position: relative;
  padding: 0;
  -webkit-box-flex: 1.2;
  -ms-flex: 1.2;
  flex: 1.2;
}
.index .navbar-body div {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 23px;
  line-height: 21px;
}
.index .navbar-body .search {
  margin-left: 10px;
  margin-right: -25px;
  height: 13px;
}
.index .navbar-body .search-box {
  height: 23px;
}
.index .navbar-body .speak {
  margin-left: -21px;
  margin-right: 10px;
  height: 13px;
}
.index .navbar-footer {
  padding-left: 0;
}
.index .navbar-footer a {
  display: block;
  float: right;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 23px;
  line-height: 21px;
}
.index .navbar-footer .service {
  margin-right: 15px;
}
.index .navbar-footer .service img {
  height: 18px;
}
.index .navbar-footer .message img {
  height: 14px;
}
.index .swipe {
  height: 179px;
}
.index .swipe img {
  width: 100%;
  height: 100%;
}
.index .notice {
  border-top: 1px solid #e4e7f0;
  border-bottom: 1px solid #e4e7f0;
  padding-right: 10px;
  height: 37px;
  line-height: 35px;
  background-color: #fff;
  overflow: hidden;
}
.index .notice > * {
  float: left;
}
.index .notice div:first-child {
  margin: 9px 0;
  border-right: 1px solid #e4e7f0;
  padding: 0 10px;
  width: 85px;
  height: 17px;
  line-height: 15px;
  text-align: center;
}
.index .notice div:first-child img {
  height: 11px;
}
.index .notice div:last-child {
  float: right;
}
.index .notice div:last-child img {
  height: 13px;
}
.index .main-func {
  margin-top: 7.5px;
  border-top: 1px solid #e4e7f0;
  border-bottom: 1px solid #e4e7f0;
  padding: 10px;
  background-color: #fff;
  text-align: center;
}
.index .main-func .first-row {
  margin-bottom: 5px;
}
.index .main-func .first-row .flex-item:first-child {
  padding-right: 3px;
}
.index .main-func .first-row .flex-item:last-child {
  padding-left: 3px;
}
.index .main-func .second-row .flex-item:first-child {
  padding-right: 4px;
}
.index .main-func .second-row .flex-item:nth-child(2) {
  padding-left: 2px;
  padding-right: 2px;
}
.index .main-func .second-row .flex-item:last-child {
  padding-left: 4px;
}
.index .main-func a {
  display: block;
}
.index .main-func a img {
  width: 100%;
  height: 100%;
}
.index .common-func {
  margin-top: 7.5px;
  border-top: 1px solid #e4e7f0;
  border-bottom: 1px solid #e4e7f0;
  padding: 12px 0;
  height: 65px;
  background-color: #fff;
}
.index .common-func a {
  display: block;
  color: #1a1a1a;
  text-align: center;
}
.index .common-func a:active,
.index .common-func a:focus {
  color: #1a1a1a;
}
.index .common-func a img {
  height: 19px;
}
.index .common-func a p {
  margin-top: 5px;
  margin-bottom: 0;
}
.index .news {
  margin-top: 7.5px;
  border-top: 1px solid #e4e7f0;
}
.index .news .group {
  margin-top: -1px;
}
</style>
