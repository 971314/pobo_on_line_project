<template>
    <nav class="navbar navInfo navbar-fixed-top">
        <div  class="titleBack"><a href="close"><img :src="goBackImg"></a></div>
        <div class="nav-title"> {{title}} </div>
    </nav>
</template>
<script>
    export default{
         props:['goBackImg','title']
    }
</script>