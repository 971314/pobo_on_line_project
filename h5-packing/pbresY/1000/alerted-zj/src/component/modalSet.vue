<template>
    <div class="modal  dialog-info" id="noneTuchDialog" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="border-radius: 10px;">
                <div class="modal-body dialog-bottom" v-for="dealname in dealnames" @click="dealnameClick(dealname)">
                    {{dealname.name}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
       props:['dealnames'],
        methods:{
           dealnameClick:function (dealname) {
               this.$emit('dealnameClick',dealname);
           }
        }
    }
</script>