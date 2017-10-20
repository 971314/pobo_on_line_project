<template>
    <div>
        <div id="loading" style="display: none;">
            <div></div>
        </div>
        <nav class="navbar navInfo navbar-fixed-top">
            <div class="titleBack">
                <a href="close">
                    <img src="../../../images/goback.png">
                </a>
            </div>
            <div class="nav-title font18"> 预警 </div>
        </nav>
        <div class="divFixed clearfloat">
            <router-link  to="/alert/1">
                <div class="font18" :class=" this.$route.params.id == 1 ? 'touchConditionDiv' : 'conditionDiv noneRight' ">
                    预警设置
                </div>
            </router-link>
            <router-link  to="/myalert/2">
                <div class="font18" :class=" this.$route.params.id == 2 ? 'touchConditionDiv' : 'conditionDiv noneRight' ">
                    我的预警
                </div>
            </router-link>
    </div>
        <keep-alive include>
            <router-view></router-view>
        </keep-alive>

</div>
</template>
<script>
    export default{
        data:function () {
            return {
                initImg: true,//将重置按钮替换成刷新按钮
                dealname:'',
                dealnameColor:'block',
                nameMarket:null,
                nameCode:'',
            }
        }
    }
</script>