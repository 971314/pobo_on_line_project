<template>
    <nav class="navbar navInfo navbar-fixed-top">
        <div  class="titleBack"><a href="close"><img :src="goBackImg"></a></div>
        <div class="nav-title"> {{title}} </div>
        <div class="navThree">
            <template v-if="id == 1">
                <img @click="refresh(1)"  :src="refreshImg" width="18px" height="18px">
            </template>
            <template v-if="id == 2">
                <img @click="refresh(2)"  :src="refreshImg" width="18px" height="18px">
            </template>
            <template v-if="id == 3">
                <span  class="navThreeTitle" @click="clearSetInfo(1)">重置</span>
            </template>
            <template v-if="id == 4">
                <span  class="navThreeTitle" @click="clearSetInfo(2)">添加</span>
            </template>
        </div>
    </nav>
</template>
<script>
    export default{
         props:['id','goBackImg','refreshImg','title'],
         methods:{
             refresh:function(type){
                  this.$emit('refresh',type)
             },
             clearSetInfo:function(type){
                 this.$emit('clearSetInfo',type)
             }
         }
    }
</script>