<template>
    <div>
        <!--删除提示-->
        <div class="deleatMes">{{deleatMsg}}</div>
        <div class="modal  dialog-info" id="deleteList" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" style="border-radius: 10px;">
                    <div class="modal-body dialog-bottom" @click="deleatAlert">删除</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props:['deleatMsg'],
        methods:{
            deleatAlert:function () {
                this.$emit('deleatAlert')
            }
        }
    }
</script>