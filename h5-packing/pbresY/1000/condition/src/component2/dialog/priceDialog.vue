<template>
    <div class="modal  dialog-info" id="priceInfoDialog" tabindex="-1" role="dialog"
         aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="border-radius: 10px;">
                <div class="modal-body dialog-bottom" @click="priceInfoClick(1)" data-dismiss="modal">
                    涨停价
                </div>
                <div class="modal-body dialog-bottom" @click="priceInfoClick(2)" data-dismiss="modal">
                    跌停价
                </div>
                <div class="modal-body dialog-bottom" @click="priceInfoClick(3)" data-dismiss="modal">
                    对手价
                </div>
                <div class="modal-body dialog-bottom" @click="priceInfoClick(4)" style="border-bottom: none;" data-dismiss="modal">
                    最新价
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        methods:{
            priceInfoClick:function(flag){
                this.$emit('priceInfoClick',flag); 
            }
        }
    }
</script>