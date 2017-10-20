<template>
    <!--选择合约列表弹出框 start-->
    <div class="modal  dialog-info" id="selectContractDialog" tabindex="-1" role="dialog"
         aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content selectCon" v-if="selectContract">
                <div class="modal-body dialog-bottom"  data-dismiss="modal"  v-for="data in selectContract" @click="selectContractClick(data.name,data.market,data.code)">
                    {{data.name ? data.name : '----'}}
                </div>
            </div>
            <div class="modal-content selectCon" v-else>
                <div class="modal-body" style="height: 100px; padding-top: 41px;" data-dismiss="modal">
                    请先添加自选！
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props:['selectContract'],
        created:function(){
            console.log(this.selectContract)
        },
        methods:{
            selectContractClick: function(name,market,code){
//                console.log(name+":"+market+":"+code)
                this.$emit('selectContractClick',name,market,code)
            }
        }
    }
</script>