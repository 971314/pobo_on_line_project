<template>
  <div id="back" class="myBack">
    <common-nav><span slot="body">好友邀请</span></common-nav>
    <div class="invitation" style="margin-top: 44px">
      <div class="above">
        <img :src="headImg">
        <span>{{nickname}}</span>
        <span class="share" @click="share()"></span>
      </div>
      <div class="qimages"><img :src="QRCode"/></div>
      <span class="fonter">扫描/长按二维码<br/>下载<span>{{corporate}}</span>期货公司客户端</span>
    </div>
  </div>
</template>
<script type="es6">
  import commonNav from '../../../components/coCommonNav.vue';
  export default{
    data(){
      return {
        headImg:'',
        nickname:'',
        QRCode:'',
        corporate:' ',
        URL:'http://61.172.197.204:8890/PB_apply/WebService'
      }
    },
    created(){
        var _this = this;

      if(pbE.SYS().getPrivateData('H5_Local_User_Info') != ''){
        var memoryData = JSON.parse(pbE.SYS().getPrivateData('H5_Local_User_Info'));
        console.log(memoryData);
        _this.headImg = memoryData.cIcon ? memoryData.cIcon : './images/defaultAvatar.png';
        _this.nickname = memoryData.cPetname ? memoryData.cPetname : pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName');
      }else{
        _this.$alert({
            maskClosable: true,
            title: '<h5>提示</h5>',
            message: '基本信息为空',
        })
      }

      _this.$axios.post(_this.URL, {//
        "func": 620,
        "cOrgid": JSON.parse(pbE.SYS().getDeviceJsonInfo()).jgid,
        "cUserid": pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId'),
        "token": pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token'),
        "data":
          {
            "cLocalid": JSON.parse(pbE.SYS().getPrivateData('H5_Local_User_Info')).cId,
          }
      }).then(function (data) {
        console.log(data.data);
        _this.QRCode = data.data.data.image;
        _this.corporate = data.data.data.companyName;
      }).catch(function (err) {
        console.log(err)
      })
    },
    components:{
      commonNav:commonNav
    },
    methods:{
      share(){
          console.log('111');
          location.href = 'pobo:pageId=800012&type=1';
      }
    }
  }
</script>
<style>
  .myBack{
    background:#ffffff;
    height:100%;
  }

  .invitation{
    width:70%;
    margin:0 auto;
    padding-top:5rem;
  }
  .above img,.above span{
    display: inline-block;
  }
  .above img{
    width:27%;
    /*height:4rem;*/
    vertical-align: middle
  }
  .above span{
    padding-left:1rem;
    font-size: 23px;
  }
  .qimages img{
    margin-top:2.5rem;
    margin-bottom: 3rem;
    width:100%;
  }
  .fonter{
    font-size: 12px;
    color:#808086;
    text-align: center;
    display: block;
  }
  .above .share{
    padding:1rem;
    background:url("../images/fengXiangButton.png") no-repeat;
    background-size: 100%;
    margin-top: 1rem;
    float:right;
  }
</style>
