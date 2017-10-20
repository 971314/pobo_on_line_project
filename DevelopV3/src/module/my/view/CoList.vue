<template>
  <div class="myBack">
    <nav-bar :captionText.sync="tip" :rigthText.sync="navText" @edit="edit" :navIsShow.sync="navIsShow"></nav-bar>
    <div class="collectionlist">
      <loadmore
        :bottomMethod="loadBottom"
        :bottomAllLoaded="bottomAllLoaded"
        @bottomStatusChanged="statusChangeHandle"
        ref="loadmore">
        <collection-list v-for="(item,i) in collection" :isHide.sync="isHide" :title.sync="item.title" :source.sync="item.sourcedetail" :time.sync="item.titme" :newsImg.sync="item.imgUrl" :url.sync="bool ? item.source == '1' ? 'pobo:goback=0&uncheck=1&pageId=904002&url=indNews/index.html#/details/'+item.infoid :'pobo:goback=0&uncheck=1&pageId=900005&url=consult/index.html#/detail?cId='+ item.infoid : 'javascript:;'" :id.sync="item.id" v-model="inputData" :isSelect.sync="isSelect" :key="item.id" @listSelectClick="listSelectClick(i)" ref="select"></collection-list>
      </loadmore>
    </div>
    <footer-bar v-show="footIsShow" @deleteClick="deleteClick" @selectClick="selectClick" :num.sync="selectQuantity"></footer-bar>
  </div>
