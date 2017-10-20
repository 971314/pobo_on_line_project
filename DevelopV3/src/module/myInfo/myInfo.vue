<template>
  <div>
    <my-header :myBackImg.sync="userInfo.userBack"
               :headImg.sync="userInfo.userAvatar"
               :userName.sync="userInfo.userNickname"
               :coinBuilt.sync="userInfo.userCoin"
               :collection.sync="userInfo.collection"
               :collectionUrl.sync="userInfo.collectionUrl"
               @mysign="mysign"></my-header>
    <div class="myFunctional">
      <my-functional v-for="item in functional"
                     :functionalUrl.sync="item.url"
                     :icon.sync="item.icon"
                     :name.sync="item.name"
                     :key="item.id"></my-functional>
    </div>
    <div class="group">
      <my-group v-for="i in group"
                :linkUrl.sync="i.url"
                :groupImg.sync="i.icon"
                :name.sync="i.name"
                :key="i.id"></my-group>
    </div>
  </div>
</template>
<script>
import myHeader from './components/myHeader.vue';
import myFunctional from './components/myFunctional.vue';
import myGroup from './components/myGroup.vue';
export default {
  data() {
    return {
      userInfo: {
        userBack: './images/beiJing.png',
        userAvatar: './images/touXiang.png',
        userNickname: '小箭头',
        userCoin: '100',
        collection: '20',
        collectionUrl: 'http://www.baidu.com'
      },
      functional: [
        {
          url: 'http://www.baidu.com',
          icon: './images/icon-jianTouBiDiuHuan.png',
          name: '建投币兑换'
        },
        {
          url: 'http://www.baidu.com',
          icon: './images/icon-liCaiZiXuan.png',
          name: '理财自选'
        },
        {
          url: 'http://www.baidu.com',
          icon: './images/icon-zhangTing.png',
          name: '掌上营业厅'
        }
      ],
      group: [
        {
          url: 'http://www.baidu.com',
          icon: './images/icon-kaiHu.png',
          name: '我要开户'
        },
        {
          url: 'http://www.baidu.com',
          icon: './images/icon-huoDong.png',
          name: '我的活动'
        },
        {
          url: 'http://www.baidu.com',
          icon: './images/icon-ziLiao.png',
          name: '我的资料'
        }
      ]
    }
  },
  components: {
    myHeader: myHeader,
    myFunctional: myFunctional,
    myGroup: myGroup
  },
  methods: {
    mysign() {
      console.log('签到')
    }
  }
}
</script>
<style>
a {
  text-decoration: none;
}

.myFunctional {
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #e4e7f0;
}

.group {
  border-top: 1px solid #e4e7f0;
  border-bottom: 1px solid #e4e7f0;
}
</style>
