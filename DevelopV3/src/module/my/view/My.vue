<template>
  <div>
    <common-nav :goback="false" style="background-color:hsla(0,0%,60%,0);top:20px;"></common-nav>
    <my-header :myBackImg.sync="userInfo.userBack" :headImg.sync="userInfo.userAvatar" :userName.sync="userInfo.userNickname" :coinBuilt.sync="userInfo.userCoin" :collection.sync="userInfo.collection" :collectionUrl.sync="userInfo.collectionUrl" @mysign="mysign"></my-header>
    <div class="myFunctional">
      <span v-for="item in functional">
        <my-functional :functionalUrl.sync="item.url" :icon.sync="item.icon" :name.sync="item.name" :key="item.id" ></my-functional>
      </span>
    </div>
    <div class="groupp">
      <my-group v-for="i in group" :linkUrl.sync="i.url" :groupImg.sync="i.icon" :name.sync="i.name" :key="i.id" v-if="i.name" :interval.sync="i.interval"></my-group>
      <div  class="jianGe" v-else></div>
    </div>
  </div>
</template>
<script>
  import myHeader from '../components/myHeader.vue';
  import myFunctional from '../components/myFunctional.vue';
  import myGroup from '../components/myGroup.vue';
  export default {
    data(){
      return {
        userInfo:{
          userBack:'./images/beiJing.png',//背景图
          collectionUrl:'pobo:uncheck=1&goback=1&pageId=900005&url=my/index.html?#/list',//收藏链接
          userAvatar:'',//头像
          userNickname:'',//昵称
          userCoin:'',//建投币
          collection:''//收藏
        },
        functional:[],
        group:[],
        myInterface:'http://61.172.197.204:8890/PB_apply/WebService',
        cOrgid:pbE.isPoboApp ? JSON.parse(pbE.SYS().getDeviceJsonInfo()).jgid : '1046',//机构id
        cUserid:pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId') : '1',//认证userId
        token:pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token') : "jkx+DdagVzYX9Gpj/aLN8cqGkhUW6GU8luLIjfpmFTUBF2JfsJhH0qxAJKHt48+SZmsAxDc7WufopQSOp8WUSGZrAMQ3O1rn6KUEjqfFlEjn/51UxU3GUGo42wi1eesN",//认证token
        cLocalid:''//localid
      }
    },
    mounted(){
      var _this = this;
      if(pbE.isPoboApp){
       this.readConfig(pbE.SYS().readConfig('conf/cfMy.json'))
      }else{
_this.$axios.get('../conf/cfMy.json').then(function(data){
         console.log(data.data);
         var functional = data.data.my.functional,//功能区
             group = data.data.my.group;//详细
         for(var i = 0; i < functional.length;i++){
           _this.functional.push({
             url:functional[i].url,
             icon:functional[i].icon,
             name:functional[i].name
           })
         }
           for(var i = 0; i < group.length;i++){
             if(group[i].interval){
               _this.group.push({
                 url:group[i].url,
                 icon:group[i].icon,
                 name:group[i].name,
                interval:group[i].interval
               })
             }else{
               _this.group.push({
                 url:group[i].url,
                 icon:group[i].icon,
                 name:group[i].name
               })
             }
         }
       }).catch(function(err){
         console.log('服务器异常',err)
       })
      }
      if(pbE.isPoboApp){
        if(this.token){
              if(pbE.SYS().getPrivateData('H5_Local_User_Info') != ''){
                  var memoryData = JSON.parse(pbE.SYS().getPrivateData('H5_Local_User_Info'));
                  this.cLocalid = memoryData.cId;
                  this.userInfo.userAvatar = memoryData.cIcon ? memoryData.cIcon : './images/defaultAvatar.png';
                  this.userInfo.userNickname = memoryData.cPetname ? memoryData.cPetname : pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName');
                  this.information();
              }else{
                  this.landing();
              }
            }else{
              window.location.href = '../reg/view/reg-log.html';
            }
      }else{
        this.landing();
      }
    },
    components:{
      myHeader:myHeader,
      myFunctional:myFunctional,
      myGroup:myGroup
    },
    methods:{
      mysign(){
          var _this = this;
        console.log('签到');
        _this.$axios.post(_this.myInterface, {
          "func": 615,
          "cOrgid": _this.cOrgid,
          "cUserid": _this.cUserid,
          "token": _this.token,
          "data":
            {
              "cLocalid": _this.cLocalid,
              "cType": "1"
            }
        }).then(function (data) {
          console.log(data.data);
          var Sign = data.data.retHead;
          if(Sign == 1){
            _this.$toast({
              message: '签到成功，建投币+1',
              position: 'center',
            });
             if(_this.userInfo.userCoin){
              _this.userInfo.userCoin = Number(_this.userCoin) + 1;
            }else{
              _this.userInfo.userCoin = 1;
            }
          }else if(Sign == -40){
              console.log('1')
            _this.$toast({
              message: '今日已签到',
              position: 'center',
            });
          }
        }).catch(function (err) {
          _this.$alert({
            maskClosable: true,
            btns: [{
              text: '关闭'
            }],
            title: '<h5>提示</h5>',
            message: '服务器异常！',
          })
        })
      },
      information(){
          var _this = this;
        _this.$axios.post(_this.myInterface, {
          "func": 614,
          "cOrgid": _this.cOrgid,
          "cUserid": _this.cUserid,
          "token": _this.token,
          "data":
            {
              "cLocalid": _this.cLocalid
            }
        }).then(function (data) {
          console.log(data.data);
          _this.userInfo.userCoin = data.data.data.cScore ? data.data.data.cScore : 0;
          _this.userInfo.collection = data.data.data.cFavorites ? data.data.data.cFavorites : 0;
          console.log(_this.userInfo.userCoin,typeof _this.userInfo.userCoin)
        }).catch(function (err) {
          console.log(err)
        })
      },
      landing(){
        var _this = this;
         _this.$axios.post(_this.myInterface, {
          "func": 611,
          "cOrgid": _this.cOrgid,
          "cUserid": _this.cUserid,
          "token": _this.token,
          "data":
            {
              "cLoginname": pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName') : '13434253455'
            }
        }).then(function (data) {
          console.log(data.data);
          if(data.data.retHead === 1){
            //存储内存数据
            pbE.isPoboApp ? pbE.SYS().storePrivateData('H5_Local_User_Info',JSON.stringify(data.data.data)) : data.data.data;
            var memoryData = pbE.isPoboApp ? JSON.parse(pbE.SYS().getPrivateData('H5_Local_User_Info')) : data.data.data;
            _this.userInfo.userAvatar = memoryData.cIcon ? memoryData.cIcon : './images/defaultAvatar.png';
            _this.userInfo.userNickname = memoryData.cPetname ? memoryData.cPetname : pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName');
            _this.cLocalid = memoryData.cId;
            _this.information();
          }else{
              this.$alert({
                maskClosable: true,
                title: '<h5>提示</h5>',
                message: data.data.retHead
            })
          }

        }).catch(function (err) {
          console.log(err)
        });
      },
      Tip(){
        this.$alert({
            maskClosable: true,
            title: '<h5>提示</h5>',
            message: '功能开发中！',
          })
      },
      readConfig(conf){
         var _this = this,
             functional = JSON.parse(conf).my.functional,//功能区
             group = JSON.parse(conf).my.group;//详细
         for(var i = 0; i < functional.length;i++){
           _this.functional.push({
             url:functional[i].url,
             icon:functional[i].icon,
             name:functional[i].name
           })
         }
           for(var i = 0; i < group.length;i++){
             if(group[i].interval){
               _this.group.push({
                 url:group[i].url,
                 icon:group[i].icon,
                 name:group[i].name,
                interval:group[i].interval
               })
             }else{
               _this.group.push({
                 url:group[i].url,
                 icon:group[i].icon,
                 name:group[i].name
               })
             }
         }
      }
    }
  }
</script>
<style>
/*body{
  overflow-x: hidden;
}*/
  a{
    text-decoration:none;
  }
  .myFunctional{
    margin-bottom: 7.5px;
    border-bottom: 1px solid #e4e7f0;
  }
  .groupp{
    border-top: 1px solid #e4e7f0;
    border-bottom:  1px solid #e4e7f0;
  }
  .jianGe{
     height:9.5px;
     width:100%;
    border-top:1px solid #e4e7f0;
    border-bottom:1px solid #e4e7f0;
  }
  a:link {color:#000}

</style>
