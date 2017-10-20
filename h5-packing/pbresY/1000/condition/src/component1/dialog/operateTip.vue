<template v-if="conNoneTouchObj.clientFlag == 1 &&  !conNoneTouchObj.serverFlag
    || conNoneTouchObj.clientFlag == 4 &&  conNoneTouchObj.serverFlag == 23
    || conNoneTouchObj.clientFlag == 3 &&  conNoneTouchObj.serverFlag == 22
    || conNoneTouchObj.clientFlag == 2 &&  conNoneTouchObj.serverFlag == 21">
    <div class="modal  dialog-info" id="noneTuchDialog" tabindex="-1" role="dialog"
         aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="border-radius: 10px;line-height: 63px; height: 100px;">
                <div class="modal-body dialog-bottom" style="border-bottom: none;" data-dismiss="modal">
                    <p class="modalP">正在申报中，</p>
                    <p>不能进行操作！</p>
                </div>
            </div>
        </div>
    </div>
</template>
<template v-if="conNoneTouchObj.clientFlag == 5  &&   conNoneTouchObj.serverFlag == 26 && conNoneTouchObj.clientFlag == 5  &&   conNoneTouchObj.serverFlag != 26
    ">
    <div class="modal  dialog-info" id="noneTuchDialog" tabindex="-1" role="dialog"
         aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="border-radius: 10px;line-height: 63px; height: 100px;">
                <div class="modal-body dialog-bottom" style="border-bottom: none;" data-dismiss="modal">
                    <p class="modalP">删除状态，</p>
                    <p>不能进行操作！</p>
                </div>
            </div>
        </div>
    </div>
</template>
<template v-else>
    <div class="modal  dialog-info" id="noneTuchDialog" tabindex="-1" role="dialog"
         aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="border-radius: 10px;">
                <!--
                  1:运行的可以修改、暂停、删除
                  2:暂停的可以修改、运行、删除
                  3:异常的，只能删除
               -->
                <template v-if="conNoneTouchObj.clientFlag == 1 && conNoneTouchObj.serverFlag == 21
                             || conNoneTouchObj.clientFlag == 4 && conNoneTouchObj.serverFlag == 22
                             || conNoneTouchObj.clientFlag == 1 && conNoneTouchObj.serverFlag == 22
                             || conNoneTouchObj.clientFlag == 2 && conNoneTouchObj.serverFlag == 22">
                    <!--<div class="modal-body dialog-bottom" @click="conStopOrOnClick(3)" data-dismiss="modal">-->
                    <!--<a href="#setTuch" data-toggle="tab" data-dismiss="modal" >修改</a>-->
                    <!--</div>-->
                    <div class="modal-body dialog-bottom" @click="conStopOrOnClick(1)" data-dismiss="modal">
                        暂停
                    </div>
                </template>
                <template v-else-if="conNoneTouchObj.clientFlag == 3 && conNoneTouchObj.serverFlag == 23">
                    <div class="modal-body dialog-bottom"  data-dismiss="modal"   @click="conStopOrOnClick(3)">
                        <a href="#setTuch" data-toggle="tab" data-dismiss="modal" >修改</a>
                    </div>
                    <div class="modal-body dialog-bottom"  data-dismiss="modal"  @click="conStopOrOnClick(2)">
                        运行
                    </div>
                </template>
                <div class="modal-body dialog-bottom" data-dismiss="modal"  @click="conStopOrOnClick(4)">
                    删除
                </div>
                <div class="modal-body dialog-bottom" @click="conStopOrOnClick(5)" style="border-bottom: none;" data-dismiss="modal">
                    全部删除
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props:['conNoneTouchObj','msg'],
        created:function(){
           console.log(this.conNoneTouchObj)
        },
        methods:{
            conStopOrOnClick:function(type){
                this.$emit('conStopOrOnClick',type)
            }
        }
    }
</script>