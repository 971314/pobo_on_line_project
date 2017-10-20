<template>
    <div>
        <nav-bar :id.sync="this.$route.params.id" :goBackImg.sync="goBackImg" :refreshImg.sync="refreshImg"
                @refresh="refresh" @clearSetInfo="clearSetInfo" :title.sync="title"></nav-bar>
        <div class="divFixed">
            <router-link  to="/noneConList/1">
                <div id="conNoneTouch"  :class=" this.$route.params.id == 1 ? 'touchConditionDiv' : 'conditionDiv noneRight' ">
                    未触发列表
                </div>
            </router-link>
            <router-link to="/isConList/2">
                <div  :class=" this.$route.params.id == 2 ? 'touchConditionDiv' : 'conditionDiv noneRight' ">
                    已触发列表
                </div>
            </router-link>
            <div v-if="initCondition"   :class=" this.$route.params.id == 3 ? 'touchConditionDiv' : 'conditionDiv noneRight' ">
                <router-link to="/setCon/3">条件单设置</router-link>
            </div>
            <div v-else   :class=" this.$route.params.id == 4 ? 'touchConditionDiv' : 'conditionDiv noneRight' ">
                <router-link to="/editCon/4">条件单设置</router-link>
            </div>
        </div>
        <keep-alive include>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
    import navBar from '../component/navBar.vue';
    export default{
        data:function(){
            return{
                initCondition:true,//条件单设置
                goBackImg:'../images/goback.png' ,
                refreshImg:'../images/refresh.png',
                title:'条件单'
            }
        },
        components:{
            navBar:navBar
        },
        beforeUpdate:function(){
            if(this.$route.params.id == 4){
                this.initCondition = false;
            }else{
                this.initCondition = true;
            }
        },
        methods:{
            refresh:function(type){
                if(type == 1){
                    window.location.reload();
                }else{
                    window.location.reload();
                }
            },
            clearSetInfo:function(type){
                if(type == 1){
                    window.location.reload();
                }else{
                    this.$router.push('/setCon/3');
                }
            }
        }
    }
</script>