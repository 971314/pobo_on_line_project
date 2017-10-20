<template>
    <div>
        <nav-bar :id.sync="this.$route.params.id" :goBackImg.sync="goBackImg" :title.sync="title"></nav-bar>
        <div class="divFixed">
            <router-link  to="/slNoneList/1">
                <div  :class=" this.$route.params.id == 1 ? 'stopNoTuchBlue' : 'stopNoTuch' ">
                    未触发列表
                </div>
            </router-link>
            <router-link  to="/slIsList/2">
                <div :class=" this.$route.params.id == 2 ? 'stopNoTuchBlue' : 'stopNoTuch' ">
                    已触发列表
                </div>
            </router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    import navBar from './navBar.vue';
    export default{
        data:function(){
            return{
                goBackImg:'../../images/goback.png' ,
                refreshImg:'../../images/refresh.png',
                title:'止损止盈'
            }
        },
        components:{
            navBar:navBar
        },
        methods:{
            refresh:function(){
              window.location.reload();
            }
        }
    }
</script>