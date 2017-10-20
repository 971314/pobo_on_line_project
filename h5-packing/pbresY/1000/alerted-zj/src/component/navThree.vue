<template>
    <div class="navThree">
        <span class="colorw" v-if="this.$route.params.id == 1" @click="resettingButton">重置</span>
        <img src="../../../images/refresh.png" width="18px" height="18px" v-else="this.$route.params.id == 2" @click="refurbishButton"/>
    </div>
</template>
<script>
export default{
    methods:{
        resettingButton:function () {
            this.$emit('resettingButton');
        },
        refurbishButton:function () {
            this.$emit('refurbishButton');
        }
    }
}
</script>