</template>
<script type="es6">
  import navBar from '../components/collection-nav.vue';
  import footerBar from '../components/collection-footer.vue';
  import collectionList from '../components/collectionList.vue';
  export default {
    data(){
      return {
        tip:'收藏',//nav标题
        navText:'编辑',//nav右边文字
        bool:true,//判断nav编辑状态
        selectQuantity:'',//选择数量
        footIsShow:false,//编辑框是否显示
        navIsShow:false,//返回箭头是否显示
        isHide:true,//选择按钮是否显示
        collection:[],//收藏列表
        inputData:[],//选中数组
        isSelect:false,//全选,
        bottomAllLoaded:false,
        Interface:'http://61.172.197.204:8890/PBUserCollectWS/webservice',
        listId:[],//列表id数组
        currentindex:1,//列表查询页
        loginname:pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName') :'1',//手机号
        sid:pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_Token') : '1',//token
        orgid:pbE.isPoboApp ? JSON.parse(pbE.SYS().getDeviceJsonInfo()).jgid : '2',//机构编码
        uid:pbE.isPoboApp ? pbE.SYS().getAppCertifyInfo('PbKey_H5_Home_Auth_UserId'): '1'//认证urerid

      }
    },
    components:{
      navBar:navBar,
      footerBar:footerBar,
      collectionList:collectionList
    },
    created(){
      this.ajaxList();
    },
    methods:{
      edit(){
        this.bool = !this.bool;
        if(this.bool){
          this.navText = '编辑';
          this.navIsShow = false;
          this.footIsShow = false;
          this.isHide = true;
          this.listId = [];
          this.selectQuantity = '';
          this.$refs.loadmore.$el.style.paddingBottom = '0';
          this.isSelect = false;
          this.listId = [];
        }else{
          this.navText = '取消';
          this.navIsShow = true;
          this.footIsShow = true;
          this.isHide = false;
          this.$refs.loadmore.$el.style.paddingBottom = '4rem';
        }
      },//编辑
      selectClick(){
        this.isSelect = !this.isSelect;
        if(this.isSelect){
          for(var i = 0; i < this.$refs.select.length;i++){
            this.listId.push(this.$refs.select[i].id);
          }
        }else{
          this.listId = [];
        }
        console.log(this.listId);
        this.selectQuantity = '('+this.listId.length+')';
        console.log('全选');
      },//全选
      deleteClick(){
          var _this = this;
        console.log('删除',_this.listId);
        _this.$axios.post(_this.Interface, {//
          "func": '652',
          "uid": _this.uid,
          "loginname": _this.loginname,
          "sid": _this.sid,
          "orgid": _this.orgid,
          "data": [{
            "id": _this.listId
          }]
        }).then(function (data) {
          console.log(data.data,_this.listId);
          var deleteData = data.data.retHead;
          if(deleteData === '0'){
              if(_this.collection.length === _this.listId.length){
                _this.collection = [];
                _this.selectQuantity = '';
                _this.listId = [];
                _this.isSelect = false;
              }else{
                for(var i = 0; i < _this.collection.length; i++){
                  for(var j = 0; j < _this.listId.length;j++){
                    if(_this.collection[i].id === _this.listId[j]){
                        console.log(i,_this.collection);
                      _this.collection.splice(i,1);
                    }
                  }
                }
                _this.selectQuantity = '';
                _this.listId = [];
              }
            console.log(_this.collection,'删除后')
            _this.$alert({
              maskClosable: true,
              btns: [{
                text: '关闭'
              }],
              title: '<h5>提示</h5>',
              message: '删除成功！',
            })
            _this.ajaxList();
          }else{
            _this.$alert({
              maskClosable: true,
              btns: [{
                text: '关闭'
              }],
              title: '<h5>提示</h5>',
              message: '删除失败！',
            })
          }
        }).catch(function (err) {
          console.log(err)
        })
      },//删除
      listSelectClick(index){//选择
            console.log('选择');
          var dom = this.$refs.select[index].$el.firstElementChild;
          if(dom.className === 'container select'){
            dom.setAttribute('class','container');
            var index = this.listId.indexOf(this.$refs.select[index].id);
            this.listId.splice(index,1);
            console.log(this.listId)
          }else if(dom.className === 'container') {
            dom.setAttribute('class', 'container select');
            this.listId.push(this.$refs.select[index].id)
            console.log(this.listId)
          }
          this.selectQuantity = '('+this.listId.length+')';
      },
      loadBottom() {//请求下页
        console.log('111',this.currentindex);
        var _this = this;
               _this.$axios.post(_this.Interface, {//
          "func":'651',//功能码
          "uid":_this.uid,//用户编号
          "loginname":this.loginname,//手机号
          "sid":_this.sid,//token
          "orgid":_this.orgid,//机构编号
          //服务器返回id大于currentid的，needcount条记录。
          "data": [{
            "currentindex": _this.currentindex,
            "pagecount":"20"

          }]
        }).then(function (data) {
          if(data.data.retHead === '0'){
            if(data.data.data[0].list.length > 0){
              _this.$refs.loadmore.$el.firstElementChild.style.marginTop = '0';
              var listData = data.data.data[0].list;
              for(var i = 0; i < listData.length;i++){
                _this.collection.push({
                    url:listData[i].url,
                    title:listData[i].title,
                    titme:listData[i].infotime,
                    sourcedetail:listData[i].sourcedetail,
                    imgUrl:listData[i].thumbid,
                    id:listData[i].id,
                    source:listData[i].source,
                    infoid:listData[i].infoid
                })
              }
              _this.currentindex = _this.currentindex + 1;
              _this.$refs.loadmore.onBottomLoaded();
            }else if(data.data.data[0].list.length === 0){
              _this.bottomAllLoaded = true;
            }
          }else{
            _this.$alert({
              maskClosable: true,
              btns: [{
                text: '关闭'
              }],
              title: '<h5>提示</h5>',
              message: '加载失败，稍后再试！',
            })
          }
        }).catch(function (err) {
          console.log(err)
        });
      },
      statusChangeHandle(status) {
        this.bottomStatus = status;
        console.log('222',status)
      },
      ajaxList(){
          var _this = this;
        _this.$axios.post(_this.Interface, {//
          "func":'651',//功能码
          "uid":_this.uid,//用户编号
          "loginname":_this.loginname,//手机号
          "sid":_this.sid,//token
          "orgid":_this.orgid,//机构编号
          //服务器返回id大于currentid的，needcount条记录。
          "data": [{
            "currentindex": _this.currentindex,
            "pagecount":"20"
          }]
        }).then(function (data) {
          console.log(data.data);
          if(data.data.retHead === '0'){
            var listData = data.data.data[0].list;
              if(listData.length > 0){
                for(var i = 0; i < listData.length;i++){
                  _this.collection.push({
                    url:listData[i].url,
                    title:listData[i].title,
                    titme:listData[i].infotime,
                    sourcedetail:listData[i].sourcedetail,
                    imgUrl:listData[i].thumbid,
                    id:listData[i].id,
                    source:listData[i].source,
                    infoid:listData[i].infoid
                  });
                }
                _this.currentindex = _this.currentindex + 1;
                console.log(_this.currentindex)
              }else if(listData === 0){
                this.$refs.loadmore.$el.style.display = 'none';
              }
          }
        }).catch(function (err) {
          console.log(err)
        })
      }
    }
  }
</script>
<style>
  .collectionlist{
    margin-top:4rem;
    background:#fff;
  }
</style>